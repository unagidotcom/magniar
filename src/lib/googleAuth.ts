import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// Lazy-initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/gmail.send");
provider.addScope("https://www.googleapis.com/auth/calendar.events");

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initializer to bind the auth state dynamically on client startup
export const initAuth = (
  onAuthSuccess: (user: User, token: string) => void,
  onAuthFailure: () => void
) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Access token usually resides in local Storage or can be forced via signInWithPopup
      // Since GoogleAuthProvider popups only return accessToken during sign in,
      // we persist the token in memory, or if page refreshes we can query it or request they click sign-in.
      if (cachedAccessToken) {
        onAuthSuccess(user, cachedAccessToken);
      } else {
        // Fallback: If logged in but token is missing from memory (e.g., page refresh),
        // we keep the active user session but indicate login/consent is needed to execute actions.
        onAuthSuccess(user, "");
      }
    } else {
      cachedAccessToken = null;
      onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  if (isSigningIn) return null;
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("No Google Access Token returned.");
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (err) {
    console.error("Google Sign-In Error: ", err);
    throw err;
  } finally {
    isSigningIn = false;
  }
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

// Sends email notification via Gmail API to magniarventures@gmail.com
export const sendGmailNotification = async (params: {
  name: string;
  website: string;
  spend: string;
  details: string;
  senderEmail: string;
}, token: string): Promise<boolean> => {
  const currentToken = token || cachedAccessToken;
  if (!currentToken) {
    throw new Error("Authentication token unavailable. Please sign in with Google.");
  }

  // Build high-concept, styled HTML email content to notify the administrator
  const boundary = "foo_bar_baz";
  const subjectStr = `Magniar & Co. - New Diagnostic Request from ${params.name}`;
  
  const emailLines = [
    `To: magniarventures@gmail.com`,
    `Reply-To: ${params.senderEmail}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subjectStr)))}?=`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "",
    `<div style="font-family: sans-serif; background-color: #050505; color: #f3f4f6; padding: 32px; border-radius: 12px; max-width: 550px; margin: 0 auto; border: 1px solid #1f1f1f;">`,
    `  <h2 style="color: #ffffff; font-size: 22px; border-bottom: 2px solid #de2b85; padding-bottom: 12px; margin-top: 0;">Magniar & Co. Lead Inbound</h2>`,
    `  <p style="font-size: 14px; color: #e5e7eb; margin: 16px 0 8px 0;">You received a real-time diagnostics assessment request from your website:</p>`,
    `  <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">`,
    `    <tr><td style="padding: 6px 0; color: #9ca3af; font-size: 12px; font-family: monospace;">REPRESENTATIVE:</td><td style="padding: 6px 0; color: #ffffff; font-weight: bold; font-size: 14px;">${params.name}</td></tr>`,
    `    <tr><td style="padding: 6px 0; color: #9ca3af; font-size: 12px; font-family: monospace;">SENDER EMAIL:</td><td style="padding: 6px 0; color: #ffffff; font-size: 14px;"><a href="mailto:${params.senderEmail}" style="color: #de2b85; text-decoration: none;">${params.senderEmail}</a></td></tr>`,
    `    <tr><td style="padding: 6px 0; color: #9ca3af; font-size: 12px; font-family: monospace;">WEBSITE:</td><td style="padding: 6px 0; color: #ffffff; font-size: 14px;"><a href="${params.website}" target="_blank" style="color: #3b82f6; text-decoration: none;">${params.website || "Not Specified"}</a></td></tr>`,
    `    <tr><td style="padding: 6px 0; color: #9ca3af; font-size: 12px; font-family: monospace;">MONTHLY BUDGET:</td><td style="padding: 6px 0; color: #f472b6; font-weight: bold; font-size: 14px;">${params.spend}</td></tr>`,
    `  </table>`,
    `  <div style="background-color: #111; padding: 16px; border-radius: 8px; border-left: 3px solid #3b82f6; margin-top: 20px;">`,
    `    <span style="font-family: monospace; font-size: 10px; color: #3b82f6; display: block; margin-bottom: 4px;">BOTTLENECKS REPORTED:</span>`,
    `    <p style="font-size: 13px; color: #cbd5e1; margin: 0; line-height: 1.6;">${params.details || "No details provided."}</p>`,
    `  </div>`,
    `  <p style="font-size: 11px; color: #4b5563; text-align: center; margin-top: 32px; border-top: 1px solid #1f1f1f; padding-top: 16px;">`,
    `    Node System Dispatch • Port 3000 Autonomous Notification`,
    `  </p>`,
    `</div>`
  ].join("\r\n");

  const base64Safe = btoa(unescape(encodeURIComponent(emailLines)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const response = await fetch("https://www.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${currentToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw: base64Safe }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Gmail Send Error Details:", errText);
    throw new Error(`Gmail API failure: ${response.status} - ${errText}`);
  }

  return true;
};

// Generates real Google Calendar events, inviting magniarventures@gmail.com
export const createCalendarEvent = async (params: {
  name: string;
  senderEmail: string;
  dayLabel: string; // e.g. "Tomorrow (Wed)", "Thursday"
  timeLabel: string; // e.g. "10:30 AM", "2:00 PM"
}, token: string): Promise<{ htmlLink: string }> => {
  const currentToken = token || cachedAccessToken;
  if (!currentToken) {
    throw new Error("Authentication token unavailable. Please sign in with Google.");
  }

  // Calculate Date times based on selection using 2026-05-19T22:40:00Z as reference date
  const anchorDate = new Date("2026-05-19T22:40:00Z");
  let startHour = 10;
  let startMin = 30;
  let dayOffset = 1; // Default to tomorrow Wednesday

  // Determine day offset
  const normalizedDay = params.dayLabel.toLowerCase();
  if (normalizedDay.includes("thursday")) {
    dayOffset = 2; // Thursday
  } else if (normalizedDay.includes("wednesday") || normalizedDay.includes("wed")) {
    dayOffset = 1; // Wednesday
  }

  // Determine hour and minutes
  const normalizedTime = params.timeLabel.toLowerCase();
  const timeParts = normalizedTime.match(/(\d+):(\d+)\s*(am|pm)/);
  if (timeParts) {
    let hrs = parseInt(timeParts[1]);
    const mins = parseInt(timeParts[2]);
    const ampm = timeParts[3];

    if (ampm === "pm" && hrs !== 12) {
      hrs += 12;
    } else if (ampm === "am" && hrs === 12) {
      hrs = 0;
    }
    startHour = hrs;
    startMin = mins;
  }

  // Calculate standard UTC start date
  const eventStartDate = new Date(anchorDate);
  eventStartDate.setUTCDate(anchorDate.getUTCDate() + dayOffset);
  eventStartDate.setUTCHours(startHour, startMin, 0, 0);

  const eventEndDate = new Date(eventStartDate);
  eventEndDate.setUTCMinutes(eventStartDate.getUTCMinutes() + 30); // 30-minute diagnostic session

  const requestBody = {
    summary: `Magniar & Co. - Brand Scale Diagnostic Session x ${params.name}`,
    location: "Google Meet Link (Assigned by Administrator)",
    description: `Growth analysis session covering website bottlenecks, marketplace setup, and advertising budget streams.\n\nVisitor Representative: ${params.name}\nVisitor Email: ${params.senderEmail}`,
    start: {
      dateTime: eventStartDate.toISOString(),
      timeZone: "UTC",
    },
    end: {
      dateTime: eventEndDate.toISOString(),
      timeZone: "UTC",
    },
    attendees: [
      { email: "magniarventures@gmail.com", responseStatus: "needsAction" },
      { email: params.senderEmail, responseStatus: "accepted" }
    ],
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}`,
        conferenceSolutionKey: {
          type: "hangoutsMeet"
        }
      }
    },
    reminders: {
      useDefault: true,
    },
  };

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all&conferenceDataVersion=1",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${currentToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error("Calendar Insert Event Error Details:", errText);
    throw new Error(`Google Calendar API failure: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  return { htmlLink: data.htmlLink || "" };
};

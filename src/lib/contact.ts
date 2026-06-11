export interface ContactFormPayload {
  name: string;
  email: string;
  website?: string;
  spend?: string;
  details?: string;
}

export async function submitContactForm(
  payload: ContactFormPayload
): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as { error?: string };

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "Contact API not found. Run `npx vercel dev` locally, or deploy to Vercel so `/api/contact` is available."
      );
    }
    throw new Error(
      data.error || "Failed to submit inquiry. Please try again."
    );
  }
}

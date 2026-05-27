export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  createdAt: Date;
  link: string;
}

interface WpRenderedField {
  rendered: string;
}

interface WpPost {
  id: number;
  date: string;
  link: string;
  title: WpRenderedField;
  content: WpRenderedField;
  excerpt: WpRenderedField;
  _embedded?: {
    author?: Array<{ name: string }>;
  };
}

/**
 * Use same-origin `/wp-json` by default.
 * On Vercel, `vercel.json` rewrites `/wp-json/*` to `https://app.magniar.com/wp-json/*`.
 */
const WP_API_BASE =
  import.meta.env.VITE_WP_API_URL?.replace(/\/$/, "") || "/wp-json";

/** Used for wp-admin links (because API may be proxied). */
const WP_SITE_URL =
  import.meta.env.VITE_WP_SITE_URL?.replace(/\/$/, "") ||
  "https://app.magniar.com";

function stripHtml(html: string): string {
  if (typeof document === "undefined") {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent ?? "").replace(/\s+/g, " ").trim();
}

function buildAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return new URL(pathOrUrl, origin || "https://magniar.com").toString();
}

function mapPost(post: WpPost): BlogPost {
  const authorName = post._embedded?.author?.[0]?.name ?? "Magniar Editorial";
  const excerptText = stripHtml(post.excerpt?.rendered ?? "");
  const contentText = stripHtml(post.content?.rendered ?? "");

  return {
    id: String(post.id),
    title: stripHtml(post.title?.rendered ?? ""),
    excerpt: excerptText.length > 0 ? excerptText : contentText.slice(0, 220),
    content: contentText,
    authorName,
    createdAt: new Date(post.date),
    link: post.link,
  };
}

export async function fetchWordPressPosts(): Promise<BlogPost[]> {
  const postsUrl = buildAbsoluteUrl(`${WP_API_BASE}/wp/v2/posts?_embed=author&per_page=20&status=publish`);
  const response = await fetch(postsUrl, { headers: { Accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`WordPress API error (${response.status}): ${response.statusText}`);
  }
  const posts = (await response.json()) as WpPost[];
  return posts.map(mapPost);
}

export function getWordPressAdminUrl(): string {
  return `${WP_SITE_URL}/wp-admin/edit.php`;
}


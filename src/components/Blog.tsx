import React, { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Clock, ExternalLink, PenTool, RefreshCw, User } from "lucide-react";
import { FALLBACK_POSTS } from "../data/blogFallbacks";
import { fetchWordPressPosts, getWordPressAdminUrl, type BlogPost } from "../lib/wordpress";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const fetched = await fetchWordPressPosts();
      if (fetched.length === 0) {
        setPosts(FALLBACK_POSTS);
        setUsingFallback(true);
      } else {
        setPosts(fetched);
        setUsingFallback(false);
      }
    } catch (e) {
      setPosts(FALLBACK_POSTS);
      setUsingFallback(true);
      setErrorMessage(e instanceof Error ? e.message : "Could not load WordPress posts.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section className="relative overflow-hidden bg-bg-secondary py-24 border-t border-border-primary" id="blog-insights">
      {/* Absolute Aesthetic Background Gradients */}
      <div className="absolute top-[30%] left-[20%] h-[300px] w-[300px] rounded-full bg-brand-blue/5 blur-[120px]" />
      <div className="absolute bottom-[10%] right-[10%] h-[250px] w-[250px] rounded-full bg-brand-pink/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header Block */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end mb-16">
          <div>
            <span className="font-mono text-sm font-bold uppercase tracking-widest text-brand-blue">
              MAGNIAR INSIGHTS
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
              Knowledge Base & Studio
            </h2>
          </div>
          <p className="max-w-md font-sans text-lg leading-relaxed text-text-secondary">
            Headless WordPress publishing (managed in wp-admin, delivered via the WordPress REST API).
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border-primary pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-brand-blue text-white px-5 py-2 font-display text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Articles ({posts.length})</span>
            </span>
            {usingFallback && (
              <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase text-yellow-500">
                Demo content
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => load()}
              disabled={isLoading}
              className="flex items-center gap-1.5 rounded-full bg-bg-primary hover:bg-card-hover-bg border border-border-primary px-4 py-1.5 text-xs text-text-secondary hover:text-text-primary cursor-pointer transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-brand-blue ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <a
              href={getWordPressAdminUrl()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-bg-primary hover:bg-card-hover-bg border border-border-primary px-4 py-1.5 text-xs text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
            >
              <PenTool className="h-3.5 w-3.5 text-brand-blue" />
              <span>Write in WordPress</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>

        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-red-500/10 bg-red-500/5 p-4 text-sm text-red-400"
          >
            {errorMessage}
          </motion.div>
        )}

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[0, 1].map((k) => (
              <div key={k} className="h-64 animate-pulse rounded-2xl border border-border-primary bg-card-bg" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, idx) => (
              <motion.article
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                key={post.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border-primary bg-card-bg p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-blue/30"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border-primary pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-brand-blue" />
                      <span className="font-sans text-xs font-semibold text-text-secondary">{post.authorName}</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-[10px] text-text-tertiary uppercase">
                      <Clock className="h-3 w-3" />
                      <span>
                        {post.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-tight text-text-primary group-hover:text-brand-blue transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 font-sans text-base md:text-lg leading-relaxed text-text-secondary">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border-primary pt-4">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-text-tertiary">
                    Headless WordPress
                  </span>
                  {post.link?.startsWith("http") && (
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-wider text-brand-blue hover:text-white transition-colors"
                    >
                      Read
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, PenTool, Plus, BookOpen, User, Clock, Trash2, 
  LayoutDashboard, Check, FileText, ChevronRight, Eye, RefreshCw, LogIn
} from "lucide-react";
import { auth, db } from "../lib/googleAuth";
import { 
  collection, doc, getDocs, addDoc, deleteDoc, updateDoc, 
  query, where, orderBy, onSnapshot, getDocFromServer
} from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error Detailed Object: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  status: "draft" | "published";
  createdAt: any;
  updatedAt: any;
}

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: "premium-acquisition",
    title: "The Cookieless Acquisition Stack for 2026",
    content: "With standard digital cookie tracking almost entirely deprecated, top performance brands have migrated their architectures toward first-party server-side tagging. We review critical setup templates for Meta Conversions API and Google PMax nodes.",
    authorId: "system",
    authorName: "Liam Cross (Lead Architect)",
    status: "published",
    createdAt: new Date("2026-05-18T10:00:00Z"),
    updatedAt: new Date("2026-05-18T10:00:00Z")
  },
  {
    id: "lighthouse-commerce",
    title: "Designing 99/100 Lighthouse Speed-Packs",
    content: "Speed directly corresponds to landing conversion percentage. Traditional multi-megabyte builders introduce massive visual layout shift obstacles. Creating custom, headless frameworks built with clean React code reduces initial server response to <200ms.",
    authorId: "system",
    authorName: "Sarah Thorne (Head of Dev)",
    status: "published",
    createdAt: new Date("2026-05-16T14:30:00Z"),
    updatedAt: new Date("2026-05-16T14:30:00Z")
  }
];

export default function Blog() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Create Post states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [activeTab, setActiveTab] = useState<"all" | "drafts" | "create">("all");

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // Sync / Real-time Listeners
  useEffect(() => {
    setIsLoading(true);
    const postsCollectionPath = "posts";
    
    // Firestore security testing validation
    async function testFirestoreAccess() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (err) {
        // Safe to swallow connection checks as fallback
      }
    }
    testFirestoreAccess();

    let unsubscribe: () => void = () => {};

    try {
      // Build real-time query
      const postsRef = collection(db, postsCollectionPath);
      // Query published posts, unless auth state exists
      const q = query(postsRef, orderBy("createdAt", "desc"));

      unsubscribe = onSnapshot(q, (snapshot) => {
        const fetched: BlogPost[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          fetched.push({
            id: docSnap.id,
            title: data.title,
            content: data.content,
            authorId: data.authorId,
            authorName: data.authorName,
            status: data.status,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date()
          });
        });
        setPosts(fetched.length > 0 ? fetched : FALLBACK_POSTS);
        setIsLoading(false);
        setErrorMessage(null);
      }, (err) => {
        console.warn("Real-time posts sync blocked by permissions. Loading static high-concept fallbacks.");
        setPosts(FALLBACK_POSTS);
        setIsLoading(false);
      });
    } catch (e) {
      setPosts(FALLBACK_POSTS);
      setIsLoading(false);
    }

    return () => unsubscribe();
  }, [currentUser]);

  // Authenticate using popup provider inside Blog
  const handleBlogLogin = async () => {
    try {
      setErrorMessage(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to authorize Google Profile.");
    }
  };

  // Create article live
  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setErrorMessage("Please supply both a Post Title and content stream.");
      return;
    }

    if (!currentUser) {
      setErrorMessage("Authentication required to deploy articles into Firestore.");
      return;
    }

    const pathString = "posts";
    setIsPublishing(true);
    setErrorMessage(null);

    const postPayload = {
      title,
      content,
      authorId: currentUser.uid,
      authorName: currentUser.displayName || "Admin Publisher",
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      // Direct Firebase Collection write
      await addDoc(collection(db, pathString), postPayload);
      
      // Clean up fields
      setTitle("");
      setContent("");
      setActiveTab("all");
      setErrorMessage(null);
    } catch (err: any) {
      console.error(err);
      try {
        handleFirestoreError(err, OperationType.WRITE, pathString);
      } catch (jsonErr: any) {
        setErrorMessage("Deployment status denied: You must be an authorized Admin or Content Creator profile.");
      }
    } finally {
      setIsPublishing(false);
    }
  };

  // Delete live article
  const handleDeleteArticle = async (id: string) => {
    const pathString = `posts/${id}`;
    try {
      await deleteDoc(doc(db, "posts", id));
    } catch (err: any) {
      console.error(err);
      try {
        handleFirestoreError(err, OperationType.DELETE, pathString);
      } catch (jsonErr: any) {
        setErrorMessage("Action Denied: Insufficient permissions to delete documents on default role.");
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-brand-dark py-24 border-t border-white/5" id="blog-insights">
      {/* Absolute Aesthetic Background Gradients */}
      <div className="absolute top-[30%] left-[20%] h-[300px] w-[300px] rounded-full bg-brand-blue/5 blur-[120px]" />
      <div className="absolute bottom-[10%] right-[10%] h-[250px] w-[250px] rounded-full bg-brand-pink/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header Block */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end mb-16">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue">
              MAGNIAR INSIGHTS
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Knowledge Base & Studio
            </h2>
          </div>
          <p className="max-w-md font-sans text-base leading-relaxed text-gray-300">
            A future-proof blog system integrated with Google Authentication and Google Firestore rules. Scale, publish, and draft your industry-first newsletters.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "all"
                  ? "bg-brand-blue text-white"
                  : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Articles ({posts.length})</span>
            </button>

            {currentUser && (
              <button
                onClick={() => setActiveTab("create")}
                className={`flex items-center gap-1.5 rounded-full px-5 py-2 font-display text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeTab === "create"
                    ? "bg-brand-blue text-white"
                    : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
                }`}
              >
                <PenTool className="h-3.5 w-3.5" />
                <span>Write New Insight</span>
              </button>
            )}
          </div>

          {/* User state connection widget */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Publisher Profile: <strong>{currentUser.email}</strong></span>
              </div>
            ) : (
              <button
                onClick={handleBlogLogin}
                className="flex items-center gap-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 text-xs text-gray-300 hover:text-white cursor-pointer transition-colors"
              >
                <LogIn className="h-3.5 w-3.5 text-brand-blue" />
                <span>Sign in as Writer</span>
              </button>
            )}
          </div>
        </div>

        {/* Display Error Message cleanly */}
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-red-500/10 bg-red-500/5 p-4 text-sm text-red-400"
          >
            {errorMessage}
          </motion.div>
        )}

        {/* View Layout Switching */}
        <AnimatePresence mode="wait">
          {activeTab === "create" && currentUser ? (
            <motion.form
              key="create-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              onSubmit={handleCreateArticle}
              className="space-y-6 rounded-2xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-md md:p-8"
            >
              <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <FileText className="h-5 w-5 text-brand-blue" />
                <h3 className="font-display text-lg font-bold text-white">Create Future Insight Document</h3>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-gray-400 mb-2">ARTICLE TITLE *</label>
                <input
                  type="text"
                  placeholder="e.g. Scaling Marketplace Outposts on Emerging Channels"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 font-sans text-base text-white placeholder-gray-500 outline-none transition-all focus:border-brand-blue"
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-gray-400 mb-2">ARTICLE STREAM CONTENT (MARKDOWN SUPPORTED) *</label>
                <textarea
                  rows={8}
                  placeholder="Share direct insights, analytical graphs, ROAS optimization tips..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 font-sans text-base text-white placeholder-gray-500 outline-none transition-all focus:border-brand-blue"
                  required
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <label className="font-mono text-xs uppercase tracking-widest text-gray-400">VISIBILITY STATUS:</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="published" className="bg-brand-dark text-white">Published</option>
                    <option value="draft" className="bg-brand-dark text-white">Draft</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("all")}
                    className="rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPublishing}
                    className="group inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 font-display text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:scale-[1.01] disabled:opacity-50"
                  >
                    {isPublishing ? "Syncing to Cloud..." : "Deploy to Firestore"}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="list-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {posts.map((post, idx) => (
                <motion.article
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  key={post.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-brand-dark/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-brand-blue/30"
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-brand-blue" />
                        <span className="font-sans text-xs font-semibold text-gray-300">{post.authorName}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {post.status === "draft" && (
                          <span className="rounded-full bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-yellow-500 uppercase">
                            Draft
                          </span>
                        )}
                        <div className="flex items-center gap-1 font-mono text-[10px] text-gray-500 uppercase">
                          <Clock className="h-3 w-3" />
                          <span>{post.createdAt.toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-bold tracking-tight text-white group-hover:text-brand-blue transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm md:text-base leading-relaxed text-gray-300">
                      {post.content}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-500">Secure Node Sync</span>
                    
                    {/* Only author can remove their articles */}
                    {currentUser && currentUser.uid === post.authorId && (
                      <button
                        onClick={() => handleDeleteArticle(post.id)}
                        className="rounded-full bg-rose-500/5 hover:bg-rose-500/20 text-rose-400 hover:text-white p-2 border border-rose-500/10 transition-colors cursor-pointer"
                        title="Delete Insight Article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

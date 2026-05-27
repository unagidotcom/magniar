/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WP_API_URL?: string;
  readonly VITE_WP_SITE_URL?: string;
  readonly VITE_WP_PROXY_TARGET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


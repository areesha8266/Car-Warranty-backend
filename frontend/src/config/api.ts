const PRODUCTION_API_URL =
  'https://car-warranty-backend-production-81db.up.railway.app/api';

const LOCAL_API_URL = 'http://localhost:5000/api';

function normalizeUrl(url: string) {
  return url.replace(/\/$/, '');
}

/** Resolved at build time. Production never uses localhost. */
export const API_BASE_URL = (() => {
  const fromEnv = import.meta.env.VITE_API_URL?.trim();

  if (import.meta.env.PROD) {
    if (fromEnv && !fromEnv.includes('localhost')) {
      return normalizeUrl(fromEnv);
    }
    return PRODUCTION_API_URL;
  }

  return fromEnv ? normalizeUrl(fromEnv) : LOCAL_API_URL;
})();

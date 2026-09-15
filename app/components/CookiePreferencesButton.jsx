"use client";

export default function CookiePreferencesButton({ className = "" }) {
  return (
    <button
      type="button"
      className={`cookie-preferences-link ${className}`.trim()}
      onClick={() => window.dispatchEvent(new Event("rf:open-cookie-preferences"))}
    >
      Gerenciar cookies
    </button>
  );
}

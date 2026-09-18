"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const CONSENT_KEY = "rf_cookie_consent_v1";
const CONSENT_VERSION = 1;
const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;
const GTM_ID = "GTM-5Q9PQTFC";
const GTM2_ID = "GTM-TNXFT6ZT";
const META_PIXEL_ID = "1719570872434737";
const GTAG_ID = "G-FW6HQ365EW";

const EMPTY_PREFERENCES = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };
}

function setGoogleConsent(command, preferences) {
  ensureDataLayer();
  window.gtag("consent", command, {
    analytics_storage: preferences.analytics ? "granted" : "denied",
    ad_storage: preferences.marketing ? "granted" : "denied",
    ad_user_data: preferences.marketing ? "granted" : "denied",
    ad_personalization: preferences.marketing ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });
}

function loadGoogleTagManager() {
  if (document.getElementById("rf-gtm-script")) return;

  ensureDataLayer();
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = "rf-gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

function loadGoogleTagManager2() {
  if (document.getElementById("rf-gtm2-script")) return;

  ensureDataLayer();
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = "rf-gtm2-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM2_ID}`;
  document.head.appendChild(script);
}

function loadGoogleTag() {
  if (document.getElementById("rf-gtag-script")) return;

  ensureDataLayer();

  const script = document.createElement("script");
  script.id = "rf-gtag-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GTAG_ID);
}

function loadMetaPixel() {
  if (!window.fbq) {
    const fbq = function fbq() {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, arguments);
      } else {
        fbq.queue.push(arguments);
      }
    };

    window.fbq = fbq;
    window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];

    const script = document.createElement("script");
    script.id = "rf-meta-pixel-script";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  if (!window.__rfMetaPixelInitialized) {
    window.fbq("init", META_PIXEL_ID);
    window.__rfMetaPixelInitialized = true;
  }

  window.fbq("consent", "grant");
}

function removeFirstPartyTrackingCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter(
      (name) =>
        name === "_fbp" ||
        name === "_fbc" ||
        name === "_ga" ||
        name === "_gid" ||
        name.startsWith("_ga_")
    );

  cookieNames.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.rafaelfossalussa.com; SameSite=Lax`;
  });
}

function readStoredPreferences() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(CONSENT_KEY));
    if (
      stored?.version !== CONSENT_VERSION ||
      !stored.expiresAt ||
      Date.now() >= stored.expiresAt
    ) {
      window.localStorage.removeItem(CONSENT_KEY);
      return null;
    }

    return {
      necessary: true,
      analytics: Boolean(stored.analytics),
      marketing: Boolean(stored.marketing),
      updatedAt: stored.updatedAt,
      expiresAt: stored.expiresAt,
    };
  } catch {
    return null;
  }
}

function persistPreferences(preferences) {
  const now = Date.now();
  const stored = {
    ...preferences,
    necessary: true,
    version: CONSENT_VERSION,
    updatedAt: new Date(now).toISOString(),
    expiresAt: now + CONSENT_MAX_AGE,
  };

  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(stored));
  } catch {
    // O consentimento continua válido para a sessão mesmo sem localStorage.
  }

  return stored;
}

export default function ConsentManager() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [preferences, setPreferences] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState(EMPTY_PREFERENCES);
  const previousMarketing = useRef(false);
  const lastMetaPath = useRef(null);

  useEffect(() => {
    setGoogleConsent("default", EMPTY_PREFERENCES);
    const stored = readStoredPreferences();
    if (stored) setPreferences(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    const openSettings = () => {
      setDraft(preferences || EMPTY_PREFERENCES);
      setSettingsOpen(true);
    };

    window.addEventListener("rf:open-cookie-preferences", openSettings);
    return () => window.removeEventListener("rf:open-cookie-preferences", openSettings);
  }, [preferences]);

  useEffect(() => {
    if (!ready || !preferences) return;

    setGoogleConsent("update", preferences);

    if (preferences.analytics || preferences.marketing) {
      loadGoogleTagManager();
      loadGoogleTagManager2();
    }

    if (preferences.analytics) {
      loadGoogleTag();
    }

    if (preferences.marketing) {
      loadMetaPixel();
      const shouldTrackPage =
        !previousMarketing.current || lastMetaPath.current !== pathname;

      if (shouldTrackPage) {
        window.fbq("track", "PageView");
        if (pathname.startsWith("/produto/")) {
          // Sem parâmetros de produto: o Core Setup financeiro pode restringi-los.
          window.fbq("track", "ViewContent");
        }
        lastMetaPath.current = pathname;
      }
    } else if (window.fbq) {
      window.fbq("consent", "revoke");
      if (previousMarketing.current) removeFirstPartyTrackingCookies();
    }

    previousMarketing.current = preferences.marketing;
  }, [pathname, preferences, ready]);

  useEffect(() => {
    const trackMeasuredClick = (event) => {
      if (!preferences?.analytics) return;
      const link = event.target.closest?.("a[href]");
      if (!link) return;

      const href = link.href;
      if (href.includes("pay.hotmart.com")) {
        ensureDataLayer();
        window.dataLayer.push({
          event: "checkout_click",
          product_slug:
            link.dataset.product || pathname.split("/").filter(Boolean).at(-1) || "unknown",
        });
      } else if (href.includes("wa.me/") || href.includes("whatsapp.com/")) {
        ensureDataLayer();
        window.dataLayer.push({
          event: "whatsapp_click",
          page_path: pathname,
        });
      }
    };

    document.addEventListener("click", trackMeasuredClick, true);
    return () => document.removeEventListener("click", trackMeasuredClick, true);
  }, [pathname, preferences]);

  useEffect(() => {
    if (!settingsOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSettingsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [settingsOpen]);

  useEffect(() => {
    setSettingsOpen(false);
  }, [pathname]);

  const savePreferences = (nextPreferences) => {
    const stored = persistPreferences(nextPreferences);
    setPreferences(stored);
    setDraft(stored);
    setSettingsOpen(false);
  };

  if (!ready) return null;

  return (
    <>
      {!preferences ? (
        <section className="cookie-banner" role="dialog" aria-label="Preferências de privacidade">
          <div className="cookie-banner__copy">
            <strong>Sua privacidade importa</strong>
            <p>
              Usamos tecnologias necessárias para o site funcionar e, com sua permissão,
              ferramentas de medição e publicidade. Você pode aceitar, rejeitar ou escolher
              as categorias. Saiba mais na <Link href="/privacidade">Política de Privacidade</Link>.
            </p>
          </div>
          <div className="cookie-banner__actions">
            <button type="button" className="cookie-button cookie-button--quiet" onClick={() => savePreferences(EMPTY_PREFERENCES)}>
              Rejeitar opcionais
            </button>
            <button
              type="button"
              className="cookie-button cookie-button--outline"
              onClick={() => {
                setDraft(EMPTY_PREFERENCES);
                setSettingsOpen(true);
              }}
            >
              Configurar
            </button>
            <button
              type="button"
              className="cookie-button cookie-button--primary"
              onClick={() => savePreferences({ necessary: true, analytics: true, marketing: true })}
            >
              Aceitar todos
            </button>
          </div>
        </section>
      ) : null}

      {settingsOpen ? (
        <div className="cookie-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSettingsOpen(false);
        }}>
          <section className="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
            <div className="cookie-modal__head">
              <div>
                <span>Privacidade</span>
                <h2 id="cookie-settings-title">Preferências de cookies</h2>
              </div>
              <button type="button" aria-label="Fechar preferências" onClick={() => setSettingsOpen(false)}>×</button>
            </div>

            <p className="cookie-modal__intro">
              As categorias opcionais permanecem desativadas até sua autorização. Você pode
              mudar esta escolha a qualquer momento.
            </p>

            <div className="cookie-category">
              <div><strong>Necessários</strong><p>Preferências de privacidade, segurança e funcionamento básico.</p></div>
              <span className="cookie-category__required">Sempre ativos</span>
            </div>

            <label className="cookie-category">
              <div><strong>Análise</strong><p>Ajuda a entender navegação e desempenho de forma agregada.</p></div>
              <input
                type="checkbox"
                checked={draft.analytics}
                onChange={(event) => setDraft((current) => ({ ...current, analytics: event.target.checked }))}
              />
              <span className="cookie-switch" aria-hidden="true" />
            </label>

            <label className="cookie-category">
              <div><strong>Publicidade e marketing</strong><p>Autoriza Meta Pixel, atribuição e audiências para campanhas.</p></div>
              <input
                type="checkbox"
                checked={draft.marketing}
                onChange={(event) => setDraft((current) => ({ ...current, marketing: event.target.checked }))}
              />
              <span className="cookie-switch" aria-hidden="true" />
            </label>

            <div className="cookie-modal__links">
              <Link href="/cookies" onClick={() => setSettingsOpen(false)}>
                Política de Cookies
              </Link>
              <Link href="/privacidade" onClick={() => setSettingsOpen(false)}>
                Política de Privacidade
              </Link>
            </div>

            <div className="cookie-modal__actions">
              <button type="button" className="cookie-button cookie-button--quiet" onClick={() => savePreferences(EMPTY_PREFERENCES)}>
                Rejeitar opcionais
              </button>
              <button type="button" className="cookie-button cookie-button--primary" onClick={() => savePreferences(draft)}>
                Salvar preferências
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

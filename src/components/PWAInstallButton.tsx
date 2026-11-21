import { useState } from 'react';
import { Check, Copy, Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export function PWAInstallButton() {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  if (isInstalled) {
    return null;
  }

  const appUrl =
    typeof window !== 'undefined' ? window.location.origin : '';

  const handleCopyUrl = async () => {
    if (!appUrl) return;
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleClick = () => {
    if (isInstallable) {
      void install();
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="min-h-[42px] px-3.5 py-2 rounded-xl bg-[#1a2234] hover:bg-[#232e45] text-sky-300 border border-sky-500/40 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
      >
        {isInstallable ? (
          <Download className="w-4 h-4 shrink-0" />
        ) : (
          <Smartphone className="w-4 h-4 shrink-0" />
        )}
        <span>{isInstallable ? 'Installer APK / App' : 'App Android'}</span>
      </button>

      {showGuide && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowGuide(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-guide-title"
        >
          <div className="w-full max-w-lg bg-[#121826] border border-[#263147] rounded-2xl p-5 shadow-2xl space-y-4 max-h-[90dvh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="pwa-guide-title" className="text-lg font-bold text-slate-50">
                  {isIOS
                    ? 'Installer sur iPhone / iPad'
                    : 'Installer TIME comme une APK sur Android'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Icône dans le tiroir d’applications, mode plein écran, raccourcis d’icône, notifications et hors ligne.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                aria-label="Fermer"
                className="min-h-[40px] min-w-[40px] rounded-xl bg-[#1a2234] border border-[#263147] text-slate-300 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isIOS ? (
              <ol className="space-y-2.5 text-sm text-slate-200 list-decimal pl-5 leading-relaxed">
                <li>
                  Appuyez sur le bouton <strong className="text-white">Partager</strong> dans Safari.
                </li>
                <li>
                  Faites défiler et choisissez{' '}
                  <strong className="text-white">Sur l’écran d’accueil</strong>.
                </li>
                <li>
                  Validez avec <strong className="text-white">Ajouter</strong>.
                </li>
              </ol>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-sky-300">
                    Option 1 — Installation directe (WebAPK Android, sans PC)
                  </h3>
                  <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5 leading-relaxed">
                    <li>
                      Ouvrez l’application directement dans{' '}
                      <strong className="text-white">Google Chrome sur Android</strong>.
                    </li>
                    <li>
                      {isAndroid
                        ? 'Appuyez sur le menu ⋮ en haut à droite de Chrome.'
                        : 'Dans Chrome Android, appuyez sur le menu ⋮ en haut à droite.'}
                    </li>
                    <li>
                      Appuyez sur <strong className="text-white">Installer l’application</strong> (Chrome génère automatiquement un paquet Android WebAPK installé comme une vraie app).
                    </li>
                  </ol>
                </div>

                <div className="pt-3 border-t border-[#263147] space-y-2">
                  <h3 className="text-sm font-bold text-slate-100">
                    Option 2 — Générer un fichier .apk autonome
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pour obtenir un fichier <span className="font-mono-tabular text-slate-100">.apk</span> à transférer manuellement : copiez l’URL ci-dessous et collez-la sur <strong className="text-white">pwabuilder.com</strong> (Package for Stores → Android → APK), ou compilez avec Capacitor (<span className="font-mono-tabular text-slate-100">capacitor.config.ts</span> déjà prêt dans le projet).
                  </p>

                  {appUrl && (
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        readOnly
                        value={appUrl}
                        aria-label="URL de l’application"
                        className="flex-1 min-h-[40px] px-3 rounded-xl bg-[#090d16] border border-[#263147] text-xs font-mono-tabular text-slate-300 truncate"
                      />
                      <button
                        type="button"
                        onClick={() => void handleCopyUrl()}
                        className="min-h-[40px] px-3 rounded-xl bg-[#1a2234] border border-[#263147] text-xs font-bold text-slate-100 hover:border-sky-400 inline-flex items-center gap-1.5 whitespace-nowrap"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copié</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copier URL</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="w-full min-h-[46px] rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors"
            >
              Compris
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export function PWAInstallButton() {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

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
        <span>{isInstallable ? 'Installer l’app' : 'App Android'}</span>
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
          <div className="w-full max-w-md bg-[#121826] border border-[#263147] rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="pwa-guide-title" className="text-lg font-bold text-slate-50">
                  {isIOS ? 'Installer sur iPhone / iPad' : 'Utiliser en application Android'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mode plein écran sans barre d’adresse + chronos disponibles hors ligne.
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
              <ol className="space-y-2.5 text-sm text-slate-200 list-decimal pl-5 leading-relaxed">
                <li>
                  Ouvrez l’URL de l’application directement dans{' '}
                  <strong className="text-white">Google Chrome sur Android</strong> (hors aperçu intégré).
                </li>
                <li>
                  {isAndroid
                    ? 'Appuyez sur le menu ⋮ en haut à droite de Chrome.'
                    : 'Sur votre téléphone Android, appuyez sur le menu ⋮ en haut à droite de Chrome.'}
                </li>
                <li>
                  Sélectionnez <strong className="text-white">Installer l’application</strong> ou{' '}
                  <strong className="text-white">Ajouter à l’écran d’accueil</strong>.
                </li>
                <li>
                  L’icône <strong className="text-sky-300">TIME</strong> apparaîtra sur votre écran d’accueil Android et les chronos fonctionneront même sans réseau.
                </li>
              </ol>
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

import React, { useEffect, useRef, useState } from 'react';
import { assetUrl } from '../utils/assets';

import { Minus, Play, X } from 'lucide-react';

const VIDEO_SOURCE = assetUrl('/videos/CABIS_video_final_9x16_optimized.mp4');
const VIDEO_POSTER = assetUrl('/images/cabis_dg.webp');

interface CompanyVideoButtonProps {
  pageLoaded: boolean;
  onExpandedChange: (isExpanded: boolean) => void;
}

export const CompanyVideoButton: React.FC<CompanyVideoButtonProps> = ({ pageLoaded, onExpandedChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasInteractedWithButton = useRef(false);

  useEffect(() => {
    onExpandedChange(!isMinimized);
  }, [isMinimized, onExpandedChange]);

  const closeVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }

    setIsOpen(false);
    setIsBuffering(false);
    setPlaybackBlocked(false);
  };

  useEffect(() => {
    if (!pageLoaded) return;

    const timer = window.setTimeout(() => {
      if (!hasInteractedWithButton.current) setIsMinimized(false);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [pageLoaded]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeVideo();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const openVideo = () => {
    setVideoUnavailable(false);
    setPlaybackBlocked(false);
    setIsBuffering(true);
    setIsOpen(true);

    const video = videoRef.current;
    if (!video) {
      setPlaybackBlocked(true);
      setIsBuffering(false);
      return;
    }

    video.preload = 'auto';
    video.src = VIDEO_SOURCE;
    video.load();
    void video.play().then(() => {
      setPlaybackBlocked(false);
    }).catch(() => {
      setPlaybackBlocked(true);
      setIsBuffering(false);
    });
  };

  return (
    <>
      {!isMinimized ? (
        <div className="fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7">
          <button
            type="button"
            onClick={() => {
              hasInteractedWithButton.current = true;
              openVideo();
            }}
            aria-label="Lire la vidéo de présentation du Cabinet CABIS"
            className="video-button-expand group relative flex h-[88px] w-44 items-stretch overflow-hidden border border-[#1F252B] bg-[#1F252B] text-left text-white transition-colors duration-200 hover:border-[#D94800] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94800] sm:h-24 sm:w-48"
          >
            <span aria-hidden="true" className="relative h-full w-[62px] shrink-0 overflow-hidden sm:w-[68px]">
              <img
                src={VIDEO_POSTER}
                alt=""
                className="h-full w-full object-cover object-[center_30%] transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-y-0 right-0 w-1 bg-[#D94800]" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col justify-center px-2.5 sm:px-3">
              <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#FF8A4D] sm:text-[9px]">
                Film · CABIS
              </span>
              <span className="mt-1 block font-display text-sm font-bold uppercase leading-tight sm:text-base">Le cabinet en images</span>
              <span className="mt-1.5 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-white/65 sm:text-[10px]">
                <Play aria-hidden="true" className="h-3 w-3 fill-current text-[#FF8A4D]" />
                Voir le film
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              hasInteractedWithButton.current = true;
              setIsMinimized(true);
            }}
            aria-label="Réduire le bouton vidéo"
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center border border-[#1F252B] bg-[#D94800] text-white transition-colors hover:bg-[#B83D00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Minus aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            hasInteractedWithButton.current = true;
            setIsMinimized(false);
          }}
          aria-label="Afficher le bouton vidéo de présentation"
          className="video-button-compact-enter group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center border border-[#1F252B] border-t-2 border-t-[#D94800] bg-[#1F252B] text-white transition-colors hover:bg-[#D94800] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D94800] sm:bottom-7 sm:right-7 sm:h-14 sm:w-14"
        >
          <Play aria-hidden="true" className="ml-0.5 h-5 w-5 fill-current sm:h-6 sm:w-6" />
        </button>
      )}

      <div
        className="company-video-player fixed right-3 top-24 z-[60] sm:right-[clamp(16px,3vw,44px)]"
        hidden={!isOpen}
      >
          <section
            role="dialog"
            aria-labelledby="company-video-title"
            className="relative h-full w-full overflow-hidden border border-white/10 bg-[#1F252B] text-white shadow-[0_16px_40px_-16px_rgba(0,0,0,0.65)]"
          >
            <button
              type="button"
              onClick={closeVideo}
              aria-label="Fermer la vidéo"
              className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center border border-white/40 bg-[#1F252B] text-white transition-colors hover:border-[#D94800] hover:bg-[#D94800] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A4D]"
            >
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
            <h2 id="company-video-title" className="sr-only">Vidéo de présentation du Cabinet CABIS</h2>
            <div className="relative h-full w-full overflow-hidden bg-black">
              <video
                ref={videoRef}
                className="h-full w-full bg-black object-contain"
                controls
                playsInline
                preload="none"
                poster={VIDEO_POSTER}
                onCanPlay={() => setIsBuffering(false)}
                onPlaying={() => {
                  setIsBuffering(false);
                  setPlaybackBlocked(false);
                }}
                onWaiting={() => setIsBuffering(true)}
                onError={() => {
                  setIsBuffering(false);
                  setVideoUnavailable(true);
                }}
              >
                Votre navigateur ne prend pas en charge la lecture vidéo.
              </video>
              {videoUnavailable && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1F252B] px-5 text-center">
                  <p className="font-semibold">La vidéo de présentation n’est pas disponible.</p>
                  <p className="mt-2 text-sm text-white/75">
                    Vérifiez la présence de <code className="text-[#FF8A4D]">CABIS_video_final_9x16_optimized.mp4</code> dans <code className="text-[#FF8A4D]">public/videos/</code>.
                  </p>
                </div>
              )}
              {isBuffering && !videoUnavailable && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/35 text-sm font-semibold text-white" role="status">
                  <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-[#FF8A4D]" />
                  Chargement de la vidéo…
                </div>
              )}
              {playbackBlocked && !isBuffering && (
                <p className="absolute inset-x-0 bottom-0 bg-black/70 px-4 py-2 text-center text-sm text-white" role="status">
                  La lecture automatique a été bloquée. Lancez-la avec le bouton du lecteur.
                </p>
              )}
            </div>
          </section>
      </div>
    </>
  );
};

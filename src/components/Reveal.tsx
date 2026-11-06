import React from 'react';
import { useInView } from '../hooks/useInView';

type Variant = 'up' | 'left' | 'right' | 'scale' | 'fade' | 'mask';

interface RevealProps {
  children: React.ReactNode;
  /** Délai en ms (permet les cascades) */
  delay?: number;
  variant?: Variant;
  className?: string;
}

const VARIANT_CLASS: Record<Variant, string> = {
  up: '',
  left: 'rv-left',
  right: 'rv-right',
  scale: 'rv-scale',
  fade: 'rv-fade',
  mask: 'rv-mask',
};

/** Fait apparaître son contenu en douceur quand il entre dans l'écran. */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, variant = 'up', className = '' }) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  // Le masque (clip-path) est appliqué à un enfant : l'élément observé garde sa taille réelle
  if (variant === 'mask') {
    return (
      <div ref={ref} className={className}>
        <div className={`rv-mask ${inView ? 'is-in' : ''}`} style={{ ['--rv-d' as string]: `${delay}ms` }}>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div
      ref={ref}
      className={`rv ${VARIANT_CLASS[variant]} ${inView ? 'is-in' : ''} ${className}`}
      style={{ ['--rv-d' as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

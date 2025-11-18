import React from 'react';
import styles from './ComCardLogo.module.css';

export const ComCardLogo = ({ 
  variant = 'primary', 
  size = 64,
  showText = true
}) => {
  const getColors = () => {
    switch (variant) {
      case 'gradient':
        return {
          card1: 'url(#cardGradient1)',
          card2: 'url(#cardGradient2)',
          card3: 'url(#cardGradient3)',
          accent: '#f59e0b',
          text: '#1f2937'
        };
      case 'minimal':
        return {
          card1: '#065f46',
          card2: '#047857',
          card3: '#059669',
          accent: '#fbbf24',
          text: '#1f2937'
        };
      case 'dark':
        return {
          card1: '#f9fafb',
          card2: '#e5e7eb',
          card3: '#d1d5db',
          accent: '#fbbf24',
          text: '#f9fafb'
        };
      default: // primary
        return {
          card1: '#059669',
          card2: '#10b981',
          card3: '#34d399',
          accent: '#fbbf24',
          text: '#1f2937'
        };
    }
  };

  const colors = getColors();

  return (
    <div className={styles.container} style={{ '--logo-size': `${size}px` }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cardGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="cardGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="cardGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          
          {/* Shadow filter */}
          <filter id="cardShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
            <feOffset dx="0" dy="1" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Cartão 3 (fundo) */}
        <g opacity="0.4">
          <rect
            x="16"
            y="28"
            width="40"
            height="26"
            rx="3"
            fill={colors.card3}
          />
        </g>
        
        {/* Cartão 2 (meio) */}
        <g opacity="0.6" filter="url(#cardShadow)">
          <rect
            x="14"
            y="24"
            width="40"
            height="26"
            rx="3"
            fill={colors.card2}
          />
          {/* Chip */}
          <rect
            x="19"
            y="30"
            width="7"
            height="6"
            rx="1"
            fill={colors.accent}
            opacity="0.7"
          />
        </g>
        
        {/* Cartão 1 (frente) - Principal */}
        <g filter="url(#cardShadow)">
          <rect
            x="12"
            y="20"
            width="40"
            height="26"
            rx="3"
            fill={colors.card1}
          />
          
          {/* Banda magnética */}
          <rect
            x="12"
            y="25"
            width="40"
            height="4"
            fill="black"
            opacity="0.3"
          />
          
          {/* Chip EMV */}
          <rect
            x="17"
            y="31"
            width="8"
            height="7"
            rx="1.5"
            fill={colors.accent}
          />
          
          {/* Detalhes do chip */}
          <rect
            x="18.5"
            y="32.5"
            width="5"
            height="4"
            rx="0.5"
            fill="white"
            opacity="0.3"
          />
          
          {/* Linhas do número do cartão */}
          <g opacity="0.6">
            <rect x="29" y="33" width="4" height="1.5" rx="0.5" fill="white"/>
            <rect x="34" y="33" width="4" height="1.5" rx="0.5" fill="white"/>
            <rect x="39" y="33" width="4" height="1.5" rx="0.5" fill="white"/>
            <rect x="44" y="33" width="4" height="1.5" rx="0.5" fill="white"/>
          </g>
          
          {/* Nome do titular (linha) */}
          <rect x="17" y="40" width="20" height="1.2" rx="0.5" fill="white" opacity="0.5"/>
          
          {/* Logo bandeira (círculos) */}
          <circle cx="45" cy="40" r="2.5" fill={colors.accent} opacity="0.8"/>
          <circle cx="48" cy="40" r="2.5" fill="white" opacity="0.6"/>
        </g>
      </svg>
      
      {showText && (
        <div className={styles.textContainer}>
          <div className={styles.brandRow}>
            <span className={`${styles.brandText} ${styles.brandPrimary} ${variant === 'dark' ? styles.brandPrimaryDark : ''}`}>
              com
            </span>
            <span className={`${styles.brandText} ${styles.brandAccent} ${variant === 'dark' ? styles.brandAccentDark : ''}`}>
              Card
            </span>
          </div>
          <span className={`${styles.tagline} ${variant === 'dark' ? styles.taglineDark : ''}`}>
            Gestão Inteligente
          </span>
        </div>
      )}
    </div>
  );
};


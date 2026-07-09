/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // ─── Typography ──────────────────────────────────────────────────────────
      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },

      // ─── Color Palette ────────────────────────────────────────────────────────
      colors: {
        // ── Slate-based surfaces (light theme) ──
        navy: {
          950: '#020712',
          900: '#040d1e',
          850: '#071328',
          800: '#0a1a35',
          700: '#0d2347',
          600: '#112e5c',
        },
        // ── Blue Accent (primary interactive) ──
        accent: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // ── Primary (alias for accent) ──
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // ── Status colors ──
        status: {
          online:  '#22c55e',
          offline: '#94a3b8',
          warning: '#f59e0b',
        },
        // ── Legacy glass tokens (kept for AccountModal compat) ──
        glass: {
          white:  'rgba(255, 255, 255, 0.08)',
          blue:   'rgba(96, 165, 250, 0.08)',
          border: 'rgba(255, 255, 255, 0.12)',
          hover:  'rgba(255, 255, 255, 0.14)',
        },
      },

      // ─── Background Images & Gradients ────────────────────────────────────────
      backgroundImage: {
        // ── Blue gradient (primary accent) ──
        'blue-gradient':       'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)',
        'blue-gradient-hover': 'linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #2563eb 100%)',
        'blue-gradient-soft':  'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
        // ── WhatsApp / Social ──
        'wa-gradient':         'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
        'ig-gradient':         'linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)',
        // ── Hero decorative ──
        'hero-mesh':           'radial-gradient(at 40% 20%, #dbeafe 0%, transparent 50%), radial-gradient(at 80% 80%, #eff6ff 0%, transparent 50%)',
        // ── Legacy (retained for AccountModal) ──
        'accent-gradient':     'linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%)',
        'glass-gradient':      'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)',
      },

      // ─── Border Radius ────────────────────────────────────────────────────────
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ─── Box Shadow ───────────────────────────────────────────────────────────
      boxShadow: {
        // ── Clean solid card shadows ──
        'card':            '0 8px 30px rgba(0,0,0,0.04)',
        'card-hover':      '0 16px 48px rgba(0,0,0,0.10)',
        'card-sm':         '0 2px 12px rgba(0,0,0,0.04)',
        'card-lg':         '0 24px 60px rgba(0,0,0,0.08)',
        // ── Nav ──
        'nav':             '0 1px 0 #f1f5f9',
        'nav-bottom':      '0 -1px 0 #f1f5f9',
        // ── Blue accent glow ──
        'blue-glow':       '0 4px 14px rgba(37, 99, 235, 0.30)',
        'blue-glow-hover': '0 8px 24px rgba(37, 99, 235, 0.45)',
        // ── Legacy (retained for AccountModal) ──
        'glass':           '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glass-hover':     '0 16px 48px rgba(0, 0, 0, 0.5)',
        'accent':          '0 0 20px rgba(56, 189, 248, 0.35)',
        'accent-hover':    '0 0 30px rgba(56, 189, 248, 0.55)',
      },

      // ─── Backdrop Blur (kept for legacy modal) ─────────────────────────────────
      backdropBlur: {
        xs:   '2px',
        '2xl': '40px',
        '3xl': '60px',
      },

      // ─── Animations ───────────────────────────────────────────────────────────
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float-up': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-18px) rotate(3deg)' },
        },
        'float-down': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(14px) rotate(-2deg)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 4px 14px rgba(37,99,235,0.30)' },
          '50%':      { boxShadow: '0 8px 28px rgba(37,99,235,0.55)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        shimmer:          'shimmer 2s linear infinite',
        'float-up':       'float-up 4s ease-in-out infinite',
        'float-down':     'float-down 5s ease-in-out infinite',
        'spin-slow':      'spin-slow 12s linear infinite',
        'fade-in':        'fade-in 0.4s ease-out forwards',
        'pulse-glow':     'pulse-glow 2s ease-in-out infinite',
        'bounce-soft':    'bounce-soft 2s ease-in-out infinite',
        'slide-up':       'slide-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'scale-in':       'scale-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'blur-in':        'blur-in 0.5s ease-out forwards',
      },

      // ─── Spacing ──────────────────────────────────────────────────────────────
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'nav-height':  '4rem',
        'tab-height':  '4.5rem',
      },

      // ─── Transition Timing ────────────────────────────────────────────────────
      transitionTimingFunction: {
        'bounce-smooth': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ios':           'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      // ─── Z-Index Scale ────────────────────────────────────────────────────────
      zIndex: {
        'nav':        '50',
        'bottom-nav': '50',
        'drawer':     '60',
        'modal':      '70',
        'sheet':      '80',
        'overlay':    '90',
        'toast':      '100',
      },
    },
  },
  plugins: [
    // ─── Solid White Card Component ────────────────────────────────────────────
    function({ addComponents, addUtilities }) {
      addComponents({
        // Solid white card — replaces glass-card
        '.solid-card': {
          backgroundColor: '#ffffff',
          borderRadius:    '1.25rem',
          border:          '1px solid #f1f5f9',
          boxShadow:       '0 8px 30px rgba(0,0,0,0.04)',
          transition:      'box-shadow 0.25s ease, transform 0.25s ease',
        },

        // Preserved glass-card — used by AccountModal (dark sheet)
        '.glass-card': {
          backgroundColor:  'rgba(255, 255, 255, 0.06)',
          backdropFilter:   'blur(16px)',
          '-webkit-backdrop-filter': 'blur(16px)',
          border:           '1px solid rgba(255, 255, 255, 0.10)',
          borderRadius:     '1.5rem',
          boxShadow:        '0 4px 24px rgba(0, 0, 0, 0.3)',
          transition:       'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        },

        // Preserved glass-surface
        '.glass-surface': {
          backgroundColor:  'rgba(255, 255, 255, 0.08)',
          backdropFilter:   'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          border:           '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow:        '0 8px 32px rgba(0, 0, 0, 0.4)',
        },

        // Preserved glass-nav (for AccountModal overlay)
        '.glass-nav': {
          backgroundColor:  'rgba(4, 13, 30, 0.85)',
          backdropFilter:   'blur(24px)',
          '-webkit-backdrop-filter': 'blur(24px)',
          borderBottom:     '1px solid rgba(255, 255, 255, 0.08)',
        },

        // Primary blue button
        '.btn-accent': {
          background:     'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)',
          color:          '#ffffff',
          fontWeight:     '700',
          borderRadius:   '0.875rem',
          padding:        '0.75rem 1.5rem',
          fontSize:       '0.9375rem',
          letterSpacing:  '-0.01em',
          boxShadow:      '0 4px 14px rgba(37, 99, 235, 0.35)',
          transition:     'all 0.2s ease',
          '&:hover': {
            boxShadow:    '0 8px 24px rgba(37, 99, 235, 0.50)',
            transform:    'translateY(-1px)',
          },
          '&:active': {
            transform:    'scale(0.96)',
          },
        },

        // Outline/ghost button
        '.btn-ghost': {
          backgroundColor: '#ffffff',
          color:           '#1d4ed8',
          fontWeight:      '600',
          borderRadius:    '0.875rem',
          border:          '1.5px solid #bfdbfe',
          padding:         '0.75rem 1.5rem',
          fontSize:        '0.9375rem',
          transition:      'all 0.2s ease',
          '&:hover': {
            borderColor:     '#3b82f6',
            backgroundColor: '#eff6ff',
            transform:       'translateY(-1px)',
          },
          '&:active': {
            transform:    'scale(0.96)',
          },
        },

        // Skeleton (light mode)
        '.skeleton': {
          background:     'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
          backgroundSize: '200% 100%',
          animation:      'shimmer 2s linear infinite',
          borderRadius:   '0.75rem',
        },
      });

      addUtilities({
        // Text gradient — blue
        '.text-gradient-accent': {
          background:              'linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #3b82f6 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          backgroundClip:          'text',
        },
        // Legacy white gradient (retained)
        '.text-gradient-white': {
          background:              'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          backgroundClip:          'text',
        },
        '.scrollbar-hide': {
          '-ms-overflow-style':  'none',
          'scrollbar-width':     'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
        '.touch-target': {
          minHeight:       '44px',
          minWidth:        '44px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
        },
        '.pb-safe': { paddingBottom: 'env(safe-area-inset-bottom)' },
        '.pt-safe': { paddingTop:    'env(safe-area-inset-top)' },
      });
    },
    require('@tailwindcss/typography'),
  ],
};

// Modern Ultra-Stylish Theme Configuration
// CursurPro TempMail - Next-Gen Design System

export const theme = {
  // Color Palette - Fresh Teal/Emerald/Cyan Gradient
  colors: {
    // Primary Gradient Colors (Teal/Cyan)
    primary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6', // Main primary (Teal)
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    },
    // Secondary Gradient Colors (Emerald/Green)
    secondary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981', // Main secondary (Emerald)
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
    // Accent Colors (Sky Blue/Cyan)
    accent: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Main accent (Sky)
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    // Neutral Colors
    neutral: {
      50: '#fafbfc',
      100: '#f0f4f8',
      200: '#e8edf3',
      300: '#e2e8f0',
      400: '#cbd5e1',
      500: '#94a3b8',
      600: '#64748b',
      700: '#475569',
      800: '#334155',
      900: '#1e293b',
      950: '#0f172a',
    },
    // Semantic Colors
    success: {
      50: '#f0fdf4',
      500: '#10b981',
      600: '#059669',
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706',
      700: '#ea580c',
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
    },
    // Text Colors
    text: {
      primary: '#0f172a',
      secondary: '#1e293b',
      tertiary: '#475569',
      muted: '#64748b',
      light: '#94a3b8',
    },
    // Background Colors
    background: {
      primary: '#fafbfc',
      secondary: '#f0f4f8',
      tertiary: '#e8edf3',
      card: 'rgba(255, 255, 255, 0.98)',
      overlay: 'rgba(0, 0, 0, 0.6)',
      // Themed Card Backgrounds
      ocean: 'rgba(240, 253, 250, 0.98)', // Light cyan/teal
      mint: 'rgba(236, 253, 245, 0.98)', // Light mint green
      sky: 'rgba(240, 249, 255, 0.98)', // Light sky blue
      sand: 'rgba(254, 252, 246, 0.98)', // Light sand/desert
      lavender: 'rgba(250, 245, 255, 0.98)', // Light lavender
      rose: 'rgba(255, 247, 250, 0.98)', // Light rose
    },
  },

  // Gradients - Modern Teal/Emerald/Cyan Combinations
  gradients: {
    primary: 'linear-gradient(135deg, #14b8a6 0%, #10b981 50%, #0ea5e9 100%)',
    primaryText: 'linear-gradient(135deg, #14b8a6 0%, #10b981 50%, #0ea5e9 100%)',
    secondary: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    background: 'linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 50%, #f0f9ff 100%)',
    card: 'linear-gradient(135deg, rgba(20, 184, 166, 0.08) 0%, rgba(16, 185, 129, 0.06) 100%)',
    cardHover: 'linear-gradient(135deg, rgba(20, 184, 166, 0.12) 0%, rgba(16, 185, 129, 0.1) 100%)',
    icon: 'linear-gradient(135deg, rgba(20, 184, 166, 0.12) 0%, rgba(16, 185, 129, 0.1) 100%)',
  },

  // Typography
  typography: {
    fontFamily: {
      primary: 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      mono: 'monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.5rem',
      '5xl': '3.5rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
    },
    letterSpacing: {
      tighter: '-0.03em',
      tight: '-0.02em',
      normal: '-0.01em',
      wide: '0.1em',
    },
  },

  // Spacing
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '28px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '48px',
    '6xl': '64px',
    '7xl': '80px',
  },

  // Border Radius
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '14px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '28px',
    '5xl': '32px',
    '6xl': '36px',
    full: '50px',
  },

  // Shadows
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.06)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.08)',
    xl: '0 12px 32px rgba(0, 0, 0, 0.1)',
    '2xl': '0 16px 40px rgba(0, 0, 0, 0.12)',
    '3xl': '0 20px 60px rgba(0, 0, 0, 0.15)',
    '4xl': '0 32px 96px rgba(0, 0, 0, 0.08)',
    primary: '0 12px 36px rgba(20, 184, 166, 0.4)',
    primaryHover: '0 16px 48px rgba(20, 184, 166, 0.5)',
    card: `
      0 32px 96px rgba(0, 0, 0, 0.08),
      0 8px 24px rgba(0, 0, 0, 0.04),
      0 0 0 1px rgba(255, 255, 255, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.8),
      inset 0 -1px 0 rgba(0, 0, 0, 0.02)
    `,
    cardHover: '0 12px 32px rgba(20, 184, 166, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    gradient: `
      0 32px 72px rgba(20, 184, 166, 0.35),
      0 8px 24px rgba(16, 185, 129, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
    `,
    warning: `
      0 16px 40px rgba(245, 158, 11, 0.3),
      0 4px 12px rgba(234, 88, 12, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
    `,
  },

  // Backdrop Filters
  backdrop: {
    blur: 'blur(32px) saturate(180%)',
    blurSm: 'blur(20px)',
  },

  // Transitions
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Component Styles
  components: {
    // Button Styles
    button: {
      primary: {
        padding: '18px 40px',
        fontSize: '1.125rem',
        fontWeight: 600,
        color: 'white',
        background: 'linear-gradient(135deg, #14b8a6 0%, #10b981 50%, #0ea5e9 100%)',
        borderRadius: '16px',
        boxShadow: '0 12px 36px rgba(20, 184, 166, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: 'none',
      },
      secondary: {
        padding: '14px 28px',
        fontSize: '0.875rem',
        fontWeight: 600,
        color: '#14b8a6',
        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(16, 185, 129, 0.08) 100%)',
        border: '2px solid rgba(20, 184, 166, 0.2)',
        borderRadius: '14px',
        boxShadow: '0 2px 8px rgba(20, 184, 166, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      white: {
        padding: '16px 32px',
        background: 'rgba(255, 255, 255, 0.98)',
        color: '#14b8a6',
        borderRadius: '14px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: 'none',
      },
    },
    // Card Styles
    card: {
      default: {
        background: 'rgba(240, 253, 250, 0.98)', // Ocean theme
        backdropFilter: 'blur(32px) saturate(180%)',
        borderRadius: '36px',
        padding: '52px',
        boxShadow: `
          0 32px 96px rgba(0, 0, 0, 0.08),
          0 8px 24px rgba(0, 0, 0, 0.04),
          0 0 0 1px rgba(20, 184, 166, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.8),
          inset 0 -1px 0 rgba(0, 0, 0, 0.02)
        `,
        border: '1px solid rgba(20, 184, 166, 0.15)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      gradient: {
        background: 'linear-gradient(135deg, #14b8a6 0%, #10b981 50%, #0ea5e9 100%)',
        borderRadius: '32px',
        padding: '44px',
        boxShadow: `
          0 32px 72px rgba(20, 184, 166, 0.35),
          0 8px 24px rgba(16, 185, 129, 0.25),
          0 0 0 1px rgba(255, 255, 255, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.3),
          inset 0 -1px 0 rgba(0, 0, 0, 0.1)
        `,
      },
      stat: {
        padding: '36px 28px',
        background: 'rgba(240, 249, 255, 0.98)', // Sky theme
        borderRadius: '24px',
        boxShadow: `
          0 8px 24px rgba(0, 0, 0, 0.06),
          0 2px 8px rgba(0, 0, 0, 0.04),
          inset 0 1px 0 rgba(255, 255, 255, 0.8)
        `,
        border: '1px solid rgba(14, 165, 233, 0.12)',
      },
      feature: {
        padding: '44px 36px',
        background: 'rgba(236, 253, 245, 0.98)', // Mint theme
        backdropFilter: 'blur(32px) saturate(180%)',
        borderRadius: '28px',
        boxShadow: `
          0 12px 32px rgba(0, 0, 0, 0.06),
          0 4px 12px rgba(0, 0, 0, 0.04),
          inset 0 1px 0 rgba(255, 255, 255, 0.8)
        `,
        border: '1px solid rgba(16, 185, 129, 0.12)',
      },
    },
    // Icon Container Styles
    icon: {
      small: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(16, 185, 129, 0.12) 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      },
      medium: {
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #14b8a6 0%, #10b981 50%, #0ea5e9 100%)',
        boxShadow: '0 4px 12px rgba(20, 184, 166, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      },
      large: {
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #14b8a6 0%, #10b981 50%, #0ea5e9 100%)',
        boxShadow: '0 8px 24px rgba(20, 184, 166, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      },
      xlarge: {
        width: '68px',
        height: '68px',
        borderRadius: '18px',
        background: 'linear-gradient(135deg, #14b8a6 0%, #10b981 50%, #0ea5e9 100%)',
        boxShadow: '0 10px 28px rgba(20, 184, 166, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      },
    },
  },

  // Background Patterns
  patterns: {
    background: `
      radial-gradient(circle at 20% 30%, rgba(20, 184, 166, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.06) 0%, transparent 70%),
      linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.3) 100%)
    `,
  },
};

// Helper function to get theme value
export const getThemeValue = (path: string) => {
  const keys = path.split('.');
  let value: any = theme;
  for (const key of keys) {
    value = value[key];
    if (value === undefined) return undefined;
  }
  return value;
};

// Type exports for TypeScript
export type Theme = typeof theme;


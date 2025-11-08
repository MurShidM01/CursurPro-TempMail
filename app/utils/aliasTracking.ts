// Utility functions to track which aliases have been shown to the user

const SHOWN_ALIASES_KEY = 'shownAliases';

export interface ShownAlias {
  email: string;
  shownAt: number;
}

/**
 * Get all aliases that have been shown to the user
 */
export const getShownAliases = (): string[] => {
  try {
    if (typeof localStorage === 'undefined') return [];
    
    const stored = localStorage.getItem(SHOWN_ALIASES_KEY);
    if (!stored) return [];
    
    const shownAliases: ShownAlias[] = JSON.parse(stored);
    // Return just the email addresses
    return shownAliases.map(item => item.email);
  } catch (e) {
    console.error('Error getting shown aliases:', e);
    return [];
  }
};

/**
 * Mark an alias as shown to the user
 */
export const markAliasAsShown = (email: string) => {
  try {
    if (typeof localStorage === 'undefined') return;
    
    const stored = localStorage.getItem(SHOWN_ALIASES_KEY);
    const shownAliases: ShownAlias[] = stored ? JSON.parse(stored) : [];
    
    // Check if already marked
    if (shownAliases.some(item => item.email === email)) {
      return;
    }
    
    // Add new alias
    shownAliases.push({
      email,
      shownAt: Date.now()
    });
    
    // Keep only last 100 aliases to prevent localStorage from getting too large
    const trimmed = shownAliases.slice(-100);
    
    localStorage.setItem(SHOWN_ALIASES_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Error marking alias as shown:', e);
  }
};

/**
 * Check if an alias has been shown to the user
 */
export const hasAliasBeenShown = (email: string): boolean => {
  const shownAliases = getShownAliases();
  return shownAliases.includes(email);
};

/**
 * Clear all shown aliases (useful for testing or reset)
 */
export const clearShownAliases = () => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(SHOWN_ALIASES_KEY);
    }
  } catch (e) {
    console.error('Error clearing shown aliases:', e);
  }
};


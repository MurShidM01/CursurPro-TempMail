import axios from 'axios';

/**
 * Get a random existing alias from the domain that hasn't been shown to the user
 * @param domain - The domain to get aliases from
 * @param excludeEmails - Array of email addresses to exclude (already shown to user)
 * @returns A random alias email or null if none available
 */
export async function getRandomExistingAlias(
  domain: string, 
  excludeEmails: string[] = []
): Promise<string | null> {
  const apiKey = process.env.IMPROVMX_API_KEY;
  if (!apiKey) {
    throw new Error('IMPROVMX_API_KEY not configured');
  }

  const authHeader = {
    'Authorization': `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
  };

  try {
    // Get all domains and their aliases
    const domainsResponse = await axios.get('https://api.improvmx.com/v3/domains', {
      headers: authHeader,
    });

    const domainData = domainsResponse.data.domains?.find((d: any) => d.domain === domain);
    
    if (!domainData || !domainData.aliases || domainData.aliases.length === 0) {
      return null;
    }

    // Filter out excluded emails (already shown to user)
    const availableAliases = domainData.aliases.filter((alias: any) => {
      const email = `${alias.alias}@${domain}`;
      return !excludeEmails.includes(email);
    });

    if (availableAliases.length === 0) {
      return null;
    }

    // Get a random alias from available ones
    const randomIndex = Math.floor(Math.random() * availableAliases.length);
    const randomAlias = availableAliases[randomIndex];
    
    return `${randomAlias.alias}@${domain}`;
  } catch (error: any) {
    console.error('Error getting random existing alias:', error);
    throw new Error(`Failed to get random existing alias: ${error.message}`);
  }
}


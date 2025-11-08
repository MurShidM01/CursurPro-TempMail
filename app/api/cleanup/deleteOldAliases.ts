import axios from 'axios';

// Cleanup old aliases that are older than specified age
export async function deleteOldAliases(domain: string, maxAge: number = 24 * 60 * 60 * 1000) {
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
      return { deleted: 0, message: 'No aliases found' };
    }

    const now = Date.now();
    let deletedCount = 0;
    const errors: string[] = [];

    // Sort aliases by creation date (oldest first) if available
    const aliasesWithDates = domainData.aliases.map((alias: any) => ({
      ...alias,
      createdTime: alias.created_at ? new Date(alias.created_at).getTime() : 0
    })).sort((a: any, b: any) => a.createdTime - b.createdTime);

    // Delete aliases older than maxAge, or if no date info, delete oldest ones
    for (const alias of aliasesWithDates) {
      try {
        const aliasAge = alias.createdTime > 0 
          ? now - alias.createdTime
          : null;

        // Delete if:
        // 1. Has age info and is older than maxAge, OR
        // 2. No age info but we have more than 20 aliases (delete oldest 50%), OR
        // 3. maxAge is 0 (aggressive cleanup - delete oldest ones)
        const shouldDelete = maxAge === 0
          ? deletedCount < Math.floor(aliasesWithDates.length * 0.5) // Delete up to 50% for aggressive cleanup
          : aliasAge !== null 
            ? aliasAge > maxAge
            : aliasesWithDates.length > 20 && deletedCount < Math.floor(aliasesWithDates.length * 0.5);

        if (shouldDelete && alias.id) {
          try {
            await axios.delete(
              `https://api.improvmx.com/v3/domains/${domain}/aliases/${alias.id}`,
              { headers: authHeader }
            );
            deletedCount++;
            
            // Stop if we've deleted enough to make room
            if (deletedCount >= 5) {
              break;
            }
          } catch (deleteError: any) {
            errors.push(`Failed to delete alias ${alias.alias}: ${deleteError.message}`);
          }
        }
      } catch (error: any) {
        errors.push(`Error processing alias ${alias.alias}: ${error.message}`);
      }
    }

    return {
      deleted: deletedCount,
      total: domainData.aliases.length,
      errors: errors.length > 0 ? errors : undefined
    };
  } catch (error: any) {
    throw new Error(`Failed to cleanup aliases: ${error.message}`);
  }
}


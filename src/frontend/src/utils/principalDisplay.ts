import { Principal } from '@dfinity/principal';

/**
 * Generate a deterministic, human-friendly fallback label from a Principal
 * when no user profile name is available.
 * 
 * @param principal - The Principal to generate a display name for
 * @returns A shortened, stable identifier like "User-abc123"
 */
export function getPrincipalDisplayName(principal: Principal): string {
  const principalStr = principal.toString();
  
  // Take first 6 characters after any hyphens for a stable short identifier
  const shortId = principalStr.replace(/-/g, '').slice(0, 6);
  
  return `User-${shortId}`;
}

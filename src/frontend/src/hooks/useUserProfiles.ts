import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Principal } from '@dfinity/principal';
import { UserProfile } from '../backend';

export function useGetUserProfiles(principals: Principal[]) {
  const { actor, isFetching } = useActor();

  return useQuery<Record<string, UserProfile | null>>({
    queryKey: ['userProfiles', principals.map((p) => p.toString())],
    queryFn: async () => {
      if (!actor) return {};

      const uniquePrincipals = Array.from(
        new Set(principals.map((p) => p.toString()))
      ).map((s) => Principal.fromText(s));

      const profiles = await Promise.all(
        uniquePrincipals.map(async (principal) => {
          try {
            const profile = await actor.getUserProfile(principal);
            return { principal: principal.toString(), profile };
          } catch (error) {
            // Silently handle missing profiles - this is expected for users who haven't set up their profile yet
            return { principal: principal.toString(), profile: null };
          }
        })
      );

      return profiles.reduce(
        (acc, { principal, profile }) => {
          acc[principal] = profile;
          return acc;
        },
        {} as Record<string, UserProfile | null>
      );
    },
    enabled: !!actor && !isFetching && principals.length > 0,
  });
}

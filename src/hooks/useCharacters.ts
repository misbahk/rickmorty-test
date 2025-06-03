import { useQuery } from '@tanstack/react-query';
import { getCharacters, CharactersResponse } from '@/api/characters';

export function useCharacters(page: number) {
  return useQuery<CharactersResponse>({
    queryKey: ['characters', page],
    queryFn: () => getCharacters(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

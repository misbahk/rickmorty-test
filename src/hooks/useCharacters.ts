import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '../api/characters';
import { CharactersResponse } from '../types/character';

export function useCharacters(page: number) {
  return useQuery<CharactersResponse>({
    queryKey: ['characters', page],
    queryFn: () => getCharacters(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

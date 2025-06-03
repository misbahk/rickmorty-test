import { useQuery } from '@tanstack/react-query';
import { fetchCharacters, fetchCharacterById } from '../api/rickAndMortyApi';
import { CharactersResponse } from '../types/api';
import { getCharacters } from '../api/characters';

export function useCharacters(page: number) {
  return useQuery<CharactersResponse>({
    queryKey: ['characters', page],
    queryFn: () => getCharacters(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
    enabled: !!id,
  });
};

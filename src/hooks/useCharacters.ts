import { useQuery } from '@tanstack/react-query';
import { fetchCharacters, fetchCharacterById } from '../api/rickAndMortyApi';
import { CharactersResponse } from '../types/api';

export const useCharacters = (page: number) => {
  return useQuery<CharactersResponse>({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
    // Remove keepPreviousData as it's not supported in this version
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCharacter = (id: number) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
    enabled: !!id,
  });
};

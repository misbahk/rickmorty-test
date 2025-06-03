import { useQuery } from '@tanstack/react-query';
import { getCharacter } from '../api/characters';

export function useCharacter(id: number) {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id),
    enabled: !!id,
  });
} 
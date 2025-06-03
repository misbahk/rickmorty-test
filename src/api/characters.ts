import { Character, CharactersResponse } from '../types/character';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters(page: number = 1): Promise<CharactersResponse> {
  const response = await fetch(`${API_BASE_URL}/character?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
}

export async function getCharacter(id: number): Promise<Character> {
  const response = await fetch(`${API_BASE_URL}/character/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch character');
  }
  return response.json();
} 
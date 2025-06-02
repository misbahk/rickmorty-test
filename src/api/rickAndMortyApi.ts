import { CharactersResponse } from '../types/api';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (page: number = 1): Promise<CharactersResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/character?page=${page}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const fetchCharacterById = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/character/${id}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching character with ID ${id}:`, error);
    throw error;
  }
};

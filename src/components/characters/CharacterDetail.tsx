import React from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { useCharacter } from '../../hooks/useCharacters';

const CharacterDetail = () => {
  const { id } = useParams({ from: '/character/$id' });
  const characterId = parseInt(id, 10);
  
  const { data: character, isLoading, isError, error } = useCharacter(characterId);

  // Get the saved page from localStorage
  const savedPage = localStorage.getItem('rickAndMortyPage') || '1';

  if (isLoading) return <div>Loading character details...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;
  if (!character) return <div>Character not found</div>;

  return (
    <div className="character-detail">
      <Link to="/" search={{ page: Number(savedPage) }}>Back to Characters</Link>
      
      <div className="character-card">
        <img src={character.image} alt={character.name} />
        
        <div className="character-info">
          <h2>{character.name}</h2>
          
          <div className="info-row">
            <span className="label">Status:</span>
            <span className="value">{character.status}</span>
          </div>
          
          <div className="info-row">
            <span className="label">Species:</span>
            <span className="value">{character.species}</span>
          </div>
          
          <div className="info-row">
            <span className="label">Gender:</span>
            <span className="value">{character.gender}</span>
          </div>
          
          <div className="info-row">
            <span className="label">Origin:</span>
            <span className="value">{character.origin.name}</span>
          </div>
          
          <div className="info-row">
            <span className="label">Location:</span>
            <span className="value">{character.location.name}</span>
          </div>
          
          <div className="info-row">
            <span className="label">Episodes:</span>
            <span className="value">{character.episode.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;

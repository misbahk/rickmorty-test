import { useCallback } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { useCharacter } from '../../hooks/useCharacter';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';

const CharacterDetail = () => {
  const { id } = useParams({ from: '/character/$id' });
  const { toast } = useToast();
  const [savedPage] = useLocalStorage('rickAndMortyPage', 1);
  
  const { data: character, isLoading, isError, error } = useCharacter(parseInt(id, 10));

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  if (isLoading) return <div>Loading character details...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;
  if (!character) return <div>Character not found</div>;

  const infoFields = [
    { label: 'Status', value: character.status },
    { label: 'Species', value: character.species },
    { label: 'Gender', value: character.gender },
    { label: 'Origin', value: character.origin.name },
    { label: 'Location', value: character.location.name },
    { label: 'Episodes', value: character.episode.length },
  ];

  return (
    <div className="character-detail">
      <Button 
        onClick={handleBack}
        variant="outline"
      >
        Back to List
      </Button>

      <div className="character-info">
        <img src={character.image} alt={character.name} />
        <h2>{character.name}</h2>
        
        <div className="info-grid">
          {infoFields.map(({ label, value }) => (
            <div key={label} className="info-item">
              <span className="label">{label}:</span>
              <span className="value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;

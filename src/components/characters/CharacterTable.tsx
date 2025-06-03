import { useCallback, useEffect } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel,
  flexRender
} from '@tanstack/react-table';
import { useCharacters } from '../../hooks/useCharacters';
import { characterColumns } from './CharacterColumns';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';

const CharacterTable = () => {
  const { page: pageFromUrl = 1 } = useSearch({ from: '/' });
  const navigate = useNavigate({ from: '/' });
  const { toast } = useToast();
  
  // Use custom hook for localStorage
  const [page, setPage] = useLocalStorage('rickAndMortyPage', Number(pageFromUrl));
  const [isRefreshing, setIsRefreshing] = useLocalStorage('isRefreshing', false);
  
  // Fetch characters with the current page
  const { data, isLoading, isError, error, refetch } = useCharacters(page);
  
  const characters = data?.results || [];
  const totalPages = data?.info?.pages || 0;

  const handleRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      await refetch();
      toast({
        title: "Success",
        description: "Character list refreshed successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to refresh character list",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch, setIsRefreshing, toast]);

  // Update URL when page changes
  useEffect(() => {
    navigate({
      search: { page },
      replace: true,
    });
  }, [page, navigate]);

  const table = useReactTable({
    data: characters,
    columns: characterColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: 20,
      },
    },
  });

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }, [setPage, totalPages]);

  if (isLoading) return <div>Loading characters...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="character-table">
      <h2>Rick & Morty Characters</h2>
      
      <Button 
        onClick={handleRefresh} 
        disabled={isRefreshing}
        variant="outline"
      >
        {isRefreshing ? 'Refreshing...' : 'Refresh'}
      </Button>
      
      <div className="table-container">
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pagination">
        <Button 
          onClick={() => handlePageChange(page - 1)} 
          disabled={page === 1}
          variant="outline"
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button 
          onClick={() => handlePageChange(page + 1)} 
          disabled={page === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CharacterTable;

import { useState, useEffect } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel,
  flexRender
} from '@tanstack/react-table';
import { useCharacters } from '../../hooks/useCharacters';
import { characterColumns } from './CharacterColumns';
import { useSearch, useNavigate } from '@tanstack/react-router';

const CharacterTable = () => {
  // Get the page from URL search params
  const { page: pageFromUrl = 1 } = useSearch({ from: '/' });
  const navigate = useNavigate({ from: '/' });
  
  // Initialize state with the page from URL
  const [page, setPage] = useState<number>(Number(pageFromUrl));
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Fetch characters with the current page
  const { data, isLoading, isError, error, refetch } = useCharacters(page);
  
  const characters = data?.results || [];
  const totalPages = data?.info?.pages || 0;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  // Update URL when page changes
  useEffect(() => {
    // Update URL search params
    navigate({
      search: { page },
      replace: true,
    });
    
    // Also store in localStorage for additional persistence
    localStorage.setItem('rickAndMortyPage', String(page));
  }, [page, navigate]);
  
  // Load page from localStorage on initial render if not in URL
  useEffect(() => {
    if (pageFromUrl === 1) {
      const savedPage = localStorage.getItem('rickAndMortyPage');
      if (savedPage) {
        const parsedPage = parseInt(savedPage, 10);
        if (!isNaN(parsedPage) && parsedPage >= 1) {
          setPage(parsedPage);
        }
      }
    }
  }, [pageFromUrl]);

  const table = useReactTable({
    data: characters,
    columns: characterColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: page - 1, // TanStack Table uses 0-indexed pages
        pageSize: 20, // Rick & Morty API returns 20 items per page
      },
    },
  });

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (isLoading) return <div>Loading characters...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="character-table">
      <h2>Rick & Morty Characters</h2>
      
      <button 
        onClick={handleRefresh} 
        className="refresh-button"
        disabled={isRefreshing}
      >
        {isRefreshing ? 'Refreshing...' : 'Refresh'}
      </button>
      
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
      
      <div className="pagination">
        <button 
          onClick={() => handlePageChange(page - 1)} 
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button 
          onClick={() => handlePageChange(page + 1)} 
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterTable;

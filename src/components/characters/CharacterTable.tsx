import { useCallback, useEffect, useState } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel,
  flexRender
} from '@tanstack/react-table';
import { useCharacters } from '@/hooks/useCharacters';
import { characterColumns } from './CharacterColumns';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

const CharacterTable = () => {
  const { page: pageFromUrl = 1 } = useSearch({ from: '/' });
  const navigate = useNavigate({ from: '/' });
  const [refreshStatus, setRefreshStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Use state for current page
  const [page, setPage] = useState(Number(pageFromUrl));
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Fetch characters with the current page
  const { data, isLoading, isError, error, refetch } = useCharacters(page);
  
  // Get only 10 characters from the API response
  const characters = data?.results.slice(0, 10) || [];
  const totalPages = Math.ceil((data?.info?.count || 0) / 10);

  const handleRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      setRefreshStatus('idle');
      await refetch();
      setRefreshStatus('success');
    } catch (err) {
      setRefreshStatus('error');
    } finally {
      setIsRefreshing(false);
      // Clear status after 3 seconds
      setTimeout(() => setRefreshStatus('idle'), 3000);
    }
  }, [refetch]);

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
        pageSize: 10,
      },
    },
  });

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  }, [totalPages]);

  if (isLoading) return <div>Loading characters...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="character-table">
      <h2>Rick & Morty Characters</h2>
      
      <div className="refresh-section">
        <Button 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          variant="outline"
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
        {refreshStatus === 'success' && (
          <span className="text-green-500 ml-2">✓ Refreshed successfully</span>
        )}
        {refreshStatus === 'error' && (
          <span className="text-red-500 ml-2">✗ Failed to refresh</span>
        )}
      </div>
      
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

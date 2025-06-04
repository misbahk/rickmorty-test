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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Pagination,
  IconButton,
  Tooltip
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

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

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    if (value >= 1 && value <= totalPages) {
      setPage(value);
    }
  }, [totalPages]);

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
      <CircularProgress />
    </Box>
  );
  
  if (isError) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      Error: {(error as Error).message}
    </Alert>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h2">
          Rick & Morty Characters
        </Typography>
        
        <Box display="flex" alignItems="center" gap={2}>
          <Tooltip title="Refresh data">
            <IconButton 
              onClick={handleRefresh} 
              disabled={isRefreshing}
              color="primary"
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          
          {refreshStatus === 'success' && (
            <Alert 
              icon={<CheckCircleIcon />} 
              severity="success"
              sx={{ py: 0 }}
            >
              Refreshed successfully
            </Alert>
          )}
          {refreshStatus === 'error' && (
            <Alert 
              icon={<ErrorIcon />} 
              severity="error"
              sx={{ py: 0 }}
            >
              Failed to refresh
            </Alert>
          )}
        </Box>
      </Box>
      
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="character table">
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination 
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default CharacterTable;

import { Link } from '@tanstack/react-router';
import { createColumnHelper } from '@tanstack/react-table';
import { Character } from '../../types/character';

const columnHelper = createColumnHelper<Character>();

// Simplified column definitions with default cell renderer
const defaultCell = (info: any) => <div>{info.getValue()}</div>;

export const characterColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: defaultCell,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => (
      <Link 
        to="/character/$id" 
        params={{ id: info.row.original.id.toString() }}
        className="text-blue-500 hover:text-blue-700"
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: defaultCell,
  }),
  columnHelper.accessor('species', {
    header: 'Species',
    cell: defaultCell,
  }),
  columnHelper.accessor('gender', {
    header: 'Gender',
    cell: defaultCell,
  }),
  columnHelper.accessor('origin.name', {
    header: 'Origin',
    cell: defaultCell,
  }),
  columnHelper.accessor('location.name', {
    header: 'Location',
    cell: defaultCell,
  }),
];

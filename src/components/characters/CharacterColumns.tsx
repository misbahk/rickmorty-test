import { createColumnHelper } from '@tanstack/react-table';
import { Character } from '../../types/api';
import { Link } from '@tanstack/react-router';

const columnHelper = createColumnHelper<Character>();

export const characterColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => (
      <Link to="/character/$id" params={{ id: String(info.row.original.id) }} search={{}}>
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('species', {
    header: 'Species',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('gender', {
    header: 'Gender',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('origin.name', {
    header: 'Origin',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('location.name', {
    header: 'Location',
    cell: info => info.getValue(),
  }),
];

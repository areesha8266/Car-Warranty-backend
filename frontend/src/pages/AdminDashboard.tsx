import { useState } from 'react';
import { useGetAllClaimsQuery, useUpdateClaimStatusMutation } from '../store/api';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { motion } from 'framer-motion';
import { Search, Filter, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const columnHelper = createColumnHelper<any>();

const AdminDashboard = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [serialNo, setSerialNo] = useState('');

  const { data, isLoading, isFetching } = useGetAllClaimsQuery({ page, limit: 10, status, serialNo: serialNo.length > 3 ? serialNo : '' });
  const [updateStatus] = useUpdateClaimStatusMutation();

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    await updateStatus({ id, status: newStatus });
  };

  const columns = [
    columnHelper.accessor('id', {
      header: 'Claim ID',
      cell: info => <span className="font-mono text-xs text-on_surface-variant">{info.getValue().substring(0,8)}...</span>,
    }),
    columnHelper.accessor(row => row.product?.user?.email || 'N/A', {
      id: 'customer',
      header: 'Customer',
      cell: info => <span className="text-on_surface-variant">{info.getValue()}</span>,
    }),
    columnHelper.accessor('product.model', {
      header: 'Vehicle Model',
      cell: info => <span className="font-bold text-on_surface">{info.getValue()}</span>,
    }),
    columnHelper.accessor('product.serialNo', {
      header: 'VIN / Serial',
      cell: info => <span className="text-sm font-mono tracking-widest">{info.getValue()}</span>,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: info => <span className="text-primary">{info.getValue()}</span>,
    }),
    columnHelper.accessor('createdAt', {
      header: 'Date Submitted',
      cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => {
        const val = info.getValue();
        return (
          <select 
            value={val} 
            onChange={(e) => handleStatusUpdate(info.row.original.id, e.target.value)}
            className={`bg-surface border rounded p-1 text-sm outline-none ${
              val === 'approved' ? 'border-green-500 text-green-400' :
              val === 'rejected' ? 'border-red-500 text-red-400' :
              'border-primary/50 text-primary'
            }`}
          >
            <option value="submitted">Submitted</option>
            <option value="verified">Verified</option>
            <option value="in-process">In Process</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="closed">Closed</option>
          </select>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
        <div>
          <h1 className="text-3xl font-bold heading-gradient font-serif">Admin Command Center</h1>
          <p className="text-on_surface-variant mt-1">Review and manage all vehicle warranty claims</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on_surface-variant w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by VIN (min 4 chars)..." 
            value={serialNo}
            onChange={(e) => setSerialNo(e.target.value)}
            className="w-full bg-surface-container border border-outline-variant/20 text-on_surface pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-container focus:outline-none transition-colors"
          />
        </div>
        <div className="relative w-full md:w-64">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-on_surface-variant w-5 h-5" />
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-surface-container border border-outline-variant/20 text-on_surface pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-container focus:outline-none appearance-none transition-colors"
          >
            <option value="">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="in-process">In Process</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden border-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container/80">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="p-4 text-sm font-bold text-on_surface-variant uppercase tracking-wider">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-primary"><Loader2 className="animate-spin inline-block" /></td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-on_surface-variant">No records.</td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, index) => (
                  <motion.tr 
                    key={row.id} 
                    initial={{ opacity: 0, x: -30, rotateX: -45 }}
                    whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="border-t border-outline-variant/10 hover:bg-surface-variant/30 transition-colors"
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="p-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

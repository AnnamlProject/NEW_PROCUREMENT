
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SortingState, PaginationState } from '@tanstack/react-table';
import { fetchPRs } from '../../api/client';
import { columns } from './columns';
import { DataTable } from '../../components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { PlusCircle } from 'lucide-react';

export function PRListPage() {
  const [q, setQ] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(q);
    setPagination({ pageIndex: 0, pageSize }); // Reset to first page on new search
  };

  const prQuery = useQuery({
    queryKey: ['prs', pagination, sorting, searchTerm],
    queryFn: () => fetchPRs({
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      sort: sorting[0]?.id,
      dir: sorting[0]?.desc ? 'desc' : 'asc',
      q: searchTerm
    }),
    keepPreviousData: true,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Permintaan Pembelian</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Buat PR Baru
        </Button>
      </div>
      
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Daftar Permintaan Pembelian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <Input
                placeholder="Cari berdasarkan No. Dokumen atau Pemohon..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="max-w-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              />
              <Button type="submit">Cari</Button>
            </form>
          </div>
          <DataTable
            columns={columns}
            data={prQuery.data?.data ?? []}
            pageCount={prQuery.data?.meta.totalPages ?? 0}
            pagination={pagination}
            onPaginationChange={setPagination}
            sorting={sorting}
            onSortingChange={setSorting}
            isLoading={prQuery.isFetching}
          />
        </CardContent>
      </Card>
    </div>
  );
}

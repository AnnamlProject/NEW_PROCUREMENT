
import { createColumnHelper } from '@tanstack/react-table';
import { PurchaseRequisition } from '../../api/types/purchasing';
import { DocStatus } from '../../api/types/core';
import { formatCurrencyIDR, formatDate } from '../../lib/format';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { MoreHorizontal } from 'lucide-react';

const columnHelper = createColumnHelper<PurchaseRequisition>();

const statusVariantMap: { [key in DocStatus]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
    [DocStatus.DRAFT]: 'secondary',
    [DocStatus.PENDING_APPROVAL]: 'outline',
    [DocStatus.APPROVED]: 'default',
    [DocStatus.REJECTED]: 'destructive',
    [DocStatus.CLOSED]: 'secondary',
    [DocStatus.CANCELLED]: 'destructive',
};


export const columns = [
  columnHelper.accessor('docNo', {
    header: 'No. Dokumen',
    cell: info => <div className="font-medium text-sky-400">{info.getValue()}</div>,
  }),
  columnHelper.accessor('docDate', {
    header: 'Tanggal',
    cell: info => formatDate(info.getValue()),
  }),
  columnHelper.accessor('requester.name', {
    header: 'Pemohon',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('department', {
    header: 'Departemen',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('total', {
    header: 'Total Nilai',
    cell: info => <div className="text-right">{formatCurrencyIDR(info.getValue())}</div>,
    meta: {
      isNumeric: true,
    }
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      return <Badge variant={statusVariantMap[status]}>{status.replace(/_/g, ' ')}</Badge>
    },
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <div className="text-right">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
      </div>
    ),
  }),
];

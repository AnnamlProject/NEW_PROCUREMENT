
import { BaseDocument, DocStatus, User } from './core';

export interface Item {
  id: string;
  code: string;
  name: string;
  uom: string;
}

export interface CostCenter {
    id: string;
    name: string;
    code: string;
}

export interface PRLine {
  id: string;
  item: Item;
  description: string;
  qty: number;
  uom: string;
  unitPrice: number;
  total: number;
  costCenter: CostCenter;
}

export interface PurchaseRequisition extends BaseDocument {
  requester: User;
  department: string;
  lines: PRLine[];
  total: number;
}

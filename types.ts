
export enum EntryType {
  INWARD = 'INWARD',
  OUTWARD = 'OUTWARD',
  INTERNAL = 'INTERNAL'
}

export enum DeliveryStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
  IN_TRANSIT = 'IN_TRANSIT'
}

export interface InwardEntry {
  id: string;
  inwardNo: string;
  inwardDate: string;
  receivedDate: string;
  mode: string;
  courierCompany?: string;
  receiptNo?: string;
  receiptDate?: string;
  senderName: string;
  senderAddress: string;
  letterNo: string;
  letterDate: string;
  subject: string;
  description: string;
  fromOffice: string;
  toOffice: string;
  department: string;
  toPerson: string;
  status: DeliveryStatus;
}

export interface OutwardEntry {
  id: string;
  outwardNo: string;
  dispatchDate: string;
  dispatchedBy: string;
  recipientName: string;
  recipientAddress: string;
  courierCompany: string;
  trackingId: string;
  charges: number;
  letterNo: string;
  subject: string;
  isReturned: boolean;
  returnDate?: string;
  returnReason?: string;
  status: DeliveryStatus;
}

export interface MasterItem {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  remarks?: string;
  sequence: number;
}


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

export type Role = 'ADMIN' | 'OPERATOR';

export interface User {
  id: string;
  username: string;
  name: string;
  role: Role;
  token?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
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
  isActive: boolean;
  remarks?: string;
}

export interface Office extends MasterItem {
  institute: string;
  department: string;
  openingInwardNo?: number;
  openingOutwardNo?: number;
}

export interface Mode extends MasterItem {
  // Mode specific fields if any
}

export interface Entity extends MasterItem {
  personName: string;
  address: string;
  place: string;
}

export interface Courier extends MasterItem {
  contactPerson: string;
  phone: string;
  email: string;
  website: string;
  address: string;
}

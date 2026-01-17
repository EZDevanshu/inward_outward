
import React from 'react';
import { InwardEntry, OutwardEntry, DeliveryStatus } from './types';

export const OFFICES = [
  "Main Headquarters",
  "Regional Office (North)",
  "Regional Office (South)",
  "Zonal Branch (East)",
  "City Admin Center"
];

export const FINANCIAL_YEARS = ["2023-24", "2024-25", "2025-26"];

export const MODES = ["Courier", "Hand Delivery", "Post", "Email", "Fax"];

export const COURIER_COMPANIES = ["Blue Dart", "DHL", "FedEx", "Speed Post", "Professional Courier"];

export const MOCK_INWARD_DATA: InwardEntry[] = [
  {
    id: '1',
    inwardNo: 'INW/2024/0001',
    inwardDate: '2024-05-10',
    receivedDate: '2024-05-10',
    mode: 'Courier',
    courierCompany: 'Blue Dart',
    senderName: 'Reliance Industries Ltd',
    senderAddress: 'Mumbai, Maharashtra',
    letterNo: 'RIL/ADM/2024/45',
    letterDate: '2024-05-08',
    subject: 'Quarterly Audit Report',
    description: 'Submission of statutory audit findings for Q1.',
    fromOffice: 'Main Headquarters',
    toOffice: 'Main Headquarters',
    department: 'Accounts',
    toPerson: 'Mr. Rajesh Sharma',
    status: DeliveryStatus.DELIVERED
  },
  {
    id: '2',
    inwardNo: 'INW/2024/0002',
    inwardDate: '2024-05-11',
    receivedDate: '2024-05-11',
    mode: 'Hand Delivery',
    senderName: 'Local Municipal Corp',
    senderAddress: 'Sector 4, New Delhi',
    letterNo: 'MNC/TAX/990',
    letterDate: '2024-05-10',
    subject: 'Property Tax Notice',
    description: 'Notice regarding annual property tax assessment.',
    fromOffice: 'City Admin Center',
    toOffice: 'Regional Office (North)',
    department: 'Legal',
    toPerson: 'Ms. Anita Desai',
    status: DeliveryStatus.PENDING
  }
];

export const MOCK_OUTWARD_DATA: OutwardEntry[] = [
  {
    id: '1',
    outwardNo: 'OUT/2024/0542',
    dispatchDate: '2024-05-12',
    dispatchedBy: 'Suresh Kumar',
    recipientName: 'Dept of Finance, Govt of India',
    recipientAddress: 'North Block, New Delhi',
    courierCompany: 'Speed Post',
    trackingId: 'SP123456789IN',
    charges: 45.00,
    letterNo: 'DO/FIN/2024/112',
    subject: 'Budget Proposal 2024',
    isReturned: false,
    status: DeliveryStatus.IN_TRANSIT
  },
  {
    id: '2',
    outwardNo: 'OUT/2024/0543',
    dispatchDate: '2024-05-12',
    dispatchedBy: 'Suresh Kumar',
    recipientName: 'HDFC Bank Ltd',
    recipientAddress: 'Connaught Place, Delhi',
    courierCompany: 'Blue Dart',
    trackingId: 'BD987654321',
    charges: 120.00,
    letterNo: 'BANK/LC/2024/09',
    subject: 'Letter of Credit Extension',
    isReturned: true,
    returnDate: '2024-05-15',
    returnReason: 'Address change - Recipient moved',
    status: DeliveryStatus.RETURNED
  }
];


import { User, Role, Office, Mode, Entity, Courier } from '../types';

// Mock Data Store
let offices: Office[] = [
    { id: '1', name: 'Main Office', isActive: true, institute: 'SIT', department: 'Admin', openingInwardNo: 1, openingOutwardNo: 1, remarks: 'Headquarters' },
    { id: '2', name: 'Registrar Office', isActive: true, institute: 'SIT', department: 'Registrar', openingInwardNo: 100, openingOutwardNo: 50, remarks: '' }
];

let modes: Mode[] = [
    { id: '1', name: 'By Hand', isActive: true },
    { id: '2', name: 'Courier', isActive: true },
    { id: '3', name: 'Post', isActive: true },
    { id: '4', name: 'Email', isActive: true }
];

let entities: Entity[] = [
    { id: '1', name: 'Dell India', personName: 'Rahul Kumar', address: 'Cyber City', place: 'Gurgaon', isActive: true },
    { id: '2', name: 'University Grants Commission', personName: 'Secretary', address: 'Bahadur Shah Zafar Marg', place: 'New Delhi', isActive: true }
];

let couriers: Courier[] = [
    { id: '1', name: 'Blue Dart', isActive: true, contactPerson: 'Manager', phone: '1860-233-1234', email: 'support@bluedart.com', website: 'www.bluedart.com', address: 'Mumbai Hub' },
    { id: '2', name: 'DTDC', isActive: true, contactPerson: 'Local Agent', phone: '022-22223333', email: 'service@dtdc.com', website: 'www.dtdc.com', address: 'Pune Branch' }
];


export const MockApi = {
    login: async (username: string): Promise<User> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username.toLowerCase() === 'admin') {
                    resolve({
                        id: '1',
                        username: 'admin',
                        name: 'System Administrator',
                        role: 'ADMIN',
                        token: 'mock-jwt-token-admin'
                    });
                } else if (username.toLowerCase() === 'operator') {
                    resolve({
                        id: '2',
                        username: 'operator',
                        name: 'Front Desk Operator',
                        role: 'OPERATOR',
                        token: 'mock-jwt-token-operator'
                    });
                } else {
                    reject('Invalid credentials');
                }
            }, 800);
        });
    },

    getMasters: async (type: 'offices' | 'modes' | 'entities' | 'couriers') => {
        return new Promise<any[]>((resolve) => {
            setTimeout(() => {
                switch (type) {
                    case 'offices': resolve([...offices]); break;
                    case 'modes': resolve([...modes]); break;
                    case 'entities': resolve([...entities]); break;
                    case 'couriers': resolve([...couriers]); break;
                }
            }, 500);
        });
    },

    createMaster: async (type: 'offices' | 'modes' | 'entities' | 'couriers', data: any) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newItem = { ...data, id: Math.random().toString(36).substr(2, 9) };
                switch (type) {
                    case 'offices': offices.push(newItem); break;
                    case 'modes': modes.push(newItem); break;
                    case 'entities': entities.push(newItem); break;
                    case 'couriers': couriers.push(newItem); break;
                }
                resolve(newItem);
            }, 500);
        });
    },

    updateMaster: async (type: 'offices' | 'modes' | 'entities' | 'couriers', id: string, data: any) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const updateList = (list: any[]) => list.map(item => item.id === id ? { ...item, ...data } : item);
                switch (type) {
                    case 'offices': offices = updateList(offices); break;
                    case 'modes': modes = updateList(modes); break;
                    case 'entities': entities = updateList(entities); break;
                    case 'couriers': couriers = updateList(couriers); break;
                }
                resolve(true);
            }, 500);
        });
    },

    deleteMaster: async (type: 'offices' | 'modes' | 'entities' | 'couriers', id: string) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const filterList = (list: any[]) => list.filter(item => item.id !== id);
                switch (type) {
                    case 'offices': offices = filterList(offices); break;
                    case 'modes': modes = filterList(modes); break;
                    case 'entities': entities = filterList(entities); break;
                    case 'couriers': couriers = filterList(couriers); break;
                }
                resolve(true);
            }, 500);
        });
    },

    createEntry: async (type: 'inward' | 'outward', data: any) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Saved ${type} entry`, data);
                resolve({ success: true, id: Math.random().toString(36).substr(2, 9) });
            }, 800);
        });
    },

    getEntries: async (type: 'inward' | 'outward' | 'all', filters?: any) => {
        return new Promise<any[]>((resolve) => {
            setTimeout(() => {
                // Mock Response
                const mockData = Array.from({ length: 5 }).map((_, i) => ({
                    id: i.toString(),
                    no: `INW/2024/00${i + 10}`,
                    subject: 'Sample Subject for Document ' + i,
                    sender: 'Dell India',
                    date: '2024-03-20',
                    status: 'PENDING',
                    type: i % 2 === 0 ? 'INWARD' : 'OUTWARD'
                }));
                resolve(mockData);
            }, 600);
        });
    }
};

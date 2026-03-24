
import { User } from '../types';

type MasterType = 'offices' | 'modes' | 'entities' | 'couriers';
type EntryQueryType = 'inward' | 'outward' | 'all';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');

const getStoredToken = (): string | undefined => {
    const raw = sessionStorage.getItem('auth_user') || localStorage.getItem('auth_user');
    if (!raw) {
        return undefined;
    }
    try {
        const parsed = JSON.parse(raw) as User;
        return parsed.token;
    } catch {
        return undefined;
    }
};

const parseResponse = async (response: Response) => {
    const contentType = response.headers.get('content-type') || '';
    const body = contentType.includes('application/json') ? await response.json() : await response.text();

    if (!response.ok) {
        const message = typeof body === 'object' && body !== null
            ? (body.message || body.error || JSON.stringify(body))
            : String(body || 'Request failed');
        throw new Error(message);
    }

    return body;
};

const request = async (path: string, options: RequestInit = {}) => {
    const token = getStoredToken();
    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string> || {}),
    };

    if (options.body !== undefined && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });

    return parseResponse(response);
};

const mapEntryForUi = (item: any) => ({
    ...item,
    id: item.id || item._id,
    no: item.no || item.inwardNo || item.outwardNo || item.referenceNo || '',
    date: item.date || item.entryDate || item.inwardDate || item.dispatchDate || '',
    sender: item.sender || item.senderName || item.recipientName || item.toPerson || '',
    subject: item.subject || item.description || '',
    status: item.status || 'PENDING',
    type: item.type || (item.inwardNo ? 'INWARD' : item.outwardNo ? 'OUTWARD' : 'INWARD'),
});

export const MockApi = {
    login: async (username: string, password?: string): Promise<User> => {
        const data = await request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });

        return {
            id: data.id || data.user?.id || data._id || '0',
            username: data.username || data.user?.username || username,
            name: data.name || data.user?.name || username,
            role: data.role || data.user?.role || 'OPERATOR',
            token: data.token || data.accessToken || data.user?.token,
        };
    },

    getMasters: async (type: MasterType) => {
        const data = await request(`/masters/${type}`, { method: 'GET' });
        return Array.isArray(data) ? data : (data.items || data.data || []);
    },

    createMaster: async (type: MasterType, data: any) => {
        return request(`/masters/${type}`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    updateMaster: async (type: MasterType, id: string, data: any) => {
        return request(`/masters/${type}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    deleteMaster: async (type: MasterType, id: string) => {
        return request(`/masters/${type}/${id}`, {
            method: 'DELETE',
        });
    },

    createEntry: async (type: 'inward' | 'outward', data: any) => {
        return request(`/entries/${type}`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    getEntries: async (type: EntryQueryType, filters?: Record<string, string>) => {
        const params = new URLSearchParams();
        if (type !== 'all') {
            params.set('type', type);
        }

        Object.entries(filters || {}).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.set(key, String(value));
            }
        });

        const query = params.toString();
        const data = await request(`/entries${query ? `?${query}` : ''}`, { method: 'GET' });
        const items = Array.isArray(data) ? data : (data.items || data.data || []);
        return items.map(mapEntryForUi);
    }
};


import { User, Role } from '../../types';

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
    }
};

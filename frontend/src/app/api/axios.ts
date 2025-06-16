// Em: src/app/api/axios.ts
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- LINHAS DE TESTE ---
// Adicionamos um "ID" único à nossa instância para rastreá-la
// @ts-ignore
api.myCustomId = `INSTANCE_CREATED_AT_${Date.now()}`;
// Logamos no console no momento da criação
console.log(`[axios.ts] Instância do Axios criada com o ID: ${api.myCustomId}`);
// --- FIM DAS LINHAS DE TESTE ---

export default api;
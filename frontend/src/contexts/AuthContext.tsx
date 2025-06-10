'use client'; // MUITO IMPORTANTE: Marca este como um Componente de Cliente

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/app/api/axios';
import Cookies from 'js-cookie';

// Tipagem para os dados do usuário e do contexto
interface User {
    id: string;
    nome: string;
    email: string;
}

interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, senha: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Componente Provedor
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Tenta carregar o token e os dados do usuário ao iniciar
        const token = Cookies.get('auth_token');

        if (token) {
            const storedUser = localStorage.getItem('user_data');

            // VITAL: Adicionamos esta verificação!
            // Só tente fazer o parse se 'storedUser' for uma string não vazia.
            if (storedUser) {
                try {
                    // Usamos um try/catch como segurança extra, caso o JSON esteja corrompido
                    setUser(JSON.parse(storedUser));
                } catch (e) {
                    console.error("Falha ao analisar os dados do usuário do localStorage", e);
                    // Opcional: se os dados estão corrompidos, podemos forçar o logout
                    // para limpar o estado inconsistente.
                    logout();
                }
            } else {
                // Caso raro: temos um token no cookie, mas não temos dados no localStorage.
                // Isso pode indicar um estado inconsistente. O ideal é limpar o cookie.
                console.warn("Estado inconsistente: Token encontrado sem dados de usuário. Limpando sessão.");
                logout();
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, senha: password });

            // --- AJUSTE IMPORTANTE AQUI ---
            // 1. O backend retorna o token diretamente como texto, então pegamos direto de response.data
            const token = response.data;

            // 2. Verificação de segurança: garantir que o token é uma string válida
            if (typeof token !== 'string' || token.length < 10) { // Um JWT válido é longo
                throw new Error('Resposta inválida recebida do servidor.');
            }

            // 3. Como o backend não nos envia os dados do usuário, teremos que improvisar por agora.
            // A melhor solução no futuro seria o backend enviar, ou fazer uma nova chamada
            // para um endpoint /me para buscar os dados do usuário usando o token recém-obtido.
            // Por enquanto, vamos salvar apenas o email.
            const userData = { email: email };

            // 4. Agora salvamos os dados corretos
            Cookies.set('auth_token', token, { expires: 1 });
            localStorage.setItem('user_data', JSON.stringify(userData));

            setUser(userData);
            router.push('/reclamacoes'); // ou sua rota protegida

        } catch (err) {
            console.error("Erro no login", err);
            throw new Error('Email ou senha inválidos.');
        }
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('auth_token');
        localStorage.removeItem('user_data');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook customizado para usar o contexto
export const useAuth = () => useContext(AuthContext);
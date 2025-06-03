'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !senha) {
            alert('Preencha todos os campos.');
            return;
        }

        setLoading(true);

        try {
            // Faz a requisição para o backend para autenticar
            const response = await axios.post('http://localhost:8080/auth/login', {
                email,
                senha
            });

            // Salva o token e email no localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', email);

            alert('Login realizado com sucesso!');
            router.push('/reclamacoes');
        } catch (error: any) {
            console.error('Erro no login:', error);

            if (error.response?.status === 401) {
                alert('Email ou senha incorretos.');
            } else if (error.response?.status === 404) {
                alert('Usuário não encontrado.');
            } else {
                alert('Erro no servidor. Tente novamente mais tarde.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md space-y-6">
                <h1 className="text-2xl font-bold">Olá!</h1>
                <p className="text-gray-600">Faça seu login para continuar.</p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1">E-mail</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 p-3 rounded"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Senha</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 p-3 rounded"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="text-right">
                        <a href="#" className="text-sm underline">Esqueceu sua senha?</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded disabled:bg-blue-400"
                        disabled={loading}
                    >
                        {loading ? 'Fazendo login...' : 'Login'}
                    </button>
                </form>

                <p className="text-center text-sm">
                    Não possui cadastro?{' '}
                    <Link href="/cadastro" className="text-blue-600 font-semibold underline">
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    );
}
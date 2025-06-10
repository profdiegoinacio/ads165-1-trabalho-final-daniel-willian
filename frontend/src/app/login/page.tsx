'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext'; // 1. Importar o hook useAuth

export default function LoginPage() {
    // 2. Obter a função de login do nosso contexto
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    // 3. (Opcional, mas recomendado) Estado para exibir erros na tela em vez de alerts
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Limpa erros anteriores

        if (!email || !senha) {
            setError('Preencha todos os campos.');
            return;
        }

        setLoading(true);

        try {
            // 4. A mágica acontece aqui! Apenas chame a função login do contexto.
            // Toda a lógica de API, armazenamento e redirect está nela.
            await login(email, senha);

            // O redirecionamento será feito automaticamente pelo AuthContext após o sucesso.
            // Não precisamos mais do router.push('/reclamacoes') aqui.

        } catch (error: any) {
            // O erro lançado pelo AuthContext será capturado aqui
            console.error('Erro no login:', error);
            setError(error.message || 'Erro no servidor. Tente novamente mais tarde.');
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
                    {/* 5. Exibindo a mensagem de erro na tela */}
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
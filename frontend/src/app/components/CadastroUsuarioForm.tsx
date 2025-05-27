'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CadastroUsuarioForm() {
    const router = useRouter();
    const [form, setForm] = useState({
        nome: '',
        email: '',
        telefone: '',
        senha: '',
        confirmarSenha: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.senha !== form.confirmarSenha) {
            alert('As senhas não coincidem');
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: form.nome,
                    email: form.email,
                    telefone: form.telefone,
                    senha: form.senha
                })
            });

            if (!res.ok) {
                throw new Error('Erro ao cadastrar usuário');
            }

            // Redirecionar após sucesso
            router.push('/reclamacoes');
        } catch (error) {
            alert('Erro ao cadastrar: ' + error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name="nome"
                placeholder="Digite seu nome"
                value={form.nome}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
            />
            <input
                name="email"
                type="email"
                placeholder="Digite seu email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
            />
            <input
                name="telefone"
                placeholder="Digite seu telefone"
                value={form.telefone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />
            <input
                name="senha"
                type="password"
                placeholder="Digite sua senha"
                value={form.senha}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
            />
            <input
                name="confirmarSenha"
                type="password"
                placeholder="Confirme sua senha"
                value={form.confirmarSenha}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
            />
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
            >
                Cadastrar
            </button>
        </form>
    );
}

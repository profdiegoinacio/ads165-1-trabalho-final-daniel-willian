'use client';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Bem-vindo à Página de Reclamações</h1>
            <div className="flex space-x-4">
                <Link href="/reclamacoes" className="text-blue-600 hover:text-blue-800 underline">
                    Ver Reclamações
                </Link>
                <Link href="/reclamacoes/nova" className="text-green-600 hover:text-green-800 underline">
                    Nova Reclamação
                </Link>
            </div>
        </div>
    );
}
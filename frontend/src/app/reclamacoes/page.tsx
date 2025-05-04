'use client';
import Link from 'next/link';
import ReclamacaoList from './ReclamacaoList';

export default function ReclamacoesPage() {
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-blue-700">Reclamações</h1>
                <Link href="/reclamacoes/nova" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Nova Reclamação
                </Link>
            </div>
            <ReclamacaoList />
            <div className="mt-4">
                <Link href="/" className="text-gray-600 hover:text-gray-800 underline">
                    Voltar para página inicial
                </Link>
            </div>
        </div>
    );
}
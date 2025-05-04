'use client';
import Link from 'next/link';
import ReclamacaoForm from '../../components/ReclamacaoForm';

export default function NovaReclamacaoPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Nova Reclamação</h1>
            <ReclamacaoForm />
            <div className="mt-4">
                <Link href="/reclamacoes" className="text-gray-600 hover:text-gray-800 underline">
                    Voltar para lista de reclamações
                </Link>
            </div>
        </div>
    );
}
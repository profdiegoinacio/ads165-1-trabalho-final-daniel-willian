'use client';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import api from '@/app/api/axios';

interface Reclamacao {
    id: number;
    endereco: string;
    detalhes: string;
    dtInsercao: string;
    status: 'EM_ABERTO' | 'EM_ANALISE' | 'RESOLVIDO';
}

const statusLabels: Record<string, string> = {
    EM_ABERTO: 'Não Resolvido',
    EM_ANALISE: 'Em Análise',
    RESOLVIDO: 'Resolvido'
};

const statusColors: Record<string, string> = {
    EM_ABERTO: 'bg-red-200 text-red-800',
    EM_ANALISE: 'bg-yellow-200 text-yellow-800',
    RESOLVIDO: 'bg-green-200 text-green-800'
};

export default function ReclamacaoList() {
    const [reclamacoes, setReclamacoes] = useState<Reclamacao[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReclamacoes = async () => {
            try {
                setLoading(true);

                // --- LINHA DE TESTE ---
                // @ts-ignore
                console.log(`[ReclamacaoList GET] Usando a instância de Axios com ID: ${api.myCustomId}`);
                // --- FIM DO TESTE ---
                // SUBSTITUÍDO: trocamos o fetch pelo nosso 'api.get'
                const response = await api.get('/reclamacoes');

                // O Axios já nos entrega os dados em formato JSON em `response.data`
                // E também já trata erros (se a resposta não for 2xx, ele vai para o catch)
                // Por isso, as linhas abaixo não são mais necessárias:
                // if (!response.ok) { ... }
                // const data = await response.json();

                setReclamacoes(response.data);
                setError(null);
            } catch (err: any) { // Tipando o 'err' como 'any' para acessar 'message'
                console.error('Erro ao buscar reclamações:', err);
                setError(err.message || 'Não foi possível carregar as reclamações.');
            } finally {
                setLoading(false);
            }
        };

        fetchReclamacoes();
    }, []);

    const formatDate = (data: string) => {
        try {
            const d = new Date(data);
            return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        } catch (erro) {
            return 'Data inválida';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Erro!</strong>
                <span className="block sm:inline"> {error}</span>
                <p className="mt-2 text-sm">
                    Sugestões de solução:
                    <ul className="list-disc pl-5 mt-1">
                        <li>Verifique se a API está rodando em http://localhost:8080</li>
                        <li>Verifique se o endpoint /reclamacoes está correto</li>
                        <li>Verifique se o CORS está configurado corretamente no backend</li>
                    </ul>
                </p>
            </div>
        );
    }

    if (reclamacoes.length === 0) {
        return (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                <p>Não há reclamações cadastradas.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reclamacoes.map(r => (
                <div
                    key={r.id}
                    className="bg-white border rounded-xl shadow-sm p-4 flex justify-between items-center"
                >
                    <div>
                        <div className="text-blue-700 font-bold text-lg">{formatDate(r.dtInsercao)}</div>
                        <div className="flex items-center text-sm text-gray-700">
                            <span className="mr-1">
                                <FaMapMarkerAlt />
                            </span>
                            {r.endereco}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{r.detalhes}</div>
                    </div>
                    <div
                        className={`text-sm px-3 py-1 rounded-full font-medium ${statusColors[r.status]}`}
                    >
                        {statusLabels[r.status]}
                    </div>
                </div>
            ))}
        </div>
    );
}
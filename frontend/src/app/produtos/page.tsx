// app/produtos/page.tsx

import Link from 'next/link';
import { produtos } from '@/data/produtos'; // Importa a lista global

export default function ListaDeProdutos() {
    return (
        <div>
            <h1>Lista de Produtos</h1>
            <ul>
                {produtos.map((produto) => (
                    <li key={produto.id}>
                        <h2>{produto.nome}</h2>
                        <p>{produto.descricao}</p>
                        <Link href={`/produtos/${produto.id}`}>Detalhes</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
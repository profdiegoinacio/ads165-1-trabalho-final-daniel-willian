// app/layout.tsx
import './globals.css';
import Link from 'next/link';

export const metadata = {
    title: 'Lista de Produtos',
    description: 'Aplicação simples com uma lista de produtos'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
        <body>
        <header style={{ padding: '10px', backgroundColor: '#f7f7f7' }}>
            <nav>
                <Link href="/" style={{ marginRight: '10px' }}>Início</Link>
                <Link href="/produtos">Produtos</Link>
            </nav>
        </header>
        <main style={{ padding: '20px' }}>{children}</main>
        <footer style={{ textAlign: 'center', padding: '10px', marginTop: '20px', backgroundColor: '#f7f7f7' }}>
            © 2024 Lista de Produtos
        </footer>
        </body>
        </html>
    );
}
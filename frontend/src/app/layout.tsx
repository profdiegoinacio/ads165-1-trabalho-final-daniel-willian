import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sistema de Reclamações',
    description: 'Sistema para registro e acompanhamento de reclamações',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
        <body>
        <header className="bg-blue-700 text-white p-4">
            <div className="container mx-auto">
                <h1 className="text-xl font-bold">Sistema de Reclamações</h1>
            </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-100 p-4 text-center text-gray-600 text-sm mt-8">
            <div className="container mx-auto">
                © {new Date().getFullYear()} Sistema de Reclamações
            </div>
        </footer>
        </body>
        </html>
    );
}
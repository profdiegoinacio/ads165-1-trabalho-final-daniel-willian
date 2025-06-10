import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext'; // <-- 1. Importar o provider

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
        {/* 2. Envolver todo o conteúdo visível com o AuthProvider */}
        <AuthProvider>
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
        </AuthProvider>
        </body>
        </html>
    );
}
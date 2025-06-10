import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Este é o "matcher", ele define quais rotas ativarão o middleware
export const config = {
    matcher: [
        /*
         * Corresponde a todos os caminhos de requisição, exceto para:
         * - api (chamadas de API)
         * - _next/static (arquivos estáticos)
         * - _next/image (otimização de imagem)
         * - favicon.ico (ícone do site)
         * - /login (página de login, para não criar um loop de redirect)
         * - /cadastro (página de cadastro, se for pública)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|login|cadastro).*)',
    ],
};

export function middleware(request: NextRequest) {
    // O middleware roda no servidor, então NÃO PODE acessar o localStorage.
    // Ele deve verificar o token em um cookie.
    const token = request.cookies.get('auth_token')?.value;

    // Se não houver token e o usuário tentar acessar uma rota protegida,
    // redirecione-o para a página de login.
    if (!token) {
        // Constrói a URL completa para o redirecionamento
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Se o token existir, permite que a requisição continue
    return NextResponse.next();
}
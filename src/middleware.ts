import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isLoginRoute = pathname.startsWith('/login');
  const isLogged = request.cookies.get('auth-token');

  // Se não estiver logado e não for rota de login, redireciona para /login (URL absoluta)
  if (!isLoginRoute && !isLogged) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.search = `?redirect=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(loginUrl);
  }

  // Se estiver logado e acessar /login, redireciona para a página original ou para /
  if (isLoginRoute && isLogged) {
    const redirectTo = request.nextUrl.searchParams.get('redirect');
    if (redirectTo) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = redirectTo;
      redirectUrl.search = '';
      return NextResponse.redirect(redirectUrl);
    }
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = '/';
    homeUrl.search = '';
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|public).*)'],
};

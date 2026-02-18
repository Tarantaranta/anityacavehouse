import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // admin rotaları locale middleware'den dışarıda kalır
  matcher: ['/((?!_next|api|admin|.*\\..*).*)']
};

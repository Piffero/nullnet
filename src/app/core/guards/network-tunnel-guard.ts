import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const networkTunnelGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('networkTunnelToken');
  if (token && token.length > 0) {
    return true; // Libera a entrada no ecossistema azul
  }

  return router.parseUrl('/'); // Redireciona para a página de acesso
};

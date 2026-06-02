import { Routes } from '@angular/router';
import { networkTunnelGuard } from './core/guards/network-tunnel-guard';
import { MainEcosystem } from './factures/main-ecosystem/main-ecosystem';

export const routes: Routes = [

    { 
    path: 'ecosystem', 
    component: MainEcosystem,
    canActivate: [networkTunnelGuard] // Só entra se passou pelo TOTP e tem token
    },

    // Fallback
    { path: '**', redirectTo: '' }
];

import { Component } from '@angular/core';

@Component({
  selector: 'rd-features',
  imports: [],
  templateUrl: './features.html',
  styleUrl: './features.css',
})
export class Features {
  features: FeatureItem[] = [
    {
      id: '01',
      title: 'Mensageria P2P PGP',
      description: 'Comunicação direta ponta-a-ponta entre nós operantes. Sem servidores centrais guardando metadados, sem banco de dados vulnerável a apreensões.',
      tag: 'E2EE'
    },
    {
      id: '02',
      title: 'Circuito Tor Nativo',
      description: 'Todo o tráfego é encapsulado por padrão dentro de serviços ocultos Onion v3. Seu endereço IP real nunca toca a clearnet.',
      tag: 'ONION'
    },
    {
      id: '03',
      title: 'Escrow Monero (XMR)',
      description: 'Liquidação financeira protegida por transações multisig em Monero. Privacidade financeira absoluta com assinaturas em anel nativas.',
      tag: 'CRYPTO'
    },
    {
      id: '04',
      title: 'Sovereign Architecture',
      description: 'Memória RAM efêmera. O sistema opera em ambientes isolados e não grava logs de auditoria, histórico de transações ou rastros de sessão.',
      tag: 'RAM-ONLY'
    }
  ];
}

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  tag: string;
}

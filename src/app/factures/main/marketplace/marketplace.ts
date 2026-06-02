import { Component } from '@angular/core';

@Component({
  selector: 'rd-marketplace',
  imports: [],
  templateUrl: './marketplace.html',
  styleUrl: './marketplace.css',
})
export class Marketplace {

  marketItems: MarketItem[] = [
    { id: 'TX-8921', category: 'DATA', title: 'Encrypted Router Config Pack', price: 1.45, status: 'COMPLETED', vendor: 'anon_ops' },
    { id: 'TX-4402', category: 'SECU', title: 'Zero-Day Patch Auditing Tool', price: 12.80, status: 'ACTIVE', vendor: 'sh4dow' },
    { id: 'TX-1198', category: 'NETW', title: 'Premium Onion Circuit Relay Node', price: 0.95, status: 'COMPLETED', vendor: 'tor_master' },
    { id: 'TX-7651', category: 'CODE', title: 'Custom Anti-Forensics Script (Rust)', price: 4.20, status: 'PENDING', vendor: 'rust_ace' },
    { id: 'TX-3092', category: 'CRED', title: 'Sovereign ID Verification Package', price: 8.50, status: 'COMPLETED', vendor: 'ghost_id' }
  ];

}

interface MarketItem {
  id: string;
  category: string;
  title: string;
  price: number; // Em Monero (XMR)
  status: 'COMPLETED' | 'PENDING' | 'ACTIVE';
  vendor: string;
}
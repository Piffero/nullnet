import { Component, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'rd-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.css',
})
export class Stats implements OnInit, OnDestroy {
  // Signals que simulam métricas que mudam em tempo real
  activeNodes = signal<number>(1429);
  moneroVolume = signal<string>('318,410');
  encryptedMessages = signal<string>('8.4M');
  networkLatency = signal<number>(412);

  private updateInterval: any;

  ngOnInit() {
    // Simula pequenas flutuações na rede em tempo real (estética hacker)
    this.updateInterval = setInterval(() => {
      // Oscila o número de nós ativos (+- 2)
      this.activeNodes.update(n => n + (Math.random() > 0.5 ? 1 : -1));
      
      // Oscila a latência do circuito Tor
      this.networkLatency.set(Math.floor(Math.random() * (450 - 390) + 390));
    }, 4000);
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}

interface StatItem {
  label: string;
  value: string | number;
  unit?: string;
  glowColor?: string;
}
import { Component, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'rd-terminal',
  imports: [],
  templateUrl: './terminal.html',
  styleUrls: [],
})
export class Terminal implements OnInit, OnDestroy {
  // Signal que armazena as linhas que estão visíveis na tela
  visibleLines = signal<TerminalLine[]>([]);
  
  // Script pré-programado de inicialização
  private bootSequence: TerminalLine[] = [
    { text: 'initializing nullnet core v0.9.3-rc...', type: 'system' },
    { text: 'loading onion routing modules...', type: 'system' },
    { text: 'tor daemon started (pid: 8421)', type: 'success' },
    { text: 'establishing circuit: guard → relay → exit', type: 'system' },
    { text: 'circuit status: [CONNECTED] in 412ms', type: 'success' },
    { text: 'binding monero-wallet-rpc to localhost:18082...', type: 'system' },
    { text: 'monero node synchronized at height 3659633', type: 'success' },
    { text: 'warning: zero-log policy active. local memory is ephemeral.', type: 'warning' },
    { text: 'awaiting incoming p2p connections on port 9050...', type: 'command' }
  ];

  private timeouts: any[] = [];

  ngOnInit() {
    this.runBootSequence();
  }

  private async runBootSequence() {
    // Limpa o terminal antes de começar
    this.visibleLines.set([]);

    // Percorre a sequência injetando atrasos aleatórios para parecer digitação real
    for (const line of this.bootSequence) {
      await this.delay(Math.random() * 400 + 200); // Entre 200ms e 600ms
      this.visibleLines.update(lines => [...lines, line]);
    }
  }

  // Helper para criar uma pausa assíncrona limpa
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => {
      const t = setTimeout(resolve, ms);
      this.timeouts.push(t);
    });
  }

  // Permite que o usuário reinicie o log clicando no botão do terminal
  clearAndRestart() {
    this.runBootSequence();
  }

  ngOnDestroy() {
    // Evita vazamento de memória cancelando timers se o usuário mudar de página
    this.timeouts.forEach(t => clearTimeout(t));
  }
}

interface TerminalLine {
  text: string;
  type: 'command' | 'system' | 'success' | 'warning';
}
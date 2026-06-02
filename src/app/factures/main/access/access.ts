import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rd-access',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './access.html',
  styleUrl: './access.css',
})
export class Access {
  // Signals para capturar os inputs do utilizador
  inviteToken = signal<string>('');
  securityCode = signal<string>(''); // Código TOTP de 6 dígitos

  // Gestão de estado do fluxo anti-bot (Filtro de Engenharia Social)
  step = signal<1 | 2>(1); // 1 = Validação do Convite, 2 = Desafio do 2FA
  totpUri = signal<string>(''); // Armazena a string otpauth:// retornada pelo PHP
  
  // Status de processamento e feedback da interface
  isSubmitting = signal<boolean>(false);
  accessStatus = signal<'IDLE' | 'GRANTED' | 'DENIED'>('IDLE');
  errorMessage = signal<string>('');

  // URL base do seu ecossistema Slim Framework local
  private readonly API_BASE = 'http://localhost:5600/web/v1/access';

  /**
   * Coordena o fluxo de acesso em duas etapas para mitigar brute force e afastar curiosos.
   */
  async handleAccessFlow(event: Event): Promise<void> {
    event.preventDefault();
    
    // Evita submissões vazias ou cliques duplos durante o processamento
    if (!this.inviteToken().trim() || this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    try {
      if (this.step() === 1) {
        await this.executeChallengeStep();
      } else {
        await this.executeVerificationStep();
      }
    } catch (error) {
      this.errorMessage.set('Falha crítica na comunicação com a malha interna do ecossistema.');
      this.accessStatus.set('DENIED');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  /**
   * ETAPA 1: Envia o código de convite para verificar se existe e recolhe o QR Code (TOTP)
   */
  private async executeChallengeStep(): Promise<void> {
    console.log('Enviando código de convite para validação...', this.inviteToken());
    const response = await fetch(`${this.API_BASE}/challenge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invite_code: this.inviteToken().trim() })
    });

    const data = await response.json();

    if (response.ok && data.status === 'success') {
      this.totpUri.set(data.uri); // Guarda a URI gerada pelo TotpUriBuilder do PHP
      this.step.set(2);           // Altera a interface para exibir o QR Code e o input de 6 dígitos
    } else {
      this.errorMessage.set(data.message || 'Código de convite inválido ou malformado.');
      this.accessStatus.set('DENIED');
    }
  }

  /**
   * ETAPA 2: Envia o convite + o token dinâmico gerado no dispositivo isolado do utilizador
   */
  private async executeVerificationStep(): Promise<void> {
    if (!this.securityCode().trim() || this.securityCode().trim().length !== 6) {
      this.errorMessage.set('O código de segurança dinâmico deve conter exatamente 6 dígitos.');
      return;
    }

    const response = await fetch(`${this.API_BASE}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        invite_code: this.inviteToken().trim(),
        security_code: this.securityCode().trim() // Capturado pelo WebRateLimitMiddleware no PHP
      })
    });

    const data = await response.json();

    if (response.ok && data.status === 'success') {
      this.accessStatus.set('GRANTED');
      // Sucesso total. Aqui podes guardar o data.network_token de forma segura (ex: sessionStorage)
    } else {
      this.errorMessage.set(data.message || 'Código dinâmico inválido ou já expirado.');
      this.accessStatus.set('DENIED');
    }
  }

  /**
   * Função utilitária para codificar a URI do TOTP diretamente no template HTML
   */
  encodeURIComponent(str: string): string {
    return encodeURIComponent(str);
  }
}
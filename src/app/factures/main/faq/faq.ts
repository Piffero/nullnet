import { Component } from '@angular/core';

@Component({
  selector: 'rd-faq',
  imports: [],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  // Mapeia o estado aberto/fechado de cada bloco de forma independente
  activeIndices: { [key: number]: boolean } = {};

  toggleItem(index: number): void {
    this.activeIndices[index] = !this.activeIndices[index];
  }
}

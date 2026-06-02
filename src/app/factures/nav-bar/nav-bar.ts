import { Component } from '@angular/core';

@Component({
  selector: 'rd-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  // Lista de links com a estética de comentários de código desejada
  links: NavLink[] = [
    { path: '#features', label: '// recursos' },
    { path: '#market', label: '// mercado' },
    { path: '#security', label: '// opsec' },
    { path: '#access', label: '// acesso' },
    { path: '#faq', label: '// faq' }
  ];
}

interface NavLink {
  path: string;
  label: string;
}
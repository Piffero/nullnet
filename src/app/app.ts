import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './factures/top-bar/top-bar';
import { MatrixRain } from './factures/matrix-rain/matrix-rain';
import { NavBar } from './factures/nav-bar/nav-bar';
import { Hero } from './factures/main/hero/hero';
import { Stats } from './factures/main/stats/stats';
import { Features } from './factures/main/features/features';
import { Terminal } from './factures/main/terminal/terminal';
import { Marketplace } from './factures/main/marketplace/marketplace';
import { Security } from './factures/main/security/security';
import { Access } from './factures/main/access/access';
import { Faq } from './factures/main/faq/faq';
import { Footer } from './factures/footer/footer';

@Component({
  selector: 'app-root',
  imports: [TopBar, MatrixRain, NavBar, Footer,
    Hero, Stats, Features, Terminal, Marketplace, Security,
    Access, Faq],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nullnet-site');
}

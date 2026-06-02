import { Component, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'rd-top-bar',
  imports: [],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar implements OnInit, OnDestroy {
  time = signal<string>('--:--:--');
  private clockInterval: any;

  ngOnInit() {
    this.clockInterval = setInterval(() => {
      this.time.set(new Date().toUTCString().slice(17, 25));
    }, 1000);
  }

  ngOnDestroy() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }
}

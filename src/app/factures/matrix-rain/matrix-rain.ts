import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'rd-matrix-rain',
  imports: [],
  templateUrl: './matrix-rain.html',
  styleUrl: './matrix-rain.css',
})
export class MatrixRain implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('matrixCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D | null;
  private animationFrameId!: number;
  private fontSize = 14;
  private columns = 0;
  private drops: number[] = [];
  private chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&';

  ngOnInit() {}

  ngAfterViewInit() {
    this.initializeCanvas();
    this.animate();
  }

  @HostListener('window:resize')
  onResize() {
    this.initializeCanvas();
  }

  private initializeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.columns = Math.floor(canvas.width / this.fontSize);
    
    this.drops = [];
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * -100; 
    }
  }

  private animate = () => {
    if (!this.ctx) return;
    const canvas = this.canvasRef.nativeElement;

    // Fundo escuro do tema hacker (#131a17) com opacidade para dar efeito de rastro (fade)
    this.ctx.fillStyle = 'rgba(19, 26, 23, 0.08)'; 
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cor verde esmeralda pura para os caracteres
    this.ctx.fillStyle = '#22c55e'; 
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.chars[Math.floor(Math.random() * this.chars.length)];
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      this.ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

}

declare module 'qrious' {
  interface QRiousOptions {
    element?: HTMLCanvasElement | HTMLImageElement;
    background?: string;
    backgroundAlpha?: number;
    foreground?: string;
    foregroundAlpha?: number;
    level?: 'L' | 'M' | 'Q' | 'H';
    mime?: string;
    padding?: number;
    size?: number;
    value?: string;
  }

  export default class QRious {
    constructor(options?: QRiousOptions);
    background: string;
    backgroundAlpha: number;
    foreground: string;
    foregroundAlpha: number;
    level: string;
    mime: string;
    padding: number;
    size: number;
    value: string;
    canvas: HTMLCanvasElement;
    image: HTMLImageElement;
    
    set(options: Partial<QRiousOptions>): void;
    toDataURL(mime?: string): string;
  }
}

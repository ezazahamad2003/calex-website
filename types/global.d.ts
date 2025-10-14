// Global type declarations for gtag analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export {};
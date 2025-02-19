export {};

declare global {
  interface Window {
    api: {
      greet: (name: string) => Promise<string>;
    };
  }
}

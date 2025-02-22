export {};

declare global {
  interface Window {
    api: {
      greet: (name: string) => Promise<string>;
      getCats: (url: string) => Promise<Array<{ url: string }>>;
      fetchData: (url: string) => Promise<string>;
    };
  }
}

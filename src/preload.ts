// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  greet: (name: string) => ipcRenderer.invoke("greet", name),
  getCats: (url: string) => ipcRenderer.invoke("get-cats", url),
  fetchData: (url: string) => ipcRenderer.invoke("fetch-data", url),
});

ipcRenderer.on("process-output", (_event, payload) => {
  console.log("Processed payload: ", payload);
});

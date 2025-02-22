import { isElectron } from "utils";

const greet = async (name: string): Promise<string> => {
  if (isElectron()) {
    return window.api.greet(name + " from Electron!");
  } else {
    return new Promise((resolve) => resolve(name + " from Web!"));
  }
};

const api = {
  greet,
  // get
};

export { api };

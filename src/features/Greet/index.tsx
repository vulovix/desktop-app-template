import { Text } from "@mantine/core";
import { useEffect, useState } from "react";

export function Greet() {
  const [name, setName] = useState("");
  useEffect(() => {
    (async () => {
      setName(await window.api.greet("World"));
    })();
  }, []);
  return <Text>Hello, {name}!</Text>;
}

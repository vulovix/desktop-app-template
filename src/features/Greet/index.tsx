import { Text } from "@mantine/core";
import { api } from "api";
import { useEffect, useState } from "react";

export function Greet() {
  const [name, setName] = useState("");
  useEffect(() => {
    (async () => {
      setName(await api.greet("World"));
    })();
  }, []);
  return <Text>Hello {name}</Text>;
}

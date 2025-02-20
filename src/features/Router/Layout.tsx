import { Container } from "@mantine/core";
import { Header } from "components/Header/Header";
import { PropsWithChildren } from "react";

export function Layout(props: PropsWithChildren<unknown>) {
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
}

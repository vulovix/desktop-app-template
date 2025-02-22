import { Container } from "@mantine/core";
import { Footer } from "components/Footer/Footer";
import { Header } from "components/Header/Header";
import { PropsWithChildren } from "react";

export function Layout(props: PropsWithChildren<unknown>) {
  return (
    <>
      <Header />
      <Container py="sm" mih={"calc(100dvh - 56px - 98px)"}>
        {props.children}
      </Container>
      <Footer />
    </>
  );
}

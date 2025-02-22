import { Container } from "@mantine/core";
import { Footer } from "components/Footer/Footer";
import { Header } from "components/Header/Header";
import { PropsWithChildren } from "react";

export function DefaultLayout(props: PropsWithChildren<unknown>) {
  return (
    <>
      <Header />
      <Container py="sm" mih={"calc(100dvh - 56px - 98px - 2px)"}>
        {props.children}
      </Container>
      <Footer />
    </>
  );
}

import { Button, Container, Group, Text } from "@mantine/core";
import { VscGithub } from "react-icons/vsc";
import "./Hero.scss";

export function Hero() {
  return (
    <div className={"hero-wrapper"}>
      <Container size={700} className={"inner"}>
        <h1 className={"title"}>
          A Fully Equiped&nbsp;
          <Text component="span" variant="gradient" gradient={{ from: "blue", to: "pink" }} inherit>
            Electron &middot; React & PWA
          </Text>
          &nbsp;Project Starter
        </h1>

        <Text className={"description"} c="dimmed">
          Build fully featured accessible web applications with ease with help of React Router, Redux Toolkit, Redux Saga, React Intl, Mantine UI and SCSS.
        </Text>

        <Group className={"controls"}>
          <Button
            component="a"
            href="https://github.com/vulovix/full-crack"
            size="xl"
            variant="default"
            className={"control"}
            target="_blank"
            leftSection={<VscGithub size={20} />}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}

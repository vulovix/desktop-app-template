import { ActionIcon, Container, Group, Image, Text } from "@mantine/core";
import { VscGithub, VscTwitter } from "react-icons/vsc";
import logo from "assets/images/logo.png";
import "./Footer.scss";

export function Footer() {
  return (
    <div className={"footer-wrapper"}>
      <Container className={"inner"}>
        <Group>
          <Image src={logo} />
          <Text fz="sm" fw="bold">
            Full Crack &copy; All Rights Reserved
          </Text>
        </Group>
        <Group gap={0} className={"links"} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <VscTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <VscGithub size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

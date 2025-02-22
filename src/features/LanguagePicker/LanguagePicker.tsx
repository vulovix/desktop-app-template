import { Box, Group, Image, Menu, UnstyledButton } from "@mantine/core";
import { useLanguageProvider } from "providers/Language";
import { useEffect, useState } from "react";
// import { VscArrowDown } from 'react-icons/vsc';
import "./LanguagePicker.scss";
import enIcon from "assets/images/english.png";
import deIcon from "assets/images/german.png";

const data = [
  { id: "en", label: "English", image: enIcon },
  { id: "de", label: "German", image: deIcon },
];

export function LanguagePicker() {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(data[0]);
  const { setLocale } = useLanguageProvider();
  useEffect(() => {
    setLocale(selected.id);
  }, [selected]);
  const items = data.map((item) => (
    <Menu.Item leftSection={<Image src={item.image} width={18} height={18} />} onClick={() => setSelected(item)} key={item.label}>
      {item.label}
    </Menu.Item>
  ));

  return (
    <Box className="language-picker-wrapper">
      <Menu onOpen={() => setOpened(true)} onClose={() => setOpened(false)} radius="md" width="target" withinPortal>
        <Menu.Target>
          <UnstyledButton className={"control"} data-expanded={opened || undefined}>
            <Group gap="xs">
              <Image src={selected.image} width={22} height={22} />
              <span className={"label"}>{selected.label}</span>
            </Group>
            {/* <VscArrowDown size={16} className={'icon'} /> */}
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>{items}</Menu.Dropdown>
      </Menu>
    </Box>
  );
}

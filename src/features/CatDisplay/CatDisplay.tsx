import { Box, Button, Image, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CATCONTROLLER_SCOPE } from "features/CatDisplay/constants";
import { useAppDispatch, useAppSelector } from "libs/redux/hooks";
import { useEffect } from "react";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import saga from "./saga";
import { selectCatImageLoading, selectCatImageUrl } from "./selectors";
import { actions, reducer } from "./slice";

export function CatDisplay() {
  useInjectReducer({ key: CATCONTROLLER_SCOPE, reducer });
  useInjectSaga({ key: CATCONTROLLER_SCOPE, saga });

  const dispatch = useAppDispatch();
  const catImageUrl = useAppSelector(selectCatImageUrl);
  const catImageLoading = useAppSelector(selectCatImageLoading);
  const [opened, { open, close }] = useDisclosure(false);
  const handleGetCat = () => {
    dispatch(actions.getCatImage());
  };
  useEffect(() => {
    if (catImageUrl) {
      open();
    }
  }, [catImageUrl]);

  return (
    <Box>
      <Modal title={<Title size={"h4"}>Meow!</Title>} opened={opened} onClose={close}>
        <Image src={catImageUrl} />
      </Modal>
      <Button loading={catImageLoading} size="xs" onClick={handleGetCat} variant="default">
        New Cat
      </Button>
    </Box>
  );
}

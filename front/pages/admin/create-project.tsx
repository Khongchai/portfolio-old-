import { Box } from "@chakra-ui/react";
import React from "react";
import { homeURL } from "../../constants/homeUrl";
import { checkAuthAndRedirect } from "../../utils/auth/checkAuthAndRedirect";

interface createProps {}

const Create: React.FC<createProps> = ({}) => {
  checkAuthAndRedirect(homeURL);
  return <Box mt="20rem">Create admin page</Box>;
};

export default Create;

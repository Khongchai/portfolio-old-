import { Box } from "@chakra-ui/react";
import React from "react";
import { checkAuthAndRedirect } from "../../../utils/auth/checkAuthAndRedirect";

interface createProps {}

const Create: React.FC<createProps> = ({}) => {
  checkAuthAndRedirect("/tech");
  return <Box mt="20rem">Create admin page</Box>;
};

export default Create;

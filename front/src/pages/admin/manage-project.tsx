import { Box, Flex, scaleFadeConfig, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { AdminAllProjectList } from "../../components/admin/AdminAllProjectList";
import { Info } from "../../components/admin/info";
import { homeURL } from "../../constants/homeUrl";
import { checkAuthAndRedirect } from "../../utils/auth/checkAuthAndRedirect";
import setFirstHeightToSecondPadding from "../../utils/generics/setFirstHeightToSecondPadding";

interface createProps {}

const Create: React.FC<createProps> = ({}) => {
  checkAuthAndRedirect(homeURL);
  const [view, setView] =
    useState<"Technology View" | "Project View">("Project View");
  const adminEdit = useRef(null);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar && adminEdit.current) {
      setFirstHeightToSecondPadding(
        navbar,
        adminEdit.current as unknown as HTMLElement
      );
    }
  });
  return (
    <Box id="admin-edit-container" padding="2rem" ref={adminEdit}>
      <Text
        id="current-view"
        fontSize="2rem"
        textAlign="center"
        cursor="pointer"
        w="100vw"
        onClick={() => {
          setView(view === "Project View" ? "Technology View" : "Project View");
        }}
        _hover={{ transform: "scale(1.3)" }}
        transition=".3s"
      >
        {view}
      </Text>
      <Flex width="100%" height="max(700px, 70vh)" id="info">
        <Info />
        <Box className="extra-action" flex="0.3">
          <Text
            cursor="pointer"
            onClick={() => {
              {
                /* TODO */
              }
            }}
          >
            Add a new proj
          </Text>
        </Box>
      </Flex>
      <AdminAllProjectList />
    </Box>
  );
};

export default Create;

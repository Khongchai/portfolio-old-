import React from "react";
import NextLink from "next/link";
import { Button, Flex } from "@chakra-ui/react";
import { useAdminLogoutMutation } from "../generated/graphql";
import { useRouter } from "next/router";

interface AdminAuthButtonProps {
  adminLoginState: boolean;
}

export const AdminAuthButton: React.FC<AdminAuthButtonProps> = ({
  adminLoginState,
}) => {
  const [, logout] = useAdminLogoutMutation();
  const router = useRouter();
  return adminLoginState ? (
    <Flex mr="auto" placeItems="center">
      <Button
        onClick={async () => {
          await logout();
          router.replace("/tech");
        }}
      >
        Admin Logout
      </Button>
    </Flex>
  ) : (
    <NextLink href="/tech/admin/">
      <Flex mr="auto" placeItems="center">
        <Button>Admin Login</Button>
      </Flex>
    </NextLink>
  );
};

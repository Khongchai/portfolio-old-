import { Box, Button, Grid } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { CustomFormikInputField } from "../../components/shared/CustomFormikInputField";
import { useAdminLoginMutation } from "../../generated/graphql";
import { checkAuthAndRedirect } from "../../utils/auth/checkAuthAndRedirect";

interface indexProps {}

const Admin: React.FC<indexProps> = ({}) => {
  const [, login] = useAdminLoginMutation();
  const router = useRouter();
  const targetURL = "admin/manage-project";
  checkAuthAndRedirect("admin", targetURL);

  return (
    <Grid
      width="100%"
      height="100vh"
      placeItems="center"
      className="form-container"
    >
      <Box
        height="400px"
        width="min(400px, 80%)"
        className="form"
        padding="1rem"
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setStatus }) => {
            const loginResult = await login({ input: values });
            if (loginResult.data?.adminLogin.error) {
              setStatus(loginResult.data.adminLogin.error);
            }
            if (loginResult.data?.adminLogin.admin) {
              router.replace(targetURL);
            }
          }}
        >
          {(props) => (
            <Form className="admin-login-form">
              <CustomFormikInputField
                placeholder="rick@rolled.com"
                name="email"
                label="Email"
              />
              <CustomFormikInputField
                placeholder="***"
                name="password"
                label="Password"
              />
              {props.status ? <ErrorMessage msg={props.status} /> : null}
              <Button
                mt={10}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Grid>
  );
};

const ErrorMessage: React.FC<{ msg: string }> = ({ msg }) => {
  return <Box color="pink">{msg}</Box>;
};

export default Admin;

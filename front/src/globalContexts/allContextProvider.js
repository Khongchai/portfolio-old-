import { ExtraElemProvider } from "./extraNavbarElem";
import { DefaultTopicsProvider } from "./navbarTopics";
import { AdminLoginContextProvider } from "./adminLoginContext";

export default function AllContextProvider({ children }) {
  return (
    <AdminLoginContextProvider>
      <ExtraElemProvider>
        <DefaultTopicsProvider>{children}</DefaultTopicsProvider>
      </ExtraElemProvider>
    </AdminLoginContextProvider>
  );
}

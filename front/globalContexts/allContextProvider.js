import { ExtraElemProvider } from "./extraNavbarElem";
import { DefaultTopicsProvider } from "./navbarTopics";

export default function AllContextProvider({ children }) {
  return (
    <ExtraElemProvider>
      <DefaultTopicsProvider>{children}</DefaultTopicsProvider>
    </ExtraElemProvider>
  );
}

import React, { createContext, useState } from "react";

//default value
export const AdminLoginContext = createContext({
  adminLoginState: false,
  setAdminLoginState: (state: boolean) => {},
});

export const AdminLoginContextProvider: React.FC = ({ children }) => {
  const [adminLoginState, setAdminLoginState] = useState(false);

  const provider = {
    adminLoginState,
    setAdminLoginState,
  };

  return (
    <AdminLoginContext.Provider value={provider}>
      {children}
    </AdminLoginContext.Provider>
  );
};

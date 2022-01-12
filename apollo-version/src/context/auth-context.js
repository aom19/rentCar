import React, { createContext } from "react";

export default React.createContext({
  token: null,
 
  isAdmin: null,
  email: null,
  login: (token, isAdmin, email) => {
    this.token = token;
    this.isAdmin = isAdmin;
    this.email = email;
  },
  logout: () => {},
});

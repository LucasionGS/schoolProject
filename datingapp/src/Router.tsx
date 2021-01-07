// import React from 'react';
// Import pages
import P_Index from "./pages/index/index";
import P_Login from "./pages/login/login";
import P_Register from "./pages/register/register";
import P_Profiles from "./pages/profiles/profiles";

function Router(props: {path: string, params: URLSearchParams}): JSX.Element {
  let {path} = props;
  do {
    switch (path.replace(/\/\/+/g, "/")) {
      case "/": return P_Index();
      case "/login": return P_Login();
      case "/register": return P_Register();
      case "/profiles": return P_Profiles();
    }

    path = path.substring(0, path.length - 1);
    window.history.replaceState("", "", path); // Set URL
  }
  while (path.length > 0);
  // If nothing is found...
  return P_Index();
}

export default Router; // Export router
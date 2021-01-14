import React from 'react';
import "./App.css";
import Router from "./Router";
import Header, { MenuItem } from "./components/Header/Header";
import { User } from './api/login/models';

const headerMenus: MenuItem[] = [
  {
    text: "Home",
    href: "/"
  },
  {
    text: "Profile Search",
    href: "/profiles"
  }
];

const user = User.currentUser;
if (user) {
  headerMenus.push(
    {
      text: "My Profile",
      href: "/profile/" + user.id
    },
    {
      text: "Log out",
      href() {
        User.logout();
        window.location.reload();
      }
    }
  );
}
else {
  headerMenus.push({
    text: "Login",
    href: "/login"
  });
}

function App() {
  return (
    <>
      <Header menuItems={headerMenus}/>
      <div className="App">
        <Router path={window.location.pathname} params={new URLSearchParams(window.location.search)}></Router>
      </div>
    </>
  );
}

export default App;

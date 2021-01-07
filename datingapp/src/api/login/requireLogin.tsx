import { User } from "./models";

function requireLogin() {
  if (!User.currentUser) location.href = "/login?ref=" + location.pathname;
}

export default requireLogin;
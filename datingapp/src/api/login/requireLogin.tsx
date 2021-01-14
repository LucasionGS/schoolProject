import { User } from "./models";

// This is "technically" an overload.
function requireLogin(): void;
function requireLogin(force: boolean): void;
function requireLogin(force?: boolean) {
  if (force === true || !User.currentUser) window.location.href = "/login?ref=" + window.location.pathname;
}

export default requireLogin;
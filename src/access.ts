import type { Access, PayloadRequest } from "payload";

type UserWithRole = PayloadRequest["user"] & {
  role?: "admin" | "editor";
};

export const anyone: Access = () => true;

export const loggedIn: Access = ({ req: { user } }) => Boolean(user);

export const adminsOnly: Access = ({ req: { user } }) =>
  Boolean(user && (user as UserWithRole).role === "admin");

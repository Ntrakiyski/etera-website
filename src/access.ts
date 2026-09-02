import type { Access, PayloadRequest } from "payload";

type CmsUser = Extract<
  NonNullable<PayloadRequest["user"]>,
  { collection: "users" }
>;

const isCmsUser = (user: PayloadRequest["user"]): user is CmsUser =>
  user?.collection === "users";

export const isAdminUser = (user: PayloadRequest["user"]) =>
  isCmsUser(user) && user.role === "admin";

export const anyone: Access = () => true;

export const loggedIn: Access = ({ req: { user } }) => isCmsUser(user);

export const adminsOnly: Access = ({ req: { user } }) =>
  isAdminUser(user);

export const adminsOrSelf: Access = ({ id, req: { user } }) => {
  if (!isCmsUser(user)) {
    return false;
  }

  if (user.role === "admin") {
    return true;
  }

  if (id) {
    return String(id) === String(user.id);
  }

  return {
    id: {
      equals: user.id,
    },
  };
};

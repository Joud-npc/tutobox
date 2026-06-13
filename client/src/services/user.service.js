import api from "./api";

export const deleteAccount = () =>
  api.delete("/users/account").then((res) => res.data);
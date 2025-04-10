import React from "react";
import UserList from "../../common/content/UserList";
import Settings from "../static/Settings";

const DbMarshaUsers = (): JSX.Element => {
  return <UserList userRole={Settings.UserRole} />;
};
export default DbMarshaUsers;

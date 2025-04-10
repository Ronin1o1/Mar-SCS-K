import React from "react";
import UserList from "../../common/content/UserList";
import Settings from "../static/Settings";

const RoomRateDescAdminUsers = (): JSX.Element => {
  return <UserList userRole={Settings.UserRole} />;
};
export default RoomRateDescAdminUsers;

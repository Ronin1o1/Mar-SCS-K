import React from "react";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { RequestEdie } from "./content/requestEdie";
import { RequestEdieContextProvider } from "./context/requestEdieContext";

const RequestEdieWrapper: React.FC = () => {
  return (
    <RequestEdieContextProvider>
      <RequestEdie />
    </RequestEdieContextProvider>
  );
};
export default RequestEdieWrapper;
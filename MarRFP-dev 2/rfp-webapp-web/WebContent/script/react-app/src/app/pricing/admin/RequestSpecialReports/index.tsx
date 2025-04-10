import React from "react";
import { useHistory } from "react-router-dom";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import RequestSpecialReports from "./content/RequestSpecialReports";
import { RequestSpecialReportsContextProvider } from "./context/RequestSpecialReportsContext";

const RequestSpecialReportsWrapper: React.FC = () => {
  const history = useHistory();
  return (
    <RequestSpecialReportsContextProvider key={history.location.key}>
      <RequestSpecialReports />
    </RequestSpecialReportsContextProvider>
  );
};

export default RequestSpecialReportsWrapper;

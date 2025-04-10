import React from "react";
import { useHistory } from "react-router-dom";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { RequestReport } from "./content/requestReport";
import { RequestEdieContextProvider } from "./context/requestReportContext";

const RequestReportWrapper: React.FC = () => {
  const history = useHistory();
  return (
    <RequestEdieContextProvider key={history.location.key}>
      <RequestReport />
    </RequestEdieContextProvider>
  );
};
export default RequestReportWrapper;

import React from "react";
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { CBCrequest } from "./content/CBCrequest";
import { CBCrequestContextProvider } from "./context/CBCrequestContext";

const CBCRequestWrapper: React.FC = () => {
  return (
    <CBCrequestContextProvider>
      <CBCrequest />
    </CBCrequestContextProvider>
  );
};
export default CBCRequestWrapper;
import React from "react";

import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import { PgoosPropagation } from "./content/PGOOSPropagation";
import { PgoosPropagationContextProvider } from "./context/PGOOSPropagationContext";
import { PgoosPropagationFinish } from "./content/PgoosPropagationFinish";

export const PgoosPropagationFinishWrapper: React.FC = () => {
  return (
    <PgoosPropagationContextProvider>
      <PgoosPropagationFinish />
    </PgoosPropagationContextProvider>
  );
};

const PgoosPropagationWrapper: React.FC = () => {
  return (
    <PgoosPropagationContextProvider>
      <PgoosPropagation />
    </PgoosPropagationContextProvider>
  );
};
export default PgoosPropagationWrapper;

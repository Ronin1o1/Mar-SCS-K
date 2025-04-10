import React from "react";
// Prime React CSS
import "primereact/resources/themes/nova/theme.css";
import "primereact/resources/primereact.css";
import CopyAccountInfo from "./content/CopyAccountInfo";
import { AccountListContextProvider } from "./context/AccountListContext";
import { RFPSettingsContextProvider } from "./content/AccntTab/RFPSettings/context/RFPSettingsContext";
import { SpecificQuestionsContextProvider } from "./content/AccntTab/Questions/context/SpecificQuestionsContext";
import { GroupMeetingsContextProvider } from "./content/AccntTab/GroupMeetings/context/GroupMeetingsContext";
import { ComplexityMatrixContextProvider } from "./content/AccntTab/ComplexityMatrix/context/ComplexityMatrixContext";
import { McadlookupContextProvider } from "./content/AccntTab/MCADLookup/context/McadlookupContext";
import { CriticalFieldsContextProvider } from "./content/AccntTab/CriticalFields/context/CriticalFieldsContext";
import { RateLoadingContextProvider } from "./content/AccntTab/RateLoading/context/RateLoadingContext";
const CopyAccountInfoWrapper = () => {
  return (
    <>
      <AccountListContextProvider>
        <RFPSettingsContextProvider>
          <SpecificQuestionsContextProvider>
            <GroupMeetingsContextProvider>
              <ComplexityMatrixContextProvider>
                <McadlookupContextProvider>
                  <CriticalFieldsContextProvider>
                    <RateLoadingContextProvider>
                      <CopyAccountInfo />
                    </RateLoadingContextProvider>
                  </CriticalFieldsContextProvider>
                </McadlookupContextProvider>
              </ComplexityMatrixContextProvider>
            </GroupMeetingsContextProvider>
          </SpecificQuestionsContextProvider>
        </RFPSettingsContextProvider>
      </AccountListContextProvider>
      ,
    </>
  );
};

export default CopyAccountInfoWrapper;

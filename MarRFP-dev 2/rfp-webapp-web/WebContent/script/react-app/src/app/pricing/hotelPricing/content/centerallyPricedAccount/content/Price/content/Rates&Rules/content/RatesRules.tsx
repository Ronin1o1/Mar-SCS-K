import React from "react";
import RatesRulesContext, {
  RatesRulesContextProvider,
} from "../context/RatesRulesContextProvider";
import { CLoader } from "../../../../../../../../../common/components/CLoader";
import { RatesRulesWithTop } from "./RatesRulesWithTop";
import ApplicationContext from "../../../../../../../../../common/components/ApplicationContext";

let contextType = null;
let mainContext = null;
class RatesRules extends React.Component {
  render() {
    return (
      <ApplicationContext.Consumer>
        {(appContext) => {
          mainContext = appContext;
          return (
            <>
              <RatesRulesContextProvider>
                <RatesRulesContext.Consumer>
                  {(CenterallyPricedAccount) => {
                    contextType = CenterallyPricedAccount;
                    if (contextType.pageLoader) {
                      return <CLoader />;
                    } else {
                      return (
                        <>
                          <RatesRulesWithTop
                            contextType={contextType}
                            ratesData={contextType?.ratesData}
                          />
                        </>
                      );
                    }
                  }}
                </RatesRulesContext.Consumer>
              </RatesRulesContextProvider>
              <style>{`
              @media only screen and (max-width: 1000px) {
                .page_body_container {
                min-height: calc(100vh - 90px);
                }
              }
              `}</style>
            </>
          );
        }}
      </ApplicationContext.Consumer>
    );
  }
}

export default RatesRules;

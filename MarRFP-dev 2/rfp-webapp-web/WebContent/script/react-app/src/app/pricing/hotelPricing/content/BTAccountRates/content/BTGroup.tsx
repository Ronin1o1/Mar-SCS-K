import React from "react";
import { Layout } from "../../../routing/Layout";
import { RatesRulesContextProvider } from "../../centerallyPricedAccount/content/Price/content/Rates&Rules/context/RatesRulesContextProvider";
import { BTGroupContextProvider } from "../context/BTGroupContextProvider";
import { BTGroupWithRules } from "./BTGroupWithRules";

function BTGroup() {
  return (
    <RatesRulesContextProvider>
      <BTGroupContextProvider>
        <Layout hideButtons={true}>
          <BTGroupWithRules />
        </Layout>
      </BTGroupContextProvider>
    </RatesRulesContextProvider>
  );
}

export default BTGroup;

import React, { useContext, useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PriceContact from "./content/PricingContact/content/priceContact";
import CPACTabs from "./content/centerallyPricedAccount/content/Tabs/CPACTabs";
import SelectHotelPricing from "./content/SelectHotelProperty/content/SelectHotelPricing";
import EligibilityAmenity from "./content/EligibilityAmenity/content/EligibilityAmenity";
import { HotelPricingContextProvider } from "./context/hotelPricingContextProvider";
import DepthOfSales from "./content/DepthOfSale/content/pricingHotelDepthOfSales";
import Blackout from "./content/Blackout/content/Blackout";
import GroupsMeetings from "./content/GroupsMeetings/content/groupsMeeting";
import HotelAccountQuestions from "./content/centerallyPricedAccount/content/hotelAccountQuestions/hotelAccountQuestions";
import "../../common/assets/styles/calendar.css";
import PricingStandard from "./content/Standards/content/PricingStandards";
import PrintAccountContainer from "./content/centerallyPricedAccount/content/Price/content/PrintAccountContainer";
import Reports from "./content/Reports/content/Reports";
import DirectReports from "./content/Reports/content/DirectReport";
import TopTravelMarket from "./content/Reports/content/TopTravelMarket";
import SCPTApp from "./content/scpt/SCPTApp";
//import { FinishAndSave } from "./content/FinishAndSave/content/FinishAndSave";
import ToolsResourcesGrid from "./content/Reports/content/ToolsResourcesGrid";
import MultipleBlackouts from "./content/MultipleBlackout/content/MultipleBlackouts";
import ApplicationContext, {
  IApplicationContext,
} from "../../common/components/ApplicationContext";
//import PriceContactReadOnly from "./content/PricingContact/content/PriceContactReadOnly";
import BTGroup from "./content/BTAccountRates/content/BTGroup";
import { RatesRulesContextProvider } from "./content/centerallyPricedAccount/content/Price/content/Rates&Rules/context/RatesRulesContextProvider";
import FixedSeasons from "./content/FixedSeasons/content/FixedSeasons";

const HotelPricing: React.FC = () => {
  const appContext: IApplicationContext = useContext(ApplicationContext);

  const { path } = useRouteMatch();
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("hotelRefreshData");
    };
  }, []);
  return (
    <RatesRulesContextProvider>
      <HotelPricingContextProvider>
        <Switch>
          <Route
            path={`${path}/SelectHotelPricing`}
            component={SelectHotelPricing}
          />

          <Route path={`${path}/GeneralPricing`} component={PriceContact} />

          <Route path={`${path}/PriceContact`} component={PriceContact} />

          <Route
            path={`${path}/eligibilityAmenity`}
            component={EligibilityAmenity}
          />
          <Route path={`${path}/CPAC`} component={CPACTabs} />
          <Route path={`${path}/DepthOfSale`} component={DepthOfSales} />
          <Route path={`${path}/Standards`} component={PricingStandard} />
          <Route path={`${path}/Blackout`} component={Blackout} />
          <Route path={`${path}/GroupsMeetings`} component={GroupsMeetings} />
          <Route path={`${path}/SCPT`} component={SCPTApp} />
          <Route
            path={`${path}/HotelAccountQuestions`}
            component={HotelAccountQuestions}
          />
          <Route
            path={`${path}/printAccountContainer`}
            component={PrintAccountContainer}
          />
          <Route path={`${path}/hotelPricingreport`} component={Reports} />
          <Route path={`${path}/hotelReports`} component={DirectReports} />
          <Route path={`${path}/topTravelMarket`} component={TopTravelMarket} />
          <Route
            path={`${path}/hotelPricingTools`}
            component={ToolsResourcesGrid}
          />
          <Route
            path={`${path}/multipleBlackout`}
            component={MultipleBlackouts}
          />
          <Route path={`${path}/btAccountRates`} component={BTGroup} />
          <Route path={`${path}/Seasons`} component={FixedSeasons} />
        </Switch>
      </HotelPricingContextProvider>
    </RatesRulesContextProvider>
  );
};

export default HotelPricing;

import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import CPACTabs from "../content/Tabs/CPACTabs";


it("renders without crashing", () => {
  mount(<CPACTabs />);
});

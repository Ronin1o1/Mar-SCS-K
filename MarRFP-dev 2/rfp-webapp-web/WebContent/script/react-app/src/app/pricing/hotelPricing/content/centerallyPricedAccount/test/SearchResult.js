import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import CPACSearchResults from "../content/AccountCenter";


it("renders without crashing", () => {
  mount(<CPACSearchResults />);
});

import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import PortfolioSelection from "../content/PortfolioSelection";

describe("PortfolioSelection", () => {
  it("renders without crashing", () => {
    mount(<PortfolioSelection />);
  });

  it("renders correctly", () => {
    const tree = mount(<PortfolioSelection />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});

import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import GeneralViewReports from "../content/ViewReports";

it("renders without crashing", () => {
  mount(<GeneralViewReports />);
});

it("renders correctly", () => {
  const tree = mount(<GeneralViewReports />);
  expect(toJson(tree)).toMatchSnapshot();
});

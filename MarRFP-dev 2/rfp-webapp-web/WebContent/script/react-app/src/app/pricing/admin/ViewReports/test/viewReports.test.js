import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import ViewReports from "../content/ViewReports";

it("renders without crashing", () => {
  mount(<ViewReports />);
});

it("renders correctly", () => {
  const tree = mount(<ViewReports />);
  expect(toJson(tree)).toMatchSnapshot();
});


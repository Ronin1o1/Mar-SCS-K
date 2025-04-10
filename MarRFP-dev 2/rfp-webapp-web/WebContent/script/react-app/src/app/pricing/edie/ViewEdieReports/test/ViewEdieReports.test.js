import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import ViewEdieReports from "../content/ViewEdieReports";

it("renders without crashing", () => {
  mount(<ViewEdieReports />);
});

it("renders correctly", () => {
  const tree = mount(<ViewEdieReports />);
  expect(toJson(tree)).toMatchSnapshot();
});


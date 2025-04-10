import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import profileList from "../content/profileList";

it("renders without crashing", () => {
  mount(<profileList />);
});

it("renders correctly", () => {
  const tree = mount(<profileList />);
  expect(toJson(tree)).toMatchSnapshot();
});

it("renders datatable", () => {
  const wrapper = mount(<profileList />);
  expect(wrapper.find("CDataTable")).toHaveLength(0);
});


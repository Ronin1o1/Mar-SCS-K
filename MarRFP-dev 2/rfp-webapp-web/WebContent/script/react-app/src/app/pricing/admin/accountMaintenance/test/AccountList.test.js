import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import AccountList from "../content/AccountList";
import { BrowserRouter } from 'react-router-dom'

it("renders without crashing", () => {
  <BrowserRouter >
  mount(<AccountList />);
  </BrowserRouter>
});

it("renders correctly", () => {
  const tree = mount(<AccountList />);
  expect(toJson(tree)).toMatchSnapshot();
});

it("renders Account List datatable", () => {
  const wrapper = mount(<AccountList />);
  expect(wrapper.find("CDataTable")).toHaveLength(1);
});


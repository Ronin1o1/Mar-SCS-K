import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import {CBCStatus}from "../content/CBCStatus";
import CModal from '../../../../common/components/CModal';

it("renders without crashing", () => {
  mount(<CBCStatus />);
});

it("renders correctly", () => {
  const tree = mount(<CBCStatus />);
  expect(toJson(tree)).toMatchSnapshot();
});

it("renders CModal without crashing", () => {
  mount(<CModal />);
});

it("renders CModal correctly", () => {
  const tree = mount(<CModal />);
  expect(toJson(tree)).toMatchSnapshot();
});



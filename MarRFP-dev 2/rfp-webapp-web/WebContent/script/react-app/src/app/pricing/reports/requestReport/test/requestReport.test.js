import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import {RequestReport}from "../content/requestReport";
import CModal from '../../../../common/components/CModal';

it("renders without crashing", () => {
  mount(<RequestReport />);
});

it("renders correctly", () => {
  const tree = mount(<RequestReport />);
  expect(toJson(tree)).toMatchSnapshot();
});

it("renders CModal without crashing", () => {
  mount(<CModal />);
});

it("renders CModal correctly", () => {
  const tree = mount(<CModal />);
  expect(toJson(tree)).toMatchSnapshot();
});



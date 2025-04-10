import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import {RequestEdie}from "./../content/requestEdie";
import CModal from './../../../../common/components/CModal';

it("renders without crashing", () => {
  mount(<RequestEdie />);
});

it("renders correctly", () => {
  const tree = mount(<RequestEdie />);
  expect(toJson(tree)).toMatchSnapshot();
});

it("renders CModal without crashing", () => {
  mount(<CModal />);
});

it("renders CModal correctly", () => {
  const tree = mount(<CModal />);
  expect(toJson(tree)).toMatchSnapshot();
});



import React from "react";
import { mount,render,fireEvent,getAllByRole,find } from "enzyme";
import toJson from "enzyme-to-json";
import CopyAccount from "../content/AccountTier";

it("renders without crashing", () => {
  mount(<CopyAccount />);
});

it("renders correctly", () => {
  const tree = mount(<CopyAccount />);
  expect(toJson(tree)).toMatchSnapshot();
});

it("renders account Segment", () => {
  const wrapper = mount(<CopyAccount />);
  expect(wrapper.find("accountSegment"));
});

it("renders account Segment", () => {
  const wrapper = mount(<CopyAccount />);
  expect(wrapper.find("fromPeriod"));
});

it("renders account Segment", () => {
  const wrapper = mount(<CopyAccount />);
  expect(wrapper.find("toPeriod"));
});


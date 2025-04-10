import React from "react";
import { mount,render,fireEvent,getAllByRole,find } from "enzyme";
import toJson from "enzyme-to-json";
import CopyAccount from "../content/SappAccount";

it("renders without crashing", () => {
  mount(<CopyAccount />);
});




it("renders from Period", () => {
  const wrapper = mount(<CopyAccount />);
  expect(wrapper.find("fromYear"));
});

it("renders from Period", () => {
  const wrapper = mount(<CopyAccount />);
  expect(wrapper.find("toYear"));
});

it("renders from Account", () => {
  const wrapper = mount(<CopyAccount />);
  expect(wrapper.find("accountFrom"));
});

it("renders to Account", () => {
  const wrapper = mount(<CopyAccount />);
  expect(wrapper.find("accountTo"));
});


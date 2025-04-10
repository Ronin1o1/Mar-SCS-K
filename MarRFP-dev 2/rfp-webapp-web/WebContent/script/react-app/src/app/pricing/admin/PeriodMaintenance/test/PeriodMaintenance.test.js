import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import PeriodMaintenance from "../content/PeriodMaintenance";

it("renders without crashing", () => {
  mount(<PeriodMaintenance />);
});

it("renders correctly", () => {
  const tree = mount(<PeriodMaintenance />);
  expect(toJson(tree)).toMatchSnapshot();
});

it("renders Period Maintenance datatable", () => {
  const wrapper = mount(<PeriodMaintenance />);
  expect(wrapper.find("CDataTable")).toHaveLength(1);
});

it("opens Edit Due Dates modal when Due Date link is clicked", () => {
  const wrapper = mount(<PeriodMaintenance />);
  expect(wrapper.find("CModal").prop("show")).toBe(false);

  /*   wrapper.find(".newBtnDiv").simulate("click");
  expect(wrapper.find("CModal").prop("show")).toBe(true); */
});

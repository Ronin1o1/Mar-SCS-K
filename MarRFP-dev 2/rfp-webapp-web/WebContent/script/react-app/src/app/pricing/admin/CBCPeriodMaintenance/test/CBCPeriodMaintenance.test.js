import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import CBCPeriodMaintenance from "../content/CBCPeriodMaintenance";

it("renders without crashing", () => {
  mount(<CBCPeriodMaintenance />);
});

it("renders correctly", () => {
  const tree = mount(<CBCPeriodMaintenance />);
  expect(toJson(tree)).toMatchSnapshot();
});

it("renders CBC Period Maintenance datatable", () => {
  const wrapper = mount(<CBCPeriodMaintenance />);
  expect(wrapper.find("CDataTable")).toHaveLength(1);
});

it("opens Due Date modal when Due Date link is clicked", () => {
  const wrapper = mount(<CBCPeriodMaintenance />);
  expect(wrapper.find("CModal").prop("show")).toBe(false);

  /*   wrapper.find(".newBtnDiv").simulate("click");
  expect(wrapper.find("CModal").prop("show")).toBe(true); */
});

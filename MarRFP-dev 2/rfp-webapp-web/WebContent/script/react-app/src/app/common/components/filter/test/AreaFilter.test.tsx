import React from "react";
import { mount } from "enzyme";
import { AreaFilter } from "../AreaFilter";

function mockProps() {
  return {
    filterContext: {
      countries: [],
    },
  };
}
describe("FilterLeftPanel", () => {
  it("should component render with table", () => {
    const wrapper = mount(<AreaFilter {...mockProps()} />);
    
    const table = wrapper.find(".zeroHeight");
    expect(table.length).toEqual(1);
  });

  it("should component render with table", () => {
    const wrapper = mount(<AreaFilter {...mockProps()} />);
    
    const field_Name = wrapper.find(".field_Name").at(0);
    expect(field_Name.text()).toEqual("Area");
  });

  it("should component country header", () => {
    const wrapper = mount(<AreaFilter {...mockProps()} />);
    
    const cr = wrapper.find("#cr");
    expect(cr.text()).toEqual("Country/Region");
  });
  it("should component Reporting Region header", () => {
    const wrapper = mount(<AreaFilter {...mockProps()} />);
    const rr = wrapper.find("#rr");
    expect(rr.text()).toEqual("Reporting Region");
  });
});

import React from "react";
import { mount } from "enzyme";
import { FilterContextProvider } from "../context/FilterContext";
import { FilterLeftPanel } from "../FilterLeftPanel";

describe("FilterLeftPanel", () => {
  it("should component render with table", () => {
    const wrapper = mount(
      <FilterContextProvider>
        <FilterLeftPanel />
      </FilterContextProvider>
    );
  });

  it("should component render with Number of Hotels", () => {
    const wrapper = mount(
      <FilterContextProvider>
        <FilterLeftPanel />
      </FilterContextProvider>
    );
    const rowNumHotels = wrapper.find("#rowNumHotels");
    expect(rowNumHotels.text()).toEqual("Number Hotels:0");
  });

  it("should component render with table", () => {
    const wrapper = mount(
      <FilterContextProvider>
        <FilterLeftPanel />
      </FilterContextProvider>
    );
    const field_NameRed = wrapper.find(".field_NameRed").at(0);
    expect(field_NameRed.text()).toEqual("Find/Filter");
  });
});

import React from "react";
import { mount } from "enzyme";
import { PropertyList } from "../content/PropertyList";
import { PropertyListContextProvider } from "../context/PropertyListContext";

describe("PropertyList", () => {
  it("should component render with table", () => {
    const wrapper = mount(
      <PropertyListContextProvider>
        <PropertyList />
      </PropertyListContextProvider>
    );
    const table = wrapper.find(".zeroHeight");
    expect(table.length).toEqual(3);
  });

  it("should component render with FilterRightPanelList", () => {
    const wrapper = mount(
      <PropertyListContextProvider>
        <PropertyList />
      </PropertyListContextProvider>
    );
    const FilterRightPanelList = wrapper.find("FilterRightPanelList");
    expect(FilterRightPanelList.length).toEqual(1);
  });

  it("should component render with FilterRightPanel", () => {
    const wrapper = mount(
      <PropertyListContextProvider>
        <PropertyList />
      </PropertyListContextProvider>
    );
    const FilterRightPanel = wrapper.find("FilterRightPanel");
    expect(FilterRightPanel.length).toEqual(1);
  });

  it("should component render with header", () => {
    const wrapper = mount(
      <PropertyListContextProvider>
        <PropertyList />
      </PropertyListContextProvider>
    );
    const header = wrapper.find(".header");
    expect(header.text()).toEqual("Pricing : Property List");
  });

  it("should component render with Filter", () => {
    const wrapper = mount(
      <PropertyListContextProvider>
        <PropertyList />
      </PropertyListContextProvider>
    );
    const Filter = wrapper.find("Filter");
    expect(Filter.length).toEqual(1);
  });

  it("should component render with NumberHotelsCount", () => {
    const wrapper = mount(
      <PropertyListContextProvider>
        <PropertyList />
      </PropertyListContextProvider>
    );
    const NumberHotelsCount = wrapper.find("NumberHotelsCount");
    expect(NumberHotelsCount.length).toEqual(1);
  });

  it("should component render with YearFilter", () => {
    const wrapper = mount(
      <PropertyListContextProvider>
        <PropertyList />
      </PropertyListContextProvider>
    );
    const YearFilter = wrapper.find("YearFilter");
    expect(YearFilter.length).toEqual(1);
  });
});

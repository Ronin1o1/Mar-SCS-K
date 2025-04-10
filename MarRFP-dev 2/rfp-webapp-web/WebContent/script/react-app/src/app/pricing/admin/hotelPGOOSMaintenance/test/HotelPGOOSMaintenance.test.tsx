import React from "react";
import { mount } from "enzyme";
import { HotelPGOOSMaintenance } from "../content/HotelPGOOSMaintenance";
import { HotelPGOOSMaintenanceContextProvider } from "../context/HotelPGOOSMaintenanceContext";

describe("HotelPGOOSMaintenance", () => {
  it("should component render with table", () => {
    const wrapper = mount(
      <HotelPGOOSMaintenanceContextProvider>
        <HotelPGOOSMaintenance />
      </HotelPGOOSMaintenanceContextProvider>
    );
    const table = wrapper.find(".zeroHeight");
    expect(table.length).toEqual(3);
  });

  it("should component render with header", () => {
    const wrapper = mount(
      <HotelPGOOSMaintenanceContextProvider>
        <HotelPGOOSMaintenance />
      </HotelPGOOSMaintenanceContextProvider>
    );
    const header = wrapper.find(".header");
    expect(header.text()).toEqual(
      "Pricing Administration : Hotel PGOOS Maintenance"
    );
  });

  it("should component render with num of hotel", () => {
    const wrapper = mount(
      <HotelPGOOSMaintenanceContextProvider>
        <HotelPGOOSMaintenance />
      </HotelPGOOSMaintenanceContextProvider>
    );
    const rowNumHotels = wrapper.find("#rowNumHotels");
    expect(rowNumHotels.text()).toEqual("Number Hotels:0");
  });

  it("should component render with dateRange", () => {
    const wrapper = mount(
      <HotelPGOOSMaintenanceContextProvider>
        <HotelPGOOSMaintenance />
      </HotelPGOOSMaintenanceContextProvider>
    );
    const dateRange = wrapper.find("#dateRange");
    expect(dateRange.text()).toEqual("Date RangeFrom: ");
  });

  it("should component render with FilterRightPanelList", () => {
    const wrapper = mount(
      <HotelPGOOSMaintenanceContextProvider>
        <HotelPGOOSMaintenance />
      </HotelPGOOSMaintenanceContextProvider>
    );
    const FilterRightPanelList = wrapper.find("FilterRightPanelList");
    expect(FilterRightPanelList.length).toEqual(1);
  });

  it("should component render with FilterRightPanel", () => {
    const wrapper = mount(
      <HotelPGOOSMaintenanceContextProvider>
        <HotelPGOOSMaintenance />
      </HotelPGOOSMaintenanceContextProvider>
    );
    const FilterRightPanel = wrapper.find("FilterRightPanel");
    expect(FilterRightPanel.length).toEqual(1);
  });

  it("should component render with FilterLeftPanel", () => {
    const wrapper = mount(
      <HotelPGOOSMaintenanceContextProvider>
        <HotelPGOOSMaintenance />
      </HotelPGOOSMaintenanceContextProvider>
    );
    const FilterLeftPanel = wrapper.find("FilterLeftPanel");
    expect(FilterLeftPanel.length).toEqual(1);
  });
});

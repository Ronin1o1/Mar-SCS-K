import React from "react";
import { mount } from "enzyme";
import { GPPPGOOSMaintenanceContextProvider } from "../context/GPPPGOOSMaintenanceContext";
import { GPPPGOOSMaintenance } from "../content/GPPPGOOSMaintenance";

describe("GPPPGOOSMaintenance", () => {
  it("should component render with table", () => {
    const wrapper = mount(
      <GPPPGOOSMaintenanceContextProvider>
        <GPPPGOOSMaintenance />
      </GPPPGOOSMaintenanceContextProvider>
    );
    const table = wrapper.find(".zeroHeight");
    expect(table.length).toEqual(4);
  });

  it("should component render with HotelGPPPGOOSRightPanel", () => {
    const wrapper = mount(
      <GPPPGOOSMaintenanceContextProvider>
        <GPPPGOOSMaintenance />
      </GPPPGOOSMaintenanceContextProvider>
    );
    const HotelGPPPGOOSRightPanel = wrapper.find("HotelGPPPGOOSRightPanel");
    expect(HotelGPPPGOOSRightPanel.length).toEqual(1);
  });

  it("should component render with HotelGPPPGOOSTableRows", () => {
    const wrapper = mount(
      <GPPPGOOSMaintenanceContextProvider>
        <GPPPGOOSMaintenance />
      </GPPPGOOSMaintenanceContextProvider>
    );
    const HotelGPPPGOOSTableRows = wrapper.find("HotelGPPPGOOSTableRows");
    expect(HotelGPPPGOOSTableRows.length).toEqual(1);
  });

  it("should component render with header", () => {
    const wrapper = mount(
      <GPPPGOOSMaintenanceContextProvider>
        <GPPPGOOSMaintenance />
      </GPPPGOOSMaintenanceContextProvider>
    );
    const header = wrapper.find(".header");
    expect(header.text()).toEqual(
      "Pricing Administration : Hotel GPP PGOOS Maintenance"
    );
  });

  it("should component render with Filter", () => {
    const wrapper = mount(
      <GPPPGOOSMaintenanceContextProvider>
        <GPPPGOOSMaintenance />
      </GPPPGOOSMaintenanceContextProvider>
    );
    const Filter = wrapper.find("Filter");
    expect(Filter.length).toEqual(1);
  });

  it("should component render with NumberHotelsCount", () => {
    const wrapper = mount(
      <GPPPGOOSMaintenanceContextProvider>
        <GPPPGOOSMaintenance />
      </GPPPGOOSMaintenanceContextProvider>
    );
    const NumberHotelsCount = wrapper.find("NumberHotelsCount");
    expect(NumberHotelsCount.length).toEqual(1);
  });

  it("should component render with YearFilter", () => {
    const wrapper = mount(
      <GPPPGOOSMaintenanceContextProvider>
        <GPPPGOOSMaintenance />
      </GPPPGOOSMaintenanceContextProvider>
    );
    const YearFilter = wrapper.find("YearFilter");
    expect(YearFilter.length).toEqual(1);
  });
});

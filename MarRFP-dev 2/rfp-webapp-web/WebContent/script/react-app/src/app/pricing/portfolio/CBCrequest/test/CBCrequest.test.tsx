import React from "react";
import { mount } from "enzyme";
import { CBCrequestContextProvider } from "../context/CBCrequestContext";
import { CBCrequest } from "../content/CBCrequest";


describe("CBCrequest", () => {
  it("should component render with table", () => {
    const wrapper = mount(
        <CBCrequestContextProvider>
        <CBCrequest />
      </CBCrequestContextProvider>
    );
    const table = wrapper.find(".zeroHeight");
    expect(table.length).toEqual(5);
  });

  it("should component render with CNoDataFound", () => {
    const wrapper = mount(
      <CBCrequestContextProvider>
        <CBCrequest />
      </CBCrequestContextProvider>
    );
    const CNoDataFound = wrapper.find("CNoDataFound");
    expect(CNoDataFound.length).toEqual(2);
  });

  it("should component render with CBCrequestList", () => {
    const wrapper = mount(
      <CBCrequestContextProvider>
        <CBCrequest />
      </CBCrequestContextProvider>
    );
    const CBCrequestList = wrapper.find("CBCrequestList");
    expect(CBCrequestList.length).toEqual(1);
  });
  
  
  
});

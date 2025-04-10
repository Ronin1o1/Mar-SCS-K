import React from "react";
import { mount } from "enzyme";
import { PgoosPropagationContextProvider } from "../context/PgoosPropagationContext";
import { PgoosPropagation } from "../content/PgoosPropagation";


describe("PgoosPropagation", () => {
  it("should component render with table", () => {
    const wrapper = mount(
        <PgoosPropagationContextProvider>
        <PgoosPropagation />
      </PgoosPropagationContextProvider>
    );
    const table = wrapper.find(".zeroHeight");
    expect(table.length).toEqual(5);
  });

  it("should component render with CNoDataFound", () => {
    const wrapper = mount(
      <PgoosPropagationContextProvider>
        <PgoosPropagation />
      </PgoosPropagationContextProvider>
    );
    const CNoDataFound = wrapper.find("CNoDataFound");
    expect(CNoDataFound.length).toEqual(2);
  });

  it("should component render with PgoosPropagationList", () => {
    const wrapper = mount(
      <PgoosPropagationContextProvider>
        <PgoosPropagation />
      </PgoosPropagationContextProvider>
    );
    const PgoosPropagationList = wrapper.find("PgoosPropagationList");
    expect(PgoosPropagationList.length).toEqual(1);
  });
  
  
  
});

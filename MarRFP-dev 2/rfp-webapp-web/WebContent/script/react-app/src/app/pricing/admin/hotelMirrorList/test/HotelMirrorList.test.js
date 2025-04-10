import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import HotelMirrorList from "../content/HotelMirrorList";

describe("HotelMirrorList", () => {
  it("renders without crashing", () => {
    const wrapper = mount(<HotelMirrorList />);
  });

  it("should component check header", () => {
    const wrapper = mount(<HotelMirrorList />);
    const getHead = wrapper.find("#searchDetails");
    expect(getHead.text()).toEqual(
      "  Default rate programs will be used for any blank rate programs "
    );
  });

  it("should component check the show all radio option", () => {
    const wrapper = mount(<HotelMirrorList />);
    const ShowAll = wrapper.find("#ShowAll");
    expect(ShowAll.text()).toEqual("Show ALL Hotels");
  });

  it("should component check the radio marsha option", () => {
    const wrapper = mount(<HotelMirrorList />);
    const filterWithCode = wrapper.find("#filterWithCode");
    expect(filterWithCode.text()).toEqual("Show MARSHA Code starting with:");
  });

  it("should component render check the pagination wrap", () => {
    const wrapper = mount(<HotelMirrorList />);
    const CPagination = wrapper.find("CPagination");
    expect(CPagination.length).toEqual(1);
  });

  it("should component render check marsha list table", () => {
    const wrapper = mount(<HotelMirrorList />);
    const hotelMirrorListTable = wrapper.find("HotelMirrorListTable");
    expect(hotelMirrorListTable.length).toEqual(1);
  });

  it("should component render check marsha details list table", () => {
    const wrapper = mount(<HotelMirrorList />);
    const mirrorListTable = wrapper.find(".mirrorListTable");
    expect(mirrorListTable.length).toEqual(1);
  });

  it("should component render check marsha details main headers", () => {
    const wrapper = mount(<HotelMirrorList />);
    const mirrorListHeader = wrapper.find(".mirrorListTable");
    expect(mirrorListHeader.text()).toEqual(
      "MARSHAName#Room PoolPricingRestrictionsNotesRate OfferRate Entity #RPGMRate OfferRate Entity #RPGM"
    );
  });

  it("should component render check please wait on component load", () => {
    const wrapper = mount(<HotelMirrorList />);
    const tableListWrap = wrapper.find(".tableListWrap");
    expect(tableListWrap.text()).toEqual("Please wait..");
  });
});

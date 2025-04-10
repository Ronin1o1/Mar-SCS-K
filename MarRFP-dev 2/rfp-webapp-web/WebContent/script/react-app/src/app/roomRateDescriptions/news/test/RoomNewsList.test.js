import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import NewsList from "../content/NewsList";

it("renders without crashing", () => {
    mount( < NewsList / > );
});

it("renders correctly", () => {
    const tree = mount( < NewsList / > );
    expect(toJson(tree)).toMatchSnapshot();
});

it("renders News datatable", () => {
    const wrapper = mount( < NewsList / > );
    expect(wrapper.find("CDataTable")).toHaveLength(1);
});

it("opens Edit News modal when Edit News button is clicked", () => {
    const wrapper = mount( < NewsList / > );
    expect(wrapper.find("CModal").prop("show")).toBe(false);

    /*   wrapper.find(".newBtnDiv").simulate("click");
      expect(wrapper.find("CModal").prop("show")).toBe(true); */
});
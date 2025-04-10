import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import RateLoading from "../RateLoading";
import { BrowserRouter } from 'react-router-dom'

it("renders without crashing", () => {
    <BrowserRouter>
    mount(<RateLoading/>);
    </BrowserRouter>
} )


it("renders correctly", () => {
    <BrowserRouter>
    const tree = mount(<RateLoading/>);
    expect(toJson(tree).toMatchSnapshot());
    </BrowserRouter>
});

it("renders critical fields Cselects", () => {
    <BrowserRouter>
        const wrapper = mount(<RateLoading/>);
        expect(wrapper.find("CSelect")).toHaveLength(1);
    </BrowserRouter>
})

it("Opens rate offer/rate programs modal when update  button is clicked", () => {
    <BrowserRouter>
    const wrapper = mount(<RateLoading />);
    expect(wrapper.find("CModal").prop("show")).toBe(false);
    </BrowserRouter>
  });


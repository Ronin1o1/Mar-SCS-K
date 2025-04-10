import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
//@ts-ignore
import CriticalFields from "../CriticalFields";
import { BrowserRouter } from 'react-router-dom'

it("renders without crashing", () => {
    <BrowserRouter>
    mount(<CriticalFields/>);
    </BrowserRouter>
} )


it("renders correctly", () => {
    <BrowserRouter>
    const tree = mount(<CriticalFields/>);
    expect(toJson(tree).toMatchSnapshot());
    </BrowserRouter>
});

it("renders critical fields Cselects", () => {
    <BrowserRouter>
        const wrapper = mount(<CriticalFields/>);
        expect(wrapper.find("CSelect")).toHaveLength(1);
    </BrowserRouter>
})


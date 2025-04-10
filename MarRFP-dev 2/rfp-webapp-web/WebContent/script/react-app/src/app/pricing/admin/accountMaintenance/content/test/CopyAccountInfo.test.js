import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import CopyAccountInfo from "../CopyAccountInfo";
import { BrowserRouter } from 'react-router-dom'

it("renders copy account page without crashing", () => {
    <BrowserRouter>
    mount(<CopyAccountInfo/>);
    </BrowserRouter>
} )


it("renders copy account correctly", () => {
    <BrowserRouter>
    const tree = mount(<CopyAccountInfo/>);
    expect(toJson(tree).toMatchSnapshot());
    </BrowserRouter>
});

it("renders copy account Cselects", () => {
    <BrowserRouter>
        const wrapper = mount(<CopyAccountInfo/>);
        expect(wrapper.find("CSelect")).toHaveLength(1);
    </BrowserRouter>
})
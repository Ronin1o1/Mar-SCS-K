import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import AccountStatusList from "../content/AccountStatusList";


describe("AccountStatusList", () => {
  it("renders without crashing", () => {    
    mount(<EdieHotelProfileList />);   
  });

  it("renders correctly", () => {   
    const tree = mount(<AccountStatusList />);   
    expect(toJson(tree)).toMatchSnapshot();   
  });

});


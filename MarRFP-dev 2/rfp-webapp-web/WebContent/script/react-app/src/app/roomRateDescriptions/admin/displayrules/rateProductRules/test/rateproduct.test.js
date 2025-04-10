import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import RateProduct from "../content/RateProduct";

describe("RoomDescription", () => {
  
    it("renders without crashing", () => 
    {    mount( <RateProduct / > );
    });
    it("renders correctly", () => 
    {    const tree = mount( <RateProduct/ > );        
    expect(toJson(tree)).toMatchSnapshot();    
    });
    
    
});

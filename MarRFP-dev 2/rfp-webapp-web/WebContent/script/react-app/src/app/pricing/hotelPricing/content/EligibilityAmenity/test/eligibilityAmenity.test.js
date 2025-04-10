import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import EligibilityAmenity from "../content/EligibilityAmenity"

describe("EligibilityAmenity", () => {
  
    it("renders without crashing", () => 
    {    mount( <EligibilityAmenity / > );
    });
    it("renders correctly", () => 
    {    const tree = mount( <EligibilityAmenity / > );        
    expect(toJson(tree)).toMatchSnapshot();    
    });
    
    
});

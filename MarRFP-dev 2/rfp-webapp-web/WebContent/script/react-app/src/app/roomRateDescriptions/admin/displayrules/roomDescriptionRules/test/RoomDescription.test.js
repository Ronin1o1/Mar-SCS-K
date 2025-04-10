import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import RoomDescription from "../content/RoomDescription";

describe("RoomDescription", () => {
  
    it("renders without crashing", () => 
    {    mount( <RoomDescription / > );
    });
    {/* it("renders correctly", () => 
    {    const tree = mount( <RoomDescription / > );        
    expect(toJson(tree)).toMatchSnapshot();    
    });
     */}
    
});

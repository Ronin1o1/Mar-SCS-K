import React from "react";
// import { mount } from "enzyme";
//@ts-ignore
import toJson from "enzyme-to-json";
//@ts-ignore
import ComplexityMatrix from "../ComplexityMatrix";
import { BrowserRouter } from 'react-router-dom'
// import CCalendar from "../../../../../../../common/components/CCalendar"                
// import CSelect from "../../../../../../../common/components/CSelect"


it("renders without crashing", () => {
  <BrowserRouter >
  mount(<ComplexityMatrix />);
  </BrowserRouter>
});





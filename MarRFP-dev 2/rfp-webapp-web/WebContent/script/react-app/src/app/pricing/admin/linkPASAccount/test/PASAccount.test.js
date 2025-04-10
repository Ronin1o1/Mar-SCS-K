import React from "react";
import { mount,render,fireEvent,getAllByRole,find,shallow } from "enzyme";
import toJson from "enzyme-to-json";
import PASAccount from "../content/PASAccount";
import CSelect from "../../../../common/components/CSelect";

it("renders without crashing", () => {
  mount(<PASAccount />);
});

it("renders correctly", () => {
  const tree = mount(<PASAccount />);
  expect(toJson(tree)).toMatchSnapshot();
});

it("should component check header", () => {
  const wrapper = shallow(<PASAccount />);  
  expect(wrapper.text()).toEqual("<PASAccountContextProvider />");
});

it("should component check header", () => {
  const wrapper = shallow(<PASAccount />);  
  expect(wrapper.text()).toHaveLength(29);
});

it("renders PAS Account Component", () => {
  const wrapper = mount(<PASAccount />);
  expect(wrapper.find(<CSelect />))
 
});







// it("should component check all input field component", () => {
//   const wrapper = mount(<PASAccount />);
//   const ShowAll = wrapper.find("#field_Name");
//   expect(ShowAll.text()).toEqual("PAS Manager");
// });



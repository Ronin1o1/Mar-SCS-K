import React from "react";
import { mount,render,fireEvent,getAllByRole,find,shallow } from "enzyme";
import toJson from "enzyme-to-json";
import EDIEColumnDescrition from "../content/EDIEColumnDescription_copy"

import CDataTable from "../../../../common/components/CDataTable";
import Interceptors from "../../../../common/components/Interceptors"

it("renders without crashing", () => {
  mount(<EDIEColumnDescrition />);
});

it("renders correctly", () => {
  const tree = mount(<EDIEColumnDescrition />);
  expect(toJson(tree)).toMatchSnapshot();
});

it("renders EDIEColumnDescrition Component", () => {
  const wrapper = mount(<EDIEColumnDescrition />);
  expect(wrapper.find(<CDataTable />)) 
});
it("renders EDIEColumnDescrition Component", () => {
  const wrapper = mount(<EDIEColumnDescrition />);
  expect(wrapper.find(<Interceptors />)) 
});






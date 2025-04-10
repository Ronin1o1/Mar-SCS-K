import React from "react";
import { mount, render, fireEvent, getAllByRole, find, shallow } from "enzyme";
import toJson from "enzyme-to-json";
import AccountListContext from "../../../../context/AccountListContext";
// @ts-ignore
import MCADlookup from "../LookupMcad";
import { BrowserRouter } from "react-router-dom";
// @ts-ignore
import CSelect from "../../../../../../../common/components/CSelect";
// @ts-ignore
import CModal from "../../../../../../../common/components/CModal";
// @ts-ignore
import CDataTable from "../../../../../../../common/components/CDataTable";

it("renders without crashing", () => {
  <BrowserRouter>
    mount(
    <MCADlookup />
    );
  </BrowserRouter>;
});

// it("should component render with header", () => {
//   const wrapper =
//   mount(
//       <MCADlookup />
//   );
//   const header = wrapper.find(".fieldName");
//   expect(header.text()).toEqual(
//     "Current Deployed Level:"
//   );
// });

// it("renders correctly", () => {
//   const tree = mount(
//   // <AccountListContext.Consumer>
//     <MCADlookup />
//     // </AccountListContext.Consumer>
//   );
//   expect(toJson(tree)).toMatchSnapshot();
// });

it("renders PAS Account Component", () => {
  const wrapper = mount(<MCADlookup />);
  expect(wrapper.find(<CSelect />));
});

it("renders PAS Account Component", () => {
  const wrapper = mount(<MCADlookup />);
  expect(wrapper.find(<CDataTable />));
});

it("renders PAS Account Component", () => {
  const wrapper = mount(<MCADlookup />);
  expect(wrapper.find(<CModal />));
});
it("renders PAS Account Component", () => {
  const wrapper = mount(<MCADlookup />);
  expect(wrapper.find(<AccountListContext />));
});

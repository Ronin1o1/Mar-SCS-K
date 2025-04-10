import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import EdieHotelProfileList from "../content/EdieHotelProfileList";
import FileUpload from './../../../../shared/components/fileupload';

describe("EdieHotelProfileList", () => {
  it("renders without crashing", () => {
    mount(<EdieHotelProfileList />);
  });

  it("renders correctly", () => {
    const tree = mount(<EdieHotelProfileList />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it("renders FileUpload without crashing", () => {
    mount(<FileUpload />);
  });

  it("renders FileUpload correctly", () => {
    const tree = mount(<FileUpload />);
    expect(toJson(tree)).toMatchSnapshot();
  });

});


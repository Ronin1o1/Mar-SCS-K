import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import HotelSolicitation from "../content/HotelSolicitation";
import FileUpload from './../../../../shared/components/fileupload';

describe("HotelSolicitation", () => {
  it("renders without crashing", () => {
    mount(<HotelSolicitation />);
  });

  it("renders correctly", () => {
    const tree = mount(<HotelSolicitation />);
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


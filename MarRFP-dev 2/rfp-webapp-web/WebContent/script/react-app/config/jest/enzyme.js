import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import axios from "axios";
configure({
  adapter: new Adapter(),
});
axios.defaults.baseURL = "http://localhost:3000";

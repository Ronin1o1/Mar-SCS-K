import React from "react";
import axios from "axios";
import styles from "./Interceptors.css";
import spinnerImg from "../assets/img/loading-buffering.gif";
interface IProps {
  transform?: string;
  text?: string;
  spinnerFlag?: boolean;
  top?: any;
}
interface IState {}
export default class Interceptor extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  state = { requestCount: 0, isMounted: false };

  componentDidMount() {
    this.state.isMounted = true;
    this.setState({...this.state});
    this.state.isMounted &&
      axios.interceptors.request.use((request) => {
        let count = this.state.requestCount + 1;
        this.setState({ requestCount: count });

        return request;
      });

    axios.interceptors.response.use((response) => {
      let count = this.state.requestCount - 1;
      this.setState({ requestCount: count });
      return response;
    });
  }

  render() {
    return this.state.requestCount > 0 ? (
      <div
        className={styles.curtain}
        style={{ top: this.props.top ? this.props.top : "0px" }}
      >
        <img src={spinnerImg} className={styles.imageLoader} />
      </div>
    ) : null;
  }

  componentWillUnmount() {
    this.state.isMounted = false;
    this.setState({...this.state});
  }
}

import React from "react";
import styles from "./CSuspense.css";
interface IProps {
  isTextVisible ?: boolean
}
interface IState {}

export default class CSuspense extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  state = { requestCount: 0 };

  render() {
    
    return <div className={styles.loadingText}>
     {this.props.isTextVisible ? this.props.isTextVisible : true}
      {!this.props.isTextVisible ? "" : "Please wait loading..."}
      </div>;
  }
}

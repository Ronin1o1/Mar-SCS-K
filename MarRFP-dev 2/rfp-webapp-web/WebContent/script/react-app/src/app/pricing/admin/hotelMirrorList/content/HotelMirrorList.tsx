import React, { Component } from "react";
import HotelMirrorListContext, {
  HotelMirrorListContextProvider,
} from "../context/HotelMirrorListContext";
import { HotelMirrorSearch } from "./HotelMirrorSearch";
import { HotelMirrorListTable } from "./HotelMirrorListTable";
import styles from "./HotelMirrorList.css";
import Settings from "../static/Settings";

let contextType = null;

export default class HotelMirrorList extends Component<{}, {}> {
  componentDidUpdate(prevProps, prevState) {
    const location = this.props?.history?.location;
    const prevLocation = prevProps?.location;
    if (
      prevLocation?.key != location?.key &&
      prevLocation?.pathname == location?.pathname
    ) {
      this.props.history.push("/temp");
      this.props.history.goBack();
    }
  }
  componentDidMount() {
    contextType.handleGetHotelMirrorList();
    const container = document.getElementsByClassName("container");
    if (container && container[0]) {
      container[0].style.overflow = "hidden";
    }
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    const container = document.getElementsByClassName("container");
    if (container && container[0]) {
      container[0].style = null;
    }
    document.body.style = null;
  }

  render() {
    return (
      <HotelMirrorListContextProvider>
        <HotelMirrorListContext.Consumer>
          {(hotelMirrorListContext) => {
            contextType = hotelMirrorListContext;
            return (
              <React.Fragment>
                <div className={styles.hotelMirrorHeader}>
                  {Settings.labels.pageHeading}
                </div>
                <HotelMirrorSearch searchContextType={contextType} />
                <HotelMirrorListTable tableContextType={contextType} />
              </React.Fragment>
            );
          }}
        </HotelMirrorListContext.Consumer>
      </HotelMirrorListContextProvider>
    );
  }
}

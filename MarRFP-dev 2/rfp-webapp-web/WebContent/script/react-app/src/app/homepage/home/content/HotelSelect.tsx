import React, { useContext, useEffect } from "react";
import HomeContext, { IHomeContext } from "../context/HomeContext";
import Settings from "../static/settings";
import styles from "./HotelSelect.css";
import CExpandedSearchFilter from "../../../common/components/CExpandedSearchFilter";

const HotelSelect = (props) => {
  const homeContext: IHomeContext = useContext(HomeContext);
  const parentContainer = React.useRef();
  useEffect(() => {
    if (props?.id) {
      const draggableElement = document.getElementById(props.id);
      draggableElement.removeAttribute("draggable");
    }

    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  const handleClickOutside = (event) => {
    if (
      parentContainer.current &&
      // @ts-ignore
      !parentContainer.current.contains(event.target) &&
      homeContext.isVisible
    ) {
      homeContext.setIsVisible(false);
    }
  };
  return (
    <div>
      <div
        className={`${styles.dInlineBlock} ${styles.positionRelative} ${styles.defaultCursor}`}
      >
        <span className="FieldName">{props.token}</span>
        <span
          className={styles.propertyAbbPointer}
          onClick={(e) => {
            homeContext.setIsVisible(!homeContext.isVisible);
          }}
        >
          <span className={styles.hotelSpan}>
            {homeContext.SelectHotel.marshacode
              ? homeContext.SelectHotel.marshacode
              : homeContext.userPrefs.marshaCode}
          </span>
          <label className={styles.arrow}>▼</label>
        </span>
        {homeContext.isVisible ? (
          <div
            id="SearchFilterDiv"
            className={styles.viewDropdown}
            ref={parentContainer}
          >
            <p className={styles.dropdownArrowIcon}></p>
            <div className={styles.cSearchFilterContainer}>
              <CExpandedSearchFilter
                id={Settings.searchSelect.id}
                className={styles.selectStyle}
                value={homeContext.SelectHotel.name}
                selected={homeContext.SelectHotel.marshacode}
                data={homeContext.state.hoteListData}
                start={homeContext.SelectHotel.startIndex}
                getInitialData={homeContext.getHotelList}
                getNextData={homeContext.getNextHotelList}
                onChange={homeContext.hotelChangeHandler}
                onSelect={homeContext.hotelSelectHandler}
                onCloseHandler={homeContext.onCloseHandler}
                pageSize={Settings.searchSelect.range}
                optionsStyle={styles.options}
                invalidInput={homeContext.invalidInput}
                noDataFlag={homeContext.noDataFlag}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HotelSelect;

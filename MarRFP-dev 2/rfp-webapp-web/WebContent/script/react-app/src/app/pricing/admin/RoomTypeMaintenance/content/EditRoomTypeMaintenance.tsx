import React, { Component } from "react";
import Settings from "../static/Settings";
import UpdateBtnImg from "../../../../common/assets/img/btnUpdate.gif";
import styles from "./EditRoomTypeMaintenance.css";
import RoomTypeMaintenanceContext from "../context/RoomTypeMaintenanceContext";
import CSelect from "../../../../common/components/CSelect";
import classNames from "classnames";
//import CModal from "../../../../common/components/CModal";

interface IProps {}

interface IState {
  contextType: any;
}

export default class EditRoomTypeMaintenance extends Component<IProps, IState> {
  static contextType = RoomTypeMaintenanceContext;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.editRoomTypeContentDiv}>
        <div className={styles.gridContainer}>
          <div className={styles.field}>
            <div className={styles.fieldNameValueLeft}>
              <div className={styles.labelstyle}>
                {
                  Settings.editRoomTypeMaintenanceList.formFields
                    .editRoomTypeName.label
                }
                :{" "}
              </div>

              <div className={styles.labelstyle}>
                {
                  Settings.editRoomTypeMaintenanceList.formFields
                    .editViewableByHotels.label
                }
              </div>
            </div>

            <div className={styles.fieldNameValue}>
              <div className={styles.inputstyle}>
                <input
                  autoFocus
                  id={
                    Settings.editRoomTypeMaintenanceList.formFields
                      .editRoomTypeName.id
                  }
                  maxLength={Settings.labelFor80}
                  size={Settings.labelFor40}
                  onChange={this.context.onChangeInput}
                  defaultValue={this.context.state.selectedRoomType.roomtype}
                />
              </div>

              <div className={styles.inputstyle}>
                <CSelect
                  ddnOptions={Settings.roomTypeMaintenanceList.yesNoList}
                  keyField={
                    Settings.roomTypeMaintenanceList.accountViewable.key
                  }
                  valField={
                    Settings.roomTypeMaintenanceList.accountViewable.value
                  }
                  onChange={this.context.onChange}
                  selectedValue={
                    this.context.state.selectedRoomType.roomtype_view
                  }
                />
              </div>
            </div>
          </div>

          <div
            style={{ height: "20px", width: "55px", marginLeft: "130px" }}
            className={classNames(styles.updateBtn)}
            onClick={this.context.updateRoomTypeMaintenance}
          >
            <img
              tabIndex={0}
              src={UpdateBtnImg}
              alt={Settings.editRoomTypeMaintenanceList.updateBtnAltText}
            />
          </div>
        </div>
      </div>
    );
  }
}

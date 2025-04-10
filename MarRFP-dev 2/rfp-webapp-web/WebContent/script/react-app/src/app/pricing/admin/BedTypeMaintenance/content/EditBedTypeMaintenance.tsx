import React, { Component } from "react";
import classnames from "classnames";
import BedTypeMaintenanceContext from "../context/BedTypeMaintenanceContext";
import Settings from "../static/Settings";
import UpdateBtnImg from "../../../../common/assets/img/btnUpdate.gif";
import styles from "./EditBedTypeMaintenance.css";
import CSelect from "../../../../common/components/CSelect";
//import CModal from "../../../../common/components/CModal";

interface IProps {}
interface IState {
  contextType: any;
}

export default class EditBedTypeMaintenance extends Component<IProps, IState> {
  static contextType = BedTypeMaintenanceContext;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.editBedTypeContentDiv}>
        <div className={styles.gridContainer}>
          <div className={styles.field}>
            <div className={styles.fieldNameValueLeft}>
              <div className={styles.labelstyle}>
                <label>{
                  Settings.editBedTypeMaintenanceList.formFields.editBedTypeName
                    .label
                }
                :{" "}</label>
                <input
                  autoFocus
                  id={
                    Settings.editBedTypeMaintenanceList.formFields
                      .editBedTypeName.id
                  }
                  maxLength={Settings.labelFor80}
                  size={Settings.labelFor40}
                  onChange={this.context.onChangeInput}
                  defaultValue={this.context.state.selectedBedType.bedtype}
                  className={styles.width100}
                />
              </div>
              <div className={styles.labelstyle}>
                <label>{
                  Settings.editBedTypeMaintenanceList.formFields
                    .editViewableByHotels.label
                }</label>
                <CSelect
                  ddnOptions={Settings.bedTypeMaintenanceList.yesNoList}
                  keyField={Settings.bedTypeMaintenanceList.accountViewable.key}
                  valField={
                    Settings.bedTypeMaintenanceList.accountViewable.value
                  }
                  onChange={this.context.onChange}
                  selectedValue={
                    this.context.state.selectedBedType.bedtype_view
                  }
                />
              </div>
            </div>

          </div>
          <div
            style={{ height: "20px", width: "40px", marginLeft: "130px" }}
            className={classnames(styles.updateBtn)}
            onClick={this.context.updateBedTypeMaintenance}
          >
            <img
              tabIndex={0}
              src={UpdateBtnImg}
              alt={Settings.editBedTypeMaintenanceList.updateBtnAltText}
            />
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import classnames from "classnames";
import PeriodMaintenanceContext from "../context/CBCPeriodMaintenanceContext";
import Settings from "../static/Settings";
import UpdateBtnImg from "../../../../common/assets/img/btnUpdate.gif";
import styles from "./EditCBCPeriod.css";
import Utils from "../../../../common/utils/Utils";
interface IProps {}

interface IState {
  contextType: any;
  dueDate: string;
}

export default class EditCBCPeriodMaintenace extends Component<IProps, IState> {
  static contextType = PeriodMaintenanceContext;

  constructor(props) {
    super(props);
    this.state = {
      contextType: PeriodMaintenanceContext,
      dueDate: "",
    };
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  componentDidMount() {
    this.setState({
      dueDate: this.context.state.selectedPeriodYear.shortDueDate,
    });
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ondueDate(e) {
    this.setState({ dueDate: e.target.value });
  }
  render() {
    return (
      <div className={styles.editNewsContentDiv}>
        <div className={styles.gridContainer}>
          <tr>
            <td className={styles.fieldName}>
              {Settings.editPeriodMaintenance.formFields.date.label}
            </td>
            <td>
              <input
                autoFocus
                id={Settings.editPeriodMaintenance.formFields.date.id}
                maxLength={10}
                onKeyPress={Utils.DateNumberOnly}
                onChange={(e) => {
                  this.ondueDate(e);
                }}
                onBlur={this.context.validate}
                value={this.state.dueDate}
              />
            </td>
          </tr>
          <div
            style={{ height: "20px" }}
            className={classnames(styles.colSpan, styles.updateBtn)}
            onClick={this.context.updatePeriod}
          >
            <img
              tabIndex={0}
              src={UpdateBtnImg}
              alt={Settings.editPeriodMaintenance.updateBtnAltText}
            />
          </div>
        </div>
      </div>
    );
  }
}

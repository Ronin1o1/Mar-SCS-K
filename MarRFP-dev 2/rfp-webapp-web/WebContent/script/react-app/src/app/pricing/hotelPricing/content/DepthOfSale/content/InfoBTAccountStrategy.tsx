import React, { Component } from "react";
import Settings from "../static/Settings";
import styles from "./InfoBTAccountStrategy.css";
import btnClose from "../../../../../common/assets/img/button/btnClose.gif"
import deapthofsaleAccountContext from "../context/depthofsaleContextProvider";
interface IProps { }

interface IState {
    contextType: any;
}

export default class InfoBTAccountStrategy extends Component<IProps, IState> {
    static contextType = deapthofsaleAccountContext;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table className={styles.zeroHeight}>
                <tr>
                    <td className={styles.fieldValue}>
                      <p>{Settings.depthOfSales.modalContent}</p>
                      <p>{Settings.depthOfSales.modalContent1}</p>
                      <p>{Settings.depthOfSales.modalContent2}</p>
                      <p>{Settings.depthOfSales.modalContent3}</p>
                      <p>{Settings.depthOfSales.modalContent4}</p>

                    </td>
                </tr>
                <tr>
                    <td className = {styles.data}>
                        <img src={btnClose}
                         onClick={this.context.btAcctStrategy_popup}
                         className={styles.btnClose} />

                    </td>
                </tr>
            </table>
        );
    }
}

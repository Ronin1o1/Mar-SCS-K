import React, { Component } from "react";
import img from "../../../common/assets/img/doggie0.gif";
import styles from "./SignOut.css";

import SignOutContext, {
  SignOutContextProvider,
} from "../context/SignOutContext";
import Utils from "../../../common/utils/Utils";

let contextType = null;

interface IProps {}

interface IState {}
export default class SignOut extends Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

  async componentDidMount() {
    setTimeout(() => {
      contextType.signOut().then((data) => {
        sessionStorage.clear();
        localStorage.clear();
        Utils.clearCookie("MARFPAUTH");
        Utils.clearCookie("LOGGEDINUSER");
        Utils.clearCookie("COGNOS_LOGED_IN");
        Utils.clearCookie("CODE");
        Utils.deleteAllCookies();
        window.location.href = data.loginUrl;
      });
    }, 4000);
  }

  render() {
    return (
      <SignOutContextProvider>
        <SignOutContext.Consumer>
          {(signOutContext) => {
            contextType = signOutContext;

            return (
              <React.Fragment>
                <table
                  className={styles.BGWhiteStyle}
                  border={0}
                  width="100%"
                  height="100%"
                  cellSpacing={0}
                  cellPadding={3}
                >
                  <tbody>
                    <tr>
                      <td valign="top">
                        <table
                          className={styles.BGWhiteStyle}
                          border={0}
                          width="100%"
                          cellSpacing={0}
                          cellPadding={3}
                        >
                          <tbody>
                            <tr>
                              <td height={10} />
                            </tr>
                            <tr>
                              <td align="center">
                                <table
                                  className={styles.BGWhiteStyle}
                                  border={0}
                                  cellSpacing={0}
                                  cellPadding={5}
                                >
                                  <tbody>
                                    <tr>
                                      <td>
                                        <h2>You have exited out of MarRFP.</h2>
                                        <h3 className={styles.centerText}>
                                          Please wait ...{" "}
                                        </h3>
                                        <img
                                          src={img}
                                          width="200"
                                          height="35"
                                        />
                                      </td>
                                      <td>
                                        <iframe
                                          name="logout"
                                          frameBorder={0}
                                          height={0}
                                          width={0}
                                          src="https://extranet.marriott.com/pkmslogout"
                                        ></iframe>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <style>{`
                    #subMenu{
                      display:none!important;
                    } 
                    #menuItemID{
                      display:none!important;
                    }
                  `}</style>
              </React.Fragment>
            );
          }}
        </SignOutContext.Consumer>
      </SignOutContextProvider>
    );
  }
}

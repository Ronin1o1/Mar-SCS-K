import React, { Component, Suspense } from "react";
//import CSuspense from "../../../../common/components/CSuspense";//
import GroupMeetingsContext, {
  GroupMeetingsContextProvider,
} from "../GroupMeetings/context/GroupMeetingsContext";
import CModal from "../../../../../../common/components/CModal";
import btnExportStr from "../../../../../../common/assets/img/button/btnExportStr.gif";
import btnImportStr from "../../../../../../common/assets/img/button/btnImportStr.gif";
import CSuspense from "../../../../../../common/components/CSuspense";
import styles from "./GroupMeetings.css";
import CFileUpload from "../../../../../../common/components/CFileUpload";
import API from "../GroupMeetings/service/Api";
import AccountListContext from "../../../context/AccountListContext";
import GrpMeetingsQuestionsList from "../GroupMeetings/GrpMeetingsQuestionsList";
import Settings from "../GroupMeetings/static/Settings";
//import Interceptor from "../../../../../../common/components/Interceptors";
import screenLoader from "../../../../../../common/assets/img/screenloader.gif";

let contextType = null;
let accContextType = null;
let period = null;
let accountrecid = null;

export default class GroupMeetings extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    period = accContextType.state.accountListData.selectedAccount.period
      ? accContextType.state.accountListData.selectedAccount.period
      : sessionStorage.getItem("accountsDataPeriod");
    accountrecid = accContextType.state.accountListData.selectedAccount
      .accountrecid
      ? accContextType.state.accountListData.selectedAccount.accountrecid
      : sessionStorage.getItem("accountsDataRecId");
    contextType.setState({
      ...contextType.state,
      specificQuestionsData: {
        ...contextType.state.specificQuestionsData,
        initialData: Settings.blankQueList,
        questionsListData: Settings.blankQueList,
        selectedSpecificQuesList: Settings.blankQueList,
      },
    });
    contextType.setShowScreenLoader(true);
    API.getAccGrpQuestions(accountrecid, period).then((data) => {
      contextType.setQuestionsData(data, undefined, true);
      contextType.setShowScreenLoader(false);
    });
  }
  componentWillUnmount = () => {
    if (contextType.state.formChgStatus) contextType.autoSaveData();
    contextType.componentUnload();
  };

  onTabChangeHandler = () => {
    if (contextType.state.formChgStatus) contextType.autoSaveData();
  };

  onFileUpload(param) {
    contextType.onFileUpload(param);
  }

  render() {
    return (
      <AccountListContext.Consumer>
        {(accountListContext) => {
          accContextType = accountListContext;
          return (
            <GroupMeetingsContext.Consumer>
              {(questionsContext) => {
                contextType = questionsContext;
                return (
                  <React.Fragment>
                    {contextType.showScreenLoader ? (
                      <div id="loading" className={styles.accountTabLoader}>
                        <div>
                          <img src={screenLoader}></img>
                        </div>
                      </div>
                    ) : null}
                    <div className={styles.MainContainer}>
                      {contextType.state.isImportButtonClicked && (
                        <CModal
                          title={contextType.state.selectedFileupload.title}
                          onClose={contextType.showModal}
                          show={contextType.state.showModal}
                          xPosition={-120}
                          yPosition={-120}
                        >
                          <Suspense fallback={<CSuspense />}>
                            <CFileUpload
                              id={contextType.state.selectedFileupload.id}
                              onFileUpload={this.onFileUpload}
                            ></CFileUpload>
                          </Suspense>
                        </CModal>
                      )}

                      {contextType.state.specificQuestionsData
                        .accountSpecQuestions.length === 0 && (
                        <table>
                          <tr>
                            <td className={styles.quesbuttons}>
                              <a>
                                <img
                                  tabIndex={0}
                                  src={btnExportStr}
                                  className={styles.BtnTemplate}
                                  onClick={contextType.download}
                                  id="TemplateButton"
                                  alt={Settings.Questions.exportImgAlt}
                                />
                              </a>
                            </td>
                            <td className={styles.quesbuttons}>
                              <a>
                                <img
                                  src={btnImportStr}
                                  id="ImportButton"
                                  className={styles.BtnImport}
                                  onClick={contextType.btnImportAccquestions}
                                  alt={Settings.Questions.importImgAlt}
                                />
                              </a>
                            </td>
                          </tr>
                        </table>
                      )}

                      <GrpMeetingsQuestionsList />
                    </div>
                  </React.Fragment>
                );
              }}
            </GroupMeetingsContext.Consumer>
          );
        }}
      </AccountListContext.Consumer>
    );
  }
}

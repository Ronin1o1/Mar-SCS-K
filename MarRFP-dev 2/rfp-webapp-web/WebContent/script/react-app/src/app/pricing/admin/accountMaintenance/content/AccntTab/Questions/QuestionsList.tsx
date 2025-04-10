import React, { Component, Suspense } from "react";
//import CSuspense from "../../../../common/components/CSuspense";//
import SpecificQuestionsContext from "../Questions/context/SpecificQuestionsContext";

import w_completed from "../../../../../../common/assets/img/w_completed.gif";
import Settings from "../Questions/static/Settings";
//import CDataTable from "../../../../../../common/components/CDataTable";
import CModal from "../../../../../../common/components/CModal";
import DeleteImg from "../../../../../../common/assets/img/delete.gif";
import styles from "./QuestionsList.css";
import CSuspense from "../../../../../../common/components/CSuspense";
import AccountMaintQuestionType from "./accountMaintQuestionType";
import Utils from "../../../../../../common/utils/Utils";

import AccountMaintQuestionTypeAnswers from "./AccountMaintQuestionTypeAnswers";
import Grid from "../../../../../../shared/components/grid";
import AccountListContext from "../../../context/AccountListContext";

let contextType = null;
let contextValue = null;

export default class QuestionsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    contextValue.setClicked(false);
    document.addEventListener("click", this.showAlert, false);
  }

  showAlert(event) {
    const ignoreClickOnMeElement = document.getElementById("gridTableView");
    const isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
    if (!isClickInsideElement && contextValue.clicked == false) {
      contextType.handleClickOutside();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.showAlert, false);
  }

  delImageBodyTemplate = (rowData) => {
    return (
      <td
        className={styles.gridCell}
        onClick={() => {
          contextType.deleteQuestions(rowData);
        }}
      >
        <td className={styles.posLeft}>
          <img
            src={DeleteImg}
            alt={Settings.Questions.deleteImgAltText}
            className={styles.deleteImg}
          />
        </td>
      </td>
    );
  };

  imageBodyTemplate = (rowData) => {
    return (
      <div>
        {rowData.hasrecs === Settings.Questions.yes && (
          <div className={styles.gridCell}>
            {
              <img
                src={w_completed}
                alt={Settings.Questions.ansExistsImgAltText}
                className={styles.deleteImgDiv}
              />
            }
          </div>
        )}
      </div>
    );
  };

  queSeqBodyTemplate = (rowData) => {
    return (
      <div className={styles.gridCell} style={{ textAlign: "center" }}>
        <span style={{ textAlign: "center" }}>{rowData.question_seq}</span>
      </div>
    );
  };

  textAreaBodyTemplate = (rowData) => {
    return (
      <div className={styles.gridCell}>
        <textarea
          style={{
            font: "Arial",
            fontSize: "8pt",
            height: "40px",
            width: "420px",
            resize: "none",
            overflowY: "auto",
          }}
          id={Settings.Questions.tableColumns.question.field}
          name={Settings.Questions.tableColumns.question.field}
          rows={2}
          className={styles.question}
          value={rowData.question}
          onChange={(event) => contextType.handleChange(event, rowData)}
          onKeyPress={(e) => Utils.checklen_onkeypress(e, 400)}
        />
      </div>
    );
  };
  edieColBodyTemplate = (rowData) => {
    return (
      <div className={styles.gridCell}>
        <input
          id={Settings.Questions.tableColumns.edieExcelLabel.field}
          className={styles.edie_column_label}
          value={rowData.edie_column_label}
          onChange={(event) => contextType.handleChange(event, rowData)}
          onKeyPress={(e) => contextType.fnkychars_onkeypress(e, 70)}
        />
      </div>
    );
  };

  ansLengthBodyTemplate = (rowData) => {
    return (
      <div>
        {rowData.typedescription !== Settings.Questions.customAns && (
          <div className={styles.gridCell}>
            <input
              disabled={!contextType.state.isEnabled}
              id={Settings.Questions.tableColumns.answerLength.field}
              name={Settings.Questions.tableColumns.answerLength.field}
              onChange={(event) => contextType.handleChange(event, rowData)}
              className={styles.ans_label}
              maxLength={3}
              size={2}
              onKeyPress={Utils.NumberOnly_onkeypress}
              value={rowData.max_len}
            />
          </div>
        )}
        {rowData.typedescription === Settings.Questions.customAns && (
          <div>
            <input
              disabled={contextType.state.isEnabled}
              id={Settings.Questions.tableColumns.answerLength.field}
              name={Settings.Questions.tableColumns.answerLength.field}
              maxLength={3}
              size={2}
              className={styles.ans_label}
              onKeyPress={Utils.NumberOnly_onkeypress}
              value={rowData.max_len}
              onChange={(event) => contextType.handleChange(event, rowData)}
            />
          </div>
        )}
      </div>
    );
  };
  dataTypeBodyTemplate = (rowData) => {
    return (
      <div className={styles.gridCell}>
        <span
          className={styles.dataTypeLink}
          onClick={() => contextType.createDialog(rowData)}
        >
          {rowData.typedescription}
        </span>

        <input
          type="hidden"
          name="accountSpecQuestions[${i }].typeid"
          id="accountSpecQuestions[${i }].typeid"
          value={rowData.typeid}
        />
        <div>
          {rowData.typedescription === Settings.Questions.customAns && (
            <span
              id="ansDesc${i }"
              onClick={() => contextType.createAnsDialog(rowData)}
              className={styles.dataTypeLink}
            >
              {Settings.Questions.editLabel}
            </span>
          )}
        </div>
      </div>
    );
  };

  gethotelSolicitAvailList = (data) => {
    const arr = [];
    if (data) {
      data.map((element) => {
        const obj = {
          question_id: this.delImageBodyTemplate(element),
          infoanswersexist: this.imageBodyTemplate(element),
          question_seq: this.queSeqBodyTemplate(element),
          question: this.textAreaBodyTemplate(element),
          edie_column_label: this.edieColBodyTemplate(element),
          max_len: this.ansLengthBodyTemplate(element),
          typedescription: this.dataTypeBodyTemplate(element),
        };
        arr.push(obj);
      });
    }

    return arr;
  };

  columns = [
    {
      field: Settings.Questions.tableColumns.id.field,
      body: this.delImageBodyTemplate,
      style: {
        width: "30px",
        minWidth: "30px",
        height: "21px",
        verticalAlign: "top",
        textAlign: "left",
      },
    },
    {
      field: Settings.Questions.tableColumns.answersExist.field,
      header: Settings.Questions.tableColumns.answersExist.header,
      body: this.delImageBodyTemplate,
      style: {
        width: "56px",
        minWidth: "56px",
        textAlign: "left",
        verticalAlign: "top",
        height: "21px",
      },
    },
    {
      field: Settings.Questions.tableColumns.questNo.field,
      header: Settings.Questions.tableColumns.questNo.header,
      body: this.queSeqBodyTemplate,
      style: {
        width: "45px",
        minWidth: "45px",
        height: "21px",
        verticalAlign: "top",
      },
    },
    {
      field: Settings.Questions.tableColumns.question.field,
      header: Settings.Questions.tableColumns.question.header,
      body: this.textAreaBodyTemplate,
      style: { width: "435px", minWidth: "435px", height: "21px" },
    },
    {
      field: Settings.Questions.tableColumns.edieExcelLabel.field,
      header: Settings.Questions.tableColumns.edieExcelLabel.header,
      body: this.edieColBodyTemplate,
      style: {
        width: "145px",
        minWidth: "145px",
        height: "21px",
        verticalAlign: "top",
      },
    },
    {
      field: Settings.Questions.tableColumns.answerLength.field,
      header: Settings.Questions.tableColumns.answerLength.header,
      body: this.ansLengthBodyTemplate,
      style: {
        width: "55px",
        minWidth: "55px",
        height: "21px",
        verticalAlign: "top",
      },
    },
    {
      field: Settings.Questions.tableColumns.dataType.field,
      header: Settings.Questions.tableColumns.dataType.header,
      body: this.dataTypeBodyTemplate,
      style: {
        width: "117px",
        minWidth: "117px",
        height: "21px",
        textAlign: "left",
        verticalAlign: "top",
      },
    },
  ];

  render() {
    return (
      <AccountListContext.Consumer>
        {(accountListContext) => {
          contextValue = accountListContext;
          return (
            <SpecificQuestionsContext.Consumer>
              {(queTypeContext) => {
                contextType = queTypeContext;
                return (
                  <React.Fragment>
                    {contextType.state.isDataTypeClicked && (
                      <CModal
                        title={Settings.questionTypes.title}
                        onClose={contextType.showModal}
                        show={contextType.state.showModal}
                        xPosition={-120}
                        yPosition={-120}
                      >
                        <Suspense fallback={<CSuspense />}>
                          <AccountMaintQuestionType />
                        </Suspense>
                      </CModal>
                    )}
                    {contextType.state.isEditClicked && (
                      <CModal
                        title={Settings.answerList.title}
                        onClose={contextType.showModal}
                        show={contextType.state.showModal}
                        xPosition={-100}
                        yPosition={-120}
                      >
                        <Suspense fallback={<CSuspense />}>
                          <AccountMaintQuestionTypeAnswers />
                        </Suspense>
                      </CModal>
                    )}

                    <div className={styles.dataTableContainer}>
                      <Grid
                        id="gridTableView"
                        columns={this.columns}
                        value={this.gethotelSolicitAvailList(
                          contextType.state.specificQuestionsData
                            .questionsListData
                        )}
                        width="891px"
                        gridScroll={styles.gridScroll}
                        componentName="QuestionMain"
                        gridNo="1"
                      ></Grid>
                      <style>
                        {`
                          table#gridTableHeader > tbody >tr>th{
                            vertical-align: middle !important;
                          }
                          .virtualScrollGrid{
                            height:calc(100vh - 245px) !important;
                          }  
                          #gridView{
                            height:auto !important;
                          }   
                          #gridTableHeader tr th span{
                            position: relative;
                            left: 2px;
                          } 
                          #panelCurrentRow td:nth-child(2) div{
                            text-align:center !important;
                          }  
                        `}
                      </style>
                    </div>
                  </React.Fragment>
                );
              }}
            </SpecificQuestionsContext.Consumer>
          );
        }}
      </AccountListContext.Consumer>
    );
  }
}

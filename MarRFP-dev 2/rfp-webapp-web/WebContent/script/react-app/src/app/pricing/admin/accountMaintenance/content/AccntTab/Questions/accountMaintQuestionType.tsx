import React, { Component } from "react";
//import CSuspense from "../../../../common/components/CSuspense";//
import SpecificQuestionsContext, {
  SpecificQuestionsContextProvider,
} from "./context/SpecificQuestionsContext";
//import API from "./service/Api";
import Settings from "./static/Settings";
import btnSave from "../../../../../../common/assets/img/btnSave.gif";
import styles from "./accountMaintQuestionType.css";
import CSelect from "../../../../../../common/components/CSelect";

let contextType = null;

interface IProps {}

interface IState {}

export default class AccountMaintQuestionType extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SpecificQuestionsContext.Consumer>
        {(specQuesListContext) => {
          contextType = specQuesListContext;
          return (
            <React.Fragment>
              <table>
                <div className={styles.contentDiv}>
                  <tr>
                    <td align="left" className={styles.fieldName}>
                      {Settings.Questions.questionTypeLabel}
                    </td>
                    <td align="left" className={styles.fieldValue}>
                      <CSelect
                        className={styles.selectStyle}
                        id={Settings.questionType.id}
                        name={Settings.questionType.valField}
                        ddnOptions={
                          contextType.state.specificQuestionsData
                            .questionsTypeList
                        }
                        keyField={Settings.questionType.keyField}
                        valField={Settings.questionType.valField}
                        onChange={(e) => contextType.handleChange(e)}
                        selectedValue={parseInt(
                          contextType.state.selectedTypeId
                        )}
                      />
                    </td>
                  </tr>
                  <tr className={styles.brDiv}>
                    <td></td>
                  </tr>
                  <tr>
                    <td className={styles.questionTypeDiv} colSpan={2}>
                      <img
                        src={btnSave}
                        onClick={() =>
                          contextType.setTypeValue(
                            contextType.state.selectedTypeId
                          )
                        }
                        className={styles.saveBtn}
                      />
                    </td>
                  </tr>
                </div>
              </table>
            </React.Fragment>
          );
        }}
      </SpecificQuestionsContext.Consumer>
    );
  }
}

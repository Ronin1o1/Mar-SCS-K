import React, { Component } from "react";
import GrpMeetingsQuestionsContext from "./context/GroupMeetingsContext";
import Settings from "./static/Settings";
import btnSave from "../../../../../../common/assets/img/btnSave.gif";
import btnClose from "../../../../../../common/assets/img/button/btnClose.gif";
import styles from "./AccountMaintQuestionTypeAnswers.css";

let contextType = null;

interface IProps {}

interface IState {}

export default class AccountMaintQuestionTypeAnswer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GrpMeetingsQuestionsContext.Consumer>
        {(specQuesListContext) => {
          contextType = specQuesListContext;
          return (
            <React.Fragment>
              <div>
                <div className={styles.contentDiv}>
                  {contextType.state.specificQuestionsData.selectedSpecificQues.customAnswers.map(
                    (ans, i) => {
                      return (
                        <tr>
                          <div>
                            {Settings.Questions.ansLabel} {i + 1} :{" "}
                            <input
                              maxLength={50}
                              type="text"
                              name="customAnswer"
                              id={Settings.answerList.id}
                              onChange={(e) => contextType.handleChange(e, i)}
                              value={ans}
                              size={50}
                            />
                          </div>
                          <br className="brElement"></br>
                        </tr>
                      );
                    }
                  )}

                  <div className={styles.btnContainer}>
                    <img
                      src={btnSave}
                      onClick={() =>
                        contextType.checkAnswers(
                          contextType.state.specificQuestionsData
                            .selectedSpecificQues
                        )
                      }
                      className={styles.saveBtn}
                      style={{ marginRight: "5px" }}
                    />
                    <img
                      src={btnClose}
                      onClick={contextType.showModal}
                      className={styles.closeBtn}
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </GrpMeetingsQuestionsContext.Consumer>
    );
  }
}

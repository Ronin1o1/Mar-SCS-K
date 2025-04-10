import React, { useEffect, useState } from "react";
import styles from "./specificAnswerTag.css";
import Settings from "../static/Settings";
import CSelect from "../../../../../../common/components/CSelect";
import Utils from "../../../../../../../app/common/utils/Utils";
import numbergif from "../../../../../../shared/assets/img/123.gif";
import dategif from "../../../../../../shared/assets/img/date.gif";
import yngif from "../../../../../../shared/assets/img/yn.gif";
import customgif from "../../../../../../shared/assets/img/custom.gif";
import abcgif from "../../../../../../shared/assets/img/abc.gif";

export const SpecificAnswerTag = (props) => {
  const [textBoxAns, setTextBoxAns] = useState(
    props.data.selectedAns === null || props.data.selectedAns === ""
      ? ""
      : props.data.selectedAns
  );
  const [numTextBoxAns, setNumTextBoxAns] = useState(props.data.selectedAns);
  const [dateTextBoxAns, setDateTextBoxAns] = useState(props.data.selectedAns);
  useEffect(() => {
    setTextBoxAns(props.data.selectedAns);
    setNumTextBoxAns(props.data.selectedAns);
    setDateTextBoxAns(props.data.selectedAns);
  }, [props.data]);
  let isEdit = false;
  if (props.data.hasOwnProperty("isEditable")) {
    isEdit = props.data.isEditable;
  } else if (props.data.hasOwnProperty("editable")) {
    isEdit = props.data.editable;
  }

  const getTr = () => {
    return (
      <tr
        className={props.data.isEditable ? styles.heigt21 : styles.heigt0}
        id={props.data.questionid}
      >
        {getTdQuestionSrNo()}

        {getTdQuestion()}

        {getTdAnswer()}
      </tr>
    );
  };

  const getTdQuestionSrNo = () => {
    return (
      <td className={styles.field_Name}>
        <label className={props.lastIndex ? styles.bottom_Ele_Space : ""}>
          {props.data.question_seq}.
        </label>
      </td>
    );
  };

  const getTdSpace = () => {
    return (
      <td className={styles.field_Name}>
        <label
          className={props.lastIndex ? styles.bottom_Ele_Space : ""}
        ></label>
      </td>
    );
  };

  const getTdQuestion = () => {
    return (
      <td
        className={
          props.isUpdateHotel
            ? styles.field_Name_Quest_Hotel
            : styles.field_Name_Quest
        }
      >
        <label
          className={`${props.lastIndex ? styles.bottom_Ele_Space : ""} ${
            styles.tdQuestion
          }`}
        >
          {props.data.question}
        </label>
      </td>
    );
  };

  const getTdAnswer = () => {
    const switchParam = props.data.typeid;
    return (
      <td className={styles.field_Value}>
        {(() => {
          switch (switchParam) {
            case 2:
              return getNumericTextField(numTextBoxAns);
            case 3:
              return getDateField(dateTextBoxAns);
            case 4:
              return getDropDown();
            case 5:
              return getCustomField();
            default:
              return getTextField(textBoxAns);
          }
        })()}
      </td>
    );
  };

  const getNumericTextField = (numval) => {
    return (
      <>
        {!props.showOnlyAns ? (
          <React.Fragment>
            {isEdit && (
              <div>
                <span>
                  <img src={numbergif} />
                </span>
                <input
                  id={numval}
                  name={numval}
                  type="text"
                  className={styles.field_Number}
                  value={numval}
                  onChange={(e) =>
                    onValidation_Only(e, "number_field", props.data.questionid)
                  }
                  onPaste={(e) => e.preventDefault()}
                  disabled={!isEdit}
                  maxLength={props.data.max_len}
                />
              </div>
            )}
          </React.Fragment>
        ) : (
          <>{numval}</>
        )}
      </>
    );
  };

  const getDateField = (dateval) => {
    return (
      <>
        {!props.showOnlyAns ? (
          <React.Fragment>
            {isEdit && (
              <div>
                <span>
                  <img src={dategif} />
                </span>
                <input
                  id={dateval}
                  name={dateval}
                  type="text"
                  value={dateval}
                  onKeyPress={Utils.DateNumberOnly_onkeypress}
                  onChange={(e) =>
                    onValidation_Only(e, "date_field", props.data.questionid)
                  }
                  disabled={!isEdit}
                  maxLength={props.data.max_len}
                />
              </div>
            )}
          </React.Fragment>
        ) : (
          <>{dateval}</>
        )}
      </>
    );
  };

  const getDropDown = () => {
    return (
      <>
        {!props.showOnlyAns ? (
          <React.Fragment>
            {isEdit && (
              <div>
                <span>
                  <img src={yngif} />
                </span>
                <CSelect
                  id={Settings.btQuestionList.formFields.btPricingOption.id}
                  selectedValue={props.data.selectedAns}
                  ddnOptions={Settings.btQuestionList.btPricingOptions}
                  onChange={(e) =>
                    onValidation_Only(
                      e,
                      "dropdown_field",
                      props.data.questionid
                    )
                  }
                  keyField={
                    Settings.btQuestionList.formFields.btPricingOption.keyField
                  }
                  valField={
                    Settings.btQuestionList.formFields.btPricingOption.valField
                  }
                  isDisabled={!isEdit}
                  // width={props.data.max_len == 1 ? "" : props.data.max_len}
                />
              </div>
            )}
          </React.Fragment>
        ) : (
          <>{props.data.selectedAns}</>
        )}
      </>
    );
  };

  const getCustomField = () => {
    return (
      <>
        {!props.showOnlyAns ? (
          <React.Fragment>
            {isEdit && (
              <div>
                <span>
                  <img src={customgif} />
                </span>
                <select
                  name={props.data.questionid}
                  id={props.data.questionid}
                  onChange={(e) =>
                    onValidation_Only(e, "custom_field", props.data.questionid)
                  }
                  disabled={!isEdit}
                  width={props.data.max_len}
                >
                  <option
                    value="    "
                    selected={props.data.selectedAns == "    " ? true : false}
                  >
                    {""}
                  </option>
                  {props.data.customAnswers.map((customItem) => {
                    return (
                      <>
                        (
                        <option
                          value={customItem}
                          selected={
                            customItem == props.data.selectedAns ? true : false
                          }
                        >
                          {customItem}
                        </option>
                        )
                      </>
                    );
                  })}
                </select>
              </div>
            )}
          </React.Fragment>
        ) : (
          <>{props.data.selectedAns}</>
        )}
      </>
    );
  };

  const getTextField = (textval) => {
    return (
      <>
        {!props.showOnlyAns ? (
          <React.Fragment>
            {isEdit && (
              <span className={styles.dispContent}>
                <label className={styles.pt5}>
                  <img src={abcgif} />
                </label>
                <input
                  id={textval}
                  name={textval}
                  type="text"
                  value={textval}
                  className={`${styles.datainputvalue} ${styles.mt3}`}
                  onChange={(e) =>
                    onValidation_Only(e, "text_field", props.data.questionid)
                  }
                  maxLength={props.data.max_len}
                  disabled={!isEdit}
                />
              </span>
            )}
          </React.Fragment>
        ) : (
          <>{textval}</>
        )}
      </>
    );
  };

  const onValidation_Only = (e, fieldType, question_id) => {
    const reg_number = /^[0-9]*\.?[0-9]*$/;
    const reg_date =
      /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/;
    if (fieldType === "number_field") {
      if (e.target.value === "" || reg_number.test(e.target.value)) {
        props.handleChange(e, question_id, props.type);
        setNumTextBoxAns(e.target.value);
      } else {
        if (numTextBoxAns === null) {
          setNumTextBoxAns("");
        } else {
          setNumTextBoxAns(numTextBoxAns);
        }
      }
    } else if (fieldType === "date_field") {
      props.handleChange(e, question_id, props.type);
      setDateTextBoxAns(e.target.value);
    } else if (
      fieldType === "text_field" ||
      fieldType === "dropdown_field" ||
      fieldType === "custom_field"
    ) {
      fieldType === "text_field" ? setTextBoxAns(e.target.value) : "";
      props.handleChange(e, question_id, props.type);
    }
  };

  return getTr();
};

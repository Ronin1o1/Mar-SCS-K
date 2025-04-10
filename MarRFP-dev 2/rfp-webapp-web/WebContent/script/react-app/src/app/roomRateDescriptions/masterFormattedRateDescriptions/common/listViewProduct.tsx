import React from "react";
import styles from "../common/listViewProduct.css";
import CCheckbox from "../../../common/components/CCheckbox";
import Settings from "../settings/settings";

export const ListViewProduct = (props) => {
  const handleOnChange = (event) => {
    props.handleChange(event);
  };

  return (
    <>
      <tr>
        <td>{props.data?.RP_ListName.trim()}</td>
      </tr>
      <tr>
        <td>
          <table className={styles.attributeTbl}>
            {props.data?.rateProductDefinitionGroup.map((item) => {
              return (
                <>
                  <tr>
                    <td className={styles.width_10}>
                      <>&nbsp;</>
                    </td>
                    <td>{item?.RP_GroupName.trim()}</td>
                  </tr>
                  <tr>
                    <td className={styles.width_10}>
                      <>&nbsp;</>
                    </td>
                    <td>
                      <table className={styles.attributeTbl}>
                        {item?.rateProductDefinition.map((itemval) => {
                          return (
                            <>
                              <tr>
                                <td className={styles.width_10}>
                                  <>&nbsp;</>
                                </td>
                                <td>
                                  <CCheckbox
                                    type={Settings.inputType.checkbox}
                                    id={
                                      props.data.RP_ListCode +
                                      "_" +
                                      item.RP_GroupCode +
                                      "_" +
                                      itemval.RP_Name +
                                      "_" +
                                      itemval.RP_Code
                                    }
                                    name={
                                      props.data.RP_ListCode +
                                      "_" +
                                      item.RP_GroupCode +
                                      "_" +
                                      itemval.RP_Name +
                                      "_" +
                                      itemval.RP_Code
                                    }
                                    value={
                                      props.data.RP_ListCode +
                                      "_" +
                                      item.RP_GroupCode +
                                      "_" +
                                      itemval.RP_Name +
                                      "_" +
                                      itemval.RP_Code
                                    }
                                    onChangeHandler={(e) => handleOnChange(e)}
                                    checked={!!itemval.checked}
                                  ></CCheckbox>
                                  <label
                                    className={styles.productListLabel}
                                    htmlFor={`${
                                      props.data.RP_ListCode +
                                      "_" +
                                      item.RP_GroupCode +
                                      "_" +
                                      itemval.RP_Name +
                                      "_" +
                                      itemval.RP_Code
                                    }`}
                                  >
                                    {itemval.RP_CodeName}
                                  </label>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </table>
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </td>
      </tr>
    </>
  );
};

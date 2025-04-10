import React, { Fragment, useState } from "react";
import CModal from "./CModal";
import btnSave from "../assets/img/btnSave.gif";

export function CRemovalReasonModal(props) {
  const [removeReasonOption, setRemoveReasonOption] = useState({
    removalReasonId: "",
    removalReason: "",
  });

  return (
    <CModal
      title={props.isRejectReasonModal ? "Rejection Reason" : "Removal Reason"}
      onClose={props.closeModal}
      show={props.showModal}
    >
      <div style={{ padding: "10px" }}>
        <Fragment>
          <table cellSpacing={0} cellPadding={0}>
            <tbody>
              {props.removalReason?.length === 0 ? (
                <span className="wait" style={{ paddingLeft: 20 }}>
                  Please wait loading...
                </span>
              ) : (
                <Fragment>
                  <tr>
                    <td className="field_Name" width="150px" align="left">
                      <div id="rrhdiv" style={{ fontWeight: "bold" }}>
                        {props.isRejectReasonModal
                          ? "Rejection Reason:"
                          : "PGOOS Removal Reason:"}
                      </div>
                    </td>
                    <td className="Field_Value" align="left">
                      <div id="rrsdiv">
                        <select
                          id="removalreasonid"
                          name="removalreasonid"
                          autoFocus={true}
                          style={{ fontSize: "8pt" }}
                          onChange={(event) =>
                            setRemoveReasonOption({
                              removalReasonId: event.target.value,
                              removalReason: String(
                                event.target.options[event.target.selectedIndex]
                                  .text
                              ),
                            })
                          }
                        >
                          <option value="" />

                          {props.removalReason?.map((item) => {
                            return (
                              <option
                                value={
                                  item.removalreasonid || item.rejectreasonid
                                }
                                selected={
                                  parseInt(props.selectedItem) ===
                                  parseInt(
                                    item.removalreasonid || item.rejectreasonid
                                  )
                                }
                              >
                                {item.removalreason || item.rejectionreason}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              )}
              <tr>
                <td style={{ height: "10px" }} />
              </tr>
              <tr>
                <td colSpan={2} valign="bottom" align="center">
                  <img
                    src={btnSave}
                    style={{ cursor: "hand" }}
                    onClick={() =>
                      props.handleSaveUpdateReason(removeReasonOption)
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      </div>
    </CModal>
  );
}

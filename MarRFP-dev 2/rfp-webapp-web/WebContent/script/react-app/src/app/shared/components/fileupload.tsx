import React, { useRef } from "react";
import styles from "./fileupload.css";
import Settings from "./../static/Settings";
import FilteredGridSelectUtils from "../utils/FilteredGridSelectUtils";

function FileUpload(props) {
  const ref = useRef(null);
  let fileObj;

  const fileUpload = (event) => {
    //---Old code backup---
    // if (FilteredGridSelectUtils.validateFile(event.target.files[0].name)) {
    //     fileObj = event.target.files[0];
    // }
    //---Old code backup---
    if (
      event.target.files &&
      event.target.files[0] &&
      event.target.files[0].name
    ) {
      fileObj = event.target.files[0];
    }
    props.setFileObj(fileObj);
  };

  const clearFile = () => {
    if (ref) {
      ref.current.value = "";
      props.setFileObj("");
    }
  };

  return (
    <div className={styles.gridHeaderFileUpload}>
      <label className={styles.emailLabel}>{Settings.fileUploadLabel}</label>
      <input
        type="file"
        id="emailFileUpload"
        name="emailFileUpload"
        ref={ref}
        onChange={fileUpload}
        style={{ border: "none" }}
      />
      <input
        type="button"
        id="clear"
        name="Clear"
        onClick={clearFile}
        className={styles.clearBtn}
        value="Clear"
        style={{ border: "none" }}
      />
    </div>
  );
}

export default FileUpload;

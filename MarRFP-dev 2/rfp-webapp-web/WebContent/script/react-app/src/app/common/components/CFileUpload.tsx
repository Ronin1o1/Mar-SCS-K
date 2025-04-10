import React from "react";
import styles from "./CFileUpload.css";
import uploadBtn from "../../common/assets/img/button/btnUploadStr.gif";

let file = null;
function CFileUpload(props) {
  const fileUploadClick = (event) => {
    props.onFileUpload(file);
  };

  const handleClick = (event) => {
    // filename = event.target.files[0].name;
    file = event.target.files[0];
  };
  return (
    <React.Fragment>
      <div className={styles.fileUploadSection}>
        <div className={styles.fileUploadDiv}>
          <tr className={styles.fileUpload}>
            <td>
              <b>Select the file to upload </b>:{" "}
            </td>
            <td className={styles.alingMiddle}>
              {" "}
              <input
                style={{ marginLeft: "16px" }}
                type="file"
                onChange={handleClick}
              />
            </td>

            <div></div>
          </tr>
          <div className={styles.fileUploadSubmit}>
            <a href="javascript:void(0);" onClick={fileUploadClick}>
              <img src={uploadBtn} />
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CFileUpload;

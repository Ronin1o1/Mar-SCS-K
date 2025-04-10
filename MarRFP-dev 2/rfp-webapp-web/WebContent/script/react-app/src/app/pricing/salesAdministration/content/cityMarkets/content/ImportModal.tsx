import React, { useContext, useEffect, useRef } from "react";
import styles from "./ImportModal.css";
import uploadBtn from "../../../../../common/assets/img/button/btnUploadStr.gif";
import CityMarketsContext, {
  ICityMarketsContext,
} from "../context/cityMarketsContext";
import CModal from "../../../../../common/components/CModal";
import Settings from "../static/Settings";

let file = null;
function ImportModal(): JSX.Element {
  const inputRef = useRef();

  useEffect(() => {
    inputRef?.current?.focus();
  });
  const context = useContext(CityMarketsContext) as ICityMarketsContext;
  const marketType = context.state.showImportMarket.type;

  const fileUploadClick = (event) => {
    context.onFileUpload(file, marketType);
  };

  const handleClick = (event) => {
    // filename = event.target.files[0].name;
    file = event.target.files[0];
    context.fileHandleClick(file);
    // context.setState({ ...context.state, fileUpload: event.target.files[0] });
  };
  return (
    <div className={styles.cmodal}>
      <CModal
        componentName={Settings.TabTitles.componentName}
        title={
          marketType == "US"
            ? Settings.TabTitles.ImportModalUS
            : Settings.TabTitles.ImportModalInt
        }
        onClose={context.importTemplate}
        show={context.state.showImportMarket.isOpen}
        xPosition={-100}
        yPosition={-50}
        closeImgTitle={Settings.cmodelclose}
        overlayHeight={Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        )}
        overlayTopPosition={"-79px"}
      >
        <div className={styles.fileUploadSection}>
          <div className={styles.fileUploadDiv}>
            <div className={styles.fileUpload}>
              <span>
                <b>Select the file to upload : </b> &nbsp; &nbsp;
              </span>
              <span className={styles.alingMiddle}>
                {" "}
                <input
                  className={styles.importButton}
                  type="file"
                  onChange={handleClick}
                  ref={inputRef}
                />
              </span>
            </div>
            <div className={styles.fileUploadSubmit}>
              <a href="javascript:void(0);" onClick={fileUploadClick}>
                <img src={uploadBtn} />
              </a>
            </div>
          </div>
        </div>
      </CModal>
    </div>
  );
}

export default ImportModal;

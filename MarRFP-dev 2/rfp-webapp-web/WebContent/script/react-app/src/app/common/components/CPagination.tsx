import React, { Fragment, useEffect, useState, useContext } from "react";
import btnPageFirst from "../assets/img/btnPageFirst.gif";
import btnPagePrev from "../assets/img/btnPagePrev.gif";
import btnPageNext from "../assets/img/btnPageNext.gif";
import btnPageLast from "../assets/img/btnPageLast.gif";
import btnPageGo from "../assets/img/btnPageGo.gif";
import CModal from "./CModal";
import Utils from "../utils/Utils";
import ApplicationContext, {
  IApplicationContext,
} from "../../common/components/ApplicationContext";
interface ICPaginationProps {
  totalPages: number;
  handlePaginationAPI: (pageNumber: number) => void;
  className?: string;
  context?: any;
  width?: number;
  resetInput?: number;
  goToPageWidth?: string;
  pageType?: boolean;
  tableCustomStyles?: any;
  fontBold?: any;
  noResetOnSearch?: boolean;
  pageNumber?: number;
}
export const CPagination: React.FC<ICPaginationProps> = (
  props: ICPaginationProps
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [goPageNumber, setGoPageNumber] = useState("");
  const [validateModal, setValidateModal] = useState(false);
  const [message, setMessage] = useState("");
  const { context } = props;
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const sessionPageNo = sessionStorage.getItem("cpacSearchPageNo");
  const hotelUsersPageNo = sessionStorage.getItem("hotelUsersPageNo");
  const salesUsersPageNo = sessionStorage.getItem("salesUsersPageNo");
  const limitedsalesUsersPageNo = sessionStorage.getItem(
    "limitedsalesUsersPageNo"
  );

  const addSpaceBtButtons =
    props.compName === "accountMaintenance" ? true : false;

  const finalPageNum =
    props.compName === "HotelUsers"
      ? hotelUsersPageNo !== undefined && hotelUsersPageNo !== null
        ? hotelUsersPageNo
        : 1
      : props.compName === "SalesUsers"
      ? salesUsersPageNo !== undefined && salesUsersPageNo !== null
        ? salesUsersPageNo
        : 1
      : props.compName === "LimitessalesUsers"
      ? limitedsalesUsersPageNo !== undefined &&
        limitedsalesUsersPageNo !== null
        ? limitedsalesUsersPageNo
        : 1
      : sessionPageNo !== undefined && sessionPageNo !== null
      ? sessionPageNo
      : props.compName === "accountMaintenance"
      ? props?.pageNumber || context?.pageNumber || currentPage
      : currentPage;
  useEffect(() => {
    if (context && context.resetInput) {
      setGoPageNumber("");
      /**Prevent reseting current page number while search*/
      if (!props.noResetOnSearch) {
        setCurrentPage(1);
      }
    }
  }, [props.resetInput || (context && context.resetInput)]);

  /**update the page number from the parent component context state */
  useEffect(() => {
    setCurrentPage(context?.pageNumber ? context?.pageNumber : currentPage);
  }, [context && context?.pageNumber]);

  /**update the page number from the update multiple hotels screen */
  useEffect(() => {
    setCurrentPage(props?.pageNumber ? props?.pageNumber : currentPage);
  }, [props?.pageNumber]);

  useEffect(() => {
    setCurrentPage(context?.pNumber ? context?.pNumber : currentPage);
  }, [props && props?.pageType]);

  useEffect(() => {
    setCurrentPage(context?.pCopyNumber ? context?.pCopyNumber : currentPage);
  }, [context && context?.pCopyNumber]);

  const isNumber = (input: string) => {
    const isNumberRegx = /^([0-9]+)$/;
    return isNumberRegx.test(input);
  };
  const handleChangeNextPage = () => {
    if (window.location.pathname.includes("CPAC") && appContext.isNoBidAlert) {
      alert("Please select the No Bid Reason for each highlighted row.");
    } else {
      context && context?.setResetInput(false);
      if (currentPage < props.totalPages) {
        const page = currentPage + 1;
        setCurrentPage(currentPage + 1);
        props.handlePaginationAPI(page);
      } else if (currentPage == props.totalPages) {
        const page = currentPage;
        setCurrentPage(currentPage);
        props.handlePaginationAPI(page);
      } else {
        context && context.setResetInput(true);
      }
    }
  };

  const handleChangePreviousPage = () => {
    if (window.location.pathname.includes("CPAC") && appContext.isNoBidAlert) {
      alert("Please select the No Bid Reason for each highlighted row.");
    } else {
      context && context.setResetInput(false);
      if (currentPage > 1) {
        const page = currentPage - 1;
        setCurrentPage(page);
        props.handlePaginationAPI(page);
      } else if (currentPage == 1) {
        const page = currentPage;
        setCurrentPage(page);
        props.handlePaginationAPI(page);
      } else {
        context && context.setResetInput(true);
      }
    }
  };

  const goToDirectPage = () => {
    if (window.location.pathname.includes("CPAC") && appContext.isNoBidAlert) {
      alert("Please select the No Bid Reason for each highlighted row.");
    } else {
      context && context.setResetInput(false);
      if (
        !isNumber(goPageNumber) ||
        parseInt(goPageNumber) > props.totalPages ||
        parseInt(goPageNumber) <= 0
      ) {
        if (goPageNumber != "") {
          setValidateModal(true);
          setMessage("Please enter a valid page number");
        } else if (goPageNumber == "") {
          setCurrentPage(parseInt("1"));
          props.handlePaginationAPI(parseInt("1"));
          setGoPageNumber("");
        } else {
          props.handlePaginationAPI(props.totalPages);
        }
      } else {
        setCurrentPage(parseInt(goPageNumber));
        props.handlePaginationAPI(parseInt(goPageNumber));
        setGoPageNumber("");
      }
    }
  };

  const showValidateMirror = () => {
    setValidateModal(!validateModal);
  };

  return (
    <Fragment>
      <CModal
        title="Alert Message"
        onClose={showValidateMirror}
        show={validateModal}
        closeImgTitle={"OK - Close Message Box"}
      >
        <div style={{ maxWidth: 250, minWidth: 150, padding: "9px 12px" }}>
          {message}
        </div>
      </CModal>
      <table style={props.tableCustomStyles ? props.tableCustomStyles : null}>
        <tbody>
          <tr>
            <td>
              <table className={props.className}>
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={btnPageFirst}
                        onClick={() => {
                          setCurrentPage(1);
                          context && context.setResetInput(false);
                          props.handlePaginationAPI(1);
                        }}
                      />
                    </td>
                    <td>
                      {addSpaceBtButtons && <>&nbsp;</>}
                      <img
                        src={btnPagePrev}
                        onClick={handleChangePreviousPage}
                      />
                    </td>
                    {props.totalPages === 0 ? (
                      <td
                        style={{
                          fontWeight: `${props.fontBold ? "bold" : "normal"}`,
                        }}
                      >
                        Page 0 of {props.totalPages}
                      </td>
                    ) : (
                      <td
                        style={{
                          fontWeight: `${props.fontBold ? "bold" : "normal"}`,
                        }}
                      >
                        {"Page " + finalPageNum + " of " + props.totalPages}
                      </td>
                    )}

                    <td>
                      {addSpaceBtButtons && <>&nbsp;</>}
                      <img src={btnPageNext} onClick={handleChangeNextPage} />
                    </td>
                    <td>
                      {addSpaceBtButtons && <>&nbsp;</>}
                      <img
                        src={btnPageLast}
                        onClick={() => {
                          setCurrentPage(props.totalPages);
                          context && context.setResetInput(false);
                          props.handlePaginationAPI(props.totalPages);
                        }}
                      />
                    </td>
                    <td
                      style={{
                        fontWeight: `${
                          props.fontBold ? props.fontBold : "normal"
                        }`,
                      }}
                    >
                      {addSpaceBtButtons && <>&nbsp;</>} Go to page:
                    </td>
                    <td>
                      <input
                        type="text"
                        id="pageNum"
                        style={{
                          width: props.goToPageWidth
                            ? props.goToPageWidth
                            : "28px",
                          height: "15.3px",
                        }}
                        value={goPageNumber}
                        onKeyPress={Utils.NumberOnly_onkeypress}
                        onChange={(e) => {
                          context && context.setResetInput(false);
                          setGoPageNumber(e.target.value);
                        }}
                      />
                    </td>
                    <td>
                      <img src={btnPageGo} onClick={goToDirectPage} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

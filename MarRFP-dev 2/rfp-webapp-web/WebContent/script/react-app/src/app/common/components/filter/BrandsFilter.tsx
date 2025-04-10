import React, { useEffect, useState } from "react";
import CModal from "../CModal";
import styles from "./Filter.css";
import { isEqual, sortBy } from "lodash";
import classNames from "classnames";

export function BrandsFilter(props) {
  const session_payLoad = JSON.parse(localStorage.getItem("REQUEST_PAYLOAD"));
  const session_brandslist =
    session_payLoad !== null &&
    session_payLoad !== false &&
    session_payLoad !== undefined
      ? session_payLoad.brandlist
      : null;
  const defaultCount =props?.filterContext?.filterViewLists?.brandlist?.length;
  const [allCheck, setAllCheck] = useState(false);
  const [checkedBoxes, setCheckedBoxes] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(defaultCount);
  const closeModal = () => setShowModal(false);

  useEffect(()=>{
    setCount(defaultCount);
  },props?.filterContext?.filterViewLists?.brandlist);

  useEffect(() => {
    if (
      props.isUpdateMultiple &&
      session_brandslist !== undefined &&
      session_brandslist !== null &&
      session_brandslist.length > 0 &&
      session_brandslist.length != defaultCount
    ) {
      if (defaultCount === props?.filterContext?.filterViewLists?.brandlist?.length) {
        setAllCheck(true);
        setCheckedBoxes([]);
      } else {
        setAllCheck(false);
      }
    } else {
      setCheckedBoxes([]);
      setAllCheck(true);
    }
  }, []);

  /**
   *
   * @param checked
   */
  const handleAllCheckbox = (checked: boolean) => {
    setAllCheck(checked);
    checked
      ? (setCheckedBoxes([]), setCount(defaultCount), handleSetAllBrandsToPayload())
      : setShowModal(true);
  };

  /**
   *
   * @param checked
   * @param id
   */
  const handleCheckBoxes = (checked: boolean, id: number, name: string) => {
    const objIndex = checkedBoxes.findIndex((item) => item.id === id);
    if (objIndex >= 0) {
      checkedBoxes.splice(objIndex, 1);
      setCheckedBoxes([...checkedBoxes]);
    } else {
      const checkSingleBoxes = {
        checked,
        id,
        name,
      };
      checkedBoxes.push(checkSingleBoxes);
      setCheckedBoxes([...checkedBoxes]);
    }
  };

  /**
   *
   */
  const handleSetAllCheck = () => {
    setAllCheck(checkedBoxes.length > 0 ? false : true);
  };

  /**
   *
   */
  const handleCancel = () => {
    setCheckedBoxes([]);
    setAllCheck(true);
    closeModal();
    setCount(defaultCount);
    handleSetAllBrandsToPayload();
    props.filterContext.setIsDataChange(true);
  };

  /**
   *
   */
  const getBrandsList = () => {
    const brand_list = props.filterContext?.filterViewLists?.brandlist;
    return (
      brand_list !== undefined &&
      brand_list.length > 0 &&
      brand_list.map((brand, index) => {
        const check =
          checkedBoxes !== null &&
          checkedBoxes.length > 0 &&
          checkedBoxes.filter(
            (checkbox) => checkbox.id === brand.affiliationid
          );
        return (
          <p key={index} className={styles.brandselection}>
            <input
              type="checkbox"
              data-affiliation-id={brand.affiliationid}
              onChange={(e) => {
                props.filterContext.setupdateMutipleRequestInitialChangeEvents({
                  ...props.filterContext.updateMutipleRequestEvents,
                  brandFilterChange: true,
                });
                handleCheckBoxes(
                  e.target.checked,
                  brand.affiliationid,
                  brand.affiliationname
                );
              }}
              checked={check.length > 0 ? check[0].checked : false}
            />
            <label>{brand.affiliationname}</label>
          </p>
        );
      })
    );
  };

  /**
   *
   */
  const handleSetAllBrandsToPayload = () => {
    const bradList = props.filterContext.filterViewLists?.brandlist?.map(
      (item) => item.affiliationid
    );
    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        stringBrandList: bradList?.toString(),
      },
    });

    handleSetWholeItem(props.filterContext.filterViewLists?.brandlist);
  };

  const handleSetWholeItem = (itemData) => {
    const modifedData: any = [];
    itemData.forEach((item) => {
      modifedData.push({
        affiliationid: item?.id === undefined ? item.affiliationid : item?.id,
        affiliationname: item?.name || "",
        affiliationstatus: "",
      });
    });

    props.filterContext.setupdateMutipleRequestInitalPayload({
      ...props.filterContext.updateMutipleRequestPayload,
      brandlist: modifedData,
    });
  };

  /**
   *
   */
  const handleSave = () => {
    props.filterContext.setIsDataChange(true);
    let bradList: string[] = [];
    if (checkedBoxes.length > 0) {
      setCount(checkedBoxes.length > 0 ? checkedBoxes.length : defaultCount);
      bradList = checkedBoxes.map((item) => item.id);

      props.filterContext.setRequestPayload({
        ...props.filterContext.requestPayload,
        strFilterValues: {
          ...props.filterContext.requestPayload.strFilterValues,
          stringBrandList: bradList?.toString(),
        },
      });

      handleSetWholeItem(checkedBoxes);
    } else {
      handleSetAllBrandsToPayload();
      setCount(defaultCount);
    }
    handleSetAllCheck();
    closeModal();
  };

  /**
   *
   */
  const showToolTopContent = () => {
    if (checkedBoxes?.length > 0) {
      return sortBy(checkedBoxes, "name").map((item) => {
        return <span>{item.name}</span>;
      });
    } else {
      return props.filterContext.filterViewLists?.brandlist?.map((item) => {
        return <span>{item.affiliationname}</span>;
      });
    }
  };

  return (
    <tr>
      <td
        style={{
          borderTop: props.isUpdateMultiple ? "none" : "thin groove",
        }}
      >
        <div className={styles.brandFilter}>
          <CModal
            title="Select Brands"
            onClose={closeModal}
            show={showModal}
            class={"brandmodal"}
            xPosition={-375}
            yPosition={-150}
          >
            <div style={{ padding: "10px" }}>
              <div className={styles.brand_filter_dialog}>
                <div className="brand-container">
                  <div
                    className={
                      props.componentName === "requestReport"
                        ? styles.brand_columnReport
                        : styles.brand_column
                    }
                    style={{height : '250px', overflow: "auto"}}
                  >
                    {getBrandsList()}
                  </div>
                </div>
                <div className={styles.actionBar}>
                  <input
                    type="button"
                    className="save"
                    data-dojo-attach-event="click:onSave"
                    data-dojo-attach-point="saveButton"
                    id={styles.filterBandSave}
                    onClick={handleSave}
                  />
                  <input
                    type="button"
                    className="cancel"
                    data-dojo-attach-event="click:onCancel"
                    data-dojo-attach-point="cancelButton"
                    id={styles.filterBandCancel}
                    onClick={handleCancel}
                  />
                </div>
              </div>
            </div>
          </CModal>
          <style>{`
              .brandmodal{
                min-width: 900px; 
                position:fixed;
              }
              @media only screen and (max-width: 1024px) {
                .brandmodal{
                  transform: translate(-325px, -200px) !important;
                }
              }
          `}</style>
          <header>
            <div>
              <strong>Brands:</strong>
            </div>
            <div>
              <strong>ALL</strong>
              <input
                type="checkbox"
                style={{ marginLeft: "3px" }}
                onChange={(event) => {
                  props.filterContext.setIsDataChange(true);
                  handleAllCheckbox(event.target.checked);
                }}
                checked={allCheck}
              />
            </div>
            {!allCheck && (
              <div>
                <span
                  className={styles.selectBrands}
                  onClick={() => setShowModal(true)}
                >
                  Select Brands
                </span>
              </div>
            )}
          </header>
          There are currently <span>{count}</span> brands selected.
          <div
            style={{ marginLeft: "8px" }}
           
            className={
              props.componentName === "EdieHotelProfileView"
                ? styles.customtooltipEdieHotelProfileView
                : props.componentName === "UpdateMultipleHotels"
                ? checkedBoxes?.length === 0
                  ? classNames(styles.customtooltip)
                  : checkedBoxes?.length < 2
                  ? classNames(styles.customtooltip, styles.customtooltipUMH0)
                  : checkedBoxes?.length < 3
                  ? classNames(styles.customtooltip, styles.customtooltipUMH1)
                  : checkedBoxes?.length < 5
                  ? classNames(styles.customtooltip, styles.customtooltipUMH3)
                  : checkedBoxes?.length < 7
                  ? classNames(styles.customtooltip, styles.customtooltipUMH4)
                  : checkedBoxes?.length < 10
                  ? classNames(styles.customtooltip, styles.customtooltipUMH5)
                  : checkedBoxes?.length < 15
                  ? classNames(styles.customtooltip, styles.customtooltipUMH6)
                  : checkedBoxes?.length < 20
                  ? classNames(styles.customtooltip, styles.customtooltipUMH7)
                  : checkedBoxes?.length < 25
                  ? classNames(styles.customtooltip, styles.customtooltipUMH8)
                  : classNames(styles.customtooltip)
                : props.componentName === "portfolioRebid" || "cbcRequest" || "portfolioCBCStatus" || "hotelSolicitation" || "PortfolioAcceptance" || "portfolioOrganization" || "PortfolioSelection" || "hotelPGOOSMaintenance" || "hotelGPPPGOOSMaintenance" || "PgoosPropagation" || "requestEdie" || "requestReport"
                ? checkedBoxes?.length === 0
                  ? classNames(styles.customtooltip, styles.customtooltipPR)
                  : checkedBoxes?.length < 2
                  ? classNames(styles.customtooltip, styles.customtooltipPR0)
                  : checkedBoxes?.length < 3
                  ? classNames(styles.customtooltip, styles.customtooltipPR1)
                  : checkedBoxes?.length < 5
                  ? classNames(styles.customtooltip, styles.customtooltipPR3)
                  : checkedBoxes?.length < 7
                  ? classNames(styles.customtooltip, styles.customtooltipPR4)
                  : checkedBoxes?.length < 10
                  ? classNames(styles.customtooltip, styles.customtooltipPR5)
                  : checkedBoxes?.length < 16
                  ? classNames(styles.customtooltip, styles.customtooltipPR6)
                  : checkedBoxes?.length < 20
                  ? classNames(styles.customtooltip, styles.customtooltipPR7)
                  : checkedBoxes?.length < 25
                  ? classNames(styles.customtooltip, styles.customtooltipPR8)
                  : checkedBoxes?.length < 32
                  ? classNames(styles.customtooltip, styles.customtooltipPR9)
                  : classNames(styles.customtooltip)
                : classNames(styles.customtooltip)
            }
          >
            {/* <div className={styles.tooltipConnector}></div> */}
            <div className={styles.right}>
              <i></i>
              {showToolTopContent()}
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

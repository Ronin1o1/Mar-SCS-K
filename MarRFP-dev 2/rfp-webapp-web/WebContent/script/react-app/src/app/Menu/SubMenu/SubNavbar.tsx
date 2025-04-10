import styles from "./SubNavbar.css";
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
//import fileDownload from "js-file-download";
import API from "../../pricing/salesAdministration/projectCodes/service/API";
import CNavLink from "../../shared/components/CNavLink";
import Settings from "../../shared/static/Settings";
import ApplicationContext, {
  IApplicationContext,
} from "../../common/components/ApplicationContext";

export default function SubNavbar({ userDetails }) {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const history = useHistory();
  const [globalMenu, setGlobalMenu] = useState([]);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [subChildMenu, setSubChildMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  //SUB MENUS
  const [pricingMenuList, setPricingMenuList] = useState([]);
  const [roomRateDescriptionList, setRoomRateDescriptionList] = useState([]);
  const [generalAdministrationList, setGeneralAdministrationList] = useState(
    []
  );

  //2nd level SUB MENUS
  const [pricingAdministrationList, setPricingAdministrationList] = useState(
    []
  );
  const [pricingPortfolioList, setPricingPortfolioList] = useState([]);
  const [pricingSalesAdministrationList, setPricingSalesAdministrationList] =
    useState([]);
  const [pricingPGOOSList, setPricingPGOOSList] = useState([]);
  const [pricingEDIEList, setPricingEDIEList] = useState([]);
  const [pricingReportsList, setPricingReportsList] = useState([]);

  // RD
  const [rdAdministrationList, setRDAdministrationList] = useState([]);
  const [roomDefDisplayRulesList, setRoomDefDisplayRulesList] = useState([]);
  const [roomDefDisplayTextList, setRoomDefDisplayTextList] = useState([]);

  //General administration
  const [gaUserPropertiesList, setGAUserPropertiesList] = useState([]);
  const [genReportsList, setGenReportsList] = useState([]);
  //

  useEffect(() => {
    if (!isEmpty(userDetails)) {
      if (history.location.pathname != "/support") {
        setGlobalMenus(userDetails?.menus);
        setPricingSubMenus(userDetails?.menus);
        setRoomRateDescriptionSubMenus(userDetails?.menus);
        setGeneralAdministrationSubMenus(userDetails?.menus);
      }
    }
  }, [userDetails]);

  const setGlobalMenus = (userMenus) => {
    const tempArray = [];

    if (userMenus[1] != undefined) {
      tempArray.push({
        title: "Pricing",
        url: "/pricinghotelselect/SelectHotelPricing",
      });
    }

    if (userMenus[4] != undefined) {
      tempArray.push({
        title: "Room / Rate Description",
        url: "/roomdefhotelselect/select",
      });
    }

    if (userMenus[5] != undefined) {
      tempArray.push({
        title: "General Administration",
        url: "/generalviewreports",
      });
    }

    setGlobalMenu(tempArray);
  };

  const setGenReportsSubMenu = (userMenus) => {
    const tempArray = [];

    tempArray.push({ title: "View Reports", url: "/generalviewreports" });
    tempArray.push({
      title: "Request Special Reports",
      url: "/garequestspecialreports",
    });

    setGenReportsList(tempArray);
  };

  const setGAUserPropertiesSubMenu = (userMenus) => {
    const tempArray = [];

    if (userMenus[7] != undefined) {
      tempArray.push({ title: "Hotel Users", url: "/hotelusers" });
    }
    tempArray.push({ title: "Sales Users", url: "/salesusers" });
    tempArray.push({
      title: "Limited Sales Users",
      url: "/limitedsalesusers",
    });

    if (userMenus[7] != undefined) {
      tempArray.push({ title: "Admin Users", url: "/adminusers" });
      tempArray.push({
        title: "Room / Rate Description Admin Users",
        url: "/roomratedescriptionadminusers",
      });
      tempArray.push({ title: "DBMARSHA Users", url: "/dbmarshausers" });
      tempArray.push({ title: "Account Plan Users", url: "/accountplanusers" });
      tempArray.push({ title: "KOR Admin Users", url: "/koradminusers" });
      tempArray.push({ title: "Read Only Users", url: "/readonlyusers" });
    }

    setGAUserPropertiesList(tempArray);
  };

  const setGeneralAdministrationSubMenus = (userMenus) => {
    const tempArray = [];

    if (userMenus[42] != undefined) {
      tempArray.push({ title: "General News", url: "/generalnews" });
    }

    if (userMenus[43] != undefined) {
      if (userMenus[7] != undefined) {
        tempArray.push({
          title: "User Properties",
          url: "/hotelusers",
        });
        setGAUserPropertiesSubMenu(userMenus);
      } else {
        tempArray.push({
          title: "User Properties",
          url: "/salesusers",
        });
        setGAUserPropertiesSubMenu(userMenus);
      }
    }

    if (userMenus[44] != undefined) {
      tempArray.push({ title: "Synchronize Users", url: "/synchronize/view" });
    }
    if (userMenus[45] != undefined) {
      tempArray.push({ title: "Reports", url: "/generalviewreports" });
      setGenReportsSubMenu(userMenus);
    }

    setGeneralAdministrationList(tempArray);
  };

  const setRoomRateDescriptionSubMenus = (userMenus) => {
    const tempArray = [];

    if (userMenus[35] != undefined) {
      tempArray.push({ title: "Administration", url: "/rdnews/news" });
      setRoomDefAdministrationSubMenu(userMenus);
    }
    if (userMenus[36] != undefined) {
      tempArray.push({
        title: "Hotel Room Description",
        url: "/roomdefhotelselect/select",
      });
    }
    if (userMenus[37] != undefined) {
      tempArray.push({
        title: "Master Formatted Room Names",
        url: "/roomtypenamemasterroompool/getRoomPools",
      });
    }
    if (userMenus[38] != undefined) {
      tempArray.push({
        title: "Hotel Formatted Room Names",
        url: "/roomtypenamehotelselect/select",
      });
    }
    if (userMenus[39] != undefined) {
      tempArray.push({
        title: "Master Formatted Rate Descriptions",
        url: "/modifyRateDescriptions",
      });
    }
    if (userMenus[40] != undefined) {
      tempArray.push({
        title: "Brand Formatted Rate Descriptions",
        url: "/rateproductbrandselect/select",
      });
    }
    if (userMenus[41] != undefined) {
      tempArray.push({
        title: "Hotel Formatted Rate Descriptions",
        url: "/rateproducthotelselect/select",
      });
    }

    setRoomRateDescriptionList(tempArray);
  };

  const setRoomDefDisplayRulesSubMenu = (userMenus) => {
    const tempArray = [];

    tempArray.push({
      title: "Room Description",
      url: "/roomdefrules/RoomDescription",
    });
    if (userMenus[37] != undefined) {
      tempArray.push({
        title: "Formatted Room Names",
        url: "/roomtypenamerules/formattedRoom",
      });
    }
    if (userMenus[39] != undefined) {
      tempArray.push({
        title: "Rate Products",
        url: "/rateproductrules/RateProduct",
      });
    }

    setRoomDefDisplayRulesList(tempArray);
  };

  const setRoomDefDisplayTextSubMenu = (userMenus) => {
    const tempArray = [];

    tempArray.push({
      title: "Room Description",
      url: "/roomdeftext/roomDescription",
    });
    if (userMenus[37] != undefined) {
      tempArray.push({
        title: "Formatted Room Names",
        url: "/roomtypenametext/formattedRooms",
      });
    }
    if (userMenus[39] != undefined) {
      tempArray.push({
        title: "Rate Products",
        url: "/rateproducttext/rateProduct",
      });
    }

    setRoomDefDisplayTextList(tempArray);
  };

  const setRoomDefAdministrationSubMenu = (userMenus) => {
    const tempArray = [];

    if (userMenus[35] != undefined) {
      tempArray.push({ title: "News", url: "/rdnews/news" });
    }

    tempArray.push({
      title: "Display Rules",
      url: "/roomdefrules/RoomDescription",
    });
    setRoomDefDisplayRulesSubMenu(userMenus);

    tempArray.push({
      title: "Display Text",
      url: "/roomdeftext/roomDescription",
    });
    setRoomDefDisplayTextSubMenu(userMenus);

    setRDAdministrationList(tempArray);
  };

  const setPricingSubMenus = (userMenus) => {
    const tempArray = [];

    if (userMenus[6] != undefined) {
      tempArray.push({ title: "Administration", url: "/accountmaintenance" });
      setPricingAdministrationSubMenu(userMenus);
    }

    if (userMenus[7] != undefined) {
      tempArray.push({ title: "Property List", url: "/" });
    }

    if (userMenus[8] != undefined) {
      tempArray.push({ title: "Portfolio", url: "/portfoliostatus" });
      setPricingPortfolioSubMenu(userMenus);
    }

    if (userMenus[9] != undefined) {
      tempArray.push({
        title: "Sales Administration",
        url: "/viewaccountplansappreport",
      });
      setPricingSalesAdministrationSubMenu(userMenus);
    }

    if (userMenus[10] != undefined) {
      tempArray.push({ title: "PGOOS", url: "/pgoospropagation" });
      setPricingPGOOSSubMenu(userMenus);
    }

    if (userMenus[11] != undefined) {
      tempArray.push({ title: "EDIE", url: "/viewediereports" });
      setPricingEDIESubMenu(userMenus);
    }

    if (userMenus[12] != undefined) {
      tempArray.push({ title: "Reports", url: "/viewreports" });
      setPricingReportsSubMenu(userMenus);
    }

    if (userMenus[13] != undefined) {
      tempArray.push({
        title: "Hotel Pricing",
        url: "/pricinghotelselect/SelectHotelPricing",
      });
    }

    if (userMenus[14] != undefined) {
      tempArray.push({
        title: "Update Multiple Hotels",
        url: "/multihotelaccountcenter",
      });
    }

    if (userMenus[15] != undefined) {
      //tempArray.push({title: "efolioandtravelspending", url:"/"});
      //setTravelSpendingSubMenu(userMenus);
    }

    setPricingMenuList(tempArray);
  };

  const setPricingReportsSubMenu = (userMenus) => {
    const tempArray = [];

    tempArray.push({ title: "View  Reports", url: "/viewreports" });
    if (userMenus[50] != undefined) {
      tempArray.push({
        title: "Request Reports",
        url: "/requestreports",
      });
    }
    tempArray.push({
      title: "Request Special Reports",
      url: "/requestspecialreports",
    });

    setPricingReportsList(tempArray);
  };

  const setPricingEDIESubMenu = (userMenus) => {
    const tempArray = [];

    tempArray.push({ title: "View EDIE Reports", url: "/viewediereports" });
    tempArray.push({
      title: "Edit EDIE Field Profile",
      url: "/editediefieldprofile",
    });
    tempArray.push({
      title: "Request EDIE Report",
      url: "/requestediereport",
    });
    tempArray.push({
      title: "Edit EDIE Hotel Profile",
      url: "/editediehotelprofile",
    });
    tempArray.push({
      title: "Edit EDIE Column Description",
      url: "/editediecolumndescription",
    });

    setPricingEDIEList(tempArray);
  };

  const setPricingPGOOSSubMenu = (userMenus) => {
    const tempArray = [];

    tempArray.push({ title: "PGOOS Propagation", url: "/pgoospropagation" });
    tempArray.push({ title: "GPP PGOOS Status", url: "/gpppgoosstatus" });

    setPricingPGOOSList(tempArray);
  };

  const setPricingAdministrationSubMenu = (userMenus) => {
    const tempArray = [];

    if (userMenus[16] != undefined) {
      tempArray.push({ title: "News", url: "/pricingnews" });
    }
    if (userMenus[17] != undefined) {
      tempArray.push({
        title: "Period Maintenance",
        url: "/pricingperiodmaintenance",
      });
    }
    if (userMenus[53] != undefined) {
      tempArray.push({
        title: "CBC Period Maintenance",
        url: "/cbcpricingperiodmaintenance",
      });
    }
    if (userMenus[18] != undefined) {
      tempArray.push({
        title: "Account Maintenance",
        url: "/accountmaintenance",
      });
    }

    if (userMenus[19] != undefined) {
      tempArray.push({ title: "Copy Account", url: "/copyToBlankAccount" });
    }

    if (userMenus[20] != undefined) {
      tempArray.push({
        title: "Copy Account Info by Tier",
        url: "/copyAccountInfoBySegment",
      });
    }

    if (userMenus[21] != undefined) {
      tempArray.push({
        title: "Hotel PGOOS Maintenance",
        url: "/hotelpgoosmaint",
      });
    }

    // if(userMenus[23] != undefined)
    // {
    //   tempArray.push({title: "Room Pool Exception", url:"/ignore2ndRoomPool"});
    // }

    if (userMenus[24] != undefined) {
      tempArray.push({
        title: "Mirror Rate And Restrictions",
        url: "/hotelmirrorlist",
      });
    }

    if (userMenus[25] != undefined) {
      tempArray.push({
        title: "Bedtype Maintenance",
        url: "/bedtypemaintenance",
      });
    }

    if (userMenus[26] != undefined) {
      tempArray.push({
        title: "Roomtype Maintenance",
        url: "/roomtypemaintenance",
      });
    }

    if (userMenus[27] != undefined) {
      tempArray.push({
        title: "Sales Transformation Org",
        url: "/hotelsfolist",
      });
    }

    if (userMenus[51] != undefined) {
      tempArray.push({ title: "PAS Accounts", url: "/linkpasaccounts" });
    }

    if (userMenus[52] != undefined) {
      tempArray.push({
        title: "Copy SAPP To Another Account",
        url: "/copysappaccount",
      });
    }

    setPricingAdministrationList(tempArray);
  };

  const setPricingPortfolioSubMenu = (userMenus) => {
    const tempArray = [];

    tempArray.push({ title: "CBC Request", url: "/cbcrequest" });
    tempArray.push({ title: "CBC Status", url: "/cbcstatus" });
    tempArray.push({
      title: "Hotel Solicitation List",
      url: "/hotelsolicitation",
    });
    tempArray.push({
      title: "Portfolio Selection",
      url: "/portfolioselection",
    });
    tempArray.push({
      title: "Portfolio Organization",
      url: "/portfolioorganization",
    });

    tempArray.push({ title: "Portfolio Rebids", url: "/portfoliorebid" });
    tempArray.push({ title: "Portfolio Acceptances", url: "/portfoliostatus" });
    // tempArray.push({ title: "Account Rates", url: "/portfolioaccountrates" });
    tempArray.push({ title: "Account Status", url: "/accountstatus" });

    setPricingPortfolioList(tempArray);
  };

  const setPricingSalesAdministrationSubMenu = (userMenus) => {
    const tempArray = [];

    if (userMenus[46] != undefined) {
      tempArray.push({
        title: "Central Pricing Account Registration",
        url: "/centralpricingaccountregistration",
      });
    }
    if (userMenus[48] != undefined) {
      tempArray.push({
        title: "Edit Account Plan (SAPP)",
        url: "/editaccountplansapp",
      });
    }
    if (userMenus[49] != undefined) {
      tempArray.push({
        title: "View Account Plan (SAPP) Report",
        url: "/viewaccountplansappreport",
      });
    }
    if (userMenus[54] != undefined) {
      tempArray.push({ title: "Project Codes", url: "/" });
    }

    setPricingSalesAdministrationList(tempArray);
  };

  // General administration menu
  const diplayGeneralAdministrationMenu = () => {
    return generalAdministrationList.map(({ url, title }, index) => {
      return (
        <li
          key={index}
          onMouseEnter={() => showSubMenu()}
          onMouseLeave={() => hideSubMenu()}
        >
          <div className={styles.arrowDivGeneral}>
            <CNavLink to={url}>{title}</CNavLink>
            {title == "User Properties" && (
              <span
                className={`${styles.arrow} ${styles.customCaret} ${styles.rightCaret}`}
              ></span>
            )}
            {title == "Reports" && (
              <span
                className={`${styles.arrow} ${styles.customCaret} ${styles.rightCaret}`}
              ></span>
            )}
          </div>

          {title == "User Properties" && showSubmenu && (
            <ul className={styles.sublist}>{diplayGAUserPropertiesSubMenu}</ul>
          )}

          {title == "Reports" && showSubmenu && (
            <ul className={styles.sublist}>{diplayGAReportsSubMenu}</ul>
          )}
        </li>
      );
    });
  };

  const diplayGAReportsSubMenu = genReportsList.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <CNavLink to={url} className={styles.pricing130SubMenu}>
          {title}
        </CNavLink>
      </li>
    );
  });

  const diplayGAUserPropertiesSubMenu = gaUserPropertiesList.map(
    ({ url, title }, index) => {
      return (
        <li key={index}>
          <CNavLink to={url} className={styles.pricing200SubMenu}>
            {title}
          </CNavLink>
        </li>
      );
    }
  );
  // end of General administration menu
  const showSubMenu = () => {
    setTimeout(() => {
      setShowSubmenu(true);
    }, 500);
  };
  const hideSubMenu = () => {
    setShowSubmenu(false);
  };
  // pricing menu
  const diplayPricingMenu = () => {
    return pricingMenuList.map(({ url, title }, index) => {
      return (
        <li
          key={index}
          id={String(index)}
          onMouseEnter={() => showSubMenu()}
          onMouseLeave={() => hideSubMenu()}
        >
          <div className={styles.arrowDiv}>
            {title === "Property List" ? (
              <a
                className={styles.pricing220SubMenu}
                onClick={() => {
                  window.open(
                    `${window.location.origin}${process.env.APPLICATION_CONTEXT}/propertylist`,
                    "MarRFP",
                    "LOCATION=no,MENUBAR=no,SCROLLBARS=no,resizable=no,status=no,toolbar=no,HEIGHT=1500,WIDTH=1000"
                  );
                }}
              >
                {title}
              </a>
            ) : (
              <CNavLink to={url}>{title}</CNavLink>
            )}
            {title == "Administration" && (
              <span
                className={`${styles.arrow} ${styles.customCaret} ${styles.rightCaret}`}
              ></span>
            )}

            {title == "Portfolio" && (
              <span
                className={`${styles.arrow} ${styles.customCaret} ${styles.rightCaret}`}
              ></span>
            )}
            {title == "Sales Administration" && (
              <span
                className={`${styles.arrow} ${styles.customCaret} ${styles.rightCaret}`}
              ></span>
            )}
            {title == "PGOOS" && (
              <span
                className={`${styles.arrow} ${styles.customCaret} ${styles.rightCaret}`}
              ></span>
            )}
            {title == "EDIE" && (
              <span
                className={`${styles.arrow} ${styles.customCaret} ${styles.rightCaret}`}
              ></span>
            )}
            {title == "Reports" && (
              <span
                className={`${styles.arrow} ${styles.customCaret} ${styles.rightCaret}`}
              ></span>
            )}
          </div>

          {title == "Administration" && showSubmenu && (
            <ul
              style={{
                visibility: !appContext.showSubnavbarMenus && "hidden",
              }}
            >
              {diplayPricingAdministrationSubMenu}
            </ul>
          )}
          {title == "Portfolio" && showSubmenu && (
            <ul>{diplayPricingPortfolioSubMenu}</ul>
          )}
          {title == "Sales Administration" && showSubmenu && (
            <ul>{diplayPricingSalesAdministrationSubMenu}</ul>
          )}
          {title == "PGOOS" && showSubmenu && (
            <ul>{diplayPricingPgoosSubMenu}</ul>
          )}
          {title == "EDIE" && showSubmenu && (
            <ul>{diplayPricingEdieSubMenu}</ul>
          )}
          {title == "Reports" && showSubmenu && (
            <ul>{diplayPricingReportsSubMenu}</ul>
          )}
        </li>
      );
    });
  };

  const diplayPricingReportsSubMenu = pricingReportsList.map(
    ({ url, title }, index) => {
      return (
        <li key={index}>
          <CNavLink to={url} className={styles.pricing130SubMenu}>
            {title}
          </CNavLink>
        </li>
      );
    }
  );

  const diplayPricingEdieSubMenu = pricingEDIEList.map(
    ({ url, title }, index) => {
      return (
        <li key={index}>
          <CNavLink to={url} className={styles.pricing130SubMenu}>
            {title}
          </CNavLink>
        </li>
      );
    }
  );

  const diplayPricingPgoosSubMenu = pricingPGOOSList.map(
    ({ url, title }, index) => {
      return (
        <li key={index}>
          <CNavLink to={url} className={styles.pricing120SubMenu}>
            {title}
          </CNavLink>
        </li>
      );
    }
  );

  const diplayPricingSalesAdministrationSubMenu =
    pricingSalesAdministrationList.map(({ url, title }, index) => {
      return (
        <li key={index}>
          {title !== `${Settings.MenuTitle}` ? (
            <CNavLink to={url} className={styles.pricing220SubMenu}>
              {title}
            </CNavLink>
          ) : (
            <a
              className={styles.pricing220SubMenu}
              onClick={() => {
                downloadProjectCodes();
              }}
            >
              {title}
            </a>
          )}
        </li>
      );
    });

  const downloadProjectCodes = async () => {
    API.getProjectCodes();
  };

  const diplayPricingPortfolioSubMenu = pricingPortfolioList.map(
    ({ url, title }, index) => {
      return (
        <li key={index}>
          <CNavLink to={url} className={styles.pricing120SubMenu}>
            {title}
          </CNavLink>
        </li>
      );
    }
  );

  const diplayPricingAdministrationSubMenu = pricingAdministrationList.map(
    ({ url, title }, index) => {
      return (
        <li key={index}>
          <CNavLink to={url}>{title}</CNavLink>
        </li>
      );
    }
  );

  // end of pricing menu

  // Room rate description menu
  const diplayRoomRateDescriptionMenu = () => {
    return roomRateDescriptionList.map(({ url, title }, index) => {
      return (
        <li
          key={index}
          onMouseEnter={() => showSubMenu()}
          onMouseLeave={() => hideSubMenu()}
        >
          <div className={styles.arrowDivRoom}>
            <CNavLink to={url}>{title}</CNavLink>
            {title == "Administration" && (
              <span
                className={`${styles.arrow} ${styles.customCaret} ${styles.rightCaret}`}
              ></span>
            )}
          </div>

          {title == "Administration" && showSubmenu && (
            <ul className={styles.sublist}>{diplayRDAdministrationSubMenu}</ul>
          )}
        </li>
      );
    });
  };

  const diplayRDDisplayRulesSubMenu = roomDefDisplayRulesList.map(
    ({ url, title }, index) => {
      return (
        <li key={index}>
          <CNavLink to={url} className={styles.pricing130SubMenu}>
            {title}
          </CNavLink>
        </li>
      );
    }
  );

  const diplayRDDisplayTextSubMenu = roomDefDisplayTextList.map(
    ({ url, title }, index) => {
      return (
        <li key={index}>
          <CNavLink to={url} className={styles.pricing130SubMenu}>
            {title}
          </CNavLink>
        </li>
      );
    }
  );
  const setshowSubChildMenu = () => {
    setTimeout(() => {
      setSubChildMenu(true);
    }, 500);
  };
  const sethideSubChildMenu = () => {
    setSubChildMenu(false);
  };
  const diplayRDAdministrationSubMenu = rdAdministrationList.map(
    ({ url, title }, index) => {
      return (
        <li
          key={index}
          onMouseEnter={() => setshowSubChildMenu()}
          onMouseLeave={() => sethideSubChildMenu()}
        >
          <div className={styles.arrowDivRDAdmin}>
            <CNavLink to={url}>{title}</CNavLink>
            {title == "Display Rules" && (
              <span
                className={`${styles.arrow} ${styles.customCaret} ${styles.rightCaret}`}
              ></span>
            )}
            {title == "Display Text" && (
              <span
                className={`${styles.arrow} ${styles.customCaret} ${styles.rightCaret}`}
              ></span>
            )}
          </div>
          {title == "Display Rules" && subChildMenu && (
            <ul className={styles.sublist}>{diplayRDDisplayRulesSubMenu}</ul>
          )}
          {title == "Display Text" && subChildMenu && (
            <ul className={styles.sublist}>{diplayRDDisplayTextSubMenu}</ul>
          )}
        </li>
      );
    }
  );

  // end of room rate description menu
  const showMenuOption = () => {
    setTimeout(() => {
      setShowMenu(true);
    }, 500);
  };

  const diplayMenus = () => {
    return globalMenu.map(({ url, title }, index) => {
      return (
        <li
          key={index}
          onMouseEnter={() => showMenuOption()}
          onMouseLeave={() => setShowMenu(false)}
        >
          <CNavLink to={url}>{title}</CNavLink>

          {title == "Pricing" && showMenu && (
            <ul
              className={styles.sublist}
              style={{
                visibility: !appContext.showSubnavbarMenus && "hidden",
              }}
            >
              {diplayPricingMenu()}
            </ul>
          )}
          {title == "Room / Rate Description" && showMenu && (
            <ul
              className={styles.sublist}
              style={{
                visibility: !appContext.showSubnavbarMenus && "hidden",
              }}
            >
              {diplayRoomRateDescriptionMenu()}
            </ul>
          )}

          {title == "General Administration" && showMenu && (
            <ul
              className={styles.sublist}
              style={{
                visibility: !appContext.showSubnavbarMenus && "hidden",
              }}
            >
              {diplayGeneralAdministrationMenu()}
            </ul>
          )}
        </li>
      );
    });
  };

  if (globalMenu) {
    return (
      <div className={styles.subMenu} id="subMenu">
        <ul className={styles.subnavigation}>{diplayMenus()}</ul>
        <div className={styles.divColor}></div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

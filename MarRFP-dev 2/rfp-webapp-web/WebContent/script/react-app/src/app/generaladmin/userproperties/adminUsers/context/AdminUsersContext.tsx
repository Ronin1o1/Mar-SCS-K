import React, { useEffect, useState } from "react";
import Settings from "../static/Settings";
import API from "../service/AdminUsersApi";

// Set state variables and function
const AdminUsersContext = React.createContext({});

export const AdminUsersContextProvider = (props) => {
  const [adminUsersData, setAdminUsersData] = useState({});
  const [userRoleDescription, setUserRoleDescription] = useState("");
  const [postData, setPostData] = useState({
    userSearchCriteria: {
      searchBy: Settings.labels.All,
      filterString: "",
      userRole: Settings.UserRole,
      orderby: 1,
      page: 1,
      strPage: {
        page: 1,
        maxpagelen: 20,
      },
    },
  });
  const [totalPages, setTotalPages] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [resetInput, setResetInput] = useState(false);
  const [validateModal, setValidateModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    updateAdminUsersGridData();
  }, []);

  const onClickSearch = (pageNumber = 1) => {
    setIsLoaded(false);
    updateAdminUsersGridData(pageNumber);
    setResetInput(true);
  };

  const updateAdminUsersGridData = (pageNumber = 1) => {
    API.getAdminUsersData(postData.userSearchCriteria, pageNumber)
      .then((data) => {
        data &&
          data.userlist.forEach((i) => {
            i.chg = "N";
          });
        setAdminUsersData(data?.userlist);
        setUserRoleDescription(data?.userRoleDescription);
        setPageNumber(pageNumber);
        setIsLoaded(true);
        setTotalPages(data?.totelPages);
      })
      .catch((e) => {
        setIsLoaded(true);
      });
  };

  const saveAdminUsersGridData = async () => {
    const strInternalnotesMap = {};
    if (adminUsersData) {
      Object.values(adminUsersData).filter(function (item) {
        Object.assign(strInternalnotesMap, {
          [item.cn_userid]: {
            user_internalnotes: item.user_internalnotes,
            cn_userid: item.cn_userid,
            group: Settings.UserRole,
            eid: item.eid,
            chg: item.chg,
          },
        });
      });
      await API.postAdminUsersData(strInternalnotesMap).then((res) => {
        if (res === "success") {
          setIsSaved(true);
          alert(Settings.SuccessMessage);
          setValidateModal(true);
          return true;
        } else {
          setIsSaved(false);
          alert(Settings.ErrorMessage);
          setValidateModal(true);
          return false;
        }
      });
    }
  };

  const closeValidateModel = () => {
    setValidateModal(!validateModal);
  };

  const setInternalText = (event, data) => {
    const userData = { ...adminUsersData };
    Object.values(userData).filter(function (item) {
      if (data == item.eid) {
        item.chg = "Y";
        item.user_internalnotes = event.target.value;
      }
    });
    setAdminUsersData(Object.values(userData));
  };

  const validateInternalText = (event, data, max) => {
    if (event.target.value.length > max) {
      event.target.value = event.target.value.substring(0, max - 1);
      setIsSaved(false);
      alert(Settings.MaxLengthAlertMessage);
      setValidateModal(!validateModal);
    }
    const userData = { ...adminUsersData };
    Object.values(userData).filter(function (item) {
      if (data == item.eid) {
        item.chg = "Y";
        item.user_internalnotes = event.target.value;
      }
    });
    setAdminUsersData(Object.values(userData));
  };

  const adminUsersContext = {
    postData,
    totalPages,
    pageNumber,
    resetInput,
    adminUsersData,
    onClickSearch,
    saveAdminUsersGridData,
    setPostData,
    setTotalPages,
    setPageNumber,
    setResetInput,
    setAdminUsersData,
    setInternalText,
    closeValidateModel,
    validateModal,
    setValidateModal,
    message,
    setMessage,
    isSaved,
    isLoaded,
    setIsSaved,
    userRoleDescription,
    setUserRoleDescription,
    validateInternalText,
  };
  return (
    <AdminUsersContext.Provider value={adminUsersContext}>
      {props.children}
    </AdminUsersContext.Provider>
  );
};

export const AdminUsersConsumer = AdminUsersContext.Consumer;
export default AdminUsersContext;

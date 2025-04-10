import React, { useEffect, useState } from "react";
import Settings from "../static/Settings";
import API from "../service/UserListApi";

const UserListContext = React.createContext({});

export const UserListContextProvider = (props) => {
  const [userList, setUserList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRoleDescription, setUserRoleDescription] = useState("");
  const [postData, setPostData] = useState({
    showScreenLoader: false,
    userSearchCriteria: {
      searchBy: Settings.labels.All,
      filterString: "",
      userRole: props.userRole ? props.userRole : "",
      orderby: 1,
      page: 1,
      strPage: {
        page: 1,
        maxpagelen: 20,
      },
    },
  });
  const [totalPages, setTotalPages] = useState(-1);
  const [pageNumber, setPageNumber] = useState(1);
  const [resetInput, setResetInput] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    updateUserListGridData();
  }, []);

  const onClickSearch = (pageNumber = 1) => {
    setIsLoaded(false);
    updateUserListGridData(pageNumber);
    setResetInput(true);
  };

  const updateUserListGridData = (pageNumber = 1) => {
    setIsLoading(true);
    API.getUserList(postData.userSearchCriteria, pageNumber).then((data) => {
      setIsLoading(false);
      postData.showScreenLoader = false;
      data &&
        data.userlist.forEach((i) => {
          i.chg = "N";
        });
      setUserList(data?.userlist);
      setUserRoleDescription(data?.userRoleDescription);
      setPageNumber(pageNumber);
      setTotalPages(data?.totelPages);
      setIsLoaded(true);
    });
  };

  const userListContextType = {
    isLoading,
    postData,
    totalPages,
    pageNumber,
    resetInput,
    userList,
    isLoaded,
    setIsLoaded,
    onClickSearch,
    setPostData,
    setTotalPages,
    setPageNumber,
    setResetInput,
    setUserList,
    userRoleDescription,
    setUserRoleDescription,
  };
  return (
    <UserListContext.Provider value={userListContextType}>
      {props.children}
    </UserListContext.Provider>
  );
};

export const UserListConsumer = UserListContext.Consumer;
export default UserListContext;

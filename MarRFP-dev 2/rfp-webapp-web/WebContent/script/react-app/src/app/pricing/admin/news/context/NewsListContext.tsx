import React, { useState } from "react";
import Utils from "../../../../common/utils/Utils";

import API from "../service/API";
import Settings from "../static/Settings";

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const NewsListContext = React.createContext({});

export const NewsListContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    newsListData: {
      newsList: [
        {
          infoid: null,
          infodate: null,
          shortInfodate: null,
          infoexpiredate: null,
          shortInfoexpiredate: null,
          infotypeid: null,
          infotype: null,
          infotitle: null,
          infomsg: null,
          groups: null,
          roles: null,
        },
      ],
    },
    selectedNews: {
      infoid: null,
      infodate: null,
      shortInfodate: "",
      infoexpiredate: null,
      shortInfoexpiredate: "",
      infotypeid: null,
      infotype: null,
      infotitle: "",
      infomsg: "",
      groups: null,
      roles: [],
      MFPADMIN: false,
      MFPAPADM: false,
      MFPSALES: false,
      MFPFSALE: false,
      MFPUSER: false,
    },
    showModal: false,
    renderLoading: null,
    isUpdateBtnDisable: false,
  });

  const setNewsListData = (data: any, closeModal?: boolean) => {
    if (data) {
      data.map((d, i) => {
        if (d.infodate != null) {
          data[i].infodate = Utils.getFormattedDate(d.infodate);
        }
        if (d.infoexpiredate != null) {
          data[i].infoexpiredate = Utils.getFormattedDate(d.infoexpiredate);
        }
      });
      const newsListData = { ...state.newsListData };
      newsListData.newsList = data;

      setState({
        ...state,
        newsListData: newsListData,
        showModal: closeModal ? !state.showModal : state.showModal,
      });
    }
  };

  const showModal = (infoid?: number) => {
    let selectedNews = { ...state.selectedNews };

    infoid
      ? API.getEditNews(infoid).then((data) => {
          selectedNews = data;

          const rolesList = selectedNews.roles;

          selectedNews.MFPADMIN =
            rolesList.indexOf(Settings.editNews.formFields.pasAdmin.id.trim()) >
            -1
              ? true
              : false;

          selectedNews.MFPAPADM =
            rolesList.indexOf(
              Settings.editNews.formFields.sappAdmin.id.trim()
            ) > -1
              ? true
              : false;
          selectedNews.MFPSALES =
            rolesList.indexOf(
              Settings.editNews.formFields.salesUsers.id.trim()
            ) > -1
              ? true
              : false;
          selectedNews.MFPFSALE =
            rolesList.indexOf(
              Settings.editNews.formFields.ltdSalesUser.id.trim()
            ) > -1
              ? true
              : false;
          selectedNews.MFPUSER =
            rolesList.indexOf(
              Settings.editNews.formFields.hotelUsers.id.trim()
            ) > -1
              ? true
              : false;

          setState({
            ...state,
            showModal: !state.showModal,
            selectedNews: selectedNews,
            isUpdateBtnDisable: false,
          });
        })
      : setState({
          ...state,
          isUpdateBtnDisable: false,
          showModal: !state.showModal,
          selectedNews: {
            infoid: null,
            infodate: null,
            shortInfodate: "",
            infoexpiredate: null,
            shortInfoexpiredate: "",
            infotypeid: null,
            infotype: null,
            infotitle: "",
            infomsg: "",
            groups: null,
            roles: [],
            MFPADMIN: true,
            MFPAPADM: true,
            MFPSALES: true,
            MFPFSALE: true,
            MFPUSER: true,
          },
        });
  };

  const onChange = (event) => {
    const { type, id, value, checked } = event.target;

    const selectedNews = { ...state.selectedNews };
    if (type === "checkbox") {
      selectedNews[id] = checked;

      if (selectedNews[id]) selectedNews.roles.push(id);
      else {
        const index = selectedNews.roles.indexOf(id);
        selectedNews.roles.splice(index, 1);
      }
    } else selectedNews[id] = value;
    setState({ ...state, selectedNews: selectedNews });
  };

  const validate = (event) => {
    const { id, value } = event.target;
    if (id === Settings.editNews.formFields.date.id) {
      Utils.checkDate(value);
    } else if (id === Settings.editNews.formFields.expireDate.id) {
      const selectedNews = { ...state.selectedNews };
      Utils.checkExpireDate(value, selectedNews.infodate);
    } else if (id === Settings.editNews.formFields.message.id) {
      Utils.checkMaxChar(value, 255);
    } else {
      const selectedNews = { ...state.selectedNews };
      const message = state.selectedNews.infomsg;
      // Utils.checkDate(message);
      // Utils.checkExpireDate(message, selectedNews.infodate);
      if (message) {
        return Utils.checkMaxChar(message, 255);
      }
    }
    return true;
  };

  const updateNews = (event) => {
    if (validate(event)) {
      const selectedNews = { ...state.selectedNews };
      let updateRoleList = [];
      let infoDate = null;
      let infoExpireDate = null;
      if (selectedNews.infodate)
        infoDate = Utils.setDatewithYYYY(selectedNews.infodate);
      else infoDate = null;
      if (selectedNews.infoexpiredate)
        infoExpireDate = Utils.setDatewithYYYY(selectedNews.infoexpiredate);
      else infoExpireDate = null;
      if (selectedNews.roles.length > 0) updateRoleList = selectedNews.roles;
      else {
        if (selectedNews.MFPADMIN) {
          updateRoleList.push(Settings.editNews.formFields.pasAdmin.id);
        }
        if (selectedNews.MFPAPADM) {
          updateRoleList.push(Settings.editNews.formFields.sappAdmin.id);
        }
        if (selectedNews.MFPSALES) {
          updateRoleList.push(Settings.editNews.formFields.salesUsers.id);
        }
        if (selectedNews.MFPFSALE) {
          updateRoleList.push(Settings.editNews.formFields.ltdSalesUser.id);
        }
        if (selectedNews.MFPUSER) {
          updateRoleList.push(Settings.editNews.formFields.hotelUsers.id);
        }
      }

      setState({ ...state, isUpdateBtnDisable: true });
      const updatedSelectedNews = {
        ...state.selectedNews,
        roles: updateRoleList,
        infodate: infoDate,
        infoexpiredate: infoExpireDate,
      };

      API.updateNews(updatedSelectedNews).then(() => {
        //  window.location.reload();
        setIsLoading(true);
        API.getNewsList().then((data) => {
          setNewsListData(data, true);
          setIsLoading(false);
        });
      });
    }
  };

  const deleteNews = (infoid: number) => {
    setIsLoading(true);
    API.deleteNews(infoid).then(() => {
      API.getNewsList().then((data) => {
        setNewsListData(data);
        setIsLoading(false);
      });
    });
  };

  const newsListContext = {
    state,
    setState,
    setNewsListData,
    showModal,
    onChange,
    updateNews,
    validate,
    deleteNews,
    isLoading,
    setIsLoading,
  };

  return (
    <NewsListContext.Provider value={newsListContext}>
      {props.children}
    </NewsListContext.Provider>
  );
};

export const NewsListContextConsumer = NewsListContext.Consumer;
export default NewsListContext;

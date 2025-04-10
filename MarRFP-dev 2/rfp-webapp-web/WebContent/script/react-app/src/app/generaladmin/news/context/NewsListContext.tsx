import React, { useState } from "react";
import Utils from "../../../common/utils/Utils";

import API from "../service/API";
import Settings from "../static/Settings";

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const NewsListContext = React.createContext({});

export const NewsListContextProvider = (props) => {
  const [state, setState] = useState({
    showScreenLoader: false,
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
    },
    showModal: false,
    renderLoading: null,
    isUpdateBtnDisable: false,
  });

  const setLoader = (show) => {
    setState({
      ...state,
      showScreenLoader: show,
    });
  };
  const setNewsListData = (data: any, closeModal?: boolean) => {
    if (data) {
      data.map((d, i) => {
        if (d.infodate != null) {
          data[i].infodate = Utils.getFormattedDate(d.shortInfodate);
        }
        if (d.infoexpiredate != null) {
          data[i].infoexpiredate = Utils.getFormattedDate(
            d.shortInfoexpiredate
          );
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
          selectedNews.infodate = selectedNews.infodate;
          if (
            selectedNews.infoexpiredate != null ||
            selectedNews.infoexpiredate != ""
          ) {
            if (typeof selectedNews.infoexpiredate != "undefined") {
              selectedNews.infoexpiredate = selectedNews.infoexpiredate;
            }
          } else {
            selectedNews.infoexpiredate = null;
          }

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
          },
        });
  };

  const onChange = (event) => {
    const { type, id, value, checked } = event.target;
    const selectedNews = { ...state.selectedNews };
    if (type === "checkbox") {
      selectedNews[id] = checked;
    } else selectedNews[id] = value;

    setState({ ...state, selectedNews: selectedNews });
  };

  const validate = (event) => {
    const { id, value } = event.target;

    if (id === Settings.editNews.formFields.date.id) {
      Utils.checkDate(value);
      const selectedNews = { ...state.selectedNews };
      selectedNews[id] = value;
      setState({ ...state, selectedNews: selectedNews });
    }
    if (id === Settings.editNews.formFields.expireDate.id) {
      const selectedNews = { ...state.selectedNews };
      Utils.checkExpireDate(value, selectedNews.infodate);
      selectedNews[id] = value;
      setState({ ...state, selectedNews: selectedNews });
    }
    if (id === Settings.editNews.formFields.message.id) {
      Utils.checkMaxChar(value, 255);
    }
  };

  const updateNews = () => {
    const selectedNews = { ...state.selectedNews };
    const updateRoleList = [];
    let infoDate = null;
    let infoExpireDate = null;
    // const checkValidate = checkValidation(selectedNews);

    if (selectedNews.infodate)
      infoDate = Utils.setDatewithYYYY(selectedNews.infodate);
    else infoDate = null;

    if (selectedNews.infoexpiredate)
      infoExpireDate = Utils.setDatewithYYYY(selectedNews.infoexpiredate);
    else infoExpireDate = null;
    setState({ ...state, isUpdateBtnDisable: true });
    const updatedSelectedNews = {
      ...state.selectedNews,
      roles: updateRoleList,
      infodate: infoDate,
      infoexpiredate: infoExpireDate,
    };

    if (updatedSelectedNews.infomsg.length > 255) {
      alert("You are allowed to enter up to 255 characters.");
      setState({ ...state, isUpdateBtnDisable: false });
    } else {
      state.showScreenLoader = true;
      API.updateNews(updatedSelectedNews).then(() => {
        API.getNewsList().then((data) => {
          state.showScreenLoader = false;
          setNewsListData(data, true);
        });
      });
    }
  };

  const checkValidation = (data) => {
    let resultStartDt = false;
    let resultEndDt = false;
    let resultMsg = false;

    resultStartDt = data.infodate ? Utils.checkDate(data.infodate) : true;
    resultEndDt = data.infoexpiredate
      ? Utils.checkExpireDate(data.infoexpiredate, data.infodate)
      : true;
    resultMsg = data.infomsg ? Utils.checkMaxChar(data.infomsg, 255) : true;

    if (resultStartDt && resultEndDt && resultMsg) {
      return true;
    } else {
      return false;
    }
  };

  const deleteNews = (infoid: number) => {
    API.deleteNews(infoid).then(() => {
      API.getNewsList().then((data) => {
        setNewsListData(data);
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
    setLoader,
  };

  return (
    <NewsListContext.Provider value={newsListContext}>
      {props.children}
    </NewsListContext.Provider>
  );
};

export const NewsListContextConsumer = NewsListContext.Consumer;
export default NewsListContext;

import React, { useState } from "react";
import Utils from "../../../common/utils/Utils";

import API from "../service/API";
import Settings from "../static/Settings";

// Setup a Global Context that can be used for every component
// this will be a centralized place to set/get state
const NewsListContext = React.createContext({});

export const NewsListContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    newsListData: {
      newsList: [],
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
          selectedNews.infodate = Utils.getShortDate(selectedNews.infodate);
          if (
            selectedNews.infoexpiredate != null ||
            selectedNews.infoexpiredate != ""
          ) {
            if (typeof selectedNews.infoexpiredate != "undefined") {
              selectedNews.infoexpiredate =
                selectedNews.infoexpiredate !== null
                  ? Utils.getShortDate(selectedNews.infoexpiredate)
                  : null;
            }
          } else {
            selectedNews.infoexpiredate = null;
          }

          setState({
            ...state,
            showModal: !state.showModal,
            selectedNews: selectedNews,
          });
        })
      : setState({
          ...state,
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
    const { id, value } = event.target;

    const selectedNews = { ...state.selectedNews };
    selectedNews[id] = value;
    setState({ ...state, selectedNews: selectedNews });
  };

  const validate = (event) => {
    const { id, value } = event.target;

    if (id === Settings.editNews.formFields.date.id) {
      Utils.checkDate(value);
    }
    if (id === Settings.editNews.formFields.expireDate.id) {
      const selectedNews = { ...state.selectedNews };
      Utils.checkExpireDate(value, selectedNews.infodate);
    }
    if (id === Settings.editNews.formFields.message.id) {
      Utils.checkMaxChar(value, 255);
    }
  };

  const setShowModal = (closeModal?: boolean) => {
    setState({
      ...state,
      showModal: closeModal ? !state.showModal : state.showModal,
    });
  };

  const updateNews = () => {
    setShowModal(true);
    const selectedNews = { ...state.selectedNews };
    const updatedSelectedNews = {
      ...state.selectedNews,
    };
    updatedSelectedNews.infodate = updatedSelectedNews.infodate
      ? updatedSelectedNews.infodate
      : null;
    updatedSelectedNews.infoexpiredate = updatedSelectedNews.infoexpiredate
      ? updatedSelectedNews.infoexpiredate
      : null;
    if (selectedNews.infomsg && selectedNews.infomsg.length >= 256) {
      alert(Settings.alertText.textLengthErr);
      setShowModal(false);
    } else {
      API.updateNews(updatedSelectedNews).then(() => {
        // window.location.reload();
        API.getNewsList().then((data) => {
          setNewsListData(data, true);
        });
      });
    }
  };

  const deleteNews = (infoid: number) => {
    setIsLoading(true);
    API.deleteNews(infoid).then(() => {
      //  window.location.reload();
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

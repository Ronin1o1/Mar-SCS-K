/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { Component, Suspense } from "react";
const EditNews = React.lazy(() => import("./EditNews"));
import CSuspense from "../../../common/components/CSuspense";
import NewsListContext, {
  NewsListContextProvider,
} from "../context/NewsListContext";
import API from "../service/API";
import Settings from "../static/Settings";
import screenLoader from "../../../common/assets/img/screenloader.gif";
import styles from "../content/NewsList.css";

import CDataTable from "../../../common/components/CDataTable";
import CModal from "../../../common/components/CModal";
import NewBtnImg from "../../../common/assets/img/btnNew.gif";
import DeleteImg from "../../../common/assets/img/delete.gif";
import CPageTitle from "../../../common/components/CPageTitle";


let contextType = null;

interface IProps {}

interface IState {}

export default class NewsList extends Component<IProps, IState> {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps, prevState) {
    const location = this.props?.history?.location;
    const prevLocation = prevProps?.location;
    if (
      prevLocation?.key != location?.key &&
      prevLocation?.pathname == location?.pathname
    ) {
      this.props.history.push("/temp");
      this.props.history.goBack();
    }
  }
  componentDidMount() {
    contextType.setLoader(true);
    API.getNewsList().then((data) => {
      contextType.setLoader(false);
      contextType.setNewsListData(data);
    });
  }

  imageBodyTemplate = (rowData) => {
    return (
      <div>
        <img
          src={DeleteImg}
          className={styles.deleteContainer}
          onClick={() => {
            contextType.deleteNews(rowData.infoid);
          }}
          alt={Settings.newsList.deleteImgAltText}
        />
      </div>
    );
  };

  linkBodyTemplate = (rowData) => {
    return (
      <span
        className={styles.titleLink}
        onClick={() => {
          contextType.showModal(rowData.infoid);
        }}
      >
        {rowData.infotitle}
      </span>
    );
  };

  columns = [
    {
      field: Settings.newsList.tableColumns.id.field,
      body: this.imageBodyTemplate,
      style: { width: "20px" },
    },
    {
      field: Settings.newsList.tableColumns.date.field,
      header: Settings.newsList.tableColumns.date.header,
      style: { width: "100px" },
    },
    {
      field: Settings.newsList.tableColumns.expireDate.field,
      header: Settings.newsList.tableColumns.expireDate.header,
      style: { width: "100px" },
    },
    {
      field: Settings.newsList.tableColumns.title.field,
      header: Settings.newsList.tableColumns.title.header,
      body: this.linkBodyTemplate,
      style: { width: "200px" },
    },
    {
      field: Settings.newsList.tableColumns.message.field,
      header: Settings.newsList.tableColumns.message.header,
      style: {
        whiteSpace: "normal",
        wordWrap: "break-word",
      },
    },
  ];

  render() {
    return (
      <NewsListContextProvider>
        <NewsListContext.Consumer>
          {(newsListContext) => {
            contextType = newsListContext;
            return (
              <>
                {contextType.state.showScreenLoader ? (
                  <img
                    style={{
                      position: "absolute",
                      top: "55%",
                      left: "45%",
                    }}
                    src={screenLoader}
                  />
                ) : (
                  <React.Fragment>
                    <div className={styles.MainContainer}>
                      <div className={styles.NewsListContainer}>
                        <CPageTitle title={Settings.labels.title}></CPageTitle>
                        <div>
                          <img
                            tabIndex={0}
                            className={styles.BtnNew}
                            onClick={() => {
                              contextType.showModal();
                            }}
                            src={NewBtnImg}
                            id="NewButton"
                          />
                        </div>

                        <div className={styles.dataTableContainer}>
                          <CDataTable
                            id="gridTableView"
                            columns={this.columns}
                            value={contextType.state.newsListData.newsList}
                            scrollHeight="270px"
                          />
                        </div>
                      </div>
                      <style>{`
                    .p-datatable-scrollable-header-box{
                    margin-right:0px !important;
                    } 
                    .p-datatable-scrollable-body{
                      overflow-x: hidden!important;
                    }
                  `}</style>
                    </div>
                    <CModal
                      title={Settings.editNews.title}
                      onClose={contextType.showModal}
                      show={contextType.state.showModal}
                      xPosition={-300}
                      yPosition={-220}
                    >
                      <Suspense fallback={<CSuspense />}>
                        <EditNews />
                      </Suspense>
                    </CModal>
                  </React.Fragment>
                )}
              </>
            );
          }}
        </NewsListContext.Consumer>
      </NewsListContextProvider>
    );
  }
}

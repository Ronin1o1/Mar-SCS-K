/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { Component, Suspense } from "react";
import moment from "moment";
const EditNews = React.lazy(
  () =>
    // import(/* webpackChunkName: "/pricing.admin.news.editnews" */ "./EditNews")
    import("./EditNews")
);
import CSuspense from "../../../../common/components/CSuspense";
import NewsListContext, {
  NewsListContextProvider,
} from "../context/NewsListContext";
import API from "../service/API";
import Settings from "../static/Settings";
import CDataTable from "../../../../common/components/CDataTable";
import CModal from "../../../../common/components/CModal";
import NewBtnImg from "../../../../common/assets/img/btnNew.gif";
import DeleteImg from "../../../../common/assets/img/delete.gif";
import styles from "./NewsList.css";
import { CLoader } from "../../../../common/components/CLoader";

let contextType = null;

interface IProps {}

interface IState {}

export default class AdminNews extends Component<IProps, IState> {
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
    contextType.setIsLoading(true);
    API.getNewsList().then((data) => {
      contextType.setNewsListData(data);
      contextType.setIsLoading(false);
    });
    document.addEventListener("keydown", this.openNewModal);
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.openNewModal);
  }

  openNewModal = (event) => {
    if (event.keyCode === 13) {
      const focusedElem = document.activeElement;
      if (focusedElem.id && focusedElem.id == "NewButton") {
        contextType.showModal();
      } else if (focusedElem.id && focusedElem.id.includes("news")) {
        const rowId = focusedElem.id.split("-")[1];
        contextType.showModal(rowId);
      }
    }
  };

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
        id={`news-${rowData.infoid}`}
        tabIndex={0}
        className={styles.titleLink}
        onClick={() => {
          contextType.showModal(rowData.infoid);
        }}
      >
        {rowData.infotitle}
      </span>
    );
  };

  dateFormatTemplate = (rowData) => {
    return rowData?.infodate ? (
      <span>{moment(rowData?.infodate).format("ll")}</span>
    ) : null;
  };

  expiryDateFormatTemplate = (rowData) => {
    return rowData?.infoexpiredate ? (
      <span>{moment(rowData?.infoexpiredate).format("ll")}</span>
    ) : null;
  };

  columns = [
    {
      field: Settings.newsList.tableColumns.id.field,
      body: this.imageBodyTemplate,
      style: { width: "20px" },
    },
    {
      field: Settings.newsList.tableColumns.date.field,
      body: this.dateFormatTemplate,
      header: Settings.newsList.tableColumns.date.header,
      style: { width: "100px" },
    },
    {
      field: Settings.newsList.tableColumns.expireDate.field,
      body: this.expiryDateFormatTemplate,
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
        width: "500px",
        whiteSpace: "normal",
        wordWrap: "break-word",
      },
    },
    {
      field: Settings.newsList.tableColumns.roles.field,
      header: Settings.newsList.tableColumns.roles.header,
      style: { width: "220px" },
    },
  ];

  render() {
    return (
      <NewsListContextProvider>
        <NewsListContext.Consumer>
          {(newsListContext) => {
            contextType = newsListContext;
            return contextType.isLoading ? (
              <CLoader></CLoader>
            ) : (
              <React.Fragment>
                <div className={styles.MainContainer}>
                  <div className={styles.NewsListContainer}>
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
                    .p-datatable .p-datatable-scrollable-body{
                      overflow-x:hidden;
                    }
                    .p-component{
                      padding-bottom:20px;
                      margin-right:10px
                    }
                    .p-datatable-scrollable-header {
                        background: #f4f4f4;
                        padding-right: 20px;
                    }
                    @media only screen and (max-width: 1186px){
                      .footerwidget{
                        position:fixed;
                      }
                      .p-datatable .p-datatable-scrollable-body{
                        overflow-x:auto;
                      }
                      .p-component{
                        margin-right:0px
                      }
                    }
                  `}</style>
                </div>
                <CModal
                  title={Settings.editNews.title}
                  onClose={contextType.showModal}
                  show={contextType.state.showModal}
                  xPosition={-200}
                  yPosition={-215}
                >
                  <Suspense fallback={<CSuspense />}>
                    <EditNews />
                  </Suspense>
                </CModal>
              </React.Fragment>
            );
          }}
        </NewsListContext.Consumer>
      </NewsListContextProvider>
    );
  }
}

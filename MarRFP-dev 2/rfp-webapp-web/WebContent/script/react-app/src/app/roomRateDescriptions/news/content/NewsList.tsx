import React, { Component, Suspense } from "react";

import EditNews from "./EditNews";
import CSuspense from "../../../common/components/CSuspense";
import NewsListContext, {
  NewsListContextProvider,
} from "../context/NewsListContext";
import API from "../service/API";
import Settings from "../static/Settings";
import CDataTable from "../../../common/components/CDataTable";
import CModal from "../../../common/components/CModal";
import NewBtnImg from "./../../../common/assets/img/button/btnNew.gif";
import DeleteImg from "./../../../common/assets/img/delete.gif";

import styles from "./NewsList.css";
import { CLoader } from "../../../common/components/CLoader";

let contextType = null;

interface IProps {}

interface IState {}

export default class RDNews extends Component<IProps, IState> {
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
        maxWidth: "520px",
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
            return contextType.isLoading ? (
              <CLoader></CLoader>
            ) : (
              <React.Fragment>
                <div className={styles.MainContainer}>
                  <div className={styles.NewsListContainer}>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        <tr>
                          <td className={styles.header}>
                            Room / Rate Description : News
                          </td>
                        </tr>
                        <tr className={styles.BGDarkBlueStyle}>
                          <td style={{ height: "2px" }}></td>
                        </tr>
                        <tr style={{ height: "10px" }}>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
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

                    {contextType.state.newsListData &&
                      contextType.state.newsListData.newsList && (
                        <div className={styles.dataTableContainer}>
                          <CDataTable
                            id="gridTableView"
                            columns={this.columns}
                            value={contextType.state.newsListData.newsList}
                            scrollHeight="500px"
                          />
                        </div>
                      )}
                  </div>
                  <style>{`
                    .p-datatable-scrollable-header-box{
                    margin-right:0px !important;
                    } 
                    .p-datatable-scrollable-body {
                    overflow-x: hidden;
                    position: relative;
                    }
                    .p-datatable-scrollable-body table .p-datatable-tbody tr td{
                      line-height:15px;
                      padding:0 !important;
                    }
                    .p-datatable-scrollable-body table .p-datatable-tbody tr td:first-child{
                      padding:0 2px !important;
                    }
                  `}</style>
                </div>
                <CModal
                  xposition={Settings.xposition}
                  yposition={Settings.yposition}
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
            );
          }}
        </NewsListContext.Consumer>
      </NewsListContextProvider>
    );
  }
}

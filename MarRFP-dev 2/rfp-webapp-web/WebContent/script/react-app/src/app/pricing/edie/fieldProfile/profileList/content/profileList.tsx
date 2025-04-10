import React, { Component, Suspense } from "react";

import DeleteImg from "../../../../../common/assets/img/delete.gif";
import styles from "./profileList.css";
import API from "../service/API";
import EdieProfileListContext, {
  EdieProfileListContextProvider,
} from "../context/profileListContext";
import CDataTable from "../../../../../common/components/CDataTable";
import NewBtnImg from "../../../../../common/assets/img/btnNew.gif";
import { Link } from "react-router-dom";

import CSuspense from "../../../../../common/components/CSuspense";
import Interceptors from "../../../../../common/components/Interceptors";
import Settings from "../static/settings";
import { CLoader } from "../../../../../common/components/CLoader";

let contextType = null;
interface IProps {}

interface IState {}

export default class ProfileList extends Component<IProps, IState> {
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
    API.getEdieProfileList().then((data) => {
      contextType.setEdieProfileListData(data);
      contextType.setIsLoading(false);
    });
  }

  linkEdieProfileList = (rowData) => {
    return (
      <Link
        to={`${Settings.route.editProfile}/${rowData.profile_id}`}
        className={styles.titleLink}
        /*  onClick={() => contextType.selectedAccountData(rowData)}
       data={contextType.state} */
      >
        {rowData.profile_name}
      </Link>
    );
  };

  delimageBodyTemplate = (rowData) => {
    return (
      // (rowData.used == 'N') ?
      <div
        className={styles.deleteImgDiv}
        onClick={() => {
          contextType.deleteProfile(rowData.profile_id);
        }}
      >
        {<img src={DeleteImg} />}
      </div>
    );
  };

  columns = [
    {
      field: Settings.edieProfileNameList.tableColumns.id.field,
      body: this.delimageBodyTemplate,
      style: { width: "20px" },
    },
    {
      field: Settings.edieProfileNameList.tableColumns.profileName.field,
      //field:'profile_name',
      header: Settings.edieProfileNameList.tableColumns.profileName.header,
      body: this.linkEdieProfileList,
      style: { width: "300px" },
    },
  ];

  render() {
    return (
      <EdieProfileListContextProvider>
        <EdieProfileListContext.Consumer>
          {(edieProfileListContext) => {
            contextType = edieProfileListContext;
            return contextType.isLoading ? (
              <CLoader></CLoader>
            ) : (
              <React.Fragment>
                <div>
                  <Suspense fallback={<CSuspense />}>
                    {/* <Interceptors spinnerFlag={true} /> */}

                    <div className={styles.pageheader}>
                      <p className={styles.header}>{Settings.title}</p>
                    </div>
                    <div className={styles.newprofilebth}>
                      <a className={styles.newbtn}>
                        <Link to="/addProfile">
                          <img
                            className={styles.BtnNew}
                            src={NewBtnImg}
                            id="NewButton"
                          />
                        </Link>
                      </a>
                    </div>
                    <div className={styles.topAlign}>
                      <div
                        id="gridProfileList"
                        className={styles.gridProfileList}
                      >
                        <CDataTable
                          id="gridTableView"
                          columns={this.columns}
                          value={
                            contextType.state.edieProfileListData
                              .edieProfileList
                          }
                          marginLeft="0px"
                          scrollHeight="calc(100vh - 185px)"
                          width="430px"
                        />
                      </div>
                    </div>
                  </Suspense>
                </div>
                <style>{`
                  .p-datatable-scrollable-body{
                    overflow: hidden auto !important;
                  }
                  .p-datatable-scrollable-header{
                    line-height: 31px;
                  }
                `}</style>
              </React.Fragment>
            );
          }}
        </EdieProfileListContext.Consumer>
      </EdieProfileListContextProvider>
    );
  }
}

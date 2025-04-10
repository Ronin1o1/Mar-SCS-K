const Settings = {
  api: {
    getColumn: "/ediecolumndesc/getEdieColumns.action",
    updateColumn: "/ediecolumndesc/update.action",
  },
  edieColumnDesc: {
    alertmessage: "was not found",
    nextURL: "/ediecolumndesc/view.action",
    formChg: "Y",
    All: "ALL",
    Filter: "FILTER",
    showAll: {
      id: "c_1",
      label: "Show ALL Columns",
      value: "ALL",
    },
    showColumn: {
      id: "c_1",
      label: "Show Columns with Labels containing: ",
      value: "FILTER",
    },
    findEdie: {
      id: "seqfind",
      label: "Find Edie #: ",
    },
    colfind: {
      name: "colfind",
      id: "colfind",
      value: "",
    },
    btnSearch: "Search Button",
    btnUpdate: "Update Button",
    name: "c_1",
    sname: "c_2",
    seqfind: "seqfind",
    tableColumns: {
      id: {
        field: "column_seq",
        header: "ID",
      },
      colDetails: {
        field: "column_label",
        header: "Columns",
      },
      path: {
        field: "epic_path",
        header: "Path",
      },
      logic: {
        field: "logic",
        header: "Logic",
      },
      description: {
        field: "column_desc",
        header: "Description",
      },
      epicPath: {
        id: "epic_path",
        name: "epic_path",
      },
      edieLogic: {
        id: "logic",
        name: "logic",
      },
      ediedescription: {
        id: "column_desc",
        name: "column_desc",
      },
    },
  },
  pageTitle: "Pricing / EDIE : Edit Column Descriptions",
};
export default Settings;

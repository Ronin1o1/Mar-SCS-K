const Settings = {
  api: {
    getNews: "/generalnews/getGeneralNews",
    editNews: "/generalnews/getEditNews",
    updateNews: "/generalnews/updateNews",
    deleteNews: "/generalnews/deleteNews",
  },
  xposition: -300,
  yposition: -220,
  newsList: {
    deleteImgAltText: "Delete News",
    tableColumns: {
      id: {
        field: "infoid",
      },
      date: {
        field: "infodate",
        header: "Date",
      },
      expireDate: {
        field: "infoexpiredate",
        header: "Expire Date",
      },
      title: {
        field: "infotitle",
        header: "Title",
      },
      message: {
        field: "infomsg",
        header: "Message",
      },
      roles: {
        field: "groups",
        header: "Roles",
      },
    },
  },
  editNews: {
    title: "Edit News",
    formFields: {
      date: {
        id: "infodate",
        label: "Date:",
      },
      expireDate: {
        id: "infoexpiredate",
        label: "Expire Date:",
      },
      title: {
        id: "infotitle",
        label: "Title:",
      },
      message: {
        id: "infomsg",
        label: "Message:",
      },
      roles: {
        label: " Users to view",
      },
      pasAdmin: {
        id: "MFPADMIN",
        label: "PAS Administrators",
      },
      sappAdmin: {
        id: "MFPAPADM",
        label: "SAPP Administrators",
      },
      salesUsers: {
        id: "MFPSALES",
        label: "Sales Users",
      },
      ltdSalesUser: {
        id: "MFPFSALE",
        label: "Limited Sales User",
      },
      hotelUsers: {
        id: "MFPUSER",
        label: "Hotel Users",
      },
      pasAdminLabel: {
        id: "MFPADMIN",
        label: "PAS Admin",
      },
      sappAdminLabel: {
        id: "MFPAPADM",
        label: "SAPP Admin User",
      },
      salesUsersLabel: {
        id: "MFPSALES",
        label: "Sales User",
      },
      ltdSalesUserLabel: {
        id: "MFPFSALE",
        label: "Limited Sales User",
      },
      hotelUsersLabel: {
        id: "MFPUSER",
        label: "Hotel User",
      },
    },
    updateBtnAltText: "Update News",
  },
  labels: {
    title: "General Administration : News",
  },
};
export default Settings;

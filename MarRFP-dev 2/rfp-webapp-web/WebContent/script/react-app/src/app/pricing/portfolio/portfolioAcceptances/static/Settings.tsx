const Settings = {
  api: {
    showFilterOptions:
      "/portfoliostatus/getPortfolioStatusPricingFilter.action",
    getPortfolioStatus: "/portfoliostatuslist/getPortfolioStatus.action",
    getPortfolioFilterViewList: "/portfoliostatus/getFilterViewLists.action",
    getRejectionReason:
      "/hotelrejectionreasonAcceptance/getRejectionReason.action",
    getRemovalReason: "/hotelremovalreason/getRemovalReason.action",
    getPortfolioStatusFindFilter:
      "/portfoliostatusfindfilter/getPortfolioStatusFindFilter.action",
    ajaxSave: "/portfoliostatuslist/ajaxsave.action",
    rejectAll: "/portfoliostatuslist/rejectAll.action",
    acceptAll: "/portfoliostatuslist/acceptAll.action",
    updatePortfolio: "/portfoliostatuslist/update.action",
  },
  noCache: "no-cache",
  urlencode: "application/x-www-form-urlencoded",
  title: "Pricing : Portfolio Acceptance",
  quickSelect: "Portfolio Acceptance - Actions",
  qickSelectLabel: "Acceptance Quick Select",
  alertMessage: "Alert Message",
  okClose: "OK - Close Message Box",
  marshacodeSeparatedByComma: "Please enter only marshacodes seperated by a ,",
  enter200Hotels: "Please enter only 200 hotels at a time.",
  tableColumns: {
    selected: {
      field: "selected",
      header: "",
    },
    hotelid: {
      field: "hotelid",
      header: "",
    },
    marshacode: {
      field: "marshacode",
      header: "MARSHA",
    },
    hotelname: {
      field: "hotelname",
      header: "Name",
    },
    roomPoolData: {
      roompool_1: {
        field: "",
        header: "Status-Room Pool Group 1",
        accepted: {
          field: "roompool_1_accepted",
          header: "Accepted",
        },
        rejected: {
          field: "roompool_1_accepted",
          header: "Rejected",
        },
        pending: {
          field: "roompool_1_accepted",
          header: "Pending",
        },
        rejectionreason: {
          field: "roompool_1_rejectionreason",
          header: "Rejection Reason-Room Pool Group 1",
        },
        rejectreasonid: {
          field: "roompool_1_rejectreasonid",
          header: "",
          label: "roompool_1_rejectionreason",
        },
        lra: {
          field: "roompool_1_lra",
          header: "LRA-1",
        },
        pgoosData: {
          field: "",
          header: "PGOOS Room Pool Group 1",
          roomPoolSequence_1: {
            pgoos: {
              field: "roompool_1_roomPoolSequence_1_pgoos",
              header: "RP-1",
            },
            removalreason: {
              field: "roompool_1_roomPoolSequence_1_removalreason",
              header: "Reason RP-1",
            },
            removalreasonid: {
              field: "roompool_1_roomPoolSequence_1_removalreasonid",
              header: "",
              label: "roompool_1_roomPoolSequence_1_removalreason",
            },
          },
          roomPoolSequence_2: {
            pgoos: {
              field: "roompool_1_roomPoolSequence_2_pgoos",
              header: "RP-2",
            },
            removalreason: {
              field: "roompool_1_roomPoolSequence_2_removalreason",
              header: "Reason RP-2",
            },
            removalreasonid: {
              field: "roompool_1_roomPoolSequence_2_removalreasonid",
              header: "",
              label: "roompool_1_roomPoolSequence_2_removalreason",
            },
          },
        },
      },
      roompool_2: {
        field: "",
        header: "Status-Room Pool Group 2",
        accepted: {
          field: "roompool_2_accepted",
          header: "Accepted",
        },
        rejected: {
          field: "roompool_2_accepted",
          header: "Rejected",
        },
        pending: {
          field: "roompool_2_accepted",
          header: "Pending",
        },
        rejectionreason: {
          field: "roompool_2_rejectionreason",
          header: "Rejection Reason-Room Pool Group 2",
        },
        rejectreasonid: {
          field: "roompool_2_rejectreasonid",
          header: "",
          label: "roompool_2_rejectionreason",
        },
        lra: {
          field: "roompool_2_lra",
          header: "LRA-2",
        },
        pgoosData: {
          field: "",
          header: "PGOOS Room Pool Group 2",
          roomPoolSequence_1: {
            pgoos: {
              field: "roompool_2_roomPoolSequence_1_pgoos",
              header: "RP-1",
            },
            removalreason: {
              field: "roompool_2_roomPoolSequence_1_removalreason",
              header: "Reason RP-1",
            },
            removalreasonid: {
              field: "roompool_2_roomPoolSequence_1_removalreasonid",
              header: "",
              label: "roompool_2_roomPoolSequence_1_removalreason",
            },
          },
          roomPoolSequence_2: {
            pgoos: {
              field: "roompool_2_roomPoolSequence_2_pgoos",
              header: "RP-2",
            },
            removalreason: {
              field: "roompool_2_roomPoolSequence_2_removalreason",
              header: "Reason RP-2",
            },
            removalreasonid: {
              field: "roompool_2_roomPoolSequence_2_removalreasonid",
              header: "",
              label: "roompool_2_roomPoolSequence_2_removalreason",
            },
          },
        },
      },
      roompool_3: {
        field: "",
        header: "Status-Room Pool Group 3",
        accepted: {
          field: "roompool_3_accepted",
          header: "Accepted",
        },
        rejected: {
          field: "roompool_3_accepted",
          header: "Rejected",
        },
        pending: {
          field: "roompool_3_accepted",
          header: "Pending",
        },
        rejectionreason: {
          field: "roompool_3_rejectionreason",
          header: "Rejection Reason-Room Pool Group 3",
        },
        rejectreasonid: {
          field: "roompool_3_rejectreasonid",
          header: "",
          label: "roompool_3_rejectionreason",
        },
        lra: {
          field: "roompool_3_lra",
          header: "LRA-3",
        },
        pgoosData: {
          field: "",
          header: "PGOOS Room Pool Group 3",
          roomPoolSequence_1: {
            pgoos: {
              field: "roompool_3_roomPoolSequence_1_pgoos",
              header: "RP-1",
            },
            removalreason: {
              field: "roompool_3_roomPoolSequence_1_removalreason",
              header: "Reason RP-1",
            },
            removalreasonid: {
              field: "roompool_3_roomPoolSequence_1_removalreasonid",
              header: "",
              label: "roompool_3_roomPoolSequence_1_removalreason",
            },
          },
          roomPoolSequence_2: {
            pgoos: {
              field: "roompool_3_roomPoolSequence_2_pgoos",
              header: "RP-2",
            },
            removalreason: {
              field: "roompool_3_roomPoolSequence_2_removalreason",
              header: "Reason RP-2",
            },
            removalreasonid: {
              field: "roompool_3_roomPoolSequence_2_removalreasonid",
              header: "",
              label: "roompool_3_roomPoolSequence_2_removalreason",
            },
          },
        },
      },
    },
    product_offered: {
      field: "product_offered",
      header: "Product",
    },
    subsetname: {
      field: "subsetname",
      header: "Subset",
    },
    commissionable: {
      field: "commissionable",
      header: "COM",
    },
    city: {
      field: "city",
      header: "City",
    },
    state: {
      field: "state",
      header: "State/Province",
    },
    country: {
      field: "country",
      header: "Country/Region",
    },
  },
  inputType: {
    checkbox: "checkbox",
    radio: "radio",
    rejectionModal: "rejectionModal",
    removeModal: "removeModal",
    button: "button",
  },
  rejectionReasonList: {
    modal: {
      title: "Rejection Reason",
      body: "Rejection Reason : ",
      cancel: "Cancel",
    },
    filter: {
      formFields: {
        id: "portfolio_rejection_reasone_list",
        keyField: "rejectreasonid",
        valField: "rejectionreason",
      },
    },
  },
  removalReasonList: {
    modal: {
      title: "Removal Reason",
      body: "PGOOS Removal Reason : ",
      cancel: "Cancel",
    },
    filter: {
      formFields: {
        id: "portfolio_removal_reasone_list",
        keyField: "removalreasonid",
        valField: "removalreason",
      },
    },
  },
  noReason: "No Reason Provided",
};

export default Settings;

const Settings = {
  api: {
    apiPrefix: "/hotelscpt",
    pricingSetupStatus: "/hotelscptsetup/scptSetupStatus.action",
    pricingSetupLoad: "/hotelscptsetup/getHotelSCPTSetup.action",
    pricingSetupUpdate: "/hotelscptsetup/updateSCPTSetup.action",
    accountPricingLoad: "/hotelscptcomm/getHotelSCPTCommData.action",
    accountPricingTotalLoad: "/hotelscptcomm/findAcctPricingTotal.action",
    accountPricingUpdate: "/hotelscptcomm/updateSCPTComm.action",
    hiddenAccountsLoad: "/hotelscptstatus/getHotelSCPTStatus.action",
    hiddenAccountsUpdate: "/hotelscptstatus/update.action",
    accountPricingRefreshRates: "/hotelscptcomm/updatePrevYrSCPTComm.action",
    accountHistoryLoad: "/hotelscptaccthistory/getHotelSCPTAccHistory.action",
    findBTAccounts: "/hotelscptaccount/findBTAccounts.action",
    findAccountSegments: "/hotelscptaccount/getHotelSCPTAccSegment.action",
    addAccountUpdate: "/hotelscptaccount/updateAccount.action",
    accountsTotalReport: "/scptsummaryreport/getSCPTHotelSummaryReport.action",
    accountsHistoryReport: "/scptsummaryreport/getSCPTHSummaryReport.action",
    accountDetailsLoad: "/hotelscptdetail/getHotelSCPTDetail.action",
    accountDetailsUpdate: "/hotelscptdetail/updateSCPTDetail.action",
    showRoomNightsUpdate: "/hotelscptsetup/updateSCPTHotel.action",
    errorPage: "/error",
    noAccountFound: "No Accounts Found",
    params: {
      marshaCodeParam: "MarshaCode",
      hotelrfpidParam: "Hotelrfpid",
      periodParam: "Period",
      hotelidParam: "hotelid",
    },
    saveAttr: {
      pricingSetupUpdate: "strScptUpdate",
      accountPricingUpdate: "strCommData",
      addAccountUpdate: "strAddAccount",
      hiddenAccountsUpdate: "strSCPTStatus",
      accountDetailsUpdate: "strScptcomm",
      showRoomNightsUpdate: "strSCPTHotelDetail",
    },
  },
  text: {
    validationMessage: {
      pricingSetup: {
        roomNightsBelowLow: "Please enter the Low threshold number.",
        roomNightsBelowHigh: "Please enter the High threshold number.",
        roomNightsBelowHighLess:
          "Low threshold number should not be greater than High.",
        retailRateHighEquals:
          "Please enter the percent and currency discounts in Threshold details.",
        generalInfoMissingError: "Please enter the General Information.",
        generalInfoRoomClassError:
          "Room Pool Group 2 is required for Room Pool Group 3.",
        generalInfoTier2Error: "Tier 2 is required for Tiers 3 and 4.",
        generalInfoTier3Error: "Tier 3 is required for Tier 4.",
        retailRateMissingError: "Please enter the Retail Rates.",
        invalidRateError: "You must enter a valid number.",
        invalidRateRangeError: "You must enter a value between 10 and 99999999.",
        amenitiesMissingError: "Please enter the Amenities details.",
      },
      accountPricing: {
        invalidBTAccount: "Invalid\nAccount.",
      },
    },
    confirmationMessage: {
      pricingSetup: {
        updateAllConfirmationMessage:
          "Are you sure that you want to update all?  If yes, the values in Account pricing will get modified.",
        updateThresholdsConfirmationMessage:
          "Are you sure that you want to update Thresholds?  If yes, the values in Account Pricing will get modified.",
        updateAmenitiesConfirmationMessage:
          "Are you sure that you want to update Amenities?  If yes, the values in Account Pricing will get modified.",
        lockedConfirmationMessage:
          "Are you sure that you want to freeze the UPDATE option?",
        amenitiesNoMessage:
          "You have selected No for an amenity, therefore the value entered for that amenity will not be carried over to the Account Pricing page.",
      },
      accountDetails: {
        moveToPrimary: "You are moving to primary, are you sure?",
        moveToSecondary: "Are you sure, your thresholds are going to pickup?",
      },
    },
    label: {
      dialog: {
        confirmDialog: "Confirm",
        errorDialog: "Error",
        okButton: "OK",
        cancelButton: "Cancel",
      },
      historyViewAs: {
        viewAsLabel: "View as:",
        viewAsOptions: ["Room Nights", "% of Room Nights"],
      },
      scptHeader: {
        hotelNameLabel: "Special Corporate Pricing:",
        periodLabel: "Period:",
        currencyLabel: "Currency:",
      },
      btStatusMap: {
        A: "Accepted",
        S: "Requested",
        L: "Pending",
        R: "Declined",
      },
      pricingSetup: {
        pricingSetupHeaderTitle: "Special Corporate Pricing Setup",
        pricingSetupHeader: {
          updateUserLabel: "Last Updated By:",
          updateTimestampLabel: "On:",
          lockedLabel: "Locked",
          lockLabel: "Lock",
        },
        generalInformation: {
          sectionTitle: "General Information",
          brandLabel: "Hotel Brand:",
          roomClassHeader: "Select Room Pool Group to price",
          tierPriceHeader: "Select Tiers to price",
          priceVATHeader: "Does price include VAT",
          yoyHeader: "Show YoY comparisions as",
          roomClassLabels: [
            "Room Pool Group 1",
            "Room Pool Group 2",
            "Room Pool Group 3",
          ],
          tierPriceLabels: ["Tier 1", "Tier 2", "Tier 3", "Tier 4"],
          priceVATlabels: ["No", "Yes"],
          yoyLabels: ["Target", "Floor", "Open"],
        },
        retailRate: {
          sectionTitle: "Retail Rate",
          yearLabel: "Year",
          seasonLabel: "S",
          weightedTotalLabel: "Weighted Total",
          yoyChangeLabel: "YoY % Change",
        },
        amenities: {
          sectionTitle: "Amenities",
          typeTableHeaders: ["Amenity Type", "Setting", "Fixed Cost"],
          breakfastLabel: "Breakfast",
          internetLabel: "Internet",
          transportLabel: "Transport to Local Office",
          parkingLabel: "Parking",
          yesNoOptions: ["", "No", "Yes"],
          vatTableHeaders: ["", "VAT Room %"],
          buttonLabel: "Update Amenities",
        },
        thresholds: {
          sectionTitle: "Room Night Thresholds",
          sectionDesc:
            "Room Night Thresholds only apply to Secondary accounts. Primary and GPP accounts will not be affected by these settings.",
          tableHeaders: ["", "Low", "High", ""],
          offLabels: ["Percent Off", "Amount Off"],
          rmNightsLabel: "Room Night Ranges",
          retailRateLabel: "Discount (Rate)",
          roomsLabel: "Rooms",
          buttonLabel: "Update Thresholds",
        },
        scBudgetInformation: {
          sectionTitle: "Special Corporate Budget Information",
          rmNightLabel: "Room Nights",
          adrLabel: "ADR",
          revenueLabel: "Revenue",
        },
        pricingSetupFooter: {
          cancelButonLabel: "Cancel",
          updateButtonLabel: "Update All Settings",
          updateCloseButtonLabel: "Update All Settings and Close",
          closeButtonLabel: "Close",
          saveButtonLabel: "Save",
        },
      },
      accountPricing: {
        headerMenu: {
          menuTypes: [
            { key: "pricing", label: "Account Pricing" },
            { key: "history", label: "Account History" },
          ],
          accountPricingMenu: "Account Pricing",
          accountHistoryMenu: "Account History",
        },
        accountsMenu: {
          accountTypes: [
            { key: "1", label: "Primary Accounts" },
            { key: "2", label: "Secondary Accounts" },
            { key: "3", label: "GPP Accounts" },
          ],
          newAccountMenu: "New Account",
        },
        accountPricingSettingsOptions: [
          { key: "setup", label: "Setup..." },
          { key: "refreshRates", label: "Refresh All Rates..." },
          { key: "hiddenAccounts", label: "View Hidden Accounts..." },
        ],
        accountHistorySettingsOptions: [
          { key: "setup", label: "Setup..." },
          { key: "historyReport", label: "SCPT Account History Report..." },
        ],
        accountPricingTableHeader: {
          bulkActions: {
            label: "Bulk actions",
            options: [
              { key: "default", label: "Bulk actions" },
              {
                key: "status",
                label: "Status",
                nextLevel: true,
                options: [
                  { key: "Requested", label: "Requested", parentKey: "status" },
                  { key: "Pending", label: "Pending", parentKey: "status" },
                  { key: "Accepted", label: "Accepted", parentKey: "status" },
                  { key: "Declined", label: "Declined", parentKey: "status" },
                  { key: "Rebid", label: "Rebid", parentKey: "status" },
                ],
              },
              { key: "hideAccounts", label: "Hide Account(s)" },
              { key: "doNotPrice", label: "Do Not Price" },
              {
                key: "moveAccounts",
                label: "",
                conditionalLabel: "activeAccountType",
                labelConditions: {
                  1: "Move to Secondary/GPP Accounts",
                  2: "Move to Primary Accounts",
                  3: "Move to Primary Accounts",
                },
                border: true,
              },
              { key: "refreshRates", label: "Refresh :period Rates" },
            ],
          },
          applyButtonLabel: "Apply",
          accountSearchLabel: "Account search",
          viewBy: {
            viewByLabel: "View by",
            label: "Account",
            options: [
              { key: "viewBy1", label: ":period YTD RN" },
              { key: "viewBy2", label: ":period YTD Revenue" },
              { key: "viewBy3", label: "Account" },
              { key: "viewBy4", label: "Sales Group" },
              { key: "viewBy5", label: "Sales Manager" },
            ],
          },
          viewByHistory: {
            viewByLabel: "View by",
            label: "Account",
            options: [
              { key: "viewBy1", label: ":prevperiod YTD Room Nights" },
              { key: "viewBy2", label: ":prevperiod YTD Revenue" },
              { key: "viewBy3", label: "Account" },
              { key: "viewBy4", label: "Sales Group" },
              { key: "viewBy5", label: "SC Type" },
              { key: "viewBy6", label: ":prevperiod Accepted" },
              { key: "viewBy7", label: ":prev2period Accepted" },
            ],
          },
          yoy: {
            yoyLabel: "YoY",
            yoyOptions: ["Amount", "Percent"],
          },
          legend: {
            legendLabel: "Legend",
            legendTexts: {
              grading: "Grading",
              accountStatus: "Account Status",
              minimalOpp: "Minimal opportunity to increase rate",
              recommend: "Recommend increasing rate",
              requested: "Requested",
              accepted: "Accepted",
              pending: "Pending",
              declined: "Declined",
            },
          },
        },
        accountPricingTable: {
          noDataFound: "No data found",
          columnHeaders: [
            "Account Name",
            "Do Not\nPrice",
            "Last Room\nAvailability",
            ":period Fcst\nRoom nights",
            "YOY Fcst\nRN's :percent\nChange",
            ":period\nWeighted\n(Gross)",
            "YOY\nWtd :percent\nChange",
            ":period\nWeighted\n(Net)",
            "YOY\nWtd :percent\nChange (Net)",
            "Rec %\nChange",
            ":period Rec\nMinimum\n(Net)",
            ":period Rec\nTarget\n(Net)",
            ":period % Var.\nAntic to\nRec Min",
            ":period % Var. to\nWeighted\nRetail Rate",
            "Status",
          ],
          statusList: [
            "Select",
            "Accepted",
            "Declined",
            "Pending",
            "Requested",
            "Rebid",
          ],
          footerLabel: "All Accounts Total",
        },
        accountHistoryTable: {
          noDataFound: "No data found",
          columnHeaders: [
            "Account Name",
            "Pricing Score",
            ":prevperiod Roomnights by DOW",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "Room Nights",
            "",
            "",
            "Account Rate",
            "",
            "",
          ],
          columnSubHeaders: [
            "",
            ":prevperiod Grade",
            "Stay Pattern\nGrade",
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "YTD\n:prevperiod",
            "YTD\n:prev2period",
            "YOY YTD\n:prevperiod / :prev2period\nChange (:yoytypeRN)",
            "YTD :prevperiod\n(Net)",
            "YTD :prev2period\n(Net)",
            "YOY YTD\n:prevperiod / :prev2period\nChange (:yoytypeCurr)",
          ],
        },
        accountPricingFooter: {
          cancelButtonLabel: "Cancel",
          saveButtonLabel: "Save",
        },
        modal: {
          closeButtonLabel: "Close",
        },
        addAccountModal: {
          title: "Add Account",
          subTitle: "",
          account: {
            accountOptions: ["BT Account", "New Account"],
          },
          placeholderText: "Name",
          addAccountButtonLabel: "Add Account",
          previousChoices: "Previous choices",
          moreChoices: "More choices",
          fcrn: "Forecasted Room Nights",
          fcadr: "Forecasted ADR",
        },
        hiddenAccountModal: {
          title: "Hidden Accounts",
          subTitle: "Select the account(s) to view",
          tableHeader: "Account Name",
          cancelButtonLabel: "Cancel",
          unhideButtonLabel: "Un-Hide Selected Accounts",
        },
        accountHistoryDefinitionModal: {
          title: "Account History Definitions",
          okButtonLabel: "OK",
          accountBehaviour: "Account Behaviour",
          historyDefinitions: [
            {
              key: ":prevperiod Full Year RN's",
              value:
                "The room nights shown here are an annualized number based on your YTD room night production. There is a user input area where a different forecast can be entered if this is not an accurate forecast.",
            },
            {
              key: ":period Full Year RN's",
              value:
                "Based on the :prevperiod Full Year RN's and the Anticipated % Change in RN's from this Year.",
            },
            {
              key: "Accepted Accounts",
              value:
                "Hotel was accepted into the accounts preferred hotel program. This information comes from MarRFP.",
            },
            {
              key: "Account Rate",
              value:
                "Average rate paid by the account at this property for roomnights that are recorded under rate programs that correspond to this account (see Roomnights for further explanation).",
            },
            {
              key: "Account Behaviour",
              value:
                "This information is based on all roomnights from this account in either the Americas or non-Americas depending on where the hotel is located. It is not hotel specific.",
            },
            {
              key: "Account Revenue",
              value:
                "Total transient room revenue recorded at rate programs corresponding to this account.",
            },
            {
              key: "Discount to Retail Rate",
              value:
                "Average discount off the retail rate that this account received. Some very small accounts at some properties will show a very high discount. Note that this may be due to" +
                ' "zeroed out revenue"' +
                ", miscodes, or some other technical concern. The great majority of discounts will be between 0% and 50%.",
            },
            {
              key: "Fcsted :period Retail Rate",
              value:
                "Based on :prevperiod weighted retail and the % increase in retail rate indicated on the Depth of Sales tab.",
            },
            {
              key: "Global Sales Accounts",
              value:
                "These accounts have significant business worldwide or on a regional /market level. These accounts are managed by sales associates around the world.",
            },
            {
              key: "GPP (Global Preferred Program)",
              value:
                "These discounted rates are offered to select accounts in order to drive loyalty to Marriott and enhance the Marriott-account partnership. These rates will float at a designated percentage (10 or 15) off your Corporate Benchmark Rate in MARSHA and will not have a ceiling. As an example, when your Corporate Benchmark Rate changes, your 10% GPP rate will also adjust to remain at 10% discount off your new Corporate Benchmark Rate.",
            },
            {
              key: "Local Accounts",
              value:
                "This tier is comprised of any companies that are priced outside of MarRFP. Keep in mind, this may include accounts which are priced through MarRFP if you have built additional rate codes for the company.",
            },
            {
              key: "MarRFP Weighted Negotiated Rate",
              value:
                "The MarRFP negotiated rate weighted by the number of days in each corresponding season.",
            },
            {
              key: "Mid-Market Accounts",
              value:
                "These accounts have an estimated annual lodging spend between $500,000 and $10 million. Spread across a wide range of industries, most of these companies are not your everyday well know brand names, but provide specialized support services to major corporations, manufacturers, and governments. The accounts tend to purchase across fewer markets.",
            },
            {
              key: "Prospect Accounts",
              value:
                "These accounts typically have between $7-14M in global lodging spend. They are more complex than a Mid-Market account in terms of their total lodging spend and number of markets where they conduct business. They generally have a managed travel program and Marriott has multiple Senior Account Executives in deployed markets calling on the various buying locations in order to drive more revenue and share.",
            },
            {
              key: "Rate Calculator",
              value:
                "The rate calculator area is provided as a calculator for users to be able to test different discount levels. The discount to retail entered in the rate calculator is not used in any other calculations.",
            },
            {
              key: "Recom Minimum Rate",
              value:
                "The recommended minimum rate is calculated using the anticipated increase in retail rates in :period (DOS chart) and the discount the account is currently receiving.",
            },
            {
              key: "Recom Target Rate",
              value:
                "The recommended target rate is based on the level of value that the account brings (value ratio grade), the stay pattern grade, the anticipated increase in retail rates (DOS chart), the discount the account is currently receiving and account behavior information.",
            },
            {
              key: "Retail Rate (weighted by night of stay)",
              value:
                "The average rate the account would have paid if they booked the" +
                ' "retail"' +
                " on each of their stays. This rate will be different for different accounts because of the actual nights of stay.",
            },
            {
              key: "Roomnights",
              value:
                "All transient roomnights that are recorded under rate programs that correspond to this account. Note that this is NOT the same as" +
                ' "all account roomnights"' +
                " It is only those that are recorded under a specific rate program. For example, an IBM employee booking a corporate rate would not show up here because this would be booked under the corporate segment. This is NOT a NEGOTIATED roomnight (since anyone could have booked it). Similarly, when AMEX books an IBM rate, this shows up under IBM since it is the IBM negotiated rate. For these reasons, these numbers can vary from the Account Tracking Reports (ATR) in MRDW.",
            },
            {
              key: "Stay Pattern Grade",
              value:
                "Compares the percentage of the accounts roomnights by day of week to the hotels occupancy by day of week." +
                ' "1"' +
                " indicates that compared to the other accounts at the hotel, this account has a greater percentage of roomnights on off-peak nights. " +
                ' "4"' +
                " indicates that the accounts roomnights primarily fall on peak nights. In general there is more opportunity to increase the account rate if the account is primarily or exclusively staying on peak nights because the demand is higher on those nights.",
            },
            {
              key: "Value Ratio Relative to Volume Grade",
              value:
                "Value Ratio Relative to Volume Grade	" +
                ' "1"' +
                " indicates high value accounts. These accounts have" +
                ' "above-average"' +
                " production for the discount received and generally we want to keep their business. " +
                ' "2"' +
                " indicates accounts that produce" +
                ' "average"' +
                " room-nights for the discount they receive. If possible, we want to increase their rate to bring them to a" +
                ' "1"' +
                "." +
                ' "3"' +
                " indicates accounts that have" +
                ' "below-average"' +
                " production relative to the discount. These accounts are receiving more in discounts from the hotel than the hotel is receiving in revenue (net of displacement). Generally, the rate on these accounts should be increased to bring it to a" +
                ' "1"' +
                " or" +
                ' "2"' +
                ".",
            },
            {
              key: "Weighted Gross Rate",
              value:
                "The weighted rate for each year based on the forecasted rate and number of nights in each season.",
            },
            {
              key: "Weighted Net Rate",
              value: "The weighted gross rate minus net rate considerations.",
            },
          ],
          accountBehaviourDefinitions: [
            {
              key: "% Squatter",
              value:
                "The percentage of roomnights produced by account specific rate codes loaded at non preferred hotels.",
            },
            {
              key: "Squatter Booking Grade",
              value:
                '"1"' +
                " indicates a low percentage of squatter roomnights while" +
                '"4"' +
                "indicates a high percentage. This metric can be an indicator of how likely a hotel is to see production from a given account even if they are not accepted into the accounts preferred travel program.",
            },
            {
              key: "% Elite Bonvoy Members",
              value:
                "The percentage of account roomnights that came from Elite Marriott Bonvoy members.",
            },
            {
              key: "Elite Bonvoy Member Grade",
              value:
                '"1"' +
                " indicates a low percentage of roomnights from elite members while" +
                '"4"' +
                "indicates a high percentage. Elite members are our most loyal customers and this metric, in conjunction with the Squatter and Agency Compliance information, can be an indicator of how likely a hotel is to see production from a given account even if the hotel is not accepted into the accounts preferred travel program.",
            },
            {
              key: "Agency Compliance",
              value:
                "The percentage of account roomnights booked through an intermediary (travel agency). This is an indicator of the accounts ability to enforce their travel policies.",
            },
            {
              key: "Agency Compliance Grade",
              value:
                '"1"' +
                " indicates a high percentage while" +
                '"4"' +
                "indicates a low percentage. This metric can be an indicator of the accounts ability to enforce their hotel compliance policies.",
            },
          ],
        },
        accountTotalModal: {
          specialCorporateLabel: "Total Special Corporate 2020",
          subTitle: "Instructional text describing the content displayed here.",
        },
      },
      accountDetails: {
        accountDetailsHeader: {
          label: "Account Details",
        },
        history: {
          sectionTitle: "History",
          salesGroupLabel: "Sales Group: ",
          scTypeLabel: "SC Type: ",
          gradeTableHeaders: [
            { label: "Pricing Score", colspan: 1, radio: false },
            {
              label: ":prevperiod Roomnights by DOW",
              colspan: 8,
              radio: true,
            },
          ],
          behaviourHeaders: [
            { label: "Account Behavior", colspan: 6, radio: false },
          ],
          gradeTableSubHeaders: [
            ":prevperiod\nGrade",
            "Stay Pattern\nGrade",
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ],
          behaviourSubHeaders: [
            "% Squatter\nBookings",
            "Squatter\nBooking\nGrade",
            "% Elite\nBonvoy\nMembers",
            "Elite Bonvoy\nMember\nGrade",
            "Agency Compliance\n(% Booked\nThru Intermed.)",
            "Agency\nCompliance\nGrade",
          ],
          gradeTableColoredCellIndex: [0, 1, 10, 12, 14],
          rateTableHeaders: [
            "",
            ":prevperiod YTD",
            ":prev2period YTD",
            ":prev3period YTD",
            "YOY YTD\n:prevperiod/:prev2period\nChange (%)",
            "YOY YTD\n:prevperiod/:prev2period\nChange",
          ],
          rateTableRowLabels: [
            "Roomnights",
            "Account Rate (Net)",
            "Weighted Retail Rate",
            "Discount to Retail Rate (%)",
            "Account Revenue (Net)",
          ],
          accountTableHeaders: ["", ":prevperiod YTD", ":prev2period YTD"],
          accountTableRowLabels: ["Accepted Accounts"],
          accountTableSVGCellIndex: [1, 2],
        },
        generalInfo: {
          sectionTitle: "General Information",
          tableHeaders: [
            "Room Pool Group",
            "Sales Group",
            "Sales Manager",
            "Due Date",
            "Do Not Price",
            "Status",
            "Last Room Availability",
          ],
          statusList: [
            "Select",
            "Accepted",
            "Declined",
            "Pending",
            "Requested",
            "Rebid",
          ],
        },
        roomNights: {
          sectionTitle: "Full Year Room Nights",
          tableHeaders: [
            "Room Pool Group",
            ":period Fcst Room",
            ":prevperiod Fcst Room",
            "YOY Fcst RN's % Change",
          ],
        },
        seasons: {
          sectionTitle: "Seasons",
          accountTypeLabel: "Account Type",
          accountTypes: ["Primary", "Secondary", "GPP"],
          tableHeaders: [
            { label: "Roomnights", rowspan: 1, colspan: 3 },
            { label: "Rates", rowspan: 1, colspan: 6 },
          ],
          tableSubHeaders: [
            ":period Fcst RN's",
            ":prevperiod Fcst RN's",
            "% of Annual RN's",
            ":prevperiod Rate (Gross)",
            ":period Open Rate (Gross)",
            ":period Target Rate (Gross)",
            ":period Floor Rate (Gross)",
            ":period MarRFP Rate (Gross)",
            "% Change",
          ],
        },
        amenities: {
          sectionTitle: "Amenities",
          tableHeaders: [
            "Room Pool Group",
            "Breakfast",
            "Internet",
            "Transport Included?",
            "Parking Included?",
            "VAT Room %",
            "Total Amenities Fixed Costs",
          ],
        },
        rates: {
          sectionTitle: "Full Year Rates",
          tableHeaders: [
            ":prevperiod MarRFP Wtd. Neg. Rate (Gross)",
            ":period MarRFP Wtd. Neg. Rate (Gross)",
            ":prevperiod Weighted (Gross)",
            ":period Weighted (Gross)",
            "YOY Wtd % Change",
            ":prevperiod Weighted (Net)",
            ":period Weighted (Net)",
            "YOY Wtd % Change (Net)",
            ":period Rec Minimum (Net)",
            ":period Rec Target (Net)",
            ":period % Var. Antic To Rec Min",
            ":period % Var. to Weighted Retail Rate",
            "Rec % Change",
          ],
        },
        notes: {
          sectionTitle: "Notes",
          textAreaMaxCharLength: 250,
          rows: 3,
          columns: 100,
        },
        accountDetailsFooter: {
          cancelButtonLabel: "Cancel",
          saveButtonLabel: "Save",
          saveAndCloseLabel: "Save and Close",
        },
      },
    },
    constant: {
      adminRole: "MFPADMIN",
      stringEmpty: "",
      stringSpace: " ",
      stringY: "Y",
      stringN: "N",
      stringA: "A",
      stringT: "T",
      stringU: "U",
      string1: "1",
      string2: "2",
      string3: "3",
      stringYes: "Yes",
      stringNo: "No",
      stringBt: "BT Account",
      stringNew: "New Account",
      stringTruncate: "...",
      stringNA: "NA",
      managedProperty: "M",
      booleanTrue: true,
      booleanFalse: false,
      select: "Select",
      input: "Input",
      roomClassLabel: "roomClass",
      roomClassAttr: "rpp_setup",
      tierLabel: "tier",
      tierAttr: "tier_price_tier",
      vatLabel: "vatRadio",
      yoyLabel: "yoyRadio",
      success: "success",
      periodPlaceHolder: ":period",
      prevPeriodPlaceHolder: ":prevperiod",
      prev2PeriodPlaceHolder: ":prev2period",
      prev3PeriodPlaceHolder: ":prev3period",
      percentPlaceHolder: ":percent",
      yoyTypeRNPlaceHolder: ":yoytypeRN",
      yoyTypeCurrPlaceHolder: ":yoytypeCurr",
      viewasPlaceHolder: ":viewas",
      lra: "LRA",
      nlra: "NLRA",
      statusA: "A",
      statusS: "S",
      statusL: "L",
      statusR: "R",
      enterKey: "Enter",
      arrowDelimiter: " -> ",
      newLine: "\n",
      percentSymbol: "%",
      dotSymbol: ".",
      astrickSymbol: "*",
      questionSymbol: "?",
      ampersandSymbol: "&",
      equalsSymbol: "=",
      underScoreSymbol: "_",
      dashSymbol: " - ",
      decimalSymbol: ".",
      enLocale: "en",
      dateFormat: "DD MMM YYYY",
      seasonDateFormat: "MMMM DD, YYYY",
      timestampFormat: "hh:mm a DD MMM YYYY",
      nights: "Nights",
      currency: "Currency",
      prev: "prev",
      pct: "pct",
      roomPoolGroup: "Room Pool Group",
      losTier: "LOS Tier",
      total: "Total",
    },
    compid: {
      historyViewAs: "historyView",
      common: {
        cancel: "cancel",
        close: "close",
        save: "save",
      },
      pricingSetup: {
        pricingSetupHeader: {
          stringLock: "lock",
        },
        generalInformation: {
          roomClassCheckboxDisabled: [true, false, false],
          roomClassCheckboxDisabledLocked: [true, true, true],
          tierPriceCheckboxDisabled: [true, false, false, false],
          tierPriceCheckboxDisabledLocked: [true, true, true, true],
        },
        retailRate: {
          prevYear: "prevYear",
          currYear: "currYear",
          seasonRate: "seasonRate",
          weightedTotal: "weightedTotal",
          yoyPerChange: "yoyPerChange",
          prevYearId: "prev_ret_rate",
          currYearId: "curr_ret_rate",
          prevYearWtdId: "wtd_prev_retail_rate",
          currYearWtdId: "wtd_retail_rate",
        },
        amenities: {
          amenitiesId: "amenities",
          breakfastInputId: "breakfast",
          internetInputId: "internet",
          transportInputId: "localTransport",
          parkingInputId: "parking",
          vatInputId: "vat",
          inputType: {
            breakfast: "breakfastInput",
            internet: "internetInput",
            transport: "localTransportInput",
            parking: "parkingInput",
          },
          selectType: {
            breakfast: "breakfastSelect",
            internet: "internetSelect",
            transport: "localTransportSelect",
            parking: "parkingSelect",
          },
        },
        thresholds: {
          thresholdsId: "thresholds",
          roomNights: "roomNights",
          retailRate: "retailRate",
          low: "low",
          high: "high",
          off: "off",
        },
        scBudgetInformation: {
          numberType: "number",
          roomNights: "rmNights",
          adr: "adr",
          revenue: "revenue",
        },
        pricingSetupFooter: {
          update: "update",
          updateClose: "updateClose",
        },
      },
      accountPricing: {
        headerMenu: {
          pricing: "pricing",
          history: "history",
        },
        accountsMenu: {
          accountType: "accountType",
        },
        accountPricingSettingsOptions: {
          setup: "setup",
          refreshRates: "refreshRates",
          historyReport: "historyReport",
        },
        accountHistoryDefinition: "Definition",
        accountPricingTableHeader: {
          bulkActions: {
            default: "default",
            statusRequested: "Requested",
            statusPending: "Pending",
            statusAccepted: "Accepted",
            statusDeclined: "Declined",
            statusRebid: "Rebid",
            hideAccounts: "hideAccounts",
            doNotPrice: "doNotPrice",
            moveAccounts: "moveAccounts",
            moveoutofprimary: "moveoutofprimary",
            movetoprimary: "movetoprimary",
            refreshRates: "refreshRates",
          },
          applyButton: "apply",
          accountSearch: "search",
          viewBy: "viewBy",
          yoy: "yoy",
          pagination: "pagination",
          paginationNext: "paginationNext",
          paginationLast: "paginationLast",
          paginationPrevious: "paginationPrevious",
          paginationFirst: "paginationFirst",
        },
        accountPricingTable: {
          accountName: "_name",
          accountSelected: "selected",
          accountDoNotPrice: "_donotprice",
          accountStatus: "_status",
          dataAmountCols: [
            "accountname",
            "donotprice",
            "lra",
            "fcst_rns",
            "fcst_rns_amt_chg",
            "weightedrate",
            "weightedrate_amt_chg",
            "weightedratenet",
            "weightedratenet_amt_chg",
            "pct_prevrate_rcmd_max",
            "rcmd_min_rate_net",
            "rcmd_max_rate_net",
            "pct_antc_rcmd_min",
            "pct_accrate_weighted_retail",
            "scpt_status",
          ],
          dataPercentCols: [
            "accountname",
            "donotprice",
            "lra",
            "fcst_rns",
            "fcst_rns_pct_chg",
            "weightedrate",
            "weightedrate_pct_chg",
            "weightedratenet",
            "weightedratenet_pct_chg",
            "pct_prevrate_rcmd_max",
            "rcmd_min_rate_net",
            "rcmd_max_rate_net",
            "pct_antc_rcmd_min",
            "pct_accrate_weighted_retail",
            "scpt_status",
          ],
          percentColIndex: [9, 12, 13],
          condPercentColIndex: [4, 6, 8],
          statusSave: { loadAttr: "scpt_status", saveAttr: "status" },
          doNotPriceSave: { loadAttr: "donotprice", saveAttr: "donotprice" },
        },
        accountHistoryTable: {
          dataAmountCols: [
            "accountname",
            "prevgrade",
            "prevyear_staypatterngrade",
            "prevyear_rn_sun:viewas",
            "prevyear_rn_mon:viewas",
            "prevyear_rn_tue:viewas",
            "prevyear_rn_wed:viewas",
            "prevyear_rn_thu:viewas",
            "prevyear_rn_fri:viewas",
            "prevyear_rn_sat:viewas",
            "prevyear_ytd_rn",
            "twoyearprev_ytd_rn",
            "yoy_ytd_change",
            "prevyear_acct_rate_net",
            "twoyearprev_acct_rate_net",
            "yoy_ytd_netchange",
          ],
          dataPercentCols: [
            "accountname",
            "prevgrade",
            "prevyear_staypatterngrade",
            "prevyear_rn_sun:viewas",
            "prevyear_rn_mon:viewas",
            "prevyear_rn_tue:viewas",
            "prevyear_rn_wed:viewas",
            "prevyear_rn_thu:viewas",
            "prevyear_rn_fri:viewas",
            "prevyear_rn_sat:viewas",
            "prevyear_ytd_rn",
            "twoyearprev_ytd_rn",
            "yoy_ytd_change_pct",
            "prevyear_acct_rate_net",
            "twoyearprev_acct_rate_net",
            "yoy_ytd_netchange_pct",
          ],
          condPercentColIndex: [12, 15],
        },
        modal: {
          addAccount: "addAccount",
          hiddenAccounts: "hiddenAccounts",
          historyDefinitions: "historyDefinitions",
          addAccountModal: {
            addAccountType: "addAccountType",
            previousChoices: "previousChoices",
            moreChoices: "moreChoices",
            fcrn: "fcrn",
            fcadr: "fcadr",
            accountid: "accountid",
            accountname: "accountname",
            accountsegment: "accountsegment",
            btaccounts: "btaccounts",
            btAccountTooltip: "btAccountTooltip",
          },
        },
        buttons: {
          okButton: "ok",
          addAccountButton: "addAccount",
          unhideButton: "unhide",
          closeHiddenAccounts: "closeHidden",
        },
      },
      accountDetails: {
        accountDetailsHeader: {
          searchId: "Account Details",
        },
        history: "history",
        generalInfo: { donotprice: "donotprice", status: "status", lra: "lra" },
        roomNights: { year: "year", prevYear: "prevYear" },
        seasons: {
          rnPct: "rnPct",
          prevYearRate: "prevYearRate",
          yearOpenRate: "yearOpenRate",
          yearTargetRate: "yearTargetRate",
          yearFloorRate: "yearFloorRate",
          prevyear_fcst_rns: "prevyear_fcst_rns",
          fcst_rns: "fcst_rns",
          pct_annual_rn: "pct_annual_rn",
          prevyear_rate_gross: "prevyear_rate_gross",
          open_rate_gross: "open_rate_gross",
          target_rate_gross: "target_rate_gross",
          floor_rate_gross: "floor_rate_gross",
          prev_year_marrfp_rate: "prev_year_marrfp_rate",
          pct_antc_gross_chg: "pct_antc_gross_chg",
          accountType: "accountType",
        },
        amenities: {
          inputType: {
            vat: "vat",
            totalFixedCost: "fixedCost",
          },
          selectType: {
            breakfast: "breakfast",
            internet: "internet",
            transport: "transport",
            parking: "parking",
          },
        },
        rates: { prevYearNetRate: "prevYearNetRate" },
        notes: "notes",
        accountDetailsFooter: {
          saveClose: "saveClose",
        },
        yoyRateType: {
          open: "yearOpenRate",
          target: "yearTargetRate",
          floor: "yearFloorRate",
        },
      },
    },
  },
  pageName: "/pricinghotelselect/SCPT",
  popupParms:
    "height=200,width=500,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes",
};

export default Settings;

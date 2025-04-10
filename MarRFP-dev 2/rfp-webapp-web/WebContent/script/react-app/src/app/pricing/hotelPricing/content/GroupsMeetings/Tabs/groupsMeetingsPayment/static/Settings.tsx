const Settings = {
  api: {
    urlencode: "application/x-www-form-urlencoded",
    grpmtgpay: "/hotelgrpmtgpay/getHotelGrpMtgPaymentTab",
    hotelgrpmtgpay: "/hotelgrpmtgpay/updateGrpMtgPay",
  },
  instructions: {
    header_payment: "Payment",
    require_advance_deposit:
      "Will hotel require an advance deposit from client?",
    allow_direct_billing:
      "Will hotel allow direct billing for groups and meetings? ",
    accept_corporate_meeting_card: "Will hotel accept corporate ",
    meeting_card: "Meeting Card",
    credit_card_msg: " credit card payments for groups and meetings? ",
    payment_term_one: " If ",
    payment_term_two: "yes",
    payment_term_three:
      ", what are the hotel's payment terms, or how soon does hotel expect payment?",
    payment_term_four: " Days",
    funds_on_credit_one: ", will funds be ",
    funds_on_credit_two: "held",
    funds_on_credit_three: " on the credit card?",
  },
  alerts: {
    payment_error: "Error when saving Groups and Meetings Payment!",
  },
  groupPayment: {
    grpMtgPayChg: {
      id: "hotelGroupsMeeting.grpMtgPayChg",
      name: "hotelGroupsMeeting.grpMtgPayChg",
      value: "N",
    },
    payment_terms: {
      id: "hotelGroupsMeeting.payment_terms",
      name: "hotelGroupsMeeting.payment_terms",
    },
    filter: {
      advanceDepositOption: {
        id: "advanceDepositOption",
        keyField: "groupPayTypeYN",
        valField: "value",
      },
      directBillingOption: {
        id: "directBillingOption",
        keyField: "groupPayTypeYN",
        valField: "value",
      },
      corporateCardOption: {
        id: "corporateCardOption",
        keyField: "groupPayTypeYN",
        valField: "value",
      },
      fundsdHeldOption: {
        id: "fundsdHeldOption",
        keyField: "groupPayTypeYN",
        valField: "value",
      },
      groupPaymentOptions: [
        {
          groupPayTypeYN: "",
          value: "",
        },
        {
          groupPayTypeYN: "Y",
          value: "Yes",
        },
        {
          groupPayTypeYN: "N",
          value: "No",
        },
      ],
    },
  },
};

export default Settings;

import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";
import API from "../service/API";
import Settings from "../static/settings";
import UserAPI, { IUser } from "../../../common/services/GetUser";

const TermsAndConditionsContext = React.createContext({});

export const TermsAndConditionsProvider = (props) => {
  const history = useHistory();
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [state, setState] = useState({
    Title: {
      logo: "MarRFP Application",
      termsAndConditionsTitle: "Marriott's MarRFP User Terms and Conditions",
      mainMessage:
        'Marriott requires all users of Marriott\'s MarRFP application ("MarRFP") to appropriately use and protect MarRFP and all content. To that end, before you will be provided with access to MarRFP, we require that you carefully read and agree to abide by these user terms and conditions described below. If you cannot agree to the terms and conditions below, you will not be granted access to MarRFP and should send an e-mail describing your concerns to',
      emailID1: "PAS@marriott.com",
      warningMessage:
        'By clicking on the "I Accept" button below, you hereby accept and agree on behalf of yourself and, if you are being given access as a third party representative, on behalf of such third party, to be bound by the following terms and conditions:',
      marRFPDefinition: '1. "MarRFP" Definition.',
      marRFPDefinitionContent:
        'For purposes of these terms and conditions, the term "MarRFP" refers to the web-based application known as "MarRFP" and all of the content, information, applications, data, images and other materials accessible through that web-based application.',
      confidentialityAndPropertyRights:
        "2. Confidentiality and Proprietary Rights.",
      confidentialityAndPropertyRightsContent:
        'MarRFP is confidential and proprietary to Marriott International, Inc. and its affiliates ("Marriott"), and is protected by international and United States copyright law. Its contents may not be reproduced, disclosed, distributed, displayed, modified or used without the express prior written consent of Marriott. You may not disclose your password, or any other means of access, to MarRFP to any other individual or entity without the express prior written consent of Marriott. No proprietary rights are granted to any individual or entity by virtue of access to MarRFP, including copyright, patent or trademark rights.',
      authorizedAccess: "3. Authorized Access.",
      authorizedAccessContent:
        'Access to and use of MarRFP is permitted only for current associates of Marriott and other parties expressly granted authorization by Marriott who (a) have a need to access MarRFP in the course of performing assigned sales and relationship management services for Marriott, and (b) agree to abide by these Terms and Conditions. Access to or use of MarRFP by any other persons is strictly prohibited without the express prior written consent of Marriott. Access to and use of MarRFP may be revoked or restricted at any time at the sole discretion of Marriott. Individuals and/or entities may have varying degrees of access to MarRFP, as determined by Marriott. Your access and use of MarRFP may be monitored by Marriott at any time, with or without notice, and shall not in any way be deemed to be private or personal to you. By clicking "I Accept" below, you hereby represent and warrant that you are authorized to access MarRFP as set forth in this paragraph.',
      purposeOfAccessAndInterference: "4. Purpose of Access and Interference.",
      purposeOfAccessAndInterferenceContent:
        "MarRFP may only be used for the benefit of Marriott and Marriott branded hotels and may not be used for the benefit of any third party or individual without the express prior written consent of Marriott. You are prohibited to use or to attempt to use MarRFP to access applications or information to which you do not have authorization, or to circumvent or attempt to circumvent any security mechanisms employed by Marriott to control access. You agree that you will not use any robot, spider, other automatic device, or manual process to monitor or copy our web pages or the content contained herein without Marriott's prior express written consent. In addition, you agree that you will not take any action that imposes any unreasonable or disproportionately large load on our infrastructure. Any unauthorized access or use of MarRFP shall be subject to appropriate disciplinary or legal actions.",
      disclaimers: "5. Disclaimers.",
      disclaimersContent:
        'MarRFP is made available to you "as is" without warranty of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. MarRFP may contain technical inaccuracies or typographical errors. Marriott reserves the right to make changes, corrections, and/or improvements at any time without notice or liability. In no event will Marriott be liable for any direct, indirect, consequential, incidental, punitive or other damages, losses, costs or expenses relating to use of MarRFP, whether arising in tort or contract, including but not limited to lost profits, even if advised of the possibility of such damages.',
      protectionOfExistingAgreements: "6. Protection of Existing Agreements.",
      protectionOfExistingAgreementsContent:
        "Except as set forth in these terms and conditions, neither your access to MarRFP nor your use of its content shall be construed to establish any new contractual or other commitment of any kind on behalf of Marriott, or to alter or amend any existing contractual or other commitment that exists between your company and Marriott or a Marriott affiliate.",
      trademarks: "7. Trademarks.",
      trademarksContent:
        "Marriott, MarRFP, and the other trade names, trademarks, and service marks of Marriott are the exclusive property of Marriott, and no use thereof is permitted without Marriott's express prior written consent.",
      bTBookingCost: "8. BT Booking Cost",
      bTBookingCostContent1:
        "Hotels that DO NOT participate in Marriott’s US Account Sales Organization may be charged a BT Booking Cost. While there is no additional charge for utilizing MarRFP, hotels that opt to be included in Marriott’s centralized BT pricing effort for Mid-Market and Prospect accounts may incur a BT Booking Cost fee from the US Account Sales Organization. The",
      bTBookingCostContent2:
        "  symbol can be used to identify which MarRFP accounts are eligible for the BT Booking Cost. For the comprehensive program details, including billing criteria, access MGS and search for BT Booking Cost.",
      disputes: "9. Disputes.",
      disputesContent1:
        "These terms and conditions will be interpreted in accordance with the laws of the state of Maryland, without regard to its conflicts of laws principles. You hereby consent to the exclusive jurisdiction of state and federal courts located in Maryland. You agree that your breach of these terms and conditions will result in irreparable harm to Marriott, and that Marriott is therefore entitled, as a non-exclusive remedy, to obtain injunctive relief in response to a breach of this agreement.",
      disputesContent2:
        "If you become aware of any instance of unauthorized access to MarRFP, or any content, or the misuse of this resource, you should notify the Marriott Business Integrity line at 888-888-9188 to report the incident anonymously. You may also report any such instances via e-mail to",
      emailID2: "privacy@marriott.com",
      dot: ".",
      copyrightInfo:
        "Copyright © {new Date().getFullYear()} Marriott International. MARRIOTT CONFIDENTIAL AND PROPRIETARY INFORMATION",
      btnAccept: "I ACCEPT",
      btnReject: "I DO NOT ACCEPT",
    },
    data: {
      TERMS_EMAIL: "",
    },
  });

  const getAcceptTermsData = () => {
    API.getAcceptTermsInfo().then((data) => {     
        UserAPI.getUser().then((response) => {
          appContext.setUser(response as IUser);
          sessionStorage.setItem("GETUSERDETAILS", JSON.stringify(response));
        });
      
      if (appContext.user.role == "MFPADMIN") {
        history.push({
          pathname: Settings.path.updatecontactinfo,
        });
      } else if (
        appContext.user.role == "MFPFSALE" ||
        appContext.user.role == "MFPSALES" ||
        appContext.user.role == "MFPUSER"
      ) {
        history.push({
          pathname: Settings.path.salesupdatecontactinfo,
        });
      } else {
        history.push({
          pathname: Settings.path.home,
        });
      }
    });
  };

  const setAcceptTermsData = (data: any) => {
    if (data) {
      let Title = { ...state.Title };
      Title = data;

      setState({
        ...state,
        Title: Title,
      });
    }
  };

  const getTerms = () => {
    API.getTerms().then((data) => {
      setData(data);
    });
  };

  const setData = (termsData: any) => {
    if (termsData) {
      setState((prevState) => ({
        ...prevState,
        data: {
          ...prevState.data,
          TERMS_EMAIL: termsData.TERMS_EMAIL,
        },
      }));
    }
  };

  const termsAndConditionsContext = {
    state,
    setState,
    setAcceptTermsData,
    getAcceptTermsData,
    getTerms,
    setData,
  };

  return (
    <TermsAndConditionsContext.Provider value={termsAndConditionsContext}>
      {props.children}
    </TermsAndConditionsContext.Provider>
  );
};

export const TermsAndConditionsContextConsumer =
  TermsAndConditionsContext.Consumer;
export default TermsAndConditionsContext;

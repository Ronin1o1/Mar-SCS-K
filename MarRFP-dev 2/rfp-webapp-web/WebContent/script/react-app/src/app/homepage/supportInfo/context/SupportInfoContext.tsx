import React, { useState } from "react";
import API from "../service/API";

const SupportInfoContext = React.createContext({});

export const SupportInfoContextProvider = (props) => {
  const [state, setState] = useState({
    supportInfoData: {      
        "CONTACT_NAME": "",
        "CONTACT_PHONE_RD": "",
        "CONTACT_EMAIL_FRD": "",
        "CONTACT_NAME_SCPT": "",
        "SAPP_EMAIL": "",
        "CONTACT_PHONE": "",
        "CONTACT_SCPT_EMAIL": "",

        "CONTACT_PHONE_FRD": "",
        "CONTACT_PHONE_FRD1":"",
        "CONTACT_PHONE_FRD2":"",
        "CONTACT_PHONE_FRD3":"",
        "CONTACT_PHONE_FRD4":"",
        "CONTACT_PHONE_FRD5":"",
        "CONTACT_PHONE_FRD6":"",
    
    
        "CONTACT_NAME_FRD": "",
        "WS_CONTACT_EMAIL": "",
        "CONTACT_EMAIL": "",
        "CONTACT_LNAME": "",
        "CONTACT_NAME_RD": "",
        "CONTACT_EMAIL_RD": ""
    
    },
   
  });

  const getSupportInfoData = () =>{
    API.getSupportInfo().then((data) => {         
      setSupportInfoData(data);
    });
  }

  const setSupportInfoData = (data: any) => {
    if (data) {
      let supportInfoData = { ...state.supportInfoData };
      supportInfoData = data;
      var splitData = data.CONTACT_PHONE_FRD.split('<br>');
      supportInfoData.CONTACT_PHONE_FRD1 = splitData[0];
      supportInfoData.CONTACT_PHONE_FRD2 = splitData[1];
      supportInfoData.CONTACT_PHONE_FRD3 = splitData[3];
      supportInfoData.CONTACT_PHONE_FRD4 = splitData[4];
      supportInfoData.CONTACT_PHONE_FRD5 = splitData[6];
      supportInfoData.CONTACT_PHONE_FRD6 = splitData[7];
      console.log(splitData);
      setState({
        ...state,
        supportInfoData: supportInfoData,
      });
    }
  };



  const supportInfoContext = {
    state,
    setState,
    setSupportInfoData,
    getSupportInfoData,
  };

  return (
    <SupportInfoContext.Provider value={supportInfoContext}>
      {props.children}
    </SupportInfoContext.Provider>
  );
};

export const SupportInfoContextConsumer = SupportInfoContext.Consumer;
export default SupportInfoContext;

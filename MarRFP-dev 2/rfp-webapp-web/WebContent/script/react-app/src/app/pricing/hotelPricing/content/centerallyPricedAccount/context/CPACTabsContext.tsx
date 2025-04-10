import React, { useState } from "react";

const CenterallyPricedAccountContext = React.createContext({});
export const CenterallyPricedContextProvider = (props) => {
    const [state, setState] = useState({
        data: {},
        showAccountLegend: false,
        showAccountOverview: false,
        showFinalSubmission: false,
        showRateType: false,
        showMyAccount: false,
        showYellowTringles: false,
        showAnticipatedAccount: false,
        showAnticipatedoffCycle: false,
        getOffCyleAccountDetails: '',
        showTableLoader:false,
        showAccountLoader:false,
        hotelData:{},
        anticipatedListData: {
            anticipatedList: [
                {
                   
                },
            ],
        },
        accountOffData:{
            accountList:[
                {
                   
                }
            ]
        },
        gridData : {
            list: [
              {       
                id: null,
                  hotelRateEntityId: 1,
                  rateOfferRateEntityId: null,
                  rateProgram: "REGA",
                  roomPool: "KING",
                  markedForDeletion: false,
             
            }
          ]
        }
    });


    const showAccountLegend = (data) => {
        setState({
            ...state,
            showAccountLegend: !state.showAccountLegend,
        });
    }
    const showAccountOverview = (data) => {
        setState({
            ...state,
            showAccountOverview: !state.showAccountOverview,
        });

    }
    const showFinalSubmission = () => {
        setState({
            ...state,
            showFinalSubmission: !state.showFinalSubmission,
        })
    }
    const showRateType = () => {
        setState({
            ...state,
            showRateType: !state.showRateType,
        })
    }
    const showMyAccount = () => {
        setState({
            ...state,
            showMyAccount: !state.showMyAccount,
        })
    }
    const showYellowTringles = () => {
        setState({
            ...state,
            showYellowTringles: !state.showYellowTringles,
        })
    }
    const showAnticipatedAccount = () => {
        setState({
            ...state,
          
            showAnticipatedAccount: !state.showAnticipatedAccount,
        })
    }
    const showAnticipatedoffCycle = (msg: any) => {
        setState({
            ...state,
            showAnticipatedoffCycle: !state.showAnticipatedoffCycle,
        });
    };

    const setAntipatedAcountList = (data: any) => {
      
        if (data) {
            const anticipatedListData = { ...state.anticipatedListData };
            anticipatedListData.anticipatedList = data; 
            setState({
                ...state,                
                anticipatedListData: anticipatedListData,
            });
        }
    };
    const setAccountOffList = (data: any) => {
        if (data) {
            const accountOffData = { ...state.accountOffData };
            accountOffData.accountList = data;
            setState({
                ...state,
                accountOffData: accountOffData,
            });
        }
    };
   
  
    const centerallyPricedContext = {
        state,
        setState,
        setAntipatedAcountList,
        setAccountOffList,
        showAccountLegend,
        showAccountOverview,
        showFinalSubmission,
        showRateType,
        showYellowTringles,
        showAnticipatedAccount,
        showAnticipatedoffCycle,
        showMyAccount,
       
       

    };

    return (
        <CenterallyPricedAccountContext.Provider value={centerallyPricedContext}>
            {props.children}
        </CenterallyPricedAccountContext.Provider>
    );
};
export const CenterallyPricedAccountConsumer = CenterallyPricedAccountContext.Consumer;
export default CenterallyPricedAccountContext;

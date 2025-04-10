import React,{Component} from 'react'
import CenterallyPricedAccount, {
    CenterallyPricedContextProvider,
} from "../../context/CPACTabsContext";
import yellowStar from "../../../../../../common/assets/img/aerlevel1.gif";
import redStar from "../../../../../../common/assets/img/aer.gif";
import Settings from '../../static/Settings';

interface IProps { }
interface IState { }


export default class DemoApp extends Component<IProps, IState> {
    render() {
        return (
            <CenterallyPricedContextProvider>
                <CenterallyPricedAccount.Consumer>
                    {(CenterallyPricedAccount) => {                      
                        return (
                            <div >
                            <div style={{ width: '570px', padding: "9px 12px" }}>
                              
                                <div>
                                    <div style={{ fontWeight: 'bold' }} className="Field_Value">
                                       {Settings.searchResult.cpacTabsContent.rateTypes.str1}
                                    </div><br></br>
                                    <div>
                                        <b> {Settings.searchResult.cpacTabsContent.rateTypes.str2}</b>  
                                        {Settings.searchResult.cpacTabsContent.rateTypes.str3}
                                    </div><br></br>
                                    <div>
                                        <b>  {Settings.searchResult.cpacTabsContent.rateTypes.str4} </b> 
                                        {Settings.searchResult.cpacTabsContent.rateTypes.str5}
                                        <img src={yellowStar} ></img>
                                        {Settings.searchResult.cpacTabsContent.rateTypes.str51}
                                        <img src={redStar} ></img>
                                        {Settings.searchResult.cpacTabsContent.rateTypes.str52}
                                    </div><br></br>
                                    <div>
                                        <b> {Settings.searchResult.cpacTabsContent.rateTypes.str6} </b> 
                                        {Settings.searchResult.cpacTabsContent.rateTypes.str7}
                                     </div>
                                </div><br></br>
                                <div>
                                    <b>  {Settings.searchResult.cpacTabsContent.rateTypes.str8}</b>  
                                    {Settings.searchResult.cpacTabsContent.rateTypes.str9}
                                </div><br></br>
                                <div>

                                    <b> {Settings.searchResult.cpacTabsContent.rateTypes.str10}</b> 
                                    {Settings.searchResult.cpacTabsContent.rateTypes.str11} <u> 
                                        {Settings.searchResult.cpacTabsContent.rateTypes.str12}</u>
                                </div><br></br>

                                <div>
                                    <b> {Settings.searchResult.cpacTabsContent.rateTypes.str13}</b>  
                                    {Settings.searchResult.cpacTabsContent.rateTypes.str14}
                                </div><br></br>
                            </div>
                           
                        </div>
                             )
                    }}
                </CenterallyPricedAccount.Consumer>
            </CenterallyPricedContextProvider>
        )
    }
      
}
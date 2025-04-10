import React, { Component, Suspense } from "react";
import  {Link} from "react-router-dom";
import EdieHotelProfileListContext, {EdieHotelProfileListContextProvider } from "../context/EdieHotelProfileListContext";
import Interceptors from "../../../../common/components/Interceptors";
import CSuspense from "../../../../common/components/CSuspense";

import styles from "./EdieHotelProfileAdd.css";
import SaveBtnImg from "../../../../common/assets/img/btnSave.gif";
import Settings from "../static/Settings";
import Utils from "../../../../common/utils/Utils";
//import EdieHotelProfileList from "./EdieHotelProfileList";

let contextType = null;
export default class EdieHotelProfileAdd extends Component {
  
  constructor(props) {
    super(props);  
    
  } 
   
  
  render() {   
         
    return (
            <EdieHotelProfileListContextProvider>
        <EdieHotelProfileListContext.Consumer>
          {(edieHotelProfileListContext) => {
            contextType = edieHotelProfileListContext;
            return (  
              <React.Fragment>
                <div>
                  <Suspense fallback={<CSuspense />}>
                    <Interceptors spinnerFlag={true} />
                      <table className={styles.edieHotelProfileListOuterTable} >
                        <tbody>
                          <tr>
                            <td>
                                <table className={styles.edieHotelProfileListOuterTableHeader } >
                                  <tbody>
                                    <tr>
                                      <td className={styles.header}>
                                        { Settings.addProfile.pageTitle}                                    
                                    </td>
                                  </tr>
                                  <tr className={styles.BGDarkBlueStyle}>
                                    <td></td>
                                  </tr>
                                    <tr>
                                      <td>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                            </td>
                          </tr>

                          <tr className={ styles.topAlign}>
                            <td/>
                          </tr>
                          <tr>
                            <td>
                              
                                <table className="zero-Height">
                                  <tbody>
                                    <tr>
                                  <td >
                                    <span  className={styles.field_Name}>Profile Name:</span>
                                    
                                           <input
                                            id={Settings.addProfile.formField.profile_id}
                                            maxLength={100}
                                            size={56}
                                            onKeyPress={Utils.IsAlphaNumeric}
                                            style={{ width: "397px", height:"22px" }}
                                            onChange={contextType.onAddProfileChange}
                                            value={contextType.state.addProfile.profile_name}
                                          />                              
                                      </td>
                                      <td style={{ width: "15px"}}>
                                      </td>
                                      <td>  
                                      
                                        <Link
                                              to={{
                                                
                                              }}
                                            >
                                          <img text-align="middle" alt="Save Profile"
                                            onClick={contextType.addProfile}
                                            src={SaveBtnImg} className={styles.saveBtn} />
                                        </Link>

                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                                             
                            </td>
                          </tr>                            
                        </tbody>
                      </table>
                    
                  </Suspense>
                </div>
              </React.Fragment>
            )
          }
          }
        </EdieHotelProfileListContext.Consumer>
      </EdieHotelProfileListContextProvider>

    );

  }
}


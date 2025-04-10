import React from 'react';
import Settings from '../static/Settings';

const RoomUtills = {
    setQueryParam: (name) => {
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(window.location.href);
        return results && results[2] ? decodeURI(results[2]) : '';
    },
    dataReqBody: (dataList, copyData) => {
        let req = {}, pos = -1, key = '';

        dataList && dataList.map((element, index) => {
            element.displayElement && element.displayElement.map((dispElem, i) => {
                    pos += 1;
                    key = pos + '';
                    if(dispElem.calloutInd){
                        req[key] = dispElem;
                    } else {
                        dispElem.calloutInd = '';
                        req[key] = dispElem;
                    }
            })
        })
        return req;
    },
    dataChange: (dataList, copyData) => {
        let req = false;        
        dataList && dataList.map((element, index) => {
            element.displayElement && element.displayElement.map((dispElem, i) => {
                    if ( dispElem.displayText && dispElem.displayText.trim()) {
                        req = true;
                    }
            })
        })
        return req;
    },
    amenityReqCommon: (entryData, copyEntryData, header, subHeader, pos) => {
        let key = '', req = {};
        entryData && entryData[header].map((item, i) => {
            item[subHeader].map((subType, j) => {

                pos += 1;
                key = pos + '';
                req[key] = subType;
            })
        })
        return req;
    },
    amenityReqBody: (entryData, copyEntryData) => {
        let req = {}, pos = -1;
        req['strTheBrand'] = RoomUtills.amenityReqCommon(entryData, copyEntryData, 'brands', 'brand', pos);
        req['strTheUOM'] = RoomUtills.amenityReqCommon(entryData, copyEntryData, 'unitsOfMeasure', 'unitOfMeasure', pos);
        req['strTheFormat'] = RoomUtills.amenityReqCommon(entryData, copyEntryData, 'formats', 'format', pos);

        return req;
    },
    checkAmenityDataChange: (entryData, copyEntryData) =>{
        let req = false, pos = -1;
        req = RoomUtills.checkAmenityReqCommon(entryData, copyEntryData, 'brands', 'brand', pos);
        if(!req){
            req = RoomUtills.checkAmenityReqCommon(entryData, copyEntryData, 'unitsOfMeasure', 'unitOfMeasure', pos);
        }
        if(!req) {
            req = RoomUtills.checkAmenityReqCommon(entryData, copyEntryData, 'formats', 'format', pos);
        }        

        return req;
    },
    checkAmenityReqCommon: (entryData, copyEntryData, header, subHeader, pos) => {
        let req = false;
        entryData && entryData[header].map((item, i) => {
            item[subHeader].map((subType, j) => {
                if(subType.value && subType.value.trim()) {
                   req = true;
                }
            })
        })
        return req;
    },
    header: (styles, headerName) => {
        return (
            <React.Fragment>
            <table className={styles.section}>
                <tbody>
                    <tr>
                        <td className={styles.header}>{Settings.customeText.headerText} {headerName}</td>
                    </tr>                    
                </tbody>                
            </table>
            <hr className={styles.headerHR}/>
            </React.Fragment>
        )
    }
}

export default RoomUtills;

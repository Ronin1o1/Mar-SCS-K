/**
 * GetHotelAmenityListsInfoPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.productdisplayrules;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesNotifRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesRS;

public interface SetHotelRoomProductDisplayRulesNotifPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRoomProductDisplayRulesNotifRS MI_HotelRoomProductDisplayRulesNotifRQ(MI_HotelRoomProductDisplayRulesNotifRQ MI_HotelRoomProductDisplayRulesNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;


	public MI_HotelRoomProductDisplayRulesNotifRS UpdateDisplayRules( MI_HotelRoomProductDisplayRulesRS roomproductInfo, String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}

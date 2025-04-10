/**
 * GetHotelAmenityListsInfoPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.productdisplaytext;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextNotifRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextRS;

public interface SetHotelRoomProductDisplayTextNotifPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRoomProductDisplayTextNotifRS MI_HotelRoomProductDisplayTextNotifRQ(MI_HotelRoomProductDisplayTextNotifRQ MI_HotelRoomProductDisplayTextNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;


	public MI_HotelRoomProductDisplayTextNotifRS UpdateDisplayText( MI_HotelRoomProductDisplayTextRS roomproductInfo, String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}

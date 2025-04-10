/**
 * GetHotelAmenityListsInfoPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.roomproductinfo;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoNotifRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoRS;

public interface SetHotelRoomProductInfoNotifPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRoomProductInfoNotifRS MI_HotelRoomProductInfoNotifRQ(MI_HotelRoomProductInfoNotifRQ MI_HotelRoomProductInfoNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_HotelRoomProductInfoNotifRS RemoveRateLevel(String marshacode, String roompool, String rateprogram, String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_HotelRoomProductInfoNotifRS UpdateRoomProduct(String marshacode, String roompool, String rateprogram,  MI_HotelRoomProductInfoRS roomproductInfo, String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}

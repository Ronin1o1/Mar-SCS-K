/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.roomproductinfo;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoRS;

public interface GetHotelRoomProductInfoPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRoomProductInfoRS MI_HotelRoomProductInfoRQ(MI_HotelRoomProductInfoRQ MI_HotelRoomProductInfoRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_HotelRoomProductInfoRS GetRoomProductList(String marshacode, String roompool,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_HotelRoomProductInfoRS GetRoomProduct(String marshacode, String roompool,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}

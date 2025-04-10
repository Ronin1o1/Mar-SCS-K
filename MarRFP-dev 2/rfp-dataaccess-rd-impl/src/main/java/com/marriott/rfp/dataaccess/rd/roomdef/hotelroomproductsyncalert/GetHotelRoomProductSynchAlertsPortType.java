/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.hotelroomproductsyncalert;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductSynchAlertsRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductSynchAlertsRS;

public interface GetHotelRoomProductSynchAlertsPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRoomProductSynchAlertsRS MI_HotelRoomProductSynchAlertsRQ(MI_HotelRoomProductSynchAlertsRQ MI_HotelRoomProductSynchAlertsRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_HotelRoomProductSynchAlertsRS MI_HotelRoomProductSynchAlertsRQ(String marshacode, String roompool,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}

/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.hotelinvcount.inventorycount;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.hotelinvcount.OTA_HotelInvCountRQ;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.OTA_HotelInvCountRS;

public interface GetHotelInvCountPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public OTA_HotelInvCountRS OTA_HotelInvCountRQ(OTA_HotelInvCountRQ OTA_HotelInvCountRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public OTA_HotelInvCountRS OTA_HotelInvCountRQ(String marshacode, String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}

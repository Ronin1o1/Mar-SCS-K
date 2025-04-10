/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.hoteldefinitionlist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionListRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionListRS;

public interface GetHotelRoomTypeNameDefinitionListPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRoomTypeNameDefinitionListRS MI_HotelRoomTypeNameDefinitionListRQ(MI_HotelRoomTypeNameDefinitionListRQ MI_HotelRoomTypeNameDefinitionListRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_HotelRoomTypeNameDefinitionListRS MI_HotelRoomTypeNameDefinitionListRQ(String marshacode,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}

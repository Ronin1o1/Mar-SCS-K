/**
 * GetHotelAmenityListsInfoPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.hotelamenitylistsinfo;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelAmenityListsInfoRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelAmenityListsInfoRS;

public interface GetHotelAmenityListsInfoPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelAmenityListsInfoRS MI_HotelAmenityListsRQ(MI_HotelAmenityListsInfoRQ MI_HotelAmenityListsRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_HotelAmenityListsInfoRS MI_HotelAmenityListsRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}

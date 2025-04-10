/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.rateproduct.hotelbrands;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_HotelBrandsRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_HotelBrandsRS;

public interface GetHotelBrandsPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelBrandsRS MI_HotelBrandsRQ(MI_HotelBrandsRQ MI_HotelBrandsRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_HotelBrandsRS MI_HotelBrandsRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_HotelBrandsRS MI_HotelBrandsRQ(String marshaCode,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}

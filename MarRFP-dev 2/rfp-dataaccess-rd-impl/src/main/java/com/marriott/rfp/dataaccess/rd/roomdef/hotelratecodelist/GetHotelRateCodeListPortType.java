/**
 * GetHotelRateCodeListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.hotelratecodelist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRateCodeListRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRateCodeListRS;

public interface GetHotelRateCodeListPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRateCodeListRS MI_HotelRateCodeListRQ(MI_HotelRateCodeListRQ MI_HotelRateCodeListRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
    
	public MI_HotelRateCodeListRS MI_HotelRateCodeListRQ(String marshacode, String rateProgram,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}

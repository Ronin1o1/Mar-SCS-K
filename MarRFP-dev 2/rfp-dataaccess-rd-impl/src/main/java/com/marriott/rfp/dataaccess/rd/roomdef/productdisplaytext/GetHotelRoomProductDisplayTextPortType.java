/**
 * GetHotelRateCodeListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.productdisplaytext;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextRS;

public interface GetHotelRoomProductDisplayTextPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRoomProductDisplayTextRS MI_HotelRoomProductDisplayTextRQ(MI_HotelRoomProductDisplayTextRQ MI_HotelRoomProductDisplayTextRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
    
	public MI_HotelRoomProductDisplayTextRS MI_HotelRoomProductDisplayTextRQ(Channel channel, String langId,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}

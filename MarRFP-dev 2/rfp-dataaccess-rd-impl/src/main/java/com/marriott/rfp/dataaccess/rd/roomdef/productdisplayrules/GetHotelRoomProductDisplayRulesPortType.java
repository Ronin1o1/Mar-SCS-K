/**
 * GetHotelRateCodeListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.productdisplayrules;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesRS;

public interface GetHotelRoomProductDisplayRulesPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRoomProductDisplayRulesRS MI_HotelRoomProductDisplayRulesRQ(MI_HotelRoomProductDisplayRulesRQ MI_HotelRoomProductDisplayRulesRQ, String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
    
	public MI_HotelRoomProductDisplayRulesRS MI_HotelRoomProductDisplayRulesRQ(Channel channel, Entry entry, String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}

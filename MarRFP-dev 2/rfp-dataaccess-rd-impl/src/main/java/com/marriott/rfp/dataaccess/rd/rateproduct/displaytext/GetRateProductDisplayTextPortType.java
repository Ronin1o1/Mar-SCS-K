/**
 * GetHotelRateCodeListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.rateproduct.displaytext;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDisplayTextRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDisplayTextRS;

public interface GetRateProductDisplayTextPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_RateProductDisplayTextRS MI_RateProductDisplayTextRQ(MI_RateProductDisplayTextRQ MI_RateProductDisplayTextRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
    
	public MI_RateProductDisplayTextRS MI_RateProductDisplayTextRQ(Channel channel, String langId,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}

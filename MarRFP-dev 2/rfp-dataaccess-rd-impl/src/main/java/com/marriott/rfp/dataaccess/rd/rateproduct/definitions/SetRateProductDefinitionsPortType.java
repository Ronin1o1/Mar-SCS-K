/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.rateproduct.definitions;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.RateProductDefinitions;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsNotifRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsNotifRS;

public interface SetRateProductDefinitionsPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_RateProductDefinitionsNotifRS MI_RateProductDefinitionsNotifRQ(MI_RateProductDefinitionsNotifRQ MI_RateProductDefinitionsNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_RateProductDefinitionsNotifRS MI_RateProductDefinitionsNotifRQ( String marshacode, String brandcode,RateProductDefinitions roomtypenameinfo,
            String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}

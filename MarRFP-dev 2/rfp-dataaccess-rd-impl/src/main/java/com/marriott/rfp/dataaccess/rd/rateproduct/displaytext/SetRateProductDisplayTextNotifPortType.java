/**
 * GetHotelAmenityListsInfoPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.rateproduct.displaytext;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDisplayTextNotifRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDisplayTextNotifRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDisplayTextRS;

public interface SetRateProductDisplayTextNotifPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_RateProductDisplayTextNotifRS MI_RateProductDisplayTextNotifRQ(MI_RateProductDisplayTextNotifRQ MI_RateProductDisplayTextNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;


	public MI_RateProductDisplayTextNotifRS UpdateDisplayText( MI_RateProductDisplayTextRS roomproductInfo, String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}

/**
 * GetDisplayRatePlanDescriptionPortType.java
 *
 *
 */

package com.marriott.rfp.dataaccess.rd.rateproduct.displayrateplandescription;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_DisplayRatePlanDescriptionRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_DisplayRatePlanDescriptionRS;

public interface GetDisplayRatePlanDescriptionPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_DisplayRatePlanDescriptionRS MI_DisplayRatePlanDescriptionRQ(MI_DisplayRatePlanDescriptionRQ MI_DisplayRatePlanDescriptionRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_DisplayRatePlanDescriptionRS MI_DisplayRatePlanDescriptionRQ(String marshacode, String requsterID, Channel channel, String langId, Entry entry, String rateProgram,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}
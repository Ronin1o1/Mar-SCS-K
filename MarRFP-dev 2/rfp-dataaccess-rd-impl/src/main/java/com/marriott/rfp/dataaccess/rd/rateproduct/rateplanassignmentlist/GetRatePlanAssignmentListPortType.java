/**
 * GetRatePlanAssignmentListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.rateproduct.rateplanassignmentlist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RatePlanAssignmentListRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RatePlanAssignmentListRS;

public interface GetRatePlanAssignmentListPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_RatePlanAssignmentListRS MI_RatePlanAssignmentListRQ(MI_RatePlanAssignmentListRQ MI_RatePlanAssignmentListRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_RatePlanAssignmentListRS MI_RatePlanAssignmentListRQ(String marshacode, String brandcode, String ratePlanCode, String ratePlanName, long count,
            String startRatePlanCode, String endRatePlanCode, String startKey, String endKey,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}

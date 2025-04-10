package com.marriott.rfp.dataaccess.rd.rateproduct.rateplanassignmentlist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.RatePlanAssignmentList;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RatePlanAssignmentListNotifRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RatePlanAssignmentListNotifRS;

public interface SetRatePlanAssignmentsPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_RatePlanAssignmentListNotifRS MI_RatePlanAssignmentListNotifRQ(MI_RatePlanAssignmentListNotifRQ MI_RatePlanAssignmentListNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_RatePlanAssignmentListNotifRS MI_RatePlanAssignmentListNotifRQ( String marshacode, String brandcode, RatePlanAssignmentList ratePlanAssignmentList,
            String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}

/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.masterroomtypelist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeListRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeListRS;

public interface GetMasterRoomTypeListPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_MasterRoomTypeListRS MI_MasterRoomTypeListRQ(MI_MasterRoomTypeListRQ MI_MasterRoomTypeListRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_MasterRoomTypeListRS MI_MasterRoomTypeListRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}

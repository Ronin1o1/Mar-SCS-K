/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.masterdefinitionlist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionListRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionListRS;

public interface GetMasterRoomTypeNameDefinitionListPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_MasterRoomTypeNameDefinitionListRS MI_MasterRoomTypeNameDefinitionListRQ(MI_MasterRoomTypeNameDefinitionListRQ MI_MasterRoomTypeNameDefinitionListRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_MasterRoomTypeNameDefinitionListRS MI_MasterRoomTypeNameDefinitionListRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}

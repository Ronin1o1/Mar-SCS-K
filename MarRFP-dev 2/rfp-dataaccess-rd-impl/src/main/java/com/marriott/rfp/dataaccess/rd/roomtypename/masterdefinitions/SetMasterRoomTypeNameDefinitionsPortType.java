/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.masterdefinitions;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitions;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionsNotifRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionsNotifRS;

public interface SetMasterRoomTypeNameDefinitionsPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_MasterRoomTypeNameDefinitionsNotifRS MI_MasterRoomTypeNameDefinitionsNotifRQ(MI_MasterRoomTypeNameDefinitionsNotifRQ MI_MasterRoomTypeNameDefinitionsNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_MasterRoomTypeNameDefinitionsNotifRS MI_MasterRoomTypeNameDefinitionsNotifRQ( RoomTypeNameDefinitions roomtypenameinfo,
            String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}

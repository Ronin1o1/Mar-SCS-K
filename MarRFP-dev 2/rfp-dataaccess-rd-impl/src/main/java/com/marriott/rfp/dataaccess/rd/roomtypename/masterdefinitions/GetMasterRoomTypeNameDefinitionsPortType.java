/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.masterdefinitions;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionsRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionsRS;

public interface GetMasterRoomTypeNameDefinitionsPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_MasterRoomTypeNameDefinitionsRS MI_MasterRoomTypeNameDefinitionsRQ(MI_MasterRoomTypeNameDefinitionsRQ MI_MasterRoomTypeNameDefinitionsRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_MasterRoomTypeNameDefinitionsRS MI_MasterRoomTypeNameDefinitionsRQ(String roompool,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}

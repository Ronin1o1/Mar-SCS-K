/**
 * GetHotelRoomPoolListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.datadictionary;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDataDictionaryRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDataDictionaryRS;

public interface GetMasterRoomTypeNameDataDictionaryPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_MasterRoomTypeNameDataDictionaryRS MI_MasterRoomTypeNameDataDictionaryRQ(MI_MasterRoomTypeNameDataDictionaryRQ MI_MasterRoomTypeNameDataDictionaryRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

	public MI_MasterRoomTypeNameDataDictionaryRS MI_MasterRoomTypeNameDataDictionaryRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}

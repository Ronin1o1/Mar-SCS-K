/**
 * GetHotelRateCodeListPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.masterdisplaytext;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextRS;

public interface GetMasterRoomTypeNameDisplayTextPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_MasterRoomTypeNameDisplayTextRS MI_MasterRoomTypeNameDisplayTextRQ(MI_MasterRoomTypeNameDisplayTextRQ MI_MasterRoomTypeNameDisplayTextRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
    
	public MI_MasterRoomTypeNameDisplayTextRS MI_MasterRoomTypeNameDisplayTextRQ(Channel channel, String langId,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}

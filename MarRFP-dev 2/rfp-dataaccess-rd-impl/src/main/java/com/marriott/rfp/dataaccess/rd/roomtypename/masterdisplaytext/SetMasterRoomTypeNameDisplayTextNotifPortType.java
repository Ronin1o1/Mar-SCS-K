/**
 * GetHotelAmenityListsInfoPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.masterdisplaytext;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextNotifRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextNotifRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextRS;

public interface SetMasterRoomTypeNameDisplayTextNotifPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_MasterRoomTypeNameDisplayTextNotifRS MI_MasterRoomTypeNameDisplayTextNotifRQ(MI_MasterRoomTypeNameDisplayTextNotifRQ MI_MasterRoomTypeNameDisplayTextNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;


	public MI_MasterRoomTypeNameDisplayTextNotifRS UpdateDisplayText( MI_MasterRoomTypeNameDisplayTextRS roomproductInfo, String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}

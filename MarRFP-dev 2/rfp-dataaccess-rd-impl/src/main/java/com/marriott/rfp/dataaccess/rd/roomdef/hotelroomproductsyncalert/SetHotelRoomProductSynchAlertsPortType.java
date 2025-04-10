/**
 * GetHotelAmenityListsInfoPortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.hotelroomproductsyncalert;

import java.rmi.Remote;
import java.rmi.RemoteException;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductSynchModifyRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductSynchModifyRS;
import com.marriott.rfp.object.roomdef.beans.SynchAlerts;

public interface SetHotelRoomProductSynchAlertsPortType extends Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRoomProductSynchModifyRS MI_HotelRoomProductSynchModifyRQ(MI_HotelRoomProductSynchModifyRQ MI_HotelRoomProductSynchModifyRQ,String SoapPort_address) throws RemoteException, ServiceException;

	public MI_HotelRoomProductSynchModifyRS DeleteSynchAlerts(String marshacode,  String loginName, SynchAlerts[] sa,String SoapPort_address) throws RemoteException, ServiceException;
	
}

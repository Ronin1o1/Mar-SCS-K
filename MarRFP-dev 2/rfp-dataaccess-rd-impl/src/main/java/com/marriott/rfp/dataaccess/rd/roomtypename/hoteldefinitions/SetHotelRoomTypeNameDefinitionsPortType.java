/**
 * GetHotelRoomPoolListPortType.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.hoteldefinitions;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitions;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionsNotifRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionsNotifRS;

public interface SetHotelRoomTypeNameDefinitionsPortType extends java.rmi.Remote {

	/**
	 * Returns all defined room pools for a particular property
	 */
	public MI_HotelRoomTypeNameDefinitionsNotifRS MI_HotelRoomTypeNameDefinitionsNotifRQ(
			MI_HotelRoomTypeNameDefinitionsNotifRQ MI_HotelRoomTypeNameDefinitionsNotifRQ, String SoapPort_address) throws java.rmi.RemoteException,
			ServiceException;

	public MI_HotelRoomTypeNameDefinitionsNotifRS MI_HotelRoomTypeNameDefinitionsNotifRQ(String marshacode, RoomTypeNameDefinitions roomtypenameinfo,
			String loginName, String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

}

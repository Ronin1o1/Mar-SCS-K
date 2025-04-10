/**
 * GetHotelRateCodeListPortType.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.entries;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;

public interface GetHotelRoomProductInfoEntriesPortType extends java.rmi.Remote {

    /**
     * Returns all defined entries
     */
    public MI_HotelRoomProductInfoEntriesRS MI_HotelRoomProductInfoEntriesRQ(MI_HotelRoomProductInfoEntriesRQ MI_HotelRoomProductInfoEntriesRQ,String SoapPort_address)
            throws java.rmi.RemoteException,ServiceException;

    public MI_HotelRoomProductInfoEntriesRS MI_HotelRoomProductInfoEntriesRQ(String SoapPort_address) throws java.rmi.RemoteException,
           ServiceException;

    public MI_HotelRoomProductInfoEntriesRS GetKOREntries(String SoapPort_address) throws java.rmi.RemoteException,ServiceException;

    public MI_HotelRoomProductInfoEntriesRS GetFormattedRatesEntries(String SoapPort_address) throws java.rmi.RemoteException,ServiceException;

    public MI_HotelRoomProductInfoEntriesRS GetRateProductEntries(String SoapPort_address) throws java.rmi.RemoteException,ServiceException;
}

/**
 * GetHotelRateCodeListPortType.java
 * 
 * This file was auto-generated from WSDL by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.channellanguages;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelLanguagesRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelLanguagesRS;

public interface GetHotelRoomProductInfoChannelLanguagesPortType extends java.rmi.Remote {

    /**
     * Returns all defined room pools for a particular property
     */
    public MI_HotelRoomProductInfoChannelLanguagesRS MI_HotelRoomProductInfoChannelLanguagesRQ(
            MI_HotelRoomProductInfoChannelLanguagesRQ MI_HotelRoomProductInfoChannelLanguagesRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

    public MI_HotelRoomProductInfoChannelLanguagesRS MI_HotelRoomProductInfoChannelLanguagesRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

    public MI_HotelRoomProductInfoChannelLanguagesRS MI_HotelRoomProductInfoChannelLanguagesRQ(Channel channel,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

    public MI_HotelRoomProductInfoChannelLanguagesRS getFormattedRatesChannelLanguages(String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

    public MI_HotelRoomProductInfoChannelLanguagesRS getFormattedRatesChannelLanguages(Channel channe,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

    public MI_HotelRoomProductInfoChannelLanguagesRS getRateProductChannelLanguages(String SoapPort_address) throws java.rmi.RemoteException, ServiceException;

    public MI_HotelRoomProductInfoChannelLanguagesRS getRateProductChannelLanguages(Channel channel,String SoapPort_address) throws java.rmi.RemoteException, ServiceException;
}

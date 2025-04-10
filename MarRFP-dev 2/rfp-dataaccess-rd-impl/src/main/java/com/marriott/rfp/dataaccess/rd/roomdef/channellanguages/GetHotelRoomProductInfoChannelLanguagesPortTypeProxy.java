package com.marriott.rfp.dataaccess.rd.roomdef.channellanguages;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelLanguagesRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelLanguagesRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelRoomProductInfoChannelLanguagesPortTypeProxy implements GetHotelRoomProductInfoChannelLanguagesPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelRoomProductInfoChannelLanguagesPortTypeProxy.class);
    private String _endpoint = null;
    private GetHotelRoomProductInfoChannelLanguagesPortType getHotelRoomProductInfoChannelLanguagesPortType = null;

    public GetHotelRoomProductInfoChannelLanguagesPortTypeProxy(String SoapPort_addess) throws ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
        _initGetHotelRoomProductInfoChannelLanguagesPortTypeProxy(SoapPort_addess);
    }

    private void _initGetHotelRoomProductInfoChannelLanguagesPortTypeProxy(String SoapPort_addess) throws ServiceException {
             getHotelRoomProductInfoChannelLanguagesPortType = (new GetHotelRoomProductInfoChannelLanguagesServiceLocator(SoapPort_addess))
                    .getGetHotelRoomProductInfoChannelLanguagesSoapPort();
            if (getHotelRoomProductInfoChannelLanguagesPortType != null) {
                if (_endpoint != null)
                    ((javax.xml.rpc.Stub) getHotelRoomProductInfoChannelLanguagesPortType)._setProperty("javax.xml.rpc.service.endpoint.address",
                            _endpoint);
                else
                    _endpoint = (String) ((javax.xml.rpc.Stub) getHotelRoomProductInfoChannelLanguagesPortType)
                            ._getProperty("javax.xml.rpc.service.endpoint.address");
            }

       }

    public String getEndpoint() {
        return _endpoint;
    }

    public void setEndpoint(String endpoint) {
        _endpoint = endpoint;
        if (getHotelRoomProductInfoChannelLanguagesPortType != null)
            ((javax.xml.rpc.Stub) getHotelRoomProductInfoChannelLanguagesPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);

    }

    public GetHotelRoomProductInfoChannelLanguagesPortType getGetHotelRoomProductInfoChannelLanguagesPortType(String SoapPort_address) throws ServiceException
             {
        if (getHotelRoomProductInfoChannelLanguagesPortType == null)
            _initGetHotelRoomProductInfoChannelLanguagesPortTypeProxy(SoapPort_address);
        return getHotelRoomProductInfoChannelLanguagesPortType;
    }

    public MI_HotelRoomProductInfoChannelLanguagesRS MI_HotelRoomProductInfoChannelLanguagesRQ(
            MI_HotelRoomProductInfoChannelLanguagesRQ MI_HotelRoomProductInfoChannelLanguagesRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException
           {
        if (getHotelRoomProductInfoChannelLanguagesPortType == null)
            _initGetHotelRoomProductInfoChannelLanguagesPortTypeProxy(SoapPort_address);
        return getHotelRoomProductInfoChannelLanguagesPortType.MI_HotelRoomProductInfoChannelLanguagesRQ(MI_HotelRoomProductInfoChannelLanguagesRQ, SoapPort_address);
    }

    public MI_HotelRoomProductInfoChannelLanguagesRS MI_HotelRoomProductInfoChannelLanguagesRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException
           {
        if (getHotelRoomProductInfoChannelLanguagesPortType == null)
            _initGetHotelRoomProductInfoChannelLanguagesPortTypeProxy(SoapPort_address);
        return getHotelRoomProductInfoChannelLanguagesPortType.MI_HotelRoomProductInfoChannelLanguagesRQ(SoapPort_address);
    }

    public MI_HotelRoomProductInfoChannelLanguagesRS MI_HotelRoomProductInfoChannelLanguagesRQ(Channel channel,String SoapPort_address) throws java.rmi.RemoteException, ServiceException
        {
        if (getHotelRoomProductInfoChannelLanguagesPortType == null)
            _initGetHotelRoomProductInfoChannelLanguagesPortTypeProxy(SoapPort_address);
        return getHotelRoomProductInfoChannelLanguagesPortType.MI_HotelRoomProductInfoChannelLanguagesRQ(channel,SoapPort_address);
    }

    public MI_HotelRoomProductInfoChannelLanguagesRS getFormattedRatesChannelLanguages(String SoapPort_address) throws java.rmi.RemoteException, ServiceException
             {
        if (getHotelRoomProductInfoChannelLanguagesPortType == null)
            _initGetHotelRoomProductInfoChannelLanguagesPortTypeProxy(SoapPort_address);
        return getHotelRoomProductInfoChannelLanguagesPortType.getFormattedRatesChannelLanguages(SoapPort_address);
    }

    public MI_HotelRoomProductInfoChannelLanguagesRS getFormattedRatesChannelLanguages(Channel channel,String SoapPort_address) throws java.rmi.RemoteException, ServiceException
            {
        if (getHotelRoomProductInfoChannelLanguagesPortType == null)
            _initGetHotelRoomProductInfoChannelLanguagesPortTypeProxy(SoapPort_address);
        return getHotelRoomProductInfoChannelLanguagesPortType.getFormattedRatesChannelLanguages(channel, SoapPort_address);
    }

    public MI_HotelRoomProductInfoChannelLanguagesRS getRateProductChannelLanguages(String SoapPort_address) throws java.rmi.RemoteException, ServiceException
            {
        if (getHotelRoomProductInfoChannelLanguagesPortType == null)
            _initGetHotelRoomProductInfoChannelLanguagesPortTypeProxy(SoapPort_address);
        return getHotelRoomProductInfoChannelLanguagesPortType.getRateProductChannelLanguages(SoapPort_address);
    }

    public MI_HotelRoomProductInfoChannelLanguagesRS getRateProductChannelLanguages(Channel channel, String SoapPort_address) throws java.rmi.RemoteException, ServiceException
           {
        if (getHotelRoomProductInfoChannelLanguagesPortType == null)
            _initGetHotelRoomProductInfoChannelLanguagesPortTypeProxy(SoapPort_address);
        return getHotelRoomProductInfoChannelLanguagesPortType.getRateProductChannelLanguages(channel,SoapPort_address);
    }

}
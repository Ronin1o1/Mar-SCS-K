package com.marriott.rfp.dataaccess.rd.roomtypename.hoteldefinitions;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitions;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionsNotifRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionsNotifRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SetHotelRoomTypeNameDefinitionsPortTypeProxy implements
        SetHotelRoomTypeNameDefinitionsPortType {
    private static final Logger log = LoggerFactory.getLogger(SetHotelRoomTypeNameDefinitionsPortTypeProxy.class);
    private String _endpoint = null;

    private SetHotelRoomTypeNameDefinitionsPortType portType = null;

    public SetHotelRoomTypeNameDefinitionsPortTypeProxy(String SoapPort_address) throws ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
       _initSetHotelRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
    }

    private void _initSetHotelRoomTypeNameDefinitionsPortTypeProxy(String SoapPort_address) throws ServiceException {
        try {
            portType = (new SetHotelRoomTypeNameDefinitionsServiceLocator(SoapPort_address)).getSetHotelRoomTypeNameDefinitionsSoapPort();
            if (portType != null) {
                if (_endpoint != null)
                    ((javax.xml.rpc.Stub) portType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
                else
                    _endpoint = (String) ((javax.xml.rpc.Stub) portType)._getProperty("javax.xml.rpc.service.endpoint.address");
            }

        } catch (javax.xml.rpc.ServiceException serviceException) {
            throw new ServiceException("Room Pool List Service Exception");
        } catch (Exception e) {
            throw new ServiceException(e.getMessage());
        }
    }

    public String getEndpoint() {
        return _endpoint;
    }

    public void setEndpoint(String endpoint) {
        _endpoint = endpoint;
        if (portType != null)
            ((javax.xml.rpc.Stub) portType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);

    }

    public SetHotelRoomTypeNameDefinitionsPortType getSetHotelRoomTypeNameDefinitionsPortType(String SoapPort_address) throws ServiceException {
        if (portType == null)
            _initSetHotelRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
        return portType;
    }

    public MI_HotelRoomTypeNameDefinitionsNotifRS MI_HotelRoomTypeNameDefinitionsNotifRQ(
            MI_HotelRoomTypeNameDefinitionsNotifRQ MI_HotelRoomTypeNameDefinitionsNotifRQ,String SoapPort_address) throws java.rmi.RemoteException,
            ServiceException {
        if (portType == null)
            _initSetHotelRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
        return portType.MI_HotelRoomTypeNameDefinitionsNotifRQ(MI_HotelRoomTypeNameDefinitionsNotifRQ,SoapPort_address);
    }

    public MI_HotelRoomTypeNameDefinitionsNotifRS MI_HotelRoomTypeNameDefinitionsNotifRQ(String marshacode, RoomTypeNameDefinitions roomtypenameinfo,
            String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException {
        if (portType == null)
            _initSetHotelRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
        return portType.MI_HotelRoomTypeNameDefinitionsNotifRQ(marshacode, roomtypenameinfo, loginName,SoapPort_address);
    }

}
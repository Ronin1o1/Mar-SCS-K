package com.marriott.rfp.dataaccess.rd.roomtypename.hoteldefinitions;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionsRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionsRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelRoomTypeNameDefinitionsPortTypeProxy implements GetHotelRoomTypeNameDefinitionsPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelRoomTypeNameDefinitionsPortTypeProxy.class);
  private String _endpoint = null;
  private GetHotelRoomTypeNameDefinitionsPortType getHotelRoomTypeNameDefinitionsPortType = null;
  
  public GetHotelRoomTypeNameDefinitionsPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
        }
    _initGetHotelRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetHotelRoomTypeNameDefinitionsPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getHotelRoomTypeNameDefinitionsPortType = (new GetHotelRoomTypeNameDefinitionsServiceLocator(SoapPort_address)).getGetHotelRoomTypeNameDefinitionsSoapPort();
      if (getHotelRoomTypeNameDefinitionsPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelRoomTypeNameDefinitionsPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelRoomTypeNameDefinitionsPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
	catch (javax.xml.rpc.ServiceException serviceException) {
		throw new ServiceException ("Room Pool List Service Exception");
	} catch (Exception e) {
		throw new ServiceException (e.getMessage());
	}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (getHotelRoomTypeNameDefinitionsPortType != null)
      ((javax.xml.rpc.Stub)getHotelRoomTypeNameDefinitionsPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetHotelRoomTypeNameDefinitionsPortType getGetHotelRoomTypeNameDefinitionsPortType(String SoapPort_address)  throws  ServiceException{
    if (getHotelRoomTypeNameDefinitionsPortType == null)
      _initGetHotelRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
    return getHotelRoomTypeNameDefinitionsPortType;
  }
  
  public MI_HotelRoomTypeNameDefinitionsRS MI_HotelRoomTypeNameDefinitionsRQ(MI_HotelRoomTypeNameDefinitionsRQ MI_HotelRoomTypeNameDefinitionsRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getHotelRoomTypeNameDefinitionsPortType == null)
      _initGetHotelRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
    return getHotelRoomTypeNameDefinitionsPortType.MI_HotelRoomTypeNameDefinitionsRQ(MI_HotelRoomTypeNameDefinitionsRQ,SoapPort_address);
  }
  
  public MI_HotelRoomTypeNameDefinitionsRS MI_HotelRoomTypeNameDefinitionsRQ(String marshacode, String roompool,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getHotelRoomTypeNameDefinitionsPortType == null)
	  _initGetHotelRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
	return getHotelRoomTypeNameDefinitionsPortType.MI_HotelRoomTypeNameDefinitionsRQ(marshacode, roompool,SoapPort_address);
  }
  
}
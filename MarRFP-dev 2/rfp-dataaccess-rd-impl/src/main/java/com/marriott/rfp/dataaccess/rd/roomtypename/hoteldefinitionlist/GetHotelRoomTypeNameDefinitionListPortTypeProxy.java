package com.marriott.rfp.dataaccess.rd.roomtypename.hoteldefinitionlist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionListRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_HotelRoomTypeNameDefinitionListRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelRoomTypeNameDefinitionListPortTypeProxy implements GetHotelRoomTypeNameDefinitionListPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelRoomTypeNameDefinitionListPortTypeProxy.class);
    private String _endpoint = null;
  private GetHotelRoomTypeNameDefinitionListPortType getHotelRoomTypeNameDefinitionListPortType = null;
  
  public GetHotelRoomTypeNameDefinitionListPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);

        }
   _initGetHotelRoomTypeNameDefinitionListPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetHotelRoomTypeNameDefinitionListPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getHotelRoomTypeNameDefinitionListPortType = (new GetHotelRoomTypeNameDefinitionListServiceLocator(SoapPort_address)).getGetHotelRoomTypeNameDefinitionListSoapPort();
      if (getHotelRoomTypeNameDefinitionListPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelRoomTypeNameDefinitionListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelRoomTypeNameDefinitionListPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (getHotelRoomTypeNameDefinitionListPortType != null)
      ((javax.xml.rpc.Stub)getHotelRoomTypeNameDefinitionListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetHotelRoomTypeNameDefinitionListPortType getGetHotelRoomTypeNameDefinitionListPortType(String SoapPort_address)  throws  ServiceException{
    if (getHotelRoomTypeNameDefinitionListPortType == null)
      _initGetHotelRoomTypeNameDefinitionListPortTypeProxy(SoapPort_address);
    return getHotelRoomTypeNameDefinitionListPortType;
  }
  
  public MI_HotelRoomTypeNameDefinitionListRS MI_HotelRoomTypeNameDefinitionListRQ(MI_HotelRoomTypeNameDefinitionListRQ MI_HotelRoomTypeNameDefinitionListRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getHotelRoomTypeNameDefinitionListPortType == null)
      _initGetHotelRoomTypeNameDefinitionListPortTypeProxy(SoapPort_address);
    return getHotelRoomTypeNameDefinitionListPortType.MI_HotelRoomTypeNameDefinitionListRQ(MI_HotelRoomTypeNameDefinitionListRQ,SoapPort_address);
  }
  
  public MI_HotelRoomTypeNameDefinitionListRS MI_HotelRoomTypeNameDefinitionListRQ(String marshacode,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getHotelRoomTypeNameDefinitionListPortType == null)
	  _initGetHotelRoomTypeNameDefinitionListPortTypeProxy(SoapPort_address);
	return getHotelRoomTypeNameDefinitionListPortType.MI_HotelRoomTypeNameDefinitionListRQ(marshacode,SoapPort_address);
  }
  
}
package com.marriott.rfp.dataaccess.rd.roomtypename.hotelroomtypelist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomPoolListRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomPoolListRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelRoomPoolListPortTypeProxy implements GetHotelRoomPoolListPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelRoomPoolListPortTypeProxy.class);
    private String _endpoint = null;
  private GetHotelRoomPoolListPortType getHotelRoomPoolListPortType = null;
  
  public GetHotelRoomPoolListPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
    _initGetHotelRoomPoolListPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetHotelRoomPoolListPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getHotelRoomPoolListPortType = (new GetHotelRoomPoolListServiceLocator(SoapPort_address)).getGetHotelRoomPoolListSoapPort();
      if (getHotelRoomPoolListPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelRoomPoolListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelRoomPoolListPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (getHotelRoomPoolListPortType != null)
      ((javax.xml.rpc.Stub)getHotelRoomPoolListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetHotelRoomPoolListPortType getGetHotelRoomPoolListPortType(String SoapPort_address)  throws  ServiceException{
    if (getHotelRoomPoolListPortType == null)
      _initGetHotelRoomPoolListPortTypeProxy(SoapPort_address);
    return getHotelRoomPoolListPortType;
  }
  
  public MI_HotelRoomPoolListRS MI_HotelRoomPoolListRQ(MI_HotelRoomPoolListRQ MI_HotelRoomPoolListRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getHotelRoomPoolListPortType == null)
      _initGetHotelRoomPoolListPortTypeProxy(SoapPort_address);
    return getHotelRoomPoolListPortType.MI_HotelRoomPoolListRQ(MI_HotelRoomPoolListRQ, SoapPort_address);
  }
  
  public MI_HotelRoomPoolListRS MI_HotelRoomPoolListRQ(String marshacode,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getHotelRoomPoolListPortType == null)
	  _initGetHotelRoomPoolListPortTypeProxy(SoapPort_address);
	return getHotelRoomPoolListPortType.MI_HotelRoomPoolListRQ(marshacode, SoapPort_address);
  }
  
}
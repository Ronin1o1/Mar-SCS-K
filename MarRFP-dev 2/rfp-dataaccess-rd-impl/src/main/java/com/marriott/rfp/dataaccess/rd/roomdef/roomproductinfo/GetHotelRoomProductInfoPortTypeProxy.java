package com.marriott.rfp.dataaccess.rd.roomdef.roomproductinfo;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelRoomProductInfoPortTypeProxy implements GetHotelRoomProductInfoPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelRoomProductInfoPortTypeProxy.class);
    private String _endpoint = null;
  private GetHotelRoomProductInfoPortType getHotelRoomProductInfoPortType = null;
  
  public GetHotelRoomProductInfoPortTypeProxy(String SoapPort_address)  throws ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
  _initGetHotelRoomProductInfoPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetHotelRoomProductInfoPortTypeProxy(String SoapPort_address) throws ServiceException {
    try {
      getHotelRoomProductInfoPortType = (new GetHotelRoomProductInfoServiceLocator(SoapPort_address)).getGetHotelRoomProductInfoSoapPort();
      if (getHotelRoomProductInfoPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelRoomProductInfoPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelRoomProductInfoPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
	catch (javax.xml.rpc.ServiceException serviceException) {
	   throw new ServiceException ("Room Product Info Service Exception");
   } catch (Exception e) {
	   throw new ServiceException (e.getMessage());
   }
 }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (getHotelRoomProductInfoPortType != null)
      ((javax.xml.rpc.Stub)getHotelRoomProductInfoPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetHotelRoomProductInfoPortType getGetHotelRoomProductInfoPortType(String SoapPort_address)  throws ServiceException{
    if (getHotelRoomProductInfoPortType == null)
      _initGetHotelRoomProductInfoPortTypeProxy(SoapPort_address);
    return getHotelRoomProductInfoPortType;
  }
  
  public MI_HotelRoomProductInfoRS MI_HotelRoomProductInfoRQ(MI_HotelRoomProductInfoRQ MI_HotelRoomProductInfoRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getHotelRoomProductInfoPortType == null)
      _initGetHotelRoomProductInfoPortTypeProxy(SoapPort_address);
    return getHotelRoomProductInfoPortType.MI_HotelRoomProductInfoRQ(MI_HotelRoomProductInfoRQ, SoapPort_address);
  }
 
  public MI_HotelRoomProductInfoRS GetRoomProductList(String marshacode, String roompool,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getHotelRoomProductInfoPortType == null)
	  _initGetHotelRoomProductInfoPortTypeProxy(SoapPort_address);
	return getHotelRoomProductInfoPortType.GetRoomProductList(marshacode, roompool,SoapPort_address);
  }

  public MI_HotelRoomProductInfoRS GetRoomProduct(String marshacode, String roompool,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getHotelRoomProductInfoPortType == null)
	  _initGetHotelRoomProductInfoPortTypeProxy(SoapPort_address);
	return getHotelRoomProductInfoPortType.GetRoomProduct(marshacode, roompool,SoapPort_address);
  }
 
  
}
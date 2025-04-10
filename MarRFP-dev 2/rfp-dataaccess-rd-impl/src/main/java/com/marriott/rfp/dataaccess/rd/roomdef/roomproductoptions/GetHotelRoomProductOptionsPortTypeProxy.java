package com.marriott.rfp.dataaccess.rd.roomdef.roomproductoptions;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductOptionsRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductOptionsRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelRoomProductOptionsPortTypeProxy implements GetHotelRoomProductOptionsPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelRoomProductOptionsPortTypeProxy.class);
  private String _endpoint = null;
  private GetHotelRoomProductOptionsPortType getHotelRoomProductOptionsPortType = null;
  
  public GetHotelRoomProductOptionsPortTypeProxy(String SoapPort_address)  throws ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
    _initGetHotelRoomProductOptionsPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetHotelRoomProductOptionsPortTypeProxy(String SoapPort_address) throws ServiceException{
       getHotelRoomProductOptionsPortType = (new GetHotelRoomProductOptionsServiceLocator(SoapPort_address)).getGetHotelRoomProductOptionsSoapPort();
      if (getHotelRoomProductOptionsPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelRoomProductOptionsPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelRoomProductOptionsPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (getHotelRoomProductOptionsPortType != null)
      ((javax.xml.rpc.Stub)getHotelRoomProductOptionsPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetHotelRoomProductOptionsPortType getGetHotelRoomProductOptionsPortType(String SoapPort_address)  throws ServiceException{
    if (getHotelRoomProductOptionsPortType == null)
      _initGetHotelRoomProductOptionsPortTypeProxy(SoapPort_address);
    return getHotelRoomProductOptionsPortType;
  }
  
  public MI_HotelRoomProductOptionsRS MI_HotelRoomProductOptionsRQ(MI_HotelRoomProductOptionsRQ MI_HotelRoomProductOptionsRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getHotelRoomProductOptionsPortType == null)
      _initGetHotelRoomProductOptionsPortTypeProxy(SoapPort_address);
    return getHotelRoomProductOptionsPortType.MI_HotelRoomProductOptionsRQ(MI_HotelRoomProductOptionsRQ,SoapPort_address);
  }
  
  public MI_HotelRoomProductOptionsRS GetProductOptions(String marshacode ,String SoapPort_address)  throws java.rmi.RemoteException, ServiceException{
	if (getHotelRoomProductOptionsPortType == null)
	_initGetHotelRoomProductOptionsPortTypeProxy(SoapPort_address);
	return getHotelRoomProductOptionsPortType.GetProductOptions(marshacode,SoapPort_address);
  }
 
}
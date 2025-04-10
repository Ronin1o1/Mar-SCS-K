package com.marriott.rfp.dataaccess.rd.roomdef.channels;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoChannelsRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class GetHotelRoomProductInfoChannelsPortTypeProxy implements GetHotelRoomProductInfoChannelsPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelRoomProductInfoChannelsPortTypeProxy.class);
  private String _endpoint = null;
  private GetHotelRoomProductInfoChannelsPortType getHotelRoomProductInfoChannelsPortType = null;
  
  public GetHotelRoomProductInfoChannelsPortTypeProxy(String SoapPort_address) throws ServiceException  {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
   _initGetHotelRoomProductInfoChannelsPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetHotelRoomProductInfoChannelsPortTypeProxy(String SoapPort_address) throws ServiceException  {
      getHotelRoomProductInfoChannelsPortType = (new GetHotelRoomProductInfoChannelsServiceLocator(SoapPort_address)).getGetHotelRoomProductInfoChannelsSoapPort();
      if (getHotelRoomProductInfoChannelsPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelRoomProductInfoChannelsPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelRoomProductInfoChannelsPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (getHotelRoomProductInfoChannelsPortType != null)
      ((javax.xml.rpc.Stub)getHotelRoomProductInfoChannelsPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetHotelRoomProductInfoChannelsPortType getGetHotelRoomProductInfoChannelsPortType(String SoapPort_addess ) throws ServiceException {
    if (getHotelRoomProductInfoChannelsPortType == null)
      _initGetHotelRoomProductInfoChannelsPortTypeProxy(SoapPort_addess);
    return getHotelRoomProductInfoChannelsPortType;
  }
  
  public MI_HotelRoomProductInfoChannelsRS MI_HotelRoomProductInfoChannelsRQ(MI_HotelRoomProductInfoChannelsRQ MI_HotelRoomProductInfoChannelsRQ,String SoapPort_addess) throws java.rmi.RemoteException, ServiceException{
    if (getHotelRoomProductInfoChannelsPortType == null)
      _initGetHotelRoomProductInfoChannelsPortTypeProxy(SoapPort_addess);
    return getHotelRoomProductInfoChannelsPortType.MI_HotelRoomProductInfoChannelsRQ(MI_HotelRoomProductInfoChannelsRQ,SoapPort_addess);
  }
  
  public MI_HotelRoomProductInfoChannelsRS MI_HotelRoomProductInfoChannelsRQ(String SoapPort_addess) throws java.rmi.RemoteException, ServiceException{
	if (getHotelRoomProductInfoChannelsPortType == null)
	  _initGetHotelRoomProductInfoChannelsPortTypeProxy(SoapPort_addess);
	return getHotelRoomProductInfoChannelsPortType.MI_HotelRoomProductInfoChannelsRQ(SoapPort_addess);
  }
  
}
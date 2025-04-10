package com.marriott.rfp.dataaccess.rd.roomdef.datadictionary;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDataDictionaryRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDataDictionaryRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelRoomProductDataDictionaryPortTypeProxy implements GetHotelRoomProductDataDictionaryPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelRoomProductDataDictionaryPortTypeProxy.class);

    private String _endpoint = null;
  private GetHotelRoomProductDataDictionaryPortType getHotelRoomProductDataDictionaryPortType = null;
  
  public GetHotelRoomProductDataDictionaryPortTypeProxy(String SoapPort_address)   throws  ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
  _initGetHotelRoomProductDataDictionaryPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetHotelRoomProductDataDictionaryPortTypeProxy(String SoapPort_address)  throws  ServiceException{
  
      getHotelRoomProductDataDictionaryPortType = (new GetHotelRoomProductDataDictionaryServiceLocator(SoapPort_address)).getGetHotelRoomProductDataDictionarySoapPort();
      if (getHotelRoomProductDataDictionaryPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelRoomProductDataDictionaryPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelRoomProductDataDictionaryPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    

  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (getHotelRoomProductDataDictionaryPortType != null)
      ((javax.xml.rpc.Stub)getHotelRoomProductDataDictionaryPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetHotelRoomProductDataDictionaryPortType getGetHotelRoomProductDataDictionaryPortType(String SoapPort_address)   throws  ServiceException{
    if (getHotelRoomProductDataDictionaryPortType == null)
      _initGetHotelRoomProductDataDictionaryPortTypeProxy(SoapPort_address);
    return getHotelRoomProductDataDictionaryPortType;
  }
  
  public MI_HotelRoomProductDataDictionaryRS MI_HotelRoomProductDataDictionaryRQ(MI_HotelRoomProductDataDictionaryRQ MI_HotelRoomProductDataDictionaryRQ,String SoapPort_address) throws java.rmi.RemoteException,ServiceException{
    if (getHotelRoomProductDataDictionaryPortType == null)
      _initGetHotelRoomProductDataDictionaryPortTypeProxy(SoapPort_address);
    return getHotelRoomProductDataDictionaryPortType.MI_HotelRoomProductDataDictionaryRQ(MI_HotelRoomProductDataDictionaryRQ,SoapPort_address);
  }
  
  public MI_HotelRoomProductDataDictionaryRS MI_HotelRoomProductDataDictionaryRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getHotelRoomProductDataDictionaryPortType == null)
	  _initGetHotelRoomProductDataDictionaryPortTypeProxy(SoapPort_address);
	return getHotelRoomProductDataDictionaryPortType.MI_HotelRoomProductDataDictionaryRQ(SoapPort_address);
  }
  
}
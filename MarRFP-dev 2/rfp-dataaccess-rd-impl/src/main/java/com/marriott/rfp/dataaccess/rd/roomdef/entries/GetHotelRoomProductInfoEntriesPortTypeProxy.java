package com.marriott.rfp.dataaccess.rd.roomdef.entries;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoEntriesRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelRoomProductInfoEntriesPortTypeProxy implements GetHotelRoomProductInfoEntriesPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelRoomProductInfoEntriesPortTypeProxy.class);
    private String _endpoint = null;
  private GetHotelRoomProductInfoEntriesPortType getHotelRoomProductInfoEntriesPortType = null;
  
  public GetHotelRoomProductInfoEntriesPortTypeProxy(String SoapPort_address)   throws ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
   _initGetHotelRoomProductInfoEntriesPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetHotelRoomProductInfoEntriesPortTypeProxy(String SoapPort_address)  throws ServiceException{
      getHotelRoomProductInfoEntriesPortType = (new GetHotelRoomProductInfoEntriesServiceLocator(SoapPort_address)).getGetHotelRoomProductInfoEntriesSoapPort();
      if (getHotelRoomProductInfoEntriesPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelRoomProductInfoEntriesPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelRoomProductInfoEntriesPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (getHotelRoomProductInfoEntriesPortType != null)
      ((javax.xml.rpc.Stub)getHotelRoomProductInfoEntriesPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetHotelRoomProductInfoEntriesPortType getGetHotelRoomProductInfoEntriesPortType(String SoapPort_address)   throws ServiceException{
    if (getHotelRoomProductInfoEntriesPortType == null)
      _initGetHotelRoomProductInfoEntriesPortTypeProxy(SoapPort_address);
    return getHotelRoomProductInfoEntriesPortType;
  }
  
  public MI_HotelRoomProductInfoEntriesRS MI_HotelRoomProductInfoEntriesRQ(MI_HotelRoomProductInfoEntriesRQ MI_HotelRoomProductInfoEntriesRQ,String SoapPort_address) throws java.rmi.RemoteException,ServiceException{
    if (getHotelRoomProductInfoEntriesPortType == null)
      _initGetHotelRoomProductInfoEntriesPortTypeProxy(SoapPort_address);
    return getHotelRoomProductInfoEntriesPortType.MI_HotelRoomProductInfoEntriesRQ(MI_HotelRoomProductInfoEntriesRQ,SoapPort_address);
  }
  
  public MI_HotelRoomProductInfoEntriesRS MI_HotelRoomProductInfoEntriesRQ(String SoapPort_address) throws java.rmi.RemoteException,ServiceException{
	if (getHotelRoomProductInfoEntriesPortType == null)
	  _initGetHotelRoomProductInfoEntriesPortTypeProxy(SoapPort_address);
	return getHotelRoomProductInfoEntriesPortType.MI_HotelRoomProductInfoEntriesRQ(SoapPort_address);
  }
 
  public MI_HotelRoomProductInfoEntriesRS GetKOREntries(String SoapPort_address) throws java.rmi.RemoteException,ServiceException{
  	if (getHotelRoomProductInfoEntriesPortType == null)
  	  _initGetHotelRoomProductInfoEntriesPortTypeProxy(SoapPort_address);
  	return getHotelRoomProductInfoEntriesPortType.GetKOREntries(SoapPort_address);
    }

  public MI_HotelRoomProductInfoEntriesRS GetFormattedRatesEntries(String SoapPort_address) throws java.rmi.RemoteException,ServiceException{
  	if (getHotelRoomProductInfoEntriesPortType == null)
  	  _initGetHotelRoomProductInfoEntriesPortTypeProxy(SoapPort_address);
  	return getHotelRoomProductInfoEntriesPortType.GetFormattedRatesEntries(SoapPort_address);
    }

  public MI_HotelRoomProductInfoEntriesRS GetRateProductEntries(String SoapPort_address) throws java.rmi.RemoteException,ServiceException{
    	if (getHotelRoomProductInfoEntriesPortType == null)
    	  _initGetHotelRoomProductInfoEntriesPortTypeProxy(SoapPort_address);
    	return getHotelRoomProductInfoEntriesPortType.GetRateProductEntries(SoapPort_address);
      }
}
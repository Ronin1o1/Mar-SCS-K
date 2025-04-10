package com.marriott.rfp.dataaccess.rd.roomdef.hotelamenitylistsinfo;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelAmenityListsInfoRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelAmenityListsInfoRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelAmenityListsInfoPortTypeProxy implements GetHotelAmenityListsInfoPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelAmenityListsInfoPortTypeProxy.class);
  private String _endpoint = null;
  private GetHotelAmenityListsInfoPortType getHotelAmenityListsPortType = null;
  
  public GetHotelAmenityListsInfoPortTypeProxy(String SoapPort_address) throws  ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
    _initGetHotelAmenityListsPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetHotelAmenityListsPortTypeProxy(String SoapPort_address) throws  ServiceException{
    try {
      getHotelAmenityListsPortType = (new GetHotelAmenityListsInfoServiceLocator(SoapPort_address)).getGetHotelAmenityListsSoapPort();
      if (getHotelAmenityListsPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelAmenityListsPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelAmenityListsPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
    }
    catch (javax.xml.rpc.ServiceException serviceException) {
    	throw new ServiceException ("Amenity List Service Exception");
    } catch (Exception e) {
		throw new ServiceException (e.getMessage());
    }
    
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (getHotelAmenityListsPortType != null)
      ((javax.xml.rpc.Stub)getHotelAmenityListsPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetHotelAmenityListsInfoPortType getGetHotelAmenityListsPortType(String SoapPort_address) throws ServiceException{
    if (getHotelAmenityListsPortType == null)
      _initGetHotelAmenityListsPortTypeProxy(SoapPort_address);
    return getHotelAmenityListsPortType;
  }
  
  public MI_HotelAmenityListsInfoRS MI_HotelAmenityListsRQ(MI_HotelAmenityListsInfoRQ MI_HotelAmenityListsRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getHotelAmenityListsPortType == null)
      _initGetHotelAmenityListsPortTypeProxy(SoapPort_address);
    return getHotelAmenityListsPortType.MI_HotelAmenityListsRQ(MI_HotelAmenityListsRQ,SoapPort_address);
  }
 
  public MI_HotelAmenityListsInfoRS MI_HotelAmenityListsRQ(String SoapPort_address ) throws java.rmi.RemoteException, ServiceException{
	if (getHotelAmenityListsPortType == null)
	  _initGetHotelAmenityListsPortTypeProxy(SoapPort_address);
	return getHotelAmenityListsPortType.MI_HotelAmenityListsRQ(SoapPort_address);
  }
 
  
}
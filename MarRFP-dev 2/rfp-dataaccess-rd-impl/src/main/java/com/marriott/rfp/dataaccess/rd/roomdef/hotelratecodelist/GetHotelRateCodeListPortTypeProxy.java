package com.marriott.rfp.dataaccess.rd.roomdef.hotelratecodelist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRateCodeListRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRateCodeListRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelRateCodeListPortTypeProxy implements GetHotelRateCodeListPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelRateCodeListPortTypeProxy.class);
  private String _endpoint = null;
  private GetHotelRateCodeListPortType getHotelRateCodeListPortType = null;
  
  public GetHotelRateCodeListPortTypeProxy(String SoapPort_address)   throws  ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
    _initGetHotelRateCodeListPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetHotelRateCodeListPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getHotelRateCodeListPortType = (new GetHotelRateCodeListServiceLocator(SoapPort_address)).getGetHotelRateCodeListSoapPort();
      if (getHotelRateCodeListPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelRateCodeListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelRateCodeListPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
	catch (javax.xml.rpc.ServiceException serviceException) {
		 throw new ServiceException ("Rate Code List Service Exception");
	 } catch (Exception e) {
		 throw new ServiceException (e.getMessage());
	 }
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (getHotelRateCodeListPortType != null)
      ((javax.xml.rpc.Stub)getHotelRateCodeListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetHotelRateCodeListPortType getGetHotelRateCodeListPortType(String SoapPort_address)   throws  ServiceException{
    if (getHotelRateCodeListPortType == null)
      _initGetHotelRateCodeListPortTypeProxy(SoapPort_address);
    return getHotelRateCodeListPortType;
  }
  
  public MI_HotelRateCodeListRS MI_HotelRateCodeListRQ(MI_HotelRateCodeListRQ MI_HotelRateCodeListRQ,String SoapPort_address) throws java.rmi.RemoteException,ServiceException{
    if (getHotelRateCodeListPortType == null)
      _initGetHotelRateCodeListPortTypeProxy(SoapPort_address);
    return getHotelRateCodeListPortType.MI_HotelRateCodeListRQ(MI_HotelRateCodeListRQ,SoapPort_address);
  }
  
  public MI_HotelRateCodeListRS MI_HotelRateCodeListRQ(String marshacode, String rateProgram,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getHotelRateCodeListPortType == null)
	  _initGetHotelRateCodeListPortTypeProxy(SoapPort_address);
	return getHotelRateCodeListPortType.MI_HotelRateCodeListRQ(marshacode, rateProgram,SoapPort_address);
  }
  
}
package com.marriott.rfp.dataaccess.rd.rateproduct.displaytext;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDisplayTextRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDisplayTextRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetRateProductDisplayTextPortTypeProxy implements GetRateProductDisplayTextPortType {
    private static final Logger log = LoggerFactory.getLogger(GetRateProductDisplayTextPortTypeProxy.class);

    private String _endpoint = null;
  private GetRateProductDisplayTextPortType getHotelRoomProductDisplayTextPortType = null;
  
  public GetRateProductDisplayTextPortTypeProxy(String SoapPort_address)   throws  ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
   _initGetRateProductDisplayTextPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetRateProductDisplayTextPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getHotelRoomProductDisplayTextPortType = (new GetRateProductDisplayTextServiceLocator(SoapPort_address)).getGetRateProductDisplayTextSoapPort();
      if (getHotelRoomProductDisplayTextPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelRoomProductDisplayTextPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelRoomProductDisplayTextPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (getHotelRoomProductDisplayTextPortType != null)
      ((javax.xml.rpc.Stub)getHotelRoomProductDisplayTextPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetRateProductDisplayTextPortType getGetRateProductDisplayTextPortType(String SoapPort_address)   throws  ServiceException{
    if (getHotelRoomProductDisplayTextPortType == null)
      _initGetRateProductDisplayTextPortTypeProxy(SoapPort_address);
    return getHotelRoomProductDisplayTextPortType;
  }
  
  public MI_RateProductDisplayTextRS MI_RateProductDisplayTextRQ(MI_RateProductDisplayTextRQ MI_RateProductDisplayTextRQ,String SoapPort_address) throws java.rmi.RemoteException,ServiceException{
    if (getHotelRoomProductDisplayTextPortType == null)
      _initGetRateProductDisplayTextPortTypeProxy(SoapPort_address);
    return getHotelRoomProductDisplayTextPortType.MI_RateProductDisplayTextRQ(MI_RateProductDisplayTextRQ,SoapPort_address);
  }
  
  public MI_RateProductDisplayTextRS MI_RateProductDisplayTextRQ(Channel channel, String langId,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getHotelRoomProductDisplayTextPortType == null)
	  _initGetRateProductDisplayTextPortTypeProxy(SoapPort_address);
	return getHotelRoomProductDisplayTextPortType.MI_RateProductDisplayTextRQ(channel, langId,SoapPort_address);
  }
  
}
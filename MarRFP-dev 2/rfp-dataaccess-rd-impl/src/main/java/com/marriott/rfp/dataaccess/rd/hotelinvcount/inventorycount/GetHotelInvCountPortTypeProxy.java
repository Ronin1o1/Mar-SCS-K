package com.marriott.rfp.dataaccess.rd.hotelinvcount.inventorycount;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.hotelinvcount.OTA_HotelInvCountRQ;
import com.marriott.rfp.object.roomdef.beans.hotelinvcount.OTA_HotelInvCountRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelInvCountPortTypeProxy implements GetHotelInvCountPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelInvCountPortTypeProxy.class);
  private String _endpoint = null;
  private GetHotelInvCountPortType getHotelInvCountPortType = null;
  
  public GetHotelInvCountPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);

        }
    _initGetHotelInvCountPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetHotelInvCountPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getHotelInvCountPortType = (new GetHotelInvCountServiceLocator(SoapPort_address)).getGetHotelInvCountSoapPort();
      if (getHotelInvCountPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelInvCountPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelInvCountPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (getHotelInvCountPortType != null)
      ((javax.xml.rpc.Stub)getHotelInvCountPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetHotelInvCountPortType getGetHotelInvCountPortType(String SoapPort_address)  throws  ServiceException{
    if (getHotelInvCountPortType == null)
      _initGetHotelInvCountPortTypeProxy(SoapPort_address);
    return getHotelInvCountPortType;
  }
  
  public OTA_HotelInvCountRS OTA_HotelInvCountRQ(OTA_HotelInvCountRQ OTA_HotelInvCountRS,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getHotelInvCountPortType == null)
      _initGetHotelInvCountPortTypeProxy(SoapPort_address);
    return getHotelInvCountPortType.OTA_HotelInvCountRQ(OTA_HotelInvCountRS,SoapPort_address);
  }
  
  public OTA_HotelInvCountRS OTA_HotelInvCountRQ(String marshacode,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getHotelInvCountPortType == null)
	  _initGetHotelInvCountPortTypeProxy(SoapPort_address);
	return getHotelInvCountPortType.OTA_HotelInvCountRQ( marshacode, SoapPort_address);
  }
  
}
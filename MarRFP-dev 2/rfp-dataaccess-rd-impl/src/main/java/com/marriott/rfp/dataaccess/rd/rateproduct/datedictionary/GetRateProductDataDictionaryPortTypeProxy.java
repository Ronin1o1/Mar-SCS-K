package com.marriott.rfp.dataaccess.rd.rateproduct.datedictionary;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDataDictionaryRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDataDictionaryRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetRateProductDataDictionaryPortTypeProxy implements GetRateProductDataDictionaryPortType {
  private String _endpoint = null;
  private GetRateProductDataDictionaryPortType getRateProductDataDictionaryPortType = null;
    private static final Logger log = LoggerFactory.getLogger(GetRateProductDataDictionaryPortTypeProxy.class);
  public GetRateProductDataDictionaryPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
    _initGetRateProductDataDictionaryPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetRateProductDataDictionaryPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getRateProductDataDictionaryPortType = (new GetRateProductDataDictionaryServiceLocator(SoapPort_address)).getGetRateProductDataDictionarySoapPort();
      if (getRateProductDataDictionaryPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getRateProductDataDictionaryPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getRateProductDataDictionaryPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (getRateProductDataDictionaryPortType != null)
      ((javax.xml.rpc.Stub)getRateProductDataDictionaryPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetRateProductDataDictionaryPortType getGetRateProductDataDictionaryPortType(String SoapPort_address)  throws  ServiceException{
    if (getRateProductDataDictionaryPortType == null)
      _initGetRateProductDataDictionaryPortTypeProxy(SoapPort_address);
    return getRateProductDataDictionaryPortType;
  }
  
  public MI_RateProductDataDictionaryRS MI_RateProductDataDictionaryRQ(MI_RateProductDataDictionaryRQ MI_RateProductDataDictionaryRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getRateProductDataDictionaryPortType == null)
      _initGetRateProductDataDictionaryPortTypeProxy(SoapPort_address);
    return getRateProductDataDictionaryPortType.MI_RateProductDataDictionaryRQ(MI_RateProductDataDictionaryRQ,SoapPort_address);
  }
  
  public MI_RateProductDataDictionaryRS MI_RateProductDataDictionaryRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getRateProductDataDictionaryPortType == null)
	  _initGetRateProductDataDictionaryPortTypeProxy(SoapPort_address);
	return getRateProductDataDictionaryPortType.MI_RateProductDataDictionaryRQ(SoapPort_address);
  }
  
}
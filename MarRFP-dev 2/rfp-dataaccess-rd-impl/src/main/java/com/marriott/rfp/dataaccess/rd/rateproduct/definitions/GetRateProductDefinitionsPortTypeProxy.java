package com.marriott.rfp.dataaccess.rd.rateproduct.definitions;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetRateProductDefinitionsPortTypeProxy implements GetRateProductDefinitionsPortType {
    private static final Logger log = LoggerFactory.getLogger(GetRateProductDefinitionsPortTypeProxy.class);

    private String _endpoint = null;
  private GetRateProductDefinitionsPortType getRateProductDefinitionsPortType = null;
  
  public GetRateProductDefinitionsPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
    _initGetRateProductDefinitionsPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetRateProductDefinitionsPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getRateProductDefinitionsPortType = (new GetRateProductDefinitionsServiceLocator(SoapPort_address)).getGetRateProductDefinitionsSoapPort();
      if (getRateProductDefinitionsPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getRateProductDefinitionsPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getRateProductDefinitionsPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (getRateProductDefinitionsPortType != null)
      ((javax.xml.rpc.Stub)getRateProductDefinitionsPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetRateProductDefinitionsPortType getGetRateProductDefinitionsPortType(String SoapPort_address)  throws  ServiceException{
    if (getRateProductDefinitionsPortType == null)
      _initGetRateProductDefinitionsPortTypeProxy(SoapPort_address);
    return getRateProductDefinitionsPortType;
  }
  
  public MI_RateProductDefinitionsRS MI_RateProductDefinitionsRQ(MI_RateProductDefinitionsRQ MI_RateProductDefinitionsRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getRateProductDefinitionsPortType == null)
      _initGetRateProductDefinitionsPortTypeProxy(SoapPort_address);
    return getRateProductDefinitionsPortType.MI_RateProductDefinitionsRQ(MI_RateProductDefinitionsRQ,SoapPort_address);
  }
  
  public MI_RateProductDefinitionsRS MI_RateProductDefinitionsRQ(String marshacode,String brandcode, String productcode, String level,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getRateProductDefinitionsPortType == null)
	  _initGetRateProductDefinitionsPortTypeProxy(SoapPort_address);
	return getRateProductDefinitionsPortType.MI_RateProductDefinitionsRQ( marshacode, brandcode,  productcode, level,SoapPort_address);
  }
  
}
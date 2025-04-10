package com.marriott.rfp.dataaccess.rd.rateproduct.definitions;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.RateProductDefinitions;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsNotifRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsNotifRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SetRateProductDefinitionsPortTypeProxy implements SetRateProductDefinitionsPortType {
    private static final Logger log = LoggerFactory.getLogger(SetRateProductDefinitionsPortTypeProxy.class);
  private String _endpoint = null;
  private  SetRateProductDefinitionsPortType portType= null;
  
  public SetRateProductDefinitionsPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);

        }
    _initSetRateProductDefinitionsPortTypeProxy(SoapPort_address);
  }
  
  private void _initSetRateProductDefinitionsPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
        portType = (new SetRateProductDefinitionsServiceLocator(SoapPort_address)).getSetRateProductDefinitionsSoapPort();
      if (portType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)portType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)portType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (portType != null)
      ((javax.xml.rpc.Stub)portType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public SetRateProductDefinitionsPortType getSetRateProductDefinitionsPortType(String SoapPort_address)  throws  ServiceException{
    if (portType == null)
      _initSetRateProductDefinitionsPortTypeProxy(SoapPort_address);
    return portType;
  }
  
  public MI_RateProductDefinitionsNotifRS MI_RateProductDefinitionsNotifRQ(MI_RateProductDefinitionsNotifRQ MI_RateProductDefinitionsNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (portType == null)
      _initSetRateProductDefinitionsPortTypeProxy(SoapPort_address);
    return portType.MI_RateProductDefinitionsNotifRQ(MI_RateProductDefinitionsNotifRQ,SoapPort_address);
  }
  
  public MI_RateProductDefinitionsNotifRS MI_RateProductDefinitionsNotifRQ(String marshacode, String brandcode,RateProductDefinitions roomtypenameinfo,
          String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (portType == null)
	  _initSetRateProductDefinitionsPortTypeProxy(SoapPort_address);
	return portType.MI_RateProductDefinitionsNotifRQ(  marshacode,  brandcode,roomtypenameinfo, loginName,SoapPort_address);
  }
  
}
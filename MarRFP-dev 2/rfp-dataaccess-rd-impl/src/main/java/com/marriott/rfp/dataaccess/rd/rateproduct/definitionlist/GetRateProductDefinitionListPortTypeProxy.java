package com.marriott.rfp.dataaccess.rd.rateproduct.definitionlist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.RateProductDefinition;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsListRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsListRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetRateProductDefinitionListPortTypeProxy implements GetRateProductDefinitionListPortType {
    private static final Logger log = LoggerFactory.getLogger(GetRateProductDefinitionListPortTypeProxy.class);
    private String _endpoint = null;
  private GetRateProductDefinitionListPortType getRateProductDefinitionListPortType = null;
  
  public GetRateProductDefinitionListPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
    _initGetRateProductDefinitionListPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetRateProductDefinitionListPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getRateProductDefinitionListPortType = (new GetRateProductDefinitionListServiceLocator(SoapPort_address)).getGetRateProductDefinitionListSoapPort();
      if (getRateProductDefinitionListPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getRateProductDefinitionListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getRateProductDefinitionListPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (getRateProductDefinitionListPortType != null)
      ((javax.xml.rpc.Stub)getRateProductDefinitionListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetRateProductDefinitionListPortType getGetRateProductDefinitionListPortType(String SoapPort_address)  throws  ServiceException{
    if (getRateProductDefinitionListPortType == null)
      _initGetRateProductDefinitionListPortTypeProxy(SoapPort_address);
    return getRateProductDefinitionListPortType;
  }
  
  public MI_RateProductDefinitionsListRS MI_RateProductDefinitionsListRQ(MI_RateProductDefinitionsListRQ MI_RateProductDefinitionsListRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getRateProductDefinitionListPortType == null)
      _initGetRateProductDefinitionListPortTypeProxy(SoapPort_address);
    return getRateProductDefinitionListPortType.MI_RateProductDefinitionsListRQ(MI_RateProductDefinitionsListRQ,SoapPort_address);
  }
  
  public MI_RateProductDefinitionsListRS MI_RateProductDefinitionsListRQ(String marshacode, String brandcode, String productCode, String productName, long count, String startProduct, String endProduct,
          RateProductDefinition[] rtnd,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getRateProductDefinitionListPortType == null)
	  _initGetRateProductDefinitionListPortTypeProxy(SoapPort_address);
	return getRateProductDefinitionListPortType.MI_RateProductDefinitionsListRQ(marshacode, brandcode,  productCode,  productName, count, startProduct, endProduct, rtnd,SoapPort_address);
  }
  
}
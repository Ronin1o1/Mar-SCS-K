package com.marriott.rfp.dataaccess.rd.rateproduct.displayrateplandescription;

/*
 *  GetDisplayRatePlanDescriptionPortTypeProxy.java
 */
import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_DisplayRatePlanDescriptionRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_DisplayRatePlanDescriptionRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetDisplayRatePlanDescriptionPortTypeProxy implements GetDisplayRatePlanDescriptionPortType {
    private static final Logger log = LoggerFactory.getLogger(GetDisplayRatePlanDescriptionPortTypeProxy.class);
    private String _endpoint = null;
  private GetDisplayRatePlanDescriptionPortType getDisplayRatePlanDescriptionPortType = null;

  public GetDisplayRatePlanDescriptionPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
   _initGetDisplayRatePlanDescriptionPortTypeProxy(SoapPort_address);
  }

  private void _initGetDisplayRatePlanDescriptionPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getDisplayRatePlanDescriptionPortType = (new GetDisplayRatePlanDescriptionServiceLocator(SoapPort_address)).getGetDisplayRatePlanDescriptionSoapPort();
      if (getDisplayRatePlanDescriptionPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getDisplayRatePlanDescriptionPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getDisplayRatePlanDescriptionPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }

    }
	catch (javax.xml.rpc.ServiceException serviceException) {
		throw new ServiceException ("Display RatePlanDescription Service Exception");
	} catch (Exception e) {
		throw new ServiceException (e.getMessage());
	}
  }

  public String getEndpoint() {
    return _endpoint;
  }

  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (getDisplayRatePlanDescriptionPortType != null)
      ((javax.xml.rpc.Stub)getDisplayRatePlanDescriptionPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);

  }

  public GetDisplayRatePlanDescriptionPortType getGetDisplayRatePlanDescriptionPortType(String SoapPort_address)  throws  ServiceException{
    if (getDisplayRatePlanDescriptionPortType == null)
      _initGetDisplayRatePlanDescriptionPortTypeProxy(SoapPort_address);
    return getDisplayRatePlanDescriptionPortType;
  }

  public MI_DisplayRatePlanDescriptionRS MI_DisplayRatePlanDescriptionRQ(MI_DisplayRatePlanDescriptionRQ MI_DisplayRatePlanDescriptionRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getDisplayRatePlanDescriptionPortType == null)
      _initGetDisplayRatePlanDescriptionPortTypeProxy(SoapPort_address);
    return getDisplayRatePlanDescriptionPortType.MI_DisplayRatePlanDescriptionRQ(MI_DisplayRatePlanDescriptionRQ,SoapPort_address);
  }

  public MI_DisplayRatePlanDescriptionRS MI_DisplayRatePlanDescriptionRQ(String marshacode, String requsterID, Channel channel, String langId, Entry entry, String rateProgram,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getDisplayRatePlanDescriptionPortType == null)
	  _initGetDisplayRatePlanDescriptionPortTypeProxy(SoapPort_address);
	return getDisplayRatePlanDescriptionPortType.MI_DisplayRatePlanDescriptionRQ(marshacode,  requsterID, channel,  langId,  entry,  rateProgram,SoapPort_address);
  }

}
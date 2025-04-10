package com.marriott.rfp.dataaccess.rd.rateproduct.rateplanassignmentlist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RatePlanAssignmentListRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RatePlanAssignmentListRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetRatePlanAssignmentListPortTypeProxy implements GetRatePlanAssignmentListPortType {
    private static final Logger log = LoggerFactory.getLogger(GetRatePlanAssignmentListPortTypeProxy.class);
  private String _endpoint = null;
  private GetRatePlanAssignmentListPortType getRatePlanAssignmentListPortType = null;
  
  public GetRatePlanAssignmentListPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
   _initGetRatePlanAssignmentListPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetRatePlanAssignmentListPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getRatePlanAssignmentListPortType = (new GetRatePlanAssignmentListServiceLocator(SoapPort_address)).getGetRatePlanAssignmentListSoapPort();
      if (getRatePlanAssignmentListPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getRatePlanAssignmentListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getRatePlanAssignmentListPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (getRatePlanAssignmentListPortType != null)
      ((javax.xml.rpc.Stub)getRatePlanAssignmentListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetRatePlanAssignmentListPortType getGetRatePlanAssignmentListPortType(String SoapPort_address)  throws  ServiceException{
    if (getRatePlanAssignmentListPortType == null)
      _initGetRatePlanAssignmentListPortTypeProxy(SoapPort_address);
    return getRatePlanAssignmentListPortType;
  }
  
  public MI_RatePlanAssignmentListRS MI_RatePlanAssignmentListRQ(MI_RatePlanAssignmentListRQ MI_RatePlanAssignmentListRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getRatePlanAssignmentListPortType == null)
      _initGetRatePlanAssignmentListPortTypeProxy(SoapPort_address);
    return getRatePlanAssignmentListPortType.MI_RatePlanAssignmentListRQ(MI_RatePlanAssignmentListRQ,SoapPort_address);
  }
  
  public MI_RatePlanAssignmentListRS MI_RatePlanAssignmentListRQ(String marshacode, String brandcode, String ratePlanCode, String ratePlanName, long count,
          String startRatePlanCode, String endRatePlanCode, String startKey, String endKey,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getRatePlanAssignmentListPortType == null)
	  _initGetRatePlanAssignmentListPortTypeProxy(SoapPort_address);
	return getRatePlanAssignmentListPortType.MI_RatePlanAssignmentListRQ( marshacode,  brandcode,  ratePlanCode,  ratePlanName,  count,
             startRatePlanCode,  endRatePlanCode, startKey, endKey,SoapPort_address);
  }
}
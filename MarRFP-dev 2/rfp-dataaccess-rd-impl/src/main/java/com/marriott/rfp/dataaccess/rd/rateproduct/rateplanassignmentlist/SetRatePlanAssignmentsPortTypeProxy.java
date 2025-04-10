package com.marriott.rfp.dataaccess.rd.rateproduct.rateplanassignmentlist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.RatePlanAssignmentList;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RatePlanAssignmentListNotifRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RatePlanAssignmentListNotifRS;

public class SetRatePlanAssignmentsPortTypeProxy implements SetRatePlanAssignmentsPortType {
  private String _endpoint = null;
  private  SetRatePlanAssignmentsPortType portType= null;
  
  public SetRatePlanAssignmentsPortTypeProxy(String SoapPort_address) throws  ServiceException {
    _initSetRatePlanAssignmentsPortTypeProxy(SoapPort_address);
  }
  
  private void _initSetRatePlanAssignmentsPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
        portType = (new SetRatePlanAssignmentsServiceLocator(SoapPort_address)).getSetRatePlanAssignmentsSoapPort();
      if (portType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)portType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)portType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
	catch (javax.xml.rpc.ServiceException serviceException) {
		throw new ServiceException ("SetRatePlanAssignmentsList Service Exception");
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
  
  public SetRatePlanAssignmentsPortType getSetRatePlanAssignmentsPortType(String SoapPort_address)  throws  ServiceException{
    if (portType == null)
      _initSetRatePlanAssignmentsPortTypeProxy(SoapPort_address);
    return portType;
  }
  
  public MI_RatePlanAssignmentListNotifRS MI_RatePlanAssignmentListNotifRQ(MI_RatePlanAssignmentListNotifRQ MI_RatePlanAssignmentListNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (portType == null)
      _initSetRatePlanAssignmentsPortTypeProxy(SoapPort_address);
    return portType.MI_RatePlanAssignmentListNotifRQ(MI_RatePlanAssignmentListNotifRQ,SoapPort_address);
  }
  
  public MI_RatePlanAssignmentListNotifRS MI_RatePlanAssignmentListNotifRQ( String marshacode, String brandcode, RatePlanAssignmentList ratePlanAssignmentList,
          String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (portType == null)
	  _initSetRatePlanAssignmentsPortTypeProxy(SoapPort_address);
	return portType.MI_RatePlanAssignmentListNotifRQ(  marshacode,  brandcode, ratePlanAssignmentList, loginName,SoapPort_address);
  }
  
}
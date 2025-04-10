package com.marriott.rfp.dataaccess.rd.roomtypename.masterroomtypelist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeListRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeListRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetMasterRoomTypeListPortTypeProxy implements GetMasterRoomTypeListPortType {
    private static final Logger log = LoggerFactory.getLogger(GetMasterRoomTypeListPortTypeProxy.class);
  private String _endpoint = null;
  private GetMasterRoomTypeListPortType getMasterRoomTypeListPortType = null;
  
  public GetMasterRoomTypeListPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
   _initGetMasterRoomTypeListPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetMasterRoomTypeListPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getMasterRoomTypeListPortType = (new GetMasterRoomTypeListServiceLocator(SoapPort_address)).getGetMasterRoomTypeListSoapPort();
      if (getMasterRoomTypeListPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getMasterRoomTypeListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getMasterRoomTypeListPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (getMasterRoomTypeListPortType != null)
      ((javax.xml.rpc.Stub)getMasterRoomTypeListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetMasterRoomTypeListPortType getGetMasterRoomTypeListPortType(String SoapPort_address)  throws  ServiceException{
    if (getMasterRoomTypeListPortType == null)
      _initGetMasterRoomTypeListPortTypeProxy(SoapPort_address);
    return getMasterRoomTypeListPortType;
  }
  
  public MI_MasterRoomTypeListRS MI_MasterRoomTypeListRQ(MI_MasterRoomTypeListRQ MI_MasterRoomTypeListRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getMasterRoomTypeListPortType == null)
      _initGetMasterRoomTypeListPortTypeProxy(SoapPort_address);
    return getMasterRoomTypeListPortType.MI_MasterRoomTypeListRQ(MI_MasterRoomTypeListRQ,SoapPort_address);
  }
  
  public MI_MasterRoomTypeListRS MI_MasterRoomTypeListRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getMasterRoomTypeListPortType == null)
	  _initGetMasterRoomTypeListPortTypeProxy(SoapPort_address);
	return getMasterRoomTypeListPortType.MI_MasterRoomTypeListRQ(SoapPort_address);
  }
  
}
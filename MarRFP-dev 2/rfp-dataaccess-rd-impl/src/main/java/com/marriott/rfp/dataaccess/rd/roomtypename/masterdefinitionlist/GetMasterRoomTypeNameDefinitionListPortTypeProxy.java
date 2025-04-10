package com.marriott.rfp.dataaccess.rd.roomtypename.masterdefinitionlist;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionListRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionListRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetMasterRoomTypeNameDefinitionListPortTypeProxy implements GetMasterRoomTypeNameDefinitionListPortType {
    private static final Logger log = LoggerFactory.getLogger(GetMasterRoomTypeNameDefinitionListPortTypeProxy.class);
  private String _endpoint = null;
  private GetMasterRoomTypeNameDefinitionListPortType getMasterRoomTypeNameDefinitionListPortType = null;
  
  public GetMasterRoomTypeNameDefinitionListPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
   _initGetMasterRoomTypeNameDefinitionListPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetMasterRoomTypeNameDefinitionListPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getMasterRoomTypeNameDefinitionListPortType = (new GetMasterRoomTypeNameDefinitionListServiceLocator(SoapPort_address)).getGetMasterRoomTypeNameDefinitionListSoapPort();
      if (getMasterRoomTypeNameDefinitionListPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getMasterRoomTypeNameDefinitionListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getMasterRoomTypeNameDefinitionListPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (getMasterRoomTypeNameDefinitionListPortType != null)
      ((javax.xml.rpc.Stub)getMasterRoomTypeNameDefinitionListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetMasterRoomTypeNameDefinitionListPortType getGetMasterRoomTypeNameDefinitionListPortType(String SoapPort_address)  throws  ServiceException{
    if (getMasterRoomTypeNameDefinitionListPortType == null)
      _initGetMasterRoomTypeNameDefinitionListPortTypeProxy(SoapPort_address);
    return getMasterRoomTypeNameDefinitionListPortType;
  }
  
  public MI_MasterRoomTypeNameDefinitionListRS MI_MasterRoomTypeNameDefinitionListRQ(MI_MasterRoomTypeNameDefinitionListRQ MI_MasterRoomTypeNameDefinitionListRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getMasterRoomTypeNameDefinitionListPortType == null)
      _initGetMasterRoomTypeNameDefinitionListPortTypeProxy(SoapPort_address);
    return getMasterRoomTypeNameDefinitionListPortType.MI_MasterRoomTypeNameDefinitionListRQ(MI_MasterRoomTypeNameDefinitionListRQ,SoapPort_address);
  }
  
  public MI_MasterRoomTypeNameDefinitionListRS MI_MasterRoomTypeNameDefinitionListRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getMasterRoomTypeNameDefinitionListPortType == null)
	  _initGetMasterRoomTypeNameDefinitionListPortTypeProxy(SoapPort_address);
	return getMasterRoomTypeNameDefinitionListPortType.MI_MasterRoomTypeNameDefinitionListRQ(SoapPort_address);
  }
  
}
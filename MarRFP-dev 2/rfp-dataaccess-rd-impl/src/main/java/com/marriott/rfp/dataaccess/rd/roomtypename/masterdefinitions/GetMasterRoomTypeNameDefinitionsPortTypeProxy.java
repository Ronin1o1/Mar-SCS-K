package com.marriott.rfp.dataaccess.rd.roomtypename.masterdefinitions;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionsRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionsRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetMasterRoomTypeNameDefinitionsPortTypeProxy implements GetMasterRoomTypeNameDefinitionsPortType {
    private static final Logger log = LoggerFactory.getLogger(GetMasterRoomTypeNameDefinitionsPortTypeProxy.class);
  private String _endpoint = null;
  private GetMasterRoomTypeNameDefinitionsPortType getMasterRoomTypeNameDefinitionsPortType = null;
  
  public GetMasterRoomTypeNameDefinitionsPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
    _initGetMasterRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetMasterRoomTypeNameDefinitionsPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getMasterRoomTypeNameDefinitionsPortType = (new GetMasterRoomTypeNameDefinitionsServiceLocator(SoapPort_address)).getGetMasterRoomTypeNameDefinitionsSoapPort();
      if (getMasterRoomTypeNameDefinitionsPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getMasterRoomTypeNameDefinitionsPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getMasterRoomTypeNameDefinitionsPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (getMasterRoomTypeNameDefinitionsPortType != null)
      ((javax.xml.rpc.Stub)getMasterRoomTypeNameDefinitionsPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetMasterRoomTypeNameDefinitionsPortType getGetMasterRoomTypeNameDefinitionsPortType(String SoapPort_address)  throws  ServiceException{
    if (getMasterRoomTypeNameDefinitionsPortType == null)
      _initGetMasterRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
    return getMasterRoomTypeNameDefinitionsPortType;
  }
  
  public MI_MasterRoomTypeNameDefinitionsRS MI_MasterRoomTypeNameDefinitionsRQ(MI_MasterRoomTypeNameDefinitionsRQ MI_MasterRoomTypeNameDefinitionsRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getMasterRoomTypeNameDefinitionsPortType == null)
      _initGetMasterRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
    return getMasterRoomTypeNameDefinitionsPortType.MI_MasterRoomTypeNameDefinitionsRQ(MI_MasterRoomTypeNameDefinitionsRQ,SoapPort_address);
  }
  
  public MI_MasterRoomTypeNameDefinitionsRS MI_MasterRoomTypeNameDefinitionsRQ(String roompool,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getMasterRoomTypeNameDefinitionsPortType == null)
	  _initGetMasterRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
	return getMasterRoomTypeNameDefinitionsPortType.MI_MasterRoomTypeNameDefinitionsRQ(roompool,SoapPort_address);
  }
  
}
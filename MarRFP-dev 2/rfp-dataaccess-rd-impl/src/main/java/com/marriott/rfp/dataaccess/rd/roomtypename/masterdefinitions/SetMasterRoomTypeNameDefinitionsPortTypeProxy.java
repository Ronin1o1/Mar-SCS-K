package com.marriott.rfp.dataaccess.rd.roomtypename.masterdefinitions;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.RoomTypeNameDefinitions;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionsNotifRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDefinitionsNotifRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SetMasterRoomTypeNameDefinitionsPortTypeProxy implements SetMasterRoomTypeNameDefinitionsPortType {
    private static final Logger log = LoggerFactory.getLogger(SetMasterRoomTypeNameDefinitionsPortTypeProxy.class);

    private String _endpoint = null;
  private  SetMasterRoomTypeNameDefinitionsPortType portType= null;
  
  public SetMasterRoomTypeNameDefinitionsPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
   _initSetMasterRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
  }
  
  private void _initSetMasterRoomTypeNameDefinitionsPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
        portType = (new SetMasterRoomTypeNameDefinitionsServiceLocator(SoapPort_address)).getSetMasterRoomTypeNameDefinitionsSoapPort();
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
  
  public SetMasterRoomTypeNameDefinitionsPortType getSetMasterRoomTypeNameDefinitionsPortType(String SoapPort_address)  throws  ServiceException{
    if (portType == null)
      _initSetMasterRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
    return portType;
  }
  
  public MI_MasterRoomTypeNameDefinitionsNotifRS MI_MasterRoomTypeNameDefinitionsNotifRQ(MI_MasterRoomTypeNameDefinitionsNotifRQ MI_MasterRoomTypeNameDefinitionsNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (portType == null)
      _initSetMasterRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
    return portType.MI_MasterRoomTypeNameDefinitionsNotifRQ(MI_MasterRoomTypeNameDefinitionsNotifRQ,SoapPort_address);
  }
  
  public MI_MasterRoomTypeNameDefinitionsNotifRS MI_MasterRoomTypeNameDefinitionsNotifRQ( RoomTypeNameDefinitions roomtypenameinfo,
          String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (portType == null)
	  _initSetMasterRoomTypeNameDefinitionsPortTypeProxy(SoapPort_address);
	return portType.MI_MasterRoomTypeNameDefinitionsNotifRQ( roomtypenameinfo, loginName,SoapPort_address);
  }
  
}
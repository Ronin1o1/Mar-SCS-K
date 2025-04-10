package com.marriott.rfp.dataaccess.rd.roomtypename.datadictionary;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDataDictionaryRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDataDictionaryRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetMasterRoomTypeNameDataDictionaryPortTypeProxy implements GetMasterRoomTypeNameDataDictionaryPortType {
    private static final Logger log = LoggerFactory.getLogger(GetMasterRoomTypeNameDataDictionaryPortTypeProxy.class);
  private String _endpoint = null;
  private GetMasterRoomTypeNameDataDictionaryPortType getMasterRoomTypeNameDataDictionaryPortType = null;
  
  public GetMasterRoomTypeNameDataDictionaryPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
  _initGetMasterRoomTypeNameDataDictionaryPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetMasterRoomTypeNameDataDictionaryPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getMasterRoomTypeNameDataDictionaryPortType = (new GetMasterRoomTypeNameDataDictionaryServiceLocator(SoapPort_address)).getGetMasterRoomTypeNameDataDictionarySoapPort();
      if (getMasterRoomTypeNameDataDictionaryPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getMasterRoomTypeNameDataDictionaryPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getMasterRoomTypeNameDataDictionaryPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (getMasterRoomTypeNameDataDictionaryPortType != null)
      ((javax.xml.rpc.Stub)getMasterRoomTypeNameDataDictionaryPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetMasterRoomTypeNameDataDictionaryPortType getGetMasterRoomTypeNameDataDictionaryPortType(String SoapPort_address)  throws  ServiceException{
    if (getMasterRoomTypeNameDataDictionaryPortType == null)
      _initGetMasterRoomTypeNameDataDictionaryPortTypeProxy(SoapPort_address);
    return getMasterRoomTypeNameDataDictionaryPortType;
  }
  
  public MI_MasterRoomTypeNameDataDictionaryRS MI_MasterRoomTypeNameDataDictionaryRQ(MI_MasterRoomTypeNameDataDictionaryRQ MI_MasterRoomTypeNameDataDictionaryRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getMasterRoomTypeNameDataDictionaryPortType == null)
      _initGetMasterRoomTypeNameDataDictionaryPortTypeProxy(SoapPort_address);
    return getMasterRoomTypeNameDataDictionaryPortType.MI_MasterRoomTypeNameDataDictionaryRQ(MI_MasterRoomTypeNameDataDictionaryRQ,SoapPort_address);
  }
  
  public MI_MasterRoomTypeNameDataDictionaryRS MI_MasterRoomTypeNameDataDictionaryRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getMasterRoomTypeNameDataDictionaryPortType == null)
	  _initGetMasterRoomTypeNameDataDictionaryPortTypeProxy(SoapPort_address);
	return getMasterRoomTypeNameDataDictionaryPortType.MI_MasterRoomTypeNameDataDictionaryRQ(SoapPort_address);
  }
  
}
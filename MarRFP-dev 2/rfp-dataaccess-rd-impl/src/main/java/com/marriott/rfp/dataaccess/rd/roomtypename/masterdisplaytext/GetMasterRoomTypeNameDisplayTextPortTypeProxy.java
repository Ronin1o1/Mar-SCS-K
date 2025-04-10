package com.marriott.rfp.dataaccess.rd.roomtypename.masterdisplaytext;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetMasterRoomTypeNameDisplayTextPortTypeProxy implements GetMasterRoomTypeNameDisplayTextPortType {
    private static final Logger log = LoggerFactory.getLogger(GetMasterRoomTypeNameDisplayTextPortTypeProxy.class);
  private String _endpoint = null;
  private GetMasterRoomTypeNameDisplayTextPortType getHotelRoomProductDisplayTextPortType = null;
  
  public GetMasterRoomTypeNameDisplayTextPortTypeProxy(String SoapPort_address)   throws  ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
    _initGetMasterRoomTypeNameDisplayTextPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetMasterRoomTypeNameDisplayTextPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getHotelRoomProductDisplayTextPortType = (new GetMasterRoomTypeNameDisplayTextServiceLocator(SoapPort_address)).getGetMasterRoomTypeNameDisplayTextSoapPort();
      if (getHotelRoomProductDisplayTextPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelRoomProductDisplayTextPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelRoomProductDisplayTextPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
	catch (javax.xml.rpc.ServiceException serviceException) {
		 throw new ServiceException ("Rate Code List Service Exception");
	 } catch (Exception e) {
		 throw new ServiceException (e.getMessage());
	 }
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (getHotelRoomProductDisplayTextPortType != null)
      ((javax.xml.rpc.Stub)getHotelRoomProductDisplayTextPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetMasterRoomTypeNameDisplayTextPortType getGetMasterRoomTypeNameDisplayTextPortType(String SoapPort_address)   throws  ServiceException{
    if (getHotelRoomProductDisplayTextPortType == null)
      _initGetMasterRoomTypeNameDisplayTextPortTypeProxy(SoapPort_address);
    return getHotelRoomProductDisplayTextPortType;
  }
  
  public MI_MasterRoomTypeNameDisplayTextRS MI_MasterRoomTypeNameDisplayTextRQ(MI_MasterRoomTypeNameDisplayTextRQ MI_MasterRoomTypeNameDisplayTextRQ,String SoapPort_address) throws java.rmi.RemoteException,ServiceException{
    if (getHotelRoomProductDisplayTextPortType == null)
      _initGetMasterRoomTypeNameDisplayTextPortTypeProxy(SoapPort_address);
    return getHotelRoomProductDisplayTextPortType.MI_MasterRoomTypeNameDisplayTextRQ(MI_MasterRoomTypeNameDisplayTextRQ,SoapPort_address);
  }
  
  public MI_MasterRoomTypeNameDisplayTextRS MI_MasterRoomTypeNameDisplayTextRQ(Channel channel, String langId,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getHotelRoomProductDisplayTextPortType == null)
	  _initGetMasterRoomTypeNameDisplayTextPortTypeProxy(SoapPort_address);
	return getHotelRoomProductDisplayTextPortType.MI_MasterRoomTypeNameDisplayTextRQ(channel, langId,SoapPort_address);
  }
  
}
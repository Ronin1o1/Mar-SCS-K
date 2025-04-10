package com.marriott.rfp.dataaccess.rd.roomdef.productdisplayrules;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelRoomProductDisplayRulesPortTypeProxy implements GetHotelRoomProductDisplayRulesPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelRoomProductDisplayRulesPortTypeProxy.class);
    private String _endpoint = null;
  private GetHotelRoomProductDisplayRulesPortType getHotelRoomProductDisplayRulesPortType = null;
  
  public GetHotelRoomProductDisplayRulesPortTypeProxy(String SoapPort_address)   throws  ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}  _initGetHotelRoomProductDisplayRulesPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetHotelRoomProductDisplayRulesPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getHotelRoomProductDisplayRulesPortType = (new GetHotelRoomProductDisplayRulesServiceLocator(SoapPort_address)).getGetHotelRoomProductDisplayRulesSoapPort();
      if (getHotelRoomProductDisplayRulesPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelRoomProductDisplayRulesPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelRoomProductDisplayRulesPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (getHotelRoomProductDisplayRulesPortType != null)
      ((javax.xml.rpc.Stub)getHotelRoomProductDisplayRulesPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetHotelRoomProductDisplayRulesPortType getGetHotelRoomProductDisplayRulesPortType(String SoapPort_address)   throws  ServiceException{
    if (getHotelRoomProductDisplayRulesPortType == null)
      _initGetHotelRoomProductDisplayRulesPortTypeProxy(SoapPort_address);
    return getHotelRoomProductDisplayRulesPortType;
  }
  
  public MI_HotelRoomProductDisplayRulesRS MI_HotelRoomProductDisplayRulesRQ(MI_HotelRoomProductDisplayRulesRQ MI_HotelRoomProductDisplayRulesRQ,String SoapPort_address) throws java.rmi.RemoteException,ServiceException{
    if (getHotelRoomProductDisplayRulesPortType == null)
      _initGetHotelRoomProductDisplayRulesPortTypeProxy(SoapPort_address);
    return getHotelRoomProductDisplayRulesPortType.MI_HotelRoomProductDisplayRulesRQ(MI_HotelRoomProductDisplayRulesRQ,SoapPort_address);
  }
  
  public MI_HotelRoomProductDisplayRulesRS MI_HotelRoomProductDisplayRulesRQ(Channel channel, Entry entry,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getHotelRoomProductDisplayRulesPortType == null)
	  _initGetHotelRoomProductDisplayRulesPortTypeProxy(SoapPort_address);
	return getHotelRoomProductDisplayRulesPortType.MI_HotelRoomProductDisplayRulesRQ(channel, entry,SoapPort_address);
  }
  
}
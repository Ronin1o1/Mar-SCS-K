package com.marriott.rfp.dataaccess.rd.roomdef.productdisplayrules;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesNotifRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayRulesRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SetHotelRoomProductDisplayRulesNotifPortTypeProxy implements SetHotelRoomProductDisplayRulesNotifPortType {
    private static final Logger log = LoggerFactory.getLogger(SetHotelRoomProductDisplayRulesNotifPortTypeProxy.class);
    private String _endpoint = null;
  private SetHotelRoomProductDisplayRulesNotifPortType hotelRoomProductDisplayRulesNotifPortType = null;
  
  public SetHotelRoomProductDisplayRulesNotifPortTypeProxy(String SoapPort_address) throws ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
	_initHotelRoomProductDisplayRulesNotifPortTypeProxy(SoapPort_address);
  }
  
  private void _initHotelRoomProductDisplayRulesNotifPortTypeProxy(String SoapPort_address) throws ServiceException{
    try {
		hotelRoomProductDisplayRulesNotifPortType = (new SetHotelRoomProductDisplayRulesNotifServiceLocator(SoapPort_address)).getSetHotelRoomProductDisplayRulesNotifSoapPort();
      if (hotelRoomProductDisplayRulesNotifPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)hotelRoomProductDisplayRulesNotifPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)hotelRoomProductDisplayRulesNotifPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
	catch (javax.xml.rpc.ServiceException serviceException) {
		throw new ServiceException ("Set Hotel Room Product Info Notif Service Exception");
	} catch (Exception e) {
		throw new ServiceException (e.getMessage());
	}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (hotelRoomProductDisplayRulesNotifPortType != null)
      ((javax.xml.rpc.Stub)hotelRoomProductDisplayRulesNotifPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public SetHotelRoomProductDisplayRulesNotifPortType getRemoveHotelRoomProductDisplayRulesNotifPortType(String SoapPort_address) throws ServiceException{
    if (hotelRoomProductDisplayRulesNotifPortType == null)
	_initHotelRoomProductDisplayRulesNotifPortTypeProxy(SoapPort_address);
    return hotelRoomProductDisplayRulesNotifPortType;
  }
  
  public MI_HotelRoomProductDisplayRulesNotifRS MI_HotelRoomProductDisplayRulesNotifRQ(MI_HotelRoomProductDisplayRulesNotifRQ MI_HotelRoomProductDisplayRulesNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (hotelRoomProductDisplayRulesNotifPortType == null)
	_initHotelRoomProductDisplayRulesNotifPortTypeProxy(SoapPort_address);
    return hotelRoomProductDisplayRulesNotifPortType.MI_HotelRoomProductDisplayRulesNotifRQ(MI_HotelRoomProductDisplayRulesNotifRQ,SoapPort_address);
  }
 
   public MI_HotelRoomProductDisplayRulesNotifRS UpdateDisplayRules( MI_HotelRoomProductDisplayRulesRS roomproductInfo, String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (hotelRoomProductDisplayRulesNotifPortType == null)
	_initHotelRoomProductDisplayRulesNotifPortTypeProxy(SoapPort_address);
	return hotelRoomProductDisplayRulesNotifPortType.UpdateDisplayRules(roomproductInfo,  loginName,SoapPort_address);
  }
  
}
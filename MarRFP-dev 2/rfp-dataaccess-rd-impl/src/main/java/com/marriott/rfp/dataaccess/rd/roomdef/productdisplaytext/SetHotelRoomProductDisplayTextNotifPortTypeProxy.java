package com.marriott.rfp.dataaccess.rd.roomdef.productdisplaytext;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextNotifRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SetHotelRoomProductDisplayTextNotifPortTypeProxy implements SetHotelRoomProductDisplayTextNotifPortType {
    private static final Logger log = LoggerFactory.getLogger(SetHotelRoomProductDisplayTextNotifPortTypeProxy.class);
  private String _endpoint = null;
  private SetHotelRoomProductDisplayTextNotifPortType hotelRoomProductDisplayRulesNotifPortType = null;
  
  public SetHotelRoomProductDisplayTextNotifPortTypeProxy(String SoapPort_address) throws ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
	_initHotelRoomProductDisplayTextNotifPortTypeProxy(SoapPort_address);
  }
  
  private void _initHotelRoomProductDisplayTextNotifPortTypeProxy(String SoapPort_address) throws ServiceException{
    try {
		hotelRoomProductDisplayRulesNotifPortType = (new SetHotelRoomProductDisplayTextNotifServiceLocator(SoapPort_address)).getSetHotelRoomProductDisplayTextNotifSoapPort();
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
  
  public SetHotelRoomProductDisplayTextNotifPortType getRemoveHotelRoomProductDisplayTextNotifPortType(String SoapPort_address) throws ServiceException{
    if (hotelRoomProductDisplayRulesNotifPortType == null)
	_initHotelRoomProductDisplayTextNotifPortTypeProxy(SoapPort_address);
    return hotelRoomProductDisplayRulesNotifPortType;
  }
  
  public MI_HotelRoomProductDisplayTextNotifRS MI_HotelRoomProductDisplayTextNotifRQ(MI_HotelRoomProductDisplayTextNotifRQ MI_HotelRoomProductDisplayTextNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (hotelRoomProductDisplayRulesNotifPortType == null)
	_initHotelRoomProductDisplayTextNotifPortTypeProxy(SoapPort_address);
    return hotelRoomProductDisplayRulesNotifPortType.MI_HotelRoomProductDisplayTextNotifRQ(MI_HotelRoomProductDisplayTextNotifRQ,SoapPort_address);
  }
 
   public MI_HotelRoomProductDisplayTextNotifRS UpdateDisplayText( MI_HotelRoomProductDisplayTextRS roomproductInfo, String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (hotelRoomProductDisplayRulesNotifPortType == null)
	_initHotelRoomProductDisplayTextNotifPortTypeProxy(SoapPort_address);
	return hotelRoomProductDisplayRulesNotifPortType.UpdateDisplayText(roomproductInfo,  loginName,SoapPort_address);
  }
  
}
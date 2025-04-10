package com.marriott.rfp.dataaccess.rd.roomdef.roomproductinfo;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoNotifRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SetHotelRoomProductInfoNotifPortTypeProxy implements SetHotelRoomProductInfoNotifPortType {
  private String _endpoint = null;
  private SetHotelRoomProductInfoNotifPortType hotelRoomProductInfoNotifPortType = null;
    private static final Logger log = LoggerFactory.getLogger(SetHotelRoomProductInfoNotifPortTypeProxy.class);
  public SetHotelRoomProductInfoNotifPortTypeProxy(String SoapPort_address) throws ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
 	_initHotelRoomProductInfoNotifPortTypeProxy(SoapPort_address);
  }
  
  private void _initHotelRoomProductInfoNotifPortTypeProxy(String SoapPort_address) throws ServiceException{
    try {
		hotelRoomProductInfoNotifPortType = (new SetHotelRoomProductInfoNotifServiceLocator(SoapPort_address)).getRemoveHotelRoomProductInfoNotifSoapPort();
      if (hotelRoomProductInfoNotifPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)hotelRoomProductInfoNotifPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)hotelRoomProductInfoNotifPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (hotelRoomProductInfoNotifPortType != null)
      ((javax.xml.rpc.Stub)hotelRoomProductInfoNotifPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public SetHotelRoomProductInfoNotifPortType getRemoveHotelRoomProductInfoNotifPortType(String SoapPort_address) throws ServiceException{
    if (hotelRoomProductInfoNotifPortType == null)
	_initHotelRoomProductInfoNotifPortTypeProxy(SoapPort_address);
    return hotelRoomProductInfoNotifPortType;
  }
  
  public MI_HotelRoomProductInfoNotifRS MI_HotelRoomProductInfoNotifRQ(MI_HotelRoomProductInfoNotifRQ MI_HotelRoomProductInfoNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (hotelRoomProductInfoNotifPortType == null)
	_initHotelRoomProductInfoNotifPortTypeProxy(SoapPort_address);
    return hotelRoomProductInfoNotifPortType.MI_HotelRoomProductInfoNotifRQ(MI_HotelRoomProductInfoNotifRQ,SoapPort_address);
  }
 
  public MI_HotelRoomProductInfoNotifRS RemoveRateLevel(String marshacode, String roompool, String rateprogram, String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (hotelRoomProductInfoNotifPortType == null)
	_initHotelRoomProductInfoNotifPortTypeProxy(SoapPort_address);
	return hotelRoomProductInfoNotifPortType.RemoveRateLevel(marshacode, roompool,  rateprogram, loginName,SoapPort_address);
  }
 
  public MI_HotelRoomProductInfoNotifRS UpdateRoomProduct(String marshacode, String roompool, String rateprogram, MI_HotelRoomProductInfoRS roomproductInfo, String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (hotelRoomProductInfoNotifPortType == null)
	_initHotelRoomProductInfoNotifPortTypeProxy(SoapPort_address);
	return hotelRoomProductInfoNotifPortType.UpdateRoomProduct(marshacode, roompool,  rateprogram,roomproductInfo,  loginName,SoapPort_address);
  }
  
}
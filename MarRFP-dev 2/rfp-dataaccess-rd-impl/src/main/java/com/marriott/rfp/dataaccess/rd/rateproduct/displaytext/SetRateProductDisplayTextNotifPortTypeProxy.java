package com.marriott.rfp.dataaccess.rd.rateproduct.displaytext;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDisplayTextNotifRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDisplayTextNotifRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDisplayTextRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SetRateProductDisplayTextNotifPortTypeProxy implements SetRateProductDisplayTextNotifPortType {
    private static final Logger log = LoggerFactory.getLogger(SetRateProductDisplayTextNotifPortTypeProxy.class);
  private String _endpoint = null;
  private SetRateProductDisplayTextNotifPortType hotelRoomProductDisplayRulesNotifPortType = null;
  
  public SetRateProductDisplayTextNotifPortTypeProxy(String SoapPort_address) throws ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
	_initRateProductDisplayTextNotifPortTypeProxy(SoapPort_address);
  }
  
  private void _initRateProductDisplayTextNotifPortTypeProxy(String SoapPort_address) throws ServiceException{
    try {
		hotelRoomProductDisplayRulesNotifPortType = (new SetRateProductDisplayTextNotifServiceLocator(SoapPort_address)).getSetRateProductDisplayTextNotifSoapPort();
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
  
  public SetRateProductDisplayTextNotifPortType getRemoveRateProductDisplayTextNotifPortType(String SoapPort_address) throws ServiceException{
    if (hotelRoomProductDisplayRulesNotifPortType == null)
	_initRateProductDisplayTextNotifPortTypeProxy(SoapPort_address);
    return hotelRoomProductDisplayRulesNotifPortType;
  }
  
  public MI_RateProductDisplayTextNotifRS MI_RateProductDisplayTextNotifRQ(MI_RateProductDisplayTextNotifRQ MI_RateProductDisplayTextNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (hotelRoomProductDisplayRulesNotifPortType == null)
	_initRateProductDisplayTextNotifPortTypeProxy(SoapPort_address);
    return hotelRoomProductDisplayRulesNotifPortType.MI_RateProductDisplayTextNotifRQ(MI_RateProductDisplayTextNotifRQ,SoapPort_address);
  }
 
   public MI_RateProductDisplayTextNotifRS UpdateDisplayText( MI_RateProductDisplayTextRS roomproductInfo, String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (hotelRoomProductDisplayRulesNotifPortType == null)
	_initRateProductDisplayTextNotifPortTypeProxy(SoapPort_address);
	return hotelRoomProductDisplayRulesNotifPortType.UpdateDisplayText(roomproductInfo,  loginName,SoapPort_address);
  }
  
}
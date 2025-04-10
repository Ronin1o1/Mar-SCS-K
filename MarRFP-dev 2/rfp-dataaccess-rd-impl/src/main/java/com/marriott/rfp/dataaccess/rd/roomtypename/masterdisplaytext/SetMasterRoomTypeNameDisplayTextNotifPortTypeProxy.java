package com.marriott.rfp.dataaccess.rd.roomtypename.masterdisplaytext;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextNotifRQ;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextNotifRS;
import com.marriott.rfp.object.roomdef.beans.roomtypenamedef.MI_MasterRoomTypeNameDisplayTextRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SetMasterRoomTypeNameDisplayTextNotifPortTypeProxy implements SetMasterRoomTypeNameDisplayTextNotifPortType {
    private static final Logger log = LoggerFactory.getLogger(SetMasterRoomTypeNameDisplayTextNotifPortTypeProxy.class);

    private String _endpoint = null;
  private SetMasterRoomTypeNameDisplayTextNotifPortType hotelRoomProductDisplayRulesNotifPortType = null;
  
  public SetMasterRoomTypeNameDisplayTextNotifPortTypeProxy(String SoapPort_address) throws ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
	_initMasterRoomTypeNameDisplayTextNotifPortTypeProxy(SoapPort_address);
  }
  
  private void _initMasterRoomTypeNameDisplayTextNotifPortTypeProxy(String SoapPort_address) throws ServiceException{
    try {
		hotelRoomProductDisplayRulesNotifPortType = (new SetMasterRoomTypeNameDisplayTextNotifServiceLocator(SoapPort_address)).getSetMasterRoomTypeNameDisplayTextNotifSoapPort();
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
  
  public SetMasterRoomTypeNameDisplayTextNotifPortType getRemoveMasterRoomTypeNameDisplayTextNotifPortType(String SoapPort_address) throws ServiceException{
    if (hotelRoomProductDisplayRulesNotifPortType == null)
	_initMasterRoomTypeNameDisplayTextNotifPortTypeProxy(SoapPort_address);
    return hotelRoomProductDisplayRulesNotifPortType;
  }
  
  public MI_MasterRoomTypeNameDisplayTextNotifRS MI_MasterRoomTypeNameDisplayTextNotifRQ(MI_MasterRoomTypeNameDisplayTextNotifRQ MI_MasterRoomTypeNameDisplayTextNotifRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (hotelRoomProductDisplayRulesNotifPortType == null)
	_initMasterRoomTypeNameDisplayTextNotifPortTypeProxy(SoapPort_address);
    return hotelRoomProductDisplayRulesNotifPortType.MI_MasterRoomTypeNameDisplayTextNotifRQ(MI_MasterRoomTypeNameDisplayTextNotifRQ,SoapPort_address);
  }
 
   public MI_MasterRoomTypeNameDisplayTextNotifRS UpdateDisplayText( MI_MasterRoomTypeNameDisplayTextRS roomproductInfo, String loginName,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (hotelRoomProductDisplayRulesNotifPortType == null)
	_initMasterRoomTypeNameDisplayTextNotifPortTypeProxy(SoapPort_address);
	return hotelRoomProductDisplayRulesNotifPortType.UpdateDisplayText(roomproductInfo,  loginName,SoapPort_address);
  }
  
}
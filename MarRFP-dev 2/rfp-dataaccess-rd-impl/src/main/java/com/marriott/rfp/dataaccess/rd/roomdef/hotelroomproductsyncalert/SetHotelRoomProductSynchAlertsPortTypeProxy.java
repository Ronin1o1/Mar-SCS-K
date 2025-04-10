package com.marriott.rfp.dataaccess.rd.roomdef.hotelroomproductsyncalert;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductSynchModifyRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductSynchModifyRS;
import com.marriott.rfp.object.roomdef.beans.SynchAlerts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SetHotelRoomProductSynchAlertsPortTypeProxy implements SetHotelRoomProductSynchAlertsPortType {
    private static final Logger log = LoggerFactory.getLogger(SetHotelRoomProductSynchAlertsPortTypeProxy.class);
    private String _endpoint = null;
  private SetHotelRoomProductSynchAlertsPortType portType = null;
  
  public SetHotelRoomProductSynchAlertsPortTypeProxy(String SoapPort_address) throws ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}   _initSetHotelRoomProductSynchAlertsPortTypeProxy(SoapPort_address);
  }
  
  private void _initSetHotelRoomProductSynchAlertsPortTypeProxy(String SoapPort_address) throws ServiceException{
    try {
		portType = (new SetHotelRoomProductSynchAlertsServiceLocator(SoapPort_address)).getSetHotelRoomProductSynchAlertsSoapPort();
      if (portType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)portType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)portType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
	catch (javax.xml.rpc.ServiceException serviceException) {
		throw new ServiceException("Amenity List Service Exception");
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
  
  public SetHotelRoomProductSynchAlertsPortType getSetHotelRoomProductSynchAlertsPortType(String SoapPort_address) throws ServiceException {
    if (portType == null)
      _initSetHotelRoomProductSynchAlertsPortTypeProxy(SoapPort_address);
    return portType;
  }
  
  public MI_HotelRoomProductSynchModifyRS MI_HotelRoomProductSynchModifyRQ(MI_HotelRoomProductSynchModifyRQ MI_HotelRoomProductSynchModifyRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (portType == null)
      _initSetHotelRoomProductSynchAlertsPortTypeProxy(SoapPort_address);
    return portType.MI_HotelRoomProductSynchModifyRQ(MI_HotelRoomProductSynchModifyRQ,SoapPort_address);
  }
 
  public MI_HotelRoomProductSynchModifyRS DeleteSynchAlerts(String marshacode,  String loginName, SynchAlerts[] sa,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (portType == null)
	_initSetHotelRoomProductSynchAlertsPortTypeProxy(SoapPort_address);
	return portType.DeleteSynchAlerts(marshacode,  loginName, sa,SoapPort_address);
  }
 
  
}
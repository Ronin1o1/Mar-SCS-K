package com.marriott.rfp.dataaccess.rd.roomdef.hotelroomproductsyncalert;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductSynchAlertsRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductSynchAlertsRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelRoomProductSynchAlertsPortTypeProxy implements GetHotelRoomProductSynchAlertsPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelRoomProductSynchAlertsPortTypeProxy.class);
  private String _endpoint = null;
  private GetHotelRoomProductSynchAlertsPortType getHotelRoomProductSynchAlertsPortType = null;
  
  public GetHotelRoomProductSynchAlertsPortTypeProxy(String SoapPort_address)  throws ServiceException{
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
    _initGetHotelRoomProductSynchAlertsPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetHotelRoomProductSynchAlertsPortTypeProxy(String SoapPort_address) throws ServiceException {
    try {
      getHotelRoomProductSynchAlertsPortType = (new GetHotelRoomProductSynchAlertsServiceLocator(SoapPort_address)).getGetHotelRoomProductSynchAlertsSoapPort();
      if (getHotelRoomProductSynchAlertsPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelRoomProductSynchAlertsPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelRoomProductSynchAlertsPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
	catch (javax.xml.rpc.ServiceException serviceException) {
	   throw new ServiceException ("Room Product Synch Alerts Service Exception");
   } catch (Exception e) {
	   throw new ServiceException (e.getMessage());
   }
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (getHotelRoomProductSynchAlertsPortType != null)
      ((javax.xml.rpc.Stub)getHotelRoomProductSynchAlertsPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetHotelRoomProductSynchAlertsPortType getGetHotelRoomProductSynchAlertsPortType(String SoapPort_address)  throws ServiceException{
    if (getHotelRoomProductSynchAlertsPortType == null)
      _initGetHotelRoomProductSynchAlertsPortTypeProxy(SoapPort_address);
    return getHotelRoomProductSynchAlertsPortType;
  }
  
  public MI_HotelRoomProductSynchAlertsRS MI_HotelRoomProductSynchAlertsRQ(MI_HotelRoomProductSynchAlertsRQ MI_HotelRoomProductSynchAlertsRQ, String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getHotelRoomProductSynchAlertsPortType == null)
      _initGetHotelRoomProductSynchAlertsPortTypeProxy(SoapPort_address);
    return getHotelRoomProductSynchAlertsPortType.MI_HotelRoomProductSynchAlertsRQ(MI_HotelRoomProductSynchAlertsRQ,SoapPort_address);
  }
  
  public MI_HotelRoomProductSynchAlertsRS MI_HotelRoomProductSynchAlertsRQ(String marshacode, String roompool,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getHotelRoomProductSynchAlertsPortType == null)
	  _initGetHotelRoomProductSynchAlertsPortTypeProxy(SoapPort_address);
	return getHotelRoomProductSynchAlertsPortType.MI_HotelRoomProductSynchAlertsRQ(marshacode, roompool,SoapPort_address);
  }
  
}
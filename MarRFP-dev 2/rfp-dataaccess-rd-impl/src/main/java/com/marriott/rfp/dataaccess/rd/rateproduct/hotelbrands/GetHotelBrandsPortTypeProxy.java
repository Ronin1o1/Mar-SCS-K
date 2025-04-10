package com.marriott.rfp.dataaccess.rd.rateproduct.hotelbrands;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.dataaccess.rd.roomtypename.datadictionary.GetMasterRoomTypeNameDataDictionaryPortTypeProxy;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_HotelBrandsRQ;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_HotelBrandsRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelBrandsPortTypeProxy implements GetHotelBrandsPortType {
    private static final Logger log = LoggerFactory.getLogger(GetHotelBrandsPortTypeProxy.class);

    private String _endpoint = null;
  private GetHotelBrandsPortType getHotelBrandCodeListPortType = null;
  
  public GetHotelBrandsPortTypeProxy(String SoapPort_address) throws  ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		}
		catch (Throwable e) {
            log.error(e.getMessage(),e);
		}
   _initGetHotelBrandCodeListPortTypeProxy(SoapPort_address);
  }
  
  private void _initGetHotelBrandCodeListPortTypeProxy(String SoapPort_address)  throws  ServiceException{
    try {
      getHotelBrandCodeListPortType = (new GetHotelBrandsServiceLocator(SoapPort_address)).getGetHotelBrandCodeListSoapPort();
      if (getHotelBrandCodeListPortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)getHotelBrandCodeListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)getHotelBrandCodeListPortType)._getProperty("javax.xml.rpc.service.endpoint.address");
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
    if (getHotelBrandCodeListPortType != null)
      ((javax.xml.rpc.Stub)getHotelBrandCodeListPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public GetHotelBrandsPortType getGetHotelBrandCodeListPortType(String SoapPort_address)  throws  ServiceException{
    if (getHotelBrandCodeListPortType == null)
      _initGetHotelBrandCodeListPortTypeProxy(SoapPort_address);
    return getHotelBrandCodeListPortType;
  }
  
  public MI_HotelBrandsRS MI_HotelBrandsRQ(MI_HotelBrandsRQ MI_HotelBrandsRQ,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
    if (getHotelBrandCodeListPortType == null)
      _initGetHotelBrandCodeListPortTypeProxy(SoapPort_address);
    return getHotelBrandCodeListPortType.MI_HotelBrandsRQ(MI_HotelBrandsRQ,SoapPort_address);
  }
  
  public MI_HotelBrandsRS MI_HotelBrandsRQ(String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
	if (getHotelBrandCodeListPortType == null)
	  _initGetHotelBrandCodeListPortTypeProxy(SoapPort_address);
	return getHotelBrandCodeListPortType.MI_HotelBrandsRQ(SoapPort_address);
  }
  
  public MI_HotelBrandsRS MI_HotelBrandsRQ(String marshaCode,String SoapPort_address) throws java.rmi.RemoteException, ServiceException{
  	if (getHotelBrandCodeListPortType == null)
  	  _initGetHotelBrandCodeListPortTypeProxy(SoapPort_address);
  	return getHotelBrandCodeListPortType.MI_HotelBrandsRQ( marshaCode,SoapPort_address);
    }

}
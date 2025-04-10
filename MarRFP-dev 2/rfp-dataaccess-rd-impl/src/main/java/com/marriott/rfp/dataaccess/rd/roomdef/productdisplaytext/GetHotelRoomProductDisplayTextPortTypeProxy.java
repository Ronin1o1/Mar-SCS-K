package com.marriott.rfp.dataaccess.rd.roomdef.productdisplaytext;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextRS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GetHotelRoomProductDisplayTextPortTypeProxy implements GetHotelRoomProductDisplayTextPortType {
	private static final Logger log = LoggerFactory.getLogger(GetHotelRoomProductDisplayTextPortTypeProxy.class);
	private String _endpoint = null;
	private GetHotelRoomProductDisplayTextPortType getHotelRoomProductDisplayTextPortType = null;

	public GetHotelRoomProductDisplayTextPortTypeProxy(String SoapPort_address) throws ServiceException {
		try {
			System.setProperty("axis.ClientConfigFile", "/com/marriott/rfp/dataaccess/rd/client-config.wsdd");
		} catch (Throwable e) {
			log.error(e.getMessage(),e);
		}
		_initGetHotelRoomProductDisplayTextPortTypeProxy(SoapPort_address);
	}

	private void _initGetHotelRoomProductDisplayTextPortTypeProxy(String SoapPort_address) throws ServiceException {

		getHotelRoomProductDisplayTextPortType = (new GetHotelRoomProductDisplayTextServiceLocator(SoapPort_address))
				.getGetHotelRoomProductDisplayTextSoapPort();
		if (getHotelRoomProductDisplayTextPortType != null) {
			if (_endpoint != null)
				((javax.xml.rpc.Stub) getHotelRoomProductDisplayTextPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
			else
				_endpoint = (String) ((javax.xml.rpc.Stub) getHotelRoomProductDisplayTextPortType)
						._getProperty("javax.xml.rpc.service.endpoint.address");
		}

	}

	public String getEndpoint() {
		return _endpoint;
	}

	public void setEndpoint(String endpoint) {
		_endpoint = endpoint;
		if (getHotelRoomProductDisplayTextPortType != null)
			((javax.xml.rpc.Stub) getHotelRoomProductDisplayTextPortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);

	}

	public GetHotelRoomProductDisplayTextPortType getGetHotelRoomProductDisplayTextPortType(String SoapPort_address) throws ServiceException {
		if (getHotelRoomProductDisplayTextPortType == null)
			_initGetHotelRoomProductDisplayTextPortTypeProxy(SoapPort_address);
		return getHotelRoomProductDisplayTextPortType;
	}

	public MI_HotelRoomProductDisplayTextRS MI_HotelRoomProductDisplayTextRQ(MI_HotelRoomProductDisplayTextRQ MI_HotelRoomProductDisplayTextRQ,
			String SoapPort_address) throws java.rmi.RemoteException, ServiceException {
		if (getHotelRoomProductDisplayTextPortType == null)
			_initGetHotelRoomProductDisplayTextPortTypeProxy(SoapPort_address);
		return getHotelRoomProductDisplayTextPortType.MI_HotelRoomProductDisplayTextRQ(MI_HotelRoomProductDisplayTextRQ, SoapPort_address);
	}

	public MI_HotelRoomProductDisplayTextRS MI_HotelRoomProductDisplayTextRQ(Channel channel, String langId, String SoapPort_address)
			throws java.rmi.RemoteException, ServiceException {
		if (getHotelRoomProductDisplayTextPortType == null)
			_initGetHotelRoomProductDisplayTextPortTypeProxy(SoapPort_address);
		return getHotelRoomProductDisplayTextPortType.MI_HotelRoomProductDisplayTextRQ(channel, langId, SoapPort_address);
	}

}
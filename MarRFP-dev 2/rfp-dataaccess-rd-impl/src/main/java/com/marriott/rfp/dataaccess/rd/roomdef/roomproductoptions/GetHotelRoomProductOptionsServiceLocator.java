/**
 * GetHotelRoomProductInfoServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.roomproductoptions;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class GetHotelRoomProductOptionsServiceLocator extends GetServiceLocator implements GetHotelRoomProductOptionsService {

	// Use to get a proxy class for GetHotelRoomProductOptionsSoapPort

	public GetHotelRoomProductOptionsServiceLocator() throws ServiceException {
		super();
		setSoapPort("GetHotelRoomProductOptionsSoapPort");
		setSoap_service("GetHotelRoomProductOptionsService");
		setWSDDServiceName("GetHotelRoomProductOptionsSoapPort");
	}

	public GetHotelRoomProductOptionsServiceLocator(String SoapPort_address) throws ServiceException {
		super(SoapPort_address);
		setSoapPort("GetHotelRoomProductOptionsSoapPort");
		setSoap_service("GetHotelRoomProductOptionsService");
		setWSDDServiceName("GetHotelRoomProductOptionsSoapPort");
	}

	public GetHotelRoomProductOptionsPortType getGetHotelRoomProductOptionsSoapPort() throws javax.xml.rpc.ServiceException {
		java.net.URL endpoint;
		try {
			endpoint = new java.net.URL(getPortAddress());
		} catch (java.net.MalformedURLException e) {
			return null; // unlikely as URL was validated in WSDL2Java
		}
		return getGetHotelRoomProductOptionsSoapPort(endpoint);
	}

	public GetHotelRoomProductOptionsPortType getGetHotelRoomProductOptionsSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
		try {
			GetHotelRoomProductOptionsBindingStub _stub = new GetHotelRoomProductOptionsBindingStub(portAddress, this);
			_stub.setPortName(getWSDDServiceName());
			return _stub;
		} catch (org.apache.axis.AxisFault e) {
			return null;
		}
	}

	/**
	 * For the given interface, get the stub implementation. If this service has
	 * no port for the given interface, then ServiceException is thrown.
	 */
	@SuppressWarnings("unchecked")
	public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
		try {
			if (GetHotelRoomProductOptionsPortType.class.isAssignableFrom(serviceEndpointInterface)) {
				GetHotelRoomProductOptionsBindingStub _stub = new GetHotelRoomProductOptionsBindingStub(new java.net.URL(getPortAddress()), this);
				_stub.setPortName(getWSDDServiceName());
				return _stub;
			}
		} catch (java.lang.Throwable t) {
			throw new javax.xml.rpc.ServiceException(t);
		}
		throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  "
				+ (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
	}

}

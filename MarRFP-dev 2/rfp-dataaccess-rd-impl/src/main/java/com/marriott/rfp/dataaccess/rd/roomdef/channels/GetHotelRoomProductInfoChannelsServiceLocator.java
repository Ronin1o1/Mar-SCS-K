/**
 * GetHotelRoomPoolListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.channels;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

public class GetHotelRoomProductInfoChannelsServiceLocator extends GetServiceLocator implements GetHotelRoomProductInfoChannelsService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public GetHotelRoomProductInfoChannelsServiceLocator() {
		super();
		setSoapPort("GetHotelRoomProductInfoChannelsSoapPort");
		setSoap_service("GetHotelRoomProductInfoChannelsService");
		setWSDDServiceName("GetHotelRoomProductInfoChannelsSoapPort");
	}

	public GetHotelRoomProductInfoChannelsServiceLocator(String SoapPort_address) {
		super(SoapPort_address);
		setSoapPort("GetHotelRoomProductInfoChannelsSoapPort");
		setSoap_service("GetHotelRoomProductInfoChannelsService");
		setWSDDServiceName("GetHotelRoomProductInfoChannelsSoapPort");
	}


     public GetHotelRoomProductInfoChannelsPortType getGetHotelRoomProductInfoChannelsSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getGetHotelRoomProductInfoChannelsSoapPort(endpoint);
    }

    public GetHotelRoomProductInfoChannelsPortType getGetHotelRoomProductInfoChannelsSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            GetHotelRoomProductInfoChannelsBindingStub _stub = new GetHotelRoomProductInfoChannelsBindingStub(portAddress, this);
            _stub.setPortName(getWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    @SuppressWarnings("unchecked")
	public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (GetHotelRoomProductInfoChannelsPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                GetHotelRoomProductInfoChannelsBindingStub _stub = new GetHotelRoomProductInfoChannelsBindingStub(new java.net.URL(getPortAddress()), this);
                _stub.setPortName(getWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

 
}

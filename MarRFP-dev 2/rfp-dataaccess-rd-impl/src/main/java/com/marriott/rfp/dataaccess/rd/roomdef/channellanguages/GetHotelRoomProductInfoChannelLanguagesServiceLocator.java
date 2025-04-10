/**
 * GetHotelRoomPoolListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.channellanguages;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class GetHotelRoomProductInfoChannelLanguagesServiceLocator extends GetServiceLocator implements GetHotelRoomProductInfoChannelLanguagesService {

	public GetHotelRoomProductInfoChannelLanguagesServiceLocator() {
		super();
		setSoapPort("GetHotelRoomProductInfoChannelLanguagesSoapPort");
		setSoap_service("GetHotelRoomProductInfoChannelLanguagesService");
		setWSDDServiceName("GetHotelRoomProductInfoChannelLanguagesSoapPort");
	}

	public GetHotelRoomProductInfoChannelLanguagesServiceLocator(String SoapPort_address) {
		super(SoapPort_address);
		setSoapPort("GetHotelRoomProductInfoChannelLanguagesSoapPort");
		setSoap_service("GetHotelRoomProductInfoChannelLanguagesService");
		setWSDDServiceName("GetHotelRoomProductInfoChannelLanguagesSoapPort");
	}

     public GetHotelRoomProductInfoChannelLanguagesPortType getGetHotelRoomProductInfoChannelLanguagesSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getGetHotelRoomProductInfoChannelLanguagesSoapPort(endpoint);
    }

    public GetHotelRoomProductInfoChannelLanguagesPortType getGetHotelRoomProductInfoChannelLanguagesSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            GetHotelRoomProductInfoChannelLanguagesBindingStub _stub = new GetHotelRoomProductInfoChannelLanguagesBindingStub(portAddress, this);
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
            if (GetHotelRoomProductInfoChannelLanguagesPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                GetHotelRoomProductInfoChannelLanguagesBindingStub _stub = new GetHotelRoomProductInfoChannelLanguagesBindingStub(new java.net.URL(getPortAddress()), this);
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

/**
 * GetHotelRoomPoolListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.entries;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class GetHotelRoomProductInfoEntriesServiceLocator extends GetServiceLocator implements GetHotelRoomProductInfoEntriesService {

	public GetHotelRoomProductInfoEntriesServiceLocator() {
		super();
		setSoapPort("GetHotelRoomProductInfoEntriesSoapPort");
		setSoap_service("GetHotelRoomProductInfoEntriesService");
		setWSDDServiceName("GetHotelRoomProductInfoEntriesSoapPort");
	}

	public GetHotelRoomProductInfoEntriesServiceLocator(String SoapPort_address) {
		super(SoapPort_address);
		setSoapPort("GetHotelRoomProductInfoEntriesSoapPort");
		setSoap_service("GetHotelRoomProductInfoEntriesService");
		setWSDDServiceName("GetHotelRoomProductInfoEntriesSoapPort");
	}

     public GetHotelRoomProductInfoEntriesPortType getGetHotelRoomProductInfoEntriesSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getGetHotelRoomProductInfoEntriesSoapPort(endpoint);
    }

    public GetHotelRoomProductInfoEntriesPortType getGetHotelRoomProductInfoEntriesSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            GetHotelRoomProductInfoEntriesBindingStub _stub = new GetHotelRoomProductInfoEntriesBindingStub(portAddress, this);
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
            if (GetHotelRoomProductInfoEntriesPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                GetHotelRoomProductInfoEntriesBindingStub _stub = new GetHotelRoomProductInfoEntriesBindingStub(new java.net.URL(getPortAddress()), this);
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

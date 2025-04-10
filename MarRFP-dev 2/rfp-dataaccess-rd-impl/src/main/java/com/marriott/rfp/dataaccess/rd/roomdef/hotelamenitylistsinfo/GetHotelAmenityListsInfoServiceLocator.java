/**
 * GetHotelRoomPoolListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.hotelamenitylistsinfo;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class GetHotelAmenityListsInfoServiceLocator extends GetServiceLocator implements GetHotelAmenityListsInfoService {

    // Use to get a proxy class for GetHotelAmenityListsSoapPort
	public GetHotelAmenityListsInfoServiceLocator() {
		super();
		setSoapPort("GetHotelAmenityListsSoapPort");
		setSoap_service("GetHotelAmenityListsService");
		setWSDDServiceName("GetHotelAmenityListsSoapPort");
	}

	public GetHotelAmenityListsInfoServiceLocator(String SoapPort_address) {
		super(SoapPort_address);
		setSoapPort("GetHotelAmenityListsSoapPort");
		setSoap_service("GetHotelAmenityListsService");
		setWSDDServiceName("GetHotelAmenityListsSoapPort");
	}

    public GetHotelAmenityListsInfoPortType getGetHotelAmenityListsSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getGetHotelAmenityListsSoapPort(endpoint);
    }

    public GetHotelAmenityListsInfoPortType getGetHotelAmenityListsSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            GetHotelAmenityListsInfoBindingStub _stub = new GetHotelAmenityListsInfoBindingStub(portAddress, this);
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
            if (GetHotelAmenityListsInfoPortType.class.isAssignableFrom(serviceEndpointInterface)) {
               GetHotelAmenityListsInfoBindingStub _stub = new GetHotelAmenityListsInfoBindingStub(new java.net.URL(getPortAddress()), this);
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

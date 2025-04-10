/**
 * GetHotelRoomTypeListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.hoteldefinitions;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class GetHotelRoomTypeNameDefinitionsServiceLocator extends GetServiceLocator implements GetHotelRoomTypeNameDefinitionsService {

    // Use to get a proxy class for GetHotelRoomTypeNameDefinitionsSoapPort
	public GetHotelRoomTypeNameDefinitionsServiceLocator() {
		super();
		setSoapPort("GetHotelRoomTypeNameDefinitionsSoapPort");
		setSoap_service("GetHotelRoomTypeNameDefinitionsService");
		setWSDDServiceName("GetHotelRoomTypeNameDefinitionsSoapPort");
	}

	public GetHotelRoomTypeNameDefinitionsServiceLocator(String SoapPort_address) {
		super(SoapPort_address);
		setSoapPort("GetHotelRoomTypeNameDefinitionsSoapPort");
		setSoap_service("GetHotelRoomTypeNameDefinitionsService");
		setWSDDServiceName("GetHotelRoomTypeNameDefinitionsSoapPort");
	}
 
    public GetHotelRoomTypeNameDefinitionsPortType getGetHotelRoomTypeNameDefinitionsSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getGetHotelRoomTypeNameDefinitionsSoapPort(endpoint);
    }

    public GetHotelRoomTypeNameDefinitionsPortType getGetHotelRoomTypeNameDefinitionsSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            GetHotelRoomTypeNameDefinitionsBindingStub _stub = new GetHotelRoomTypeNameDefinitionsBindingStub(portAddress, this);
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
            if (GetHotelRoomTypeNameDefinitionsPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                GetHotelRoomTypeNameDefinitionsBindingStub _stub = new GetHotelRoomTypeNameDefinitionsBindingStub(new java.net.URL(getPortAddress()), this);
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

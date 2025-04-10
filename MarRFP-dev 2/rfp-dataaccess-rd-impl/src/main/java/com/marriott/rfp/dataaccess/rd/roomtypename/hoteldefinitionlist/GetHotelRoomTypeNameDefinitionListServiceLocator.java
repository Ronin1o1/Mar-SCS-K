/**
 * GetHotelRoomTypeListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.hoteldefinitionlist;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class GetHotelRoomTypeNameDefinitionListServiceLocator extends GetServiceLocator implements GetHotelRoomTypeNameDefinitionListService {

    // Use to get a proxy class for GetHotelRoomTypeNameDefinitionListSoapPort
	public GetHotelRoomTypeNameDefinitionListServiceLocator() {
		super();
		setSoapPort("GetHotelRoomTypeNameDefinitionListSoapPort");
		setSoap_service("GetHotelRoomTypeNameDefinitionListService");
		setWSDDServiceName("GetHotelRoomTypeNameDefinitionListSoapPort");
	}

	public GetHotelRoomTypeNameDefinitionListServiceLocator(String SoapPort_address) {
		super(SoapPort_address);
		setSoapPort("GetHotelRoomTypeNameDefinitionListSoapPort");
		setSoap_service("GetHotelRoomTypeNameDefinitionListService");
		setWSDDServiceName("GetHotelRoomTypeNameDefinitionListSoapPort");
	}
 
    public GetHotelRoomTypeNameDefinitionListPortType getGetHotelRoomTypeNameDefinitionListSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getGetHotelRoomTypeNameDefinitionListSoapPort(endpoint);
    }

    public GetHotelRoomTypeNameDefinitionListPortType getGetHotelRoomTypeNameDefinitionListSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            GetHotelRoomTypeNameDefinitionListBindingStub _stub = new GetHotelRoomTypeNameDefinitionListBindingStub(portAddress, this);
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
            if (GetHotelRoomTypeNameDefinitionListPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                GetHotelRoomTypeNameDefinitionListBindingStub _stub = new GetHotelRoomTypeNameDefinitionListBindingStub(new java.net.URL(getPortAddress()), this);
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

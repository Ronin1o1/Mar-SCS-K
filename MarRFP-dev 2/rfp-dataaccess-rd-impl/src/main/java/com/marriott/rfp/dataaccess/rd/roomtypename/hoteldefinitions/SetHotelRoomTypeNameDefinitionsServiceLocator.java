/**
 * GetHotelRoomTypeListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.hoteldefinitions;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class SetHotelRoomTypeNameDefinitionsServiceLocator extends GetServiceLocator implements SetHotelRoomTypeNameDefinitionsService {

    // Use to get a proxy class for GetHotelRoomTypeNameDefinitionsSoapPort
	public SetHotelRoomTypeNameDefinitionsServiceLocator(){
		super();
		setSoapPort("SetHotelRoomTypeNameDefinitionsSoapPort");
		setSoap_service("SetHotelRoomTypeNameDefinitionsService");
		setWSDDServiceName("SetHotelRoomTypeNameDefinitionsSoapPort");
	}

	public SetHotelRoomTypeNameDefinitionsServiceLocator(String SoapPort_address){
		super(SoapPort_address);
		setSoapPort("SetHotelRoomTypeNameDefinitionsSoapPort");
		setSoap_service("SetHotelRoomTypeNameDefinitionsService");
		setWSDDServiceName("SetHotelRoomTypeNameDefinitionsSoapPort");
	}
  
    public SetHotelRoomTypeNameDefinitionsPortType getSetHotelRoomTypeNameDefinitionsSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getSetHotelRoomTypeNameDefinitionsSoapPort(endpoint);
    }

    public SetHotelRoomTypeNameDefinitionsPortType getSetHotelRoomTypeNameDefinitionsSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            SetHotelRoomTypeNameDefinitionsBindingStub _stub = new SetHotelRoomTypeNameDefinitionsBindingStub(portAddress, this);
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
            if (SetHotelRoomTypeNameDefinitionsPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                SetHotelRoomTypeNameDefinitionsBindingStub _stub = new SetHotelRoomTypeNameDefinitionsBindingStub(new java.net.URL(getPortAddress()), this);
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

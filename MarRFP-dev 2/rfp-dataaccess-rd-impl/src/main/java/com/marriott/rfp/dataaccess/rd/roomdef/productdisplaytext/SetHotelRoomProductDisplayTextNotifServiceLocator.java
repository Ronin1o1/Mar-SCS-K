/**
 * GetHotelRoomPoolListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.productdisplaytext;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class SetHotelRoomProductDisplayTextNotifServiceLocator extends GetServiceLocator implements SetHotelRoomProductDisplayTextNotifService {

    // Use to get a proxy class for RemoveHotelRoomProductInfoNotifSoapPort
	public SetHotelRoomProductDisplayTextNotifServiceLocator(){
		super();
		setSoapPort("SetHotelRoomProductDisplayTextSoapPort");
		setSoap_service("SetHotelRoomProductDisplayTextService");
		setWSDDServiceName("SetHotelRoomProductDisplayTextSoapPort");
	}

	public SetHotelRoomProductDisplayTextNotifServiceLocator(String SoapPort_address) {
		super(SoapPort_address);
		setSoapPort("SetHotelRoomProductDisplayTextSoapPort");
		setSoap_service("SetHotelRoomProductDisplayTextService");
		setWSDDServiceName("SetHotelRoomProductDisplayTextSoapPort");
	}

    public SetHotelRoomProductDisplayTextNotifPortType getSetHotelRoomProductDisplayTextNotifSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getSetHotelRoomProductDisplayTextNotifSoapPort(endpoint);
    }

    public SetHotelRoomProductDisplayTextNotifPortType getSetHotelRoomProductDisplayTextNotifSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
           SetHotelRoomProductDisplayTextNotifBindingStub _stub = new SetHotelRoomProductDisplayTextNotifBindingStub(portAddress, this);
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
            if (SetHotelRoomProductDisplayTextNotifPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                SetHotelRoomProductDisplayTextNotifBindingStub _stub = new SetHotelRoomProductDisplayTextNotifBindingStub(new java.net.URL(getPortAddress()), this);
                _stub.setPortName(getWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    @SuppressWarnings("unchecked")
	public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        java.rmi.Remote _stub = getPort(serviceEndpointInterface);
        ((org.apache.axis.client.Stub) _stub).setPortName(portName);
        return _stub;
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "SetHotelRoomProductDisplayTextService");
    }

    @SuppressWarnings("unchecked")
	private java.util.HashSet ports = null;

    @SuppressWarnings("unchecked")
	public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("SetHotelRoomProductDisplayTextSoapPort"));
        }
        return ports.iterator();
    }

}

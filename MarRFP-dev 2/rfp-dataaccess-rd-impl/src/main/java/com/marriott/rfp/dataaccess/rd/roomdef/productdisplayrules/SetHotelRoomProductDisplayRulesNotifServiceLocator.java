/**
 * GetHotelRoomPoolListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.productdisplayrules;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class SetHotelRoomProductDisplayRulesNotifServiceLocator extends GetServiceLocator implements SetHotelRoomProductDisplayRulesNotifService {

    // Use to get a proxy class for RemoveHotelRoomProductInfoNotifSoapPort
	public SetHotelRoomProductDisplayRulesNotifServiceLocator() throws ServiceException{
		super();
		setSoapPort("SetHotelRoomProductDisplayRulesSoapPort");
		setSoap_service("SetHotelRoomProductDisplayRulesService");
		setWSDDServiceName("SetHotelRoomProductDisplayRulesSoapPort");
	}

	public SetHotelRoomProductDisplayRulesNotifServiceLocator(String SoapPort_address) throws ServiceException{
		super(SoapPort_address);
		setSoapPort("SetHotelRoomProductDisplayRulesSoapPort");
		setSoap_service("SetHotelRoomProductDisplayRulesService");
		setWSDDServiceName("SetHotelRoomProductDisplayRulesSoapPort");
	}

    public SetHotelRoomProductDisplayRulesNotifPortType getSetHotelRoomProductDisplayRulesNotifSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getSetHotelRoomProductDisplayRulesNotifSoapPort(endpoint);
    }

    public SetHotelRoomProductDisplayRulesNotifPortType getSetHotelRoomProductDisplayRulesNotifSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
           SetHotelRoomProductDisplayRulesNotifBindingStub _stub = new SetHotelRoomProductDisplayRulesNotifBindingStub(portAddress, this);
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
            if (SetHotelRoomProductDisplayRulesNotifPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                SetHotelRoomProductDisplayRulesNotifBindingStub _stub = new SetHotelRoomProductDisplayRulesNotifBindingStub(new java.net.URL(getPortAddress()), this);
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
        return new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "SetHotelRoomProductDisplayRulesService");
    }

    @SuppressWarnings("unchecked")
	private java.util.HashSet ports = null;

    @SuppressWarnings("unchecked")
	public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("SetHotelRoomProductDisplayRulesSoapPort"));
        }
        return ports.iterator();
    }

}

/**
 * GetHotelRoomPoolListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.productdisplayrules;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class GetHotelRoomProductDisplayRulesServiceLocator extends GetServiceLocator implements GetHotelRoomProductDisplayRulesService {

	public GetHotelRoomProductDisplayRulesServiceLocator() {
		super();
		setSoapPort("GetHotelRoomProductDisplayRulesSoapPort");
		setSoap_service("GetHotelRoomProductDisplayRulesService");
		setWSDDServiceName("GetHotelRoomProductDisplayRulesSoapPort");
	}

	public GetHotelRoomProductDisplayRulesServiceLocator( String SoapPort_address) {
		super(SoapPort_address);
		setSoapPort("GetHotelRoomProductDisplayRulesSoapPort");
		setSoap_service("GetHotelRoomProductDisplayRulesService");
		setWSDDServiceName("GetHotelRoomProductDisplayRulesSoapPort");
	}

     public GetHotelRoomProductDisplayRulesPortType getGetHotelRoomProductDisplayRulesSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getGetHotelRoomProductDisplayRulesSoapPort(endpoint);
    }

    public GetHotelRoomProductDisplayRulesPortType getGetHotelRoomProductDisplayRulesSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            GetHotelRoomProductDisplayRulesBindingStub _stub = new GetHotelRoomProductDisplayRulesBindingStub(portAddress, this);
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
            if (GetHotelRoomProductDisplayRulesPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                GetHotelRoomProductDisplayRulesBindingStub _stub = new GetHotelRoomProductDisplayRulesBindingStub(new java.net.URL(getPortAddress()), this);
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

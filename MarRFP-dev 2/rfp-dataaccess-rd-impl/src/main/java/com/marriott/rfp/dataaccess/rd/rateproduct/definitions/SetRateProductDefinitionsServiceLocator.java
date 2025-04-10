/**
 * GetHotelRoomTypeListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.rateproduct.definitions;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class SetRateProductDefinitionsServiceLocator extends GetServiceLocator implements SetRateProductDefinitionsService {

    // Use to get a proxy class for GetRateProductDefinitionsSoapPort
	public SetRateProductDefinitionsServiceLocator() {
		super();
		setSoapPort("RateProductSoapPort");
		setSoap_service("RateProductService");
		setWSDDServiceName("RateProductSoapPort");
	}
	public SetRateProductDefinitionsServiceLocator(String SoapPort_address){
		super(SoapPort_address);
		setSoapPort("RateProductSoapPort");
		setSoap_service("RateProductService");
		setWSDDServiceName("RateProductSoapPort");
	}

  
    public SetRateProductDefinitionsPortType getSetRateProductDefinitionsSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getSetRateProductDefinitionsSoapPort(endpoint);
    }

    public SetRateProductDefinitionsPortType getSetRateProductDefinitionsSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            SetRateProductDefinitionsBindingStub _stub = new SetRateProductDefinitionsBindingStub(portAddress, this);
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
    @SuppressWarnings({ "rawtypes" })
	public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (SetRateProductDefinitionsPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                SetRateProductDefinitionsBindingStub _stub = new SetRateProductDefinitionsBindingStub(new java.net.URL(getPortAddress()), this);
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

/**
 * GetHotelRoomTypeListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.rateproduct.definitionlist;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class GetRateProductDefinitionListServiceLocator extends GetServiceLocator implements GetRateProductDefinitionListService {

    // Use to get a proxy class for GetRateProductDefinitionListSoapPort
	public GetRateProductDefinitionListServiceLocator() {
		super();
		setSoapPort("RateProductSoapPort");
		setSoap_service("RateProductService");
		setWSDDServiceName("RateProductSoapPort");
	}

	public GetRateProductDefinitionListServiceLocator(String SoapPort_address) {
		super(SoapPort_address);
		setSoapPort("RateProductSoapPort");
		setSoap_service("RateProductService");
		setWSDDServiceName("RateProductSoapPort");
	}
 
    public GetRateProductDefinitionListPortType getGetRateProductDefinitionListSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getGetRateProductDefinitionListSoapPort(endpoint);
    }

    public GetRateProductDefinitionListPortType getGetRateProductDefinitionListSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            GetRateProductDefinitionListBindingStub _stub = new GetRateProductDefinitionListBindingStub(portAddress, this);
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
    @SuppressWarnings("rawtypes")
	public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (GetRateProductDefinitionListPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                GetRateProductDefinitionListBindingStub _stub = new GetRateProductDefinitionListBindingStub(new java.net.URL(getPortAddress()), this);
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

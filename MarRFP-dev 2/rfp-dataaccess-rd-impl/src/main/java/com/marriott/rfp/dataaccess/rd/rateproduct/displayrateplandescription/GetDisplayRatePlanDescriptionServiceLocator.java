/**
 * GetDisplayRatePlanDescriptionServiceLocator.java
 *
 */

package com.marriott.rfp.dataaccess.rd.rateproduct.displayrateplandescription;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class GetDisplayRatePlanDescriptionServiceLocator extends GetServiceLocator implements GetDisplayRatePlanDescriptionService {

    // Use to get a proxy class for GetDisplayRatePlanDescriptionSoapPort
	public GetDisplayRatePlanDescriptionServiceLocator(){
		super();
		setSoapPort("RateProductSoapPort");
		setSoap_service("RateProductService");
		setWSDDServiceName("RateProductSoapPort");
	}

	public GetDisplayRatePlanDescriptionServiceLocator(String SoapPort_address){
		super(SoapPort_address);
		setSoapPort("RateProductSoapPort");
		setSoap_service("RateProductService");
		setWSDDServiceName("RateProductSoapPort");
	}

    public GetDisplayRatePlanDescriptionPortType getGetDisplayRatePlanDescriptionSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getGetDisplayRatePlanDescriptionSoapPort(endpoint);
    }

    public GetDisplayRatePlanDescriptionPortType getGetDisplayRatePlanDescriptionSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            GetDisplayRatePlanDescriptionBindingStub _stub = new GetDisplayRatePlanDescriptionBindingStub(portAddress, this);
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
            if (GetDisplayRatePlanDescriptionPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                GetDisplayRatePlanDescriptionBindingStub _stub = new GetDisplayRatePlanDescriptionBindingStub(new java.net.URL(getPortAddress()), this);
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
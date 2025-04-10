package com.marriott.rfp.dataaccess.rd.rateproduct.rateplanassignmentlist;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class SetRatePlanAssignmentsServiceLocator extends GetServiceLocator implements SetRatePlanAssignmentsService {

    // Use to get a proxy class for GetRatePlanAssignmentsSoapPort
	public SetRatePlanAssignmentsServiceLocator() {
		super();
		setSoapPort("RateProductSoapPort");
		setSoap_service("RateProductService");
		setWSDDServiceName("RateProductSoapPort");
	}

	public SetRatePlanAssignmentsServiceLocator(String SoapPort_address) {
		super(SoapPort_address);
		setSoapPort("RateProductSoapPort");
		setSoap_service("RateProductService");
		setWSDDServiceName("RateProductSoapPort");
	}
  
    public SetRatePlanAssignmentsPortType getSetRatePlanAssignmentsSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getSetRatePlanAssignmentsSoapPort(endpoint);
    }

    public SetRatePlanAssignmentsPortType getSetRatePlanAssignmentsSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            SetRatePlanAssignmentsBindingStub _stub = new SetRatePlanAssignmentsBindingStub(portAddress, this);
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
            if (SetRatePlanAssignmentsPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                SetRatePlanAssignmentsBindingStub _stub = new SetRatePlanAssignmentsBindingStub(new java.net.URL(getPortAddress()), this);
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

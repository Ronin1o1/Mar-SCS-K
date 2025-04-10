/**
 * GetHotelRoomTypeListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.hotelinvcount.inventorycount;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class GetHotelInvCountServiceLocator extends GetServiceLocator implements GetHotelInvCountService {

    // Use to get a proxy class for GetHotelInvCountSoapPort
	public GetHotelInvCountServiceLocator(){
		super();
		setSoapPort("InventorySoapPort");
		setSoap_service("InventoryService");
		setWSDDServiceName("InventorySoapPort");
	}

	public GetHotelInvCountServiceLocator(String SoapPort_address){
		super( SoapPort_address);
		setSoapPort("InventorySoapPort");
		setSoap_service("InventoryService");
		setWSDDServiceName("InventorySoapPort");
	}
 
    public GetHotelInvCountPortType getGetHotelInvCountSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getGetHotelInvCountSoapPort(endpoint);
    }

    public GetHotelInvCountPortType getGetHotelInvCountSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            GetHotelInvCountBindingStub _stub = new GetHotelInvCountBindingStub(portAddress, this);
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
            if (GetHotelInvCountPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                GetHotelInvCountBindingStub _stub = new GetHotelInvCountBindingStub(new java.net.URL(getPortAddress()), this);
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

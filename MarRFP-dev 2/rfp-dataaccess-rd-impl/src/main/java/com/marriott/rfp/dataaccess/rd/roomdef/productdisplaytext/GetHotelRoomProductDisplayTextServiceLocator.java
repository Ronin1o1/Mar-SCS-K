/**
 * GetHotelRoomPoolListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.productdisplaytext;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class GetHotelRoomProductDisplayTextServiceLocator extends GetServiceLocator implements GetHotelRoomProductDisplayTextService {

	public GetHotelRoomProductDisplayTextServiceLocator() throws ServiceException{
		super();
		setSoapPort("GetHotelRoomProductDisplayTextSoapPort");
		setSoap_service("GetHotelRoomProductDisplayTextService");
		setWSDDServiceName("GetHotelRoomProductDisplayTextSoapPort");
	}

	public GetHotelRoomProductDisplayTextServiceLocator(String SoapPort_address) throws ServiceException{
		super(SoapPort_address);
		setSoapPort("GetHotelRoomProductDisplayTextSoapPort");
		setSoap_service("GetHotelRoomProductDisplayTextService");
		setWSDDServiceName("GetHotelRoomProductDisplayTextSoapPort");
	}

     public GetHotelRoomProductDisplayTextPortType getGetHotelRoomProductDisplayTextSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getGetHotelRoomProductDisplayTextSoapPort(endpoint);
    }

    public GetHotelRoomProductDisplayTextPortType getGetHotelRoomProductDisplayTextSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            GetHotelRoomProductDisplayTextBindingStub _stub = new GetHotelRoomProductDisplayTextBindingStub(portAddress, this);
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
            if (GetHotelRoomProductDisplayTextPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                GetHotelRoomProductDisplayTextBindingStub _stub = new GetHotelRoomProductDisplayTextBindingStub(new java.net.URL(getPortAddress()), this);
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

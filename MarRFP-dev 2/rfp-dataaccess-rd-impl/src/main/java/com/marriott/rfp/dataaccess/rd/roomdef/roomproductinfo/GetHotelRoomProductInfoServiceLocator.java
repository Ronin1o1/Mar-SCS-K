/**
 * GetHotelRoomProductInfoServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.roomproductinfo;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class GetHotelRoomProductInfoServiceLocator extends GetServiceLocator implements GetHotelRoomProductInfoService {

    // Use to get a proxy class for GetHotelRoomProductInfoSoapPort
	public GetHotelRoomProductInfoServiceLocator()  throws ServiceException{
		super();
		setSoapPort("GetHotelRoomProductInfoSoapPort");
		setSoap_service("GetHotelRoomProductInfoService");
		setWSDDServiceName("GetHotelRoomProductInfoSoapPort");
	}

	public GetHotelRoomProductInfoServiceLocator(String SoapPort_address)  throws ServiceException{
		super(SoapPort_address);
		setSoapPort("GetHotelRoomProductInfoSoapPort");
		setSoap_service("GetHotelRoomProductInfoService");
		setWSDDServiceName("GetHotelRoomProductInfoSoapPort");
	}



    public GetHotelRoomProductInfoPortType getGetHotelRoomProductInfoSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getGetHotelRoomProductInfoSoapPort(endpoint);
    }

    public GetHotelRoomProductInfoPortType getGetHotelRoomProductInfoSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            GetHotelRoomProductInfoBindingStub _stub = new GetHotelRoomProductInfoBindingStub(portAddress, this);
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
            if (GetHotelRoomProductInfoPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                GetHotelRoomProductInfoBindingStub _stub = new GetHotelRoomProductInfoBindingStub(new java.net.URL(getPortAddress()), this);
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

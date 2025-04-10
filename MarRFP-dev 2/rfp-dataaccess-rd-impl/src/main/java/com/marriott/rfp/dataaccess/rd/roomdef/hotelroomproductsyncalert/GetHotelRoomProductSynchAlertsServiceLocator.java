/**
 * GetHotelRoomProductSynchAlertsServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.hotelroomproductsyncalert;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class GetHotelRoomProductSynchAlertsServiceLocator extends GetServiceLocator implements GetHotelRoomProductSynchAlertsService {

    // Use to get a proxy class for GetHotelRoomProductSynchAlertsSoapPort
	public GetHotelRoomProductSynchAlertsServiceLocator() {
		super();
		setSoapPort("GetHotelRoomProductSynchAlertsSoapPort");
		setSoap_service("GetHotelRoomProductSynchAlertsSoapPort");
		setWSDDServiceName("GetHotelRoomProductSynchAlertsSoapPort");
	}

	public GetHotelRoomProductSynchAlertsServiceLocator(String SoapPort_address)  {
		super( SoapPort_address);
		setSoapPort("GetHotelRoomProductSynchAlertsSoapPort");
		setSoap_service("GetHotelRoomProductSynchAlertsSoapPort");
		setWSDDServiceName("GetHotelRoomProductSynchAlertsSoapPort");
	}

    public GetHotelRoomProductSynchAlertsPortType getGetHotelRoomProductSynchAlertsSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getGetHotelRoomProductSynchAlertsSoapPort(endpoint);
    }

    public GetHotelRoomProductSynchAlertsPortType getGetHotelRoomProductSynchAlertsSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            GetHotelRoomProductSynchAlertsBindingStub _stub = new GetHotelRoomProductSynchAlertsBindingStub(portAddress, this);
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
            if (GetHotelRoomProductSynchAlertsPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                GetHotelRoomProductSynchAlertsBindingStub _stub = new GetHotelRoomProductSynchAlertsBindingStub(new java.net.URL(getPortAddress()), this);
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

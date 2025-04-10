/*
 * GetHotelRoomPoolListServiceLocator.java
  */

package com.marriott.rfp.dataaccess.rd.roomdef.hotelroomproductsyncalert;

import javax.xml.rpc.ServiceException;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class SetHotelRoomProductSynchAlertsServiceLocator extends GetServiceLocator implements SetHotelRoomProductSynchAlertsService {

    // Use to get a proxy class for SetHotelRoomProductSynchAlertsSoapPort
	public SetHotelRoomProductSynchAlertsServiceLocator()  throws ServiceException{
		super();
		setSoapPort("SetHotelRoomProductSynchAlertsSoapPort");
		setSoap_service("SetHotelRoomProductSynchAlertsService");
		setWSDDServiceName("SetHotelRoomProductSynchAlertsSoapPort");
	}
 
	public SetHotelRoomProductSynchAlertsServiceLocator(String SoapPort_address)  throws ServiceException{
		super(SoapPort_address);
		setSoapPort("SetHotelRoomProductSynchAlertsSoapPort");
		setSoap_service("SetHotelRoomProductSynchAlertsService");
		setWSDDServiceName("SetHotelRoomProductSynchAlertsSoapPort");
	}

    public SetHotelRoomProductSynchAlertsPortType getSetHotelRoomProductSynchAlertsSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null;
        }
        return getSetHotelRoomProductSynchAlertsSoapPort(endpoint);
    }

    public SetHotelRoomProductSynchAlertsPortType getSetHotelRoomProductSynchAlertsSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
           SetHotelRoomProductSynchAlertsBindingStub _stub = new SetHotelRoomProductSynchAlertsBindingStub(portAddress, this);
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
            if (SetHotelRoomProductSynchAlertsPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                SetHotelRoomProductSynchAlertsBindingStub _stub = new SetHotelRoomProductSynchAlertsBindingStub(new java.net.URL(getPortAddress()), this);
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

/**
 * GetHotelRoomTypeListServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomtypename.masterdefinitionlist;

import com.marriott.rfp.dataaccess.rd.common.GetServiceLocator;

@SuppressWarnings("serial")
public class GetMasterRoomTypeNameDefinitionListServiceLocator extends GetServiceLocator implements GetMasterRoomTypeNameDefinitionListService {

    // Use to get a proxy class for GetMasterRoomTypeNameDefinitionListSoapPort
	public GetMasterRoomTypeNameDefinitionListServiceLocator(){
		super();
		setSoapPort("GetMasterRoomTypeNameDefinitionListSoapPort");
		setSoap_service("GetMasterRoomTypeNameDefinitionListService");
		setWSDDServiceName("GetMasterRoomTypeNameDefinitionListSoapPort");
	}

	public GetMasterRoomTypeNameDefinitionListServiceLocator(String SoapPort_address){
		super(SoapPort_address);
		setSoapPort("GetMasterRoomTypeNameDefinitionListSoapPort");
		setSoap_service("GetMasterRoomTypeNameDefinitionListService");
		setWSDDServiceName("GetMasterRoomTypeNameDefinitionListSoapPort");
	}

   
    public GetMasterRoomTypeNameDefinitionListPortType getGetMasterRoomTypeNameDefinitionListSoapPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(getPortAddress());
        }
        catch (java.net.MalformedURLException e) {
            return null; // unlikely as URL was validated in WSDL2Java
        }
        return getGetMasterRoomTypeNameDefinitionListSoapPort(endpoint);
    }

    public GetMasterRoomTypeNameDefinitionListPortType getGetMasterRoomTypeNameDefinitionListSoapPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            GetMasterRoomTypeNameDefinitionListBindingStub _stub = new GetMasterRoomTypeNameDefinitionListBindingStub(portAddress, this);
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
            if (GetMasterRoomTypeNameDefinitionListPortType.class.isAssignableFrom(serviceEndpointInterface)) {
                GetMasterRoomTypeNameDefinitionListBindingStub _stub = new GetMasterRoomTypeNameDefinitionListBindingStub(new java.net.URL(getPortAddress()), this);
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

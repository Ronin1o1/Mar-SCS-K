/*
 * Created on Sep 18, 2006
 *
 * To change the template for this generated file go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
package com.marriott.rfp.dataaccess.rd.common;



/**
 * @author lawat057
 *
 * To change the template for this generated type comment go to
 * Window&gt;Preferences&gt;Java&gt;Code Generation&gt;Code and Comments
 */
public abstract class GetServiceLocator extends org.apache.axis.client.Service {

	/**
	 *  
	 */
	private static final long serialVersionUID = 1L;
	// Use to get a proxy class for GetHotelRoomProductOptionsSoapPort
	private java.lang.String SoapPort_address = "";
	private java.lang.String SoapPort = "";
	private java.lang.String Soap_service = "";
	
	public GetServiceLocator() {
		SoapPort_address="http://tpfres1.marriott.com:8999";
	}

	public GetServiceLocator(String SoapPort_address) {
		this.SoapPort_address=SoapPort_address;
	}

	public java.lang.String getPortAddress() {
		return SoapPort_address;
	}

	public void setPortAddress(String portAddress) {
		SoapPort_address = portAddress;
	}

	// The WSDD service name defaults to the port name.
	private java.lang.String WSDDServiceName = "";

	public java.lang.String getWSDDServiceName() {
		return WSDDServiceName;
	}

	public void setWSDDServiceName(java.lang.String name) {
		WSDDServiceName = name;
	}

	/**
	 * For the given interface, get the stub implementation.
	 * If this service has no port for the given interface,
	 * then ServiceException is thrown.
	 */
	@SuppressWarnings("rawtypes")
	public abstract java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException;

	/**
	 * For the given interface, get the stub implementation.
	 * If this service has no port for the given interface,
	 * then ServiceException is thrown.
	 */
	@SuppressWarnings("rawtypes")
	public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
		java.rmi.Remote _stub = getPort(serviceEndpointInterface);
		((org.apache.axis.client.Stub) _stub).setPortName(portName);
		return _stub;
	}

	public javax.xml.namespace.QName getServiceName() {
		return new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", Soap_service);
	}

	@SuppressWarnings("rawtypes")
	private java.util.HashSet ports = null;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public java.util.Iterator getPorts() {
		if (ports == null) {
			ports = new java.util.HashSet();
			ports.add(new javax.xml.namespace.QName(SoapPort));
		}
		return ports.iterator();
	}

	/**
	 * @return
	 */
	public java.lang.String getSoap_service() {
		return Soap_service;
	}

	/**
	 * @return
	 */
	public java.lang.String getSoapPort() {
		return SoapPort;
	}

	/**
	 * @param string
	 */
	public void setSoap_service(java.lang.String string) {
		Soap_service = string;
	}

	/**
	 * @param string
	 */
	public void setSoapPort(java.lang.String string) {
		SoapPort = string;
	}

}

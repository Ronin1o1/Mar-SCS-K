/**
 * GetHotelRoomPoolListBindingStub.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.roomproductinfo;

import java.rmi.RemoteException;
import java.util.Enumeration;
import java.util.Vector;

import javax.xml.namespace.QName;
import javax.xml.rpc.ParameterMode;
import javax.xml.rpc.ServiceException;

import org.apache.axis.AxisFault;
import org.apache.axis.client.Call;
import org.apache.axis.encoding.ser.BeanDeserializerFactory;
import org.apache.axis.encoding.ser.BeanSerializerFactory;
import org.apache.axis.encoding.ser.SimpleDeserializerFactory;
import org.apache.axis.encoding.ser.SimpleSerializerFactory;
import org.apache.axis.utils.JavaUtils;

import com.marriott.rfp.dataaccess.rd.common.UriLiteralConstant;
import com.marriott.rfp.object.roomdef.beans.BasicPropertyInfo;
import com.marriott.rfp.object.roomdef.beans.Brand;
import com.marriott.rfp.object.roomdef.beans.Description;
import com.marriott.rfp.object.roomdef.beans.Errors;
import com.marriott.rfp.object.roomdef.beans.Format;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductInfoRS;
import com.marriott.rfp.object.roomdef.beans.OTA_ResRetrieveRS;
import com.marriott.rfp.object.roomdef.beans.POS;
import com.marriott.rfp.object.roomdef.beans.ProductDescription;
import com.marriott.rfp.object.roomdef.beans.ProductDescriptions;
import com.marriott.rfp.object.roomdef.beans.RequestorID;
import com.marriott.rfp.object.roomdef.beans.RoomProduct;
import com.marriott.rfp.object.roomdef.beans.RoomProducts;
import com.marriott.rfp.object.roomdef.beans.RoomType;
import com.marriott.rfp.object.roomdef.beans.RoomTypes;
import com.marriott.rfp.object.roomdef.beans.Source;
import com.marriott.rfp.object.roomdef.beans.SupplementaryData;
import com.marriott.rfp.object.roomdef.beans.SynchAlert;
import com.marriott.rfp.object.roomdef.beans.SynchAlerts;
import com.marriott.rfp.object.roomdef.beans.Text;
import com.marriott.rfp.object.roomdef.beans.UnitOfMeasure;
import com.marriott.rfp.object.roomdef.beans.Version;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListSerializerFactory;
import com.marriott.rfp.object.roomdef.ser.MI_HotelRSDeserFactory;

@SuppressWarnings({"unchecked","rawtypes"})
public class GetHotelRoomProductInfoBindingStub extends org.apache.axis.client.Stub implements GetHotelRoomProductInfoPortType {
	private Vector cachedSerClasses = new Vector();
	private Vector cachedSerQNames = new Vector();
	private Vector cachedSerFactories = new Vector();
	private Vector cachedDeserFactories = new Vector();

	public GetHotelRoomProductInfoBindingStub() throws org.apache.axis.AxisFault {
		this(null);
	}

	public GetHotelRoomProductInfoBindingStub(java.net.URL endpointURL, javax.xml.rpc.Service service) throws AxisFault {
		this(service);
		super.cachedEndpoint = endpointURL;
	}

	public GetHotelRoomProductInfoBindingStub(javax.xml.rpc.Service service) throws AxisFault {
		if (service == null) {
			super.service = new org.apache.axis.client.Service();
		} else {
			super.service = service;
		}
		java.lang.Class cls;
		javax.xml.namespace.QName qName;
		java.lang.Class beansf = BeanSerializerFactory.class;
		java.lang.Class beandf = BeanDeserializerFactory.class;
		java.lang.Class enumsf = org.apache.axis.encoding.ser.EnumSerializerFactory.class;
		java.lang.Class enumdf = org.apache.axis.encoding.ser.EnumDeserializerFactory.class;
		java.lang.Class simplesf = SimpleSerializerFactory.class;
		java.lang.Class simpledf = SimpleDeserializerFactory.class;
		java.lang.Class hoteldf = MI_HotelRSDeserFactory.class;
		java.lang.Class hotelsf = MI_HotelListSerializerFactory.class;

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">BasicPropertyInfo");
		cachedSerQNames.add(qName);
		cls = BasicPropertyInfo.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("", ">MI_HotelRoomProductInfoRS");
		cachedSerQNames.add(qName);
		cls = MI_HotelRoomProductInfoRS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductInfoRS");
		cachedSerQNames.add(qName);
		cls = MI_HotelRoomProductInfoRS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(hoteldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductInfoRQ");
		cachedSerQNames.add(qName);
		cls = MI_HotelRoomProductInfoRQ.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">POS");
		cachedSerQNames.add(qName);
		cls = POS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">RequestorID");
		cachedSerQNames.add(qName);
		cls = RequestorID.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Source");
		cachedSerQNames.add(qName);
		cls = Source.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "RoomProducts");
		cachedSerQNames.add(qName);
		cls = RoomProducts.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(hotelsf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">RoomProduct");
		cachedSerQNames.add(qName);
		cls = RoomProduct.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(hotelsf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "RoomTypes");
		cachedSerQNames.add(qName);
		cls = RoomTypes.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">RoomType");
		cachedSerQNames.add(qName);
		cls = RoomType.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);
		
		qName = new QName("http://www.opentravel.org/OTA/2003/05", "ProductDescriptions");
		cachedSerQNames.add(qName);
		cls = ProductDescriptions.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(hotelsf);
		cachedDeserFactories.add(hoteldf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">ProductDescription");
		 cachedSerQNames.add(qName);
		 cls = ProductDescription.class;
		 cachedSerClasses.add(cls);
		 cachedSerFactories.add(hotelsf);
		 cachedDeserFactories.add(hoteldf);


		qName = new QName("http://www.opentravel.org/OTA/2003/05", "SynchAlerts");
		cachedSerQNames.add(qName);
		cls = SynchAlerts.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(hotelsf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">SynchAlert");
		cachedSerQNames.add(qName);
		cls = SynchAlert.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(hotelsf);
		cachedDeserFactories.add(hoteldf);


		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Brand");
		cachedSerQNames.add(qName);
		cls = Brand.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(simplesf);
		 cachedDeserFactories.add(simpledf);


		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Format");
		cachedSerQNames.add(qName);
		cls = Format.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(simplesf);
		 cachedDeserFactories.add(simpledf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "UnitOfMeasure");
		cachedSerQNames.add(qName);
		cls = UnitOfMeasure.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(simplesf);
		 cachedDeserFactories.add(simpledf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "SupplementaryData");
		cachedSerQNames.add(qName);
		cls = SupplementaryData.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(hoteldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "Description");
		cachedSerQNames.add(qName);
		cls = Description.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(hotelsf);
		cachedDeserFactories.add(hoteldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Text");
		cachedSerQNames.add(qName);
		cls = Text.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(simplesf);
		cachedDeserFactories.add(simpledf);
	
		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Errors");
		cachedSerQNames.add(qName);
		cls =  Errors.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(hoteldf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">OTA_ResRetrieveRS");
		cachedSerQNames.add(qName);
		cls =  OTA_ResRetrieveRS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">OTA_ResRetrieveRS>Version");
		cachedSerQNames.add(qName);
		cls =  Version.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(enumsf);
		cachedDeserFactories.add(enumdf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Error");
		cachedSerQNames.add(qName);
		cls =  com.marriott.rfp.object.roomdef.beans.Error.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);
	}


	private Call createCall() throws RemoteException {
		try {
			Call _call = (Call) super.service.createCall();
			if (super.maintainSessionSet) {
				_call.setMaintainSession(super.maintainSession);
			}
			if (super.cachedUsername != null) {
				_call.setUsername(super.cachedUsername);
			}
			if (super.cachedPassword != null) {
				_call.setPassword(super.cachedPassword);
			}
			if (super.cachedEndpoint != null) {
				_call.setTargetEndpointAddress(super.cachedEndpoint);
			}
			if (super.cachedTimeout != null) {
				_call.setTimeout(super.cachedTimeout);
			}
			if (super.cachedPortName != null) {
				_call.setPortName(super.cachedPortName);
			}
			Enumeration keys = super.cachedProperties.keys();
			while (keys.hasMoreElements()) {
				String key = (String) keys.nextElement();
				if (_call.isPropertySupported(key))
					_call.setProperty(key, super.cachedProperties.get(key));
			}
			// All the type mapping information is registered
			// when the first call is made.
			// The type mapping information is actually registered in
			// the TypeMappingRegistry of the service, which
			// is the reason why registration is only needed for the first call.
			synchronized (this) {
				if (firstCall()) {
					// must set encoding style before registering serializers
					_call.setEncodingStyle(null);
					for (int i = 0; i < cachedSerFactories.size(); ++i) {
						java.lang.Class cls = (java.lang.Class) cachedSerClasses.get(i);
						QName qName = (QName) cachedSerQNames.get(i);
						Class sf = (java.lang.Class) cachedSerFactories.get(i);
						Class df = (java.lang.Class) cachedDeserFactories.get(i);
						_call.registerTypeMapping(cls, qName, sf, df, false);
					}
				}
			}
			return _call;
		} catch (Throwable t) {
			throw new AxisFault("Failure trying to get the Call object", t);
		}
	}

	public MI_HotelRoomProductInfoRS MI_HotelRoomProductInfoRQ(MI_HotelRoomProductInfoRQ MI_HotelRoomProductInfoRQ,String SoapPort_address) throws RemoteException, ServiceException {
		if (super.cachedEndpoint == null) {
			throw new org.apache.axis.NoEndPointException();
		}
		Call _call = createCall();
		_call.addParameter(
			new QName("http://www.opentravel.org/OTA/2003/05", "MI_HotelRoomProductInfoRQ"),
			new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductInfoRQ"),
			MI_HotelRoomProductInfoRQ.class,
			ParameterMode.IN);
		_call.setReturnType(new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductInfoRS"), MI_HotelRoomProductInfoRS.class);
		_call.setUseSOAPAction(true);
		_call.setSOAPActionURI("GetHotelRoomProductInfo");
		_call.setEncodingStyle(UriLiteralConstant.URI_LITERAL_ENC);
		_call.setOperationStyle("document");
		_call.setOperationName(new QName("http://www.opentravel.org/OTA/2003/05", "MI_HotelRoomProductInfoRQ"));

		java.lang.Object _resp;
		try {
			_resp = _call.invoke(new Object[] { MI_HotelRoomProductInfoRQ });
			if (_resp instanceof java.rmi.RemoteException) {
				throw (java.rmi.RemoteException) _resp;
			} else {
				try {
					return (MI_HotelRoomProductInfoRS) _resp;
				} catch (Exception _exception) {
					return (MI_HotelRoomProductInfoRS) JavaUtils.convert(_resp, MI_HotelRoomProductInfoRS.class);
				}
			}
		} catch (Exception e) {
			throw new ServiceException("Room Product Info Not Found");
		} 
	}

	public MI_HotelRoomProductInfoRS GetRoomProductList(String marshacode, String roompool,String SoapPort_address) throws RemoteException, ServiceException {
		return MI_HotelRoomProductInfoRQ(GetRoomProductListRequestMessage(marshacode, roompool),SoapPort_address);

	}

	public MI_HotelRoomProductInfoRS GetRoomProduct(String marshacode, String roompool,String SoapPort_address) throws RemoteException, ServiceException {
		return MI_HotelRoomProductInfoRQ(GetRoomProductRequestMessage(marshacode, roompool),SoapPort_address);

	}

	private MI_HotelRoomProductInfoRQ GetRoomProductListRequestMessage(String marshacode, String roompool) {
		MI_HotelRoomProductInfoRQ req_msg = new MI_HotelRoomProductInfoRQ();
		req_msg.setEchoToken("A");
		req_msg.setVersion("1.0");

		RequestorID r_id = new RequestorID();
		r_id.setID("KORLISTROOMPRODUCTS");
		Source s = new Source();
		s.setRequestorID(r_id);
		POS pos = new POS();
		pos.setSource(s);
		req_msg.setPOS(pos);

		BasicPropertyInfo binfo = new BasicPropertyInfo();
		binfo.setHotelCode(marshacode);
		req_msg.setBasicPropertyInfo(binfo);
		
		if (roompool != null && !roompool.equals("")) {
			RoomType roomtype=new RoomType();
			RoomTypes roomtypes=new RoomTypes();
			
			java.util.ArrayList rt = new java.util.ArrayList(); 
			roomtype.setRoomTypeCode(roompool);
			rt.add(roomtype);
			java.util.List list = java.util.Arrays.asList(rt.toArray());
			roomtypes.setRoomType((RoomType[]) list.toArray(new RoomType[list.size()]));
			req_msg.setRoomTypes(roomtypes);
		} else {
			req_msg.setRoomTypes(null);
		}
		
		return req_msg;
	}

	private MI_HotelRoomProductInfoRQ GetRoomProductRequestMessage(String marshacode, String roompool) {
		MI_HotelRoomProductInfoRQ req_msg = new MI_HotelRoomProductInfoRQ();
		req_msg.setEchoToken("A");
		req_msg.setVersion("1.0");

		RequestorID r_id = new RequestorID();
		r_id.setID("KORROOMPRODUCT");
		Source s = new Source();
		s.setRequestorID(r_id);
		POS pos = new POS();
		pos.setSource(s);
		req_msg.setPOS(pos);

		BasicPropertyInfo binfo = new BasicPropertyInfo();
		binfo.setHotelCode(marshacode);
		req_msg.setBasicPropertyInfo(binfo);
		
		if (roompool != null && !roompool.equals("")) {
			RoomType roomtype=new RoomType();
			RoomTypes roomtypes=new RoomTypes();
			
			java.util.ArrayList rt = new java.util.ArrayList(); 
			roomtype.setRoomTypeCode(roompool);
			rt.add(roomtype);
			java.util.List list = java.util.Arrays.asList(rt.toArray());
			roomtypes.setRoomType((RoomType[]) list.toArray(new RoomType[list.size()]));
			req_msg.setRoomTypes(roomtypes);
		} else {
			req_msg.setRoomTypes(null);
		}
		
		return req_msg;
	}

}

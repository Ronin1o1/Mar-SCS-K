/**
 * GetHotelRoomPoolListBindingStub.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis WSDL2Java emitter.
 */

package com.marriott.rfp.dataaccess.rd.roomdef.productdisplaytext;

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
import com.marriott.rfp.object.roomdef.beans.Brands;
import com.marriott.rfp.object.roomdef.beans.Channel;
import com.marriott.rfp.object.roomdef.beans.Description;
import com.marriott.rfp.object.roomdef.beans.Entry;
import com.marriott.rfp.object.roomdef.beans.Errors;
import com.marriott.rfp.object.roomdef.beans.Format;
import com.marriott.rfp.object.roomdef.beans.Formats;
import com.marriott.rfp.object.roomdef.beans.MI_HotelAmenityListsInfoRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextNotifRQ;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextNotifRS;
import com.marriott.rfp.object.roomdef.beans.MI_HotelRoomProductDisplayTextRS;
import com.marriott.rfp.object.roomdef.beans.OTA_ResRetrieveRS;
import com.marriott.rfp.object.roomdef.beans.POS;
import com.marriott.rfp.object.roomdef.beans.ProductDescription;
import com.marriott.rfp.object.roomdef.beans.ProductDescriptions;
import com.marriott.rfp.object.roomdef.beans.RequestorID;
import com.marriott.rfp.object.roomdef.beans.RoomProduct;
import com.marriott.rfp.object.roomdef.beans.RoomProducts;
import com.marriott.rfp.object.roomdef.beans.Source;
import com.marriott.rfp.object.roomdef.beans.Text;
import com.marriott.rfp.object.roomdef.beans.UnitOfMeasure;
import com.marriott.rfp.object.roomdef.beans.UnitsOfMeasure;
import com.marriott.rfp.object.roomdef.beans.Version;
import com.marriott.rfp.object.roomdef.ser.MI_HotelListSerializerFactory;
import com.marriott.rfp.object.roomdef.ser.MI_HotelRSDeserFactory;


@SuppressWarnings("unchecked")
public class SetHotelRoomProductDisplayTextNotifBindingStub
	extends org.apache.axis.client.Stub
	implements SetHotelRoomProductDisplayTextNotifPortType {
	private Vector cachedSerClasses = new Vector();
	private Vector cachedSerQNames = new Vector();
	private Vector cachedSerFactories = new Vector();
	private Vector cachedDeserFactories = new Vector();

	public SetHotelRoomProductDisplayTextNotifBindingStub() throws org.apache.axis.AxisFault {
		this(null);
	}

	public SetHotelRoomProductDisplayTextNotifBindingStub(java.net.URL endpointURL, javax.xml.rpc.Service service) throws AxisFault {
		this(service);
		super.cachedEndpoint = endpointURL;
	}

	public SetHotelRoomProductDisplayTextNotifBindingStub(javax.xml.rpc.Service service) throws AxisFault {
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
		java.lang.Class roompooldf = MI_HotelRSDeserFactory.class;
		java.lang.Class roompoolsf = MI_HotelListSerializerFactory.class;

		qName = new QName("", ">MI_HotelRoomProductDisplayTextNotifRS");
		cachedSerQNames.add(qName);
		cls = MI_HotelRoomProductDisplayTextNotifRS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductDisplayTextNotifRS");
		cachedSerQNames.add(qName);
		cls = MI_HotelRoomProductDisplayTextNotifRS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductDisplayTextNotifRQ");
		cachedSerQNames.add(qName);
		cls = MI_HotelRoomProductDisplayTextNotifRQ.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(roompoolsf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">BasicPropertyInfo");
		cachedSerQNames.add(qName);
		cls = BasicPropertyInfo.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "RoomProducts");
		cachedSerQNames.add(qName);
		cls = RoomProducts.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(roompoolsf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">RoomProduct");
		cachedSerQNames.add(qName);
		cls = RoomProduct.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(roompoolsf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "ProductDescriptions");
		cachedSerQNames.add(qName);
		cls = ProductDescriptions.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(roompoolsf);
		cachedDeserFactories.add(roompooldf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">ProductDescription");
		cachedSerQNames.add(qName);
		cls = ProductDescription.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(roompoolsf);
		cachedDeserFactories.add(roompooldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "Brands");
		cachedSerQNames.add(qName);
		cls = Brands.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Brand");
		cachedSerQNames.add(qName);
		cls = Brand.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(simplesf);
		cachedDeserFactories.add(simpledf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "Formats");
		cachedSerQNames.add(qName);
		cls = Formats.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Format");
		cachedSerQNames.add(qName);
		cls = Format.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(simplesf);
		cachedDeserFactories.add(simpledf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "UnitsOfMeasure");
		cachedSerQNames.add(qName);
		cls = UnitsOfMeasure.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "UnitOfMeasure");
		cachedSerQNames.add(qName);
		cls = UnitOfMeasure.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(simplesf);
		cachedDeserFactories.add(simpledf);

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
		
		qName = new QName("http://www.opentravel.org/OTA/2003/05", "Entry");
		cachedSerQNames.add(qName);
		cls = Entry.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(roompoolsf);
		cachedDeserFactories.add(roompooldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Channel");
		cachedSerQNames.add(qName);
		cls = Channel.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Errors");
		cachedSerQNames.add(qName);
		cls = Errors.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">OTA_ResRetrieveRS");
		cachedSerQNames.add(qName);
		cls = OTA_ResRetrieveRS.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(beandf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", ">OTA_ResRetrieveRS>Version");
		cachedSerQNames.add(qName);
		cls = Version.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(enumsf);
		cachedDeserFactories.add(enumdf);

		qName = new javax.xml.namespace.QName("http://www.opentravel.org/OTA/2003/05", "Error");
		cachedSerQNames.add(qName);
		cls = com.marriott.rfp.object.roomdef.beans.Error.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(beansf);
		cachedDeserFactories.add(roompooldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", "Description");
		cachedSerQNames.add(qName);
		cls = Description.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(roompoolsf);
		cachedDeserFactories.add(roompooldf);

		qName = new QName("http://www.opentravel.org/OTA/2003/05", ">Text");
		cachedSerQNames.add(qName);
		cls = Text.class;
		cachedSerClasses.add(cls);
		cachedSerFactories.add(simplesf);
		cachedDeserFactories.add(simpledf);
		//cachedSerFactories.add(roompoolsf);
		//cachedDeserFactories.add(roompooldf);
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
					//_call.setEncodingStyle("UTF-8");

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

	public MI_HotelRoomProductDisplayTextNotifRS MI_HotelRoomProductDisplayTextNotifRQ(
		MI_HotelRoomProductDisplayTextNotifRQ MI_HotelRoomProductDisplayTextNotifRQ,String SoapPort_address)
		throws RemoteException, ServiceException {
		if (super.cachedEndpoint == null) {
			throw new org.apache.axis.NoEndPointException();
		}
		Call _call = createCall();
		_call.addParameter(
			new QName("http://www.opentravel.org/OTA/2003/05", "MI_HotelRoomProductDisplayTextNotifRQ"),
			new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductDisplayTextNotifRQ"),
			MI_HotelAmenityListsInfoRQ.class,
			ParameterMode.IN);
		_call.setReturnType(
			new QName("http://www.opentravel.org/OTA/2003/05", ">MI_HotelRoomProductDisplayTextNotifRS"),
			MI_HotelRoomProductDisplayTextNotifRS.class);
		_call.setUseSOAPAction(true);
		_call.setSOAPActionURI("MI_HotelRoomProductDisplayTextNotifRQ");
		_call.setEncodingStyle(UriLiteralConstant.URI_LITERAL_ENC);
		_call.setOperationStyle("document");
		_call.setOperationName(new QName("http://www.opentravel.org/OTA/2003/05", "MI_HotelRoomProductDisplayTextNotifRQ"));

		java.lang.Object _resp;
		try {
			_resp = _call.invoke(new Object[] { MI_HotelRoomProductDisplayTextNotifRQ });
			if (_resp instanceof java.rmi.RemoteException) {
				throw (java.rmi.RemoteException) _resp;
			} else {
				try {
					return (MI_HotelRoomProductDisplayTextNotifRS) _resp;
				} catch (Exception _exception) {
					return (MI_HotelRoomProductDisplayTextNotifRS) JavaUtils.convert(
						_resp,
						MI_HotelRoomProductDisplayTextNotifRS.class);
				}
			}
		} catch (Exception e) {
			throw new ServiceException("Hotel Room Product Info Notif Not Found");
		}
	}

	public MI_HotelRoomProductDisplayTextNotifRS UpdateDisplayText(MI_HotelRoomProductDisplayTextRS roomproductInfo, String loginName,String SoapPort_address)
		throws RemoteException, ServiceException {
		return MI_HotelRoomProductDisplayTextNotifRQ(GetUpdateRequestMessage(roomproductInfo, loginName), SoapPort_address);

	}

	private MI_HotelRoomProductDisplayTextNotifRQ GetUpdateRequestMessage(MI_HotelRoomProductDisplayTextRS roomproductInfo, String loginName) {
		//both marshacode and roompool must be present
		MI_HotelRoomProductDisplayTextNotifRQ req_msg = new MI_HotelRoomProductDisplayTextNotifRQ();
		req_msg.setEchoToken("A");
		req_msg.setVersion("1.0");
				
		RequestorID r_id = new RequestorID();
		r_id.setID("MARRFP");
		Source s = new Source();
		s.setAgentSine(loginName);
		s.setRequestorID(r_id);
		POS pos = new POS();
		pos.setSource(s);
		req_msg.setPOS(pos);

		req_msg.setChannel(roomproductInfo.getChannel());
		req_msg.setPrimaryLangID(roomproductInfo.getPrimaryLangID());
		req_msg.setBrands(roomproductInfo.getBrands());
		req_msg.setUnitsOfMeasure(roomproductInfo.getUnitsOfMeasure());
		req_msg.setFormats(roomproductInfo.getFormats());
		req_msg.setProductDescriptions(roomproductInfo.getProductDescriptions());
		return req_msg;
	}

}

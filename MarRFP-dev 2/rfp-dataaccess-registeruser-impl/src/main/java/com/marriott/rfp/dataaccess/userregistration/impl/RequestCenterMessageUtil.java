package com.marriott.rfp.dataaccess.userregistration.impl;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import javax.xml.namespace.QName;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.events.Attribute;
import javax.xml.stream.events.EndElement;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;

import com.marriott.rfp.object.registeringuser.RegisteringUser;

public class RequestCenterMessageUtil {
	private static final String EID = "CUSTOMEREID";
	private static final String EMAIL = "CUSTOMEREMAIL";
	private static final String FIRSTNAME = "CUSTOMERFIRSTNAME";
	private static final String LASTNAME = "CUSTOMERLASTNAME";
	private static final String PHONE = "CUSTOMERPHONE";
	private static final String CUSTOMERROLE = "CUSTOMERROLE";
	private static final String DELETETYPE = "DELETETYPE";
	private static final String DELETELIST = "DELETELIST";
	private static final String ADDTYPE = "SELECTIONTYPE";
	private static final String ADDLIST = "APPROVEDLIST";
	private static final String MODIFY_REQUEST = "modifyRequest";
	private static final String ADD_REQUEST = "addRequest";
	private static final String REQUEST_ID = "requestID";
	private static final String MODIFICATION = "modification";
	private static final String EDSROLE = "EDSROLE";
	private static final String NAME = "name";
	private static final String VALUE = "value";
	private static final String CUSTOMERSTATE = "CUSTOMERSTATE";
	private static final String CUSTOMERCITY = "CUSTOMERCITY";
	private static final String CUSTOMERCOUNTRY = "CUSTOMERCOUNRTY";

	public static List<RegisteringUser> processRequestCenterMessage(String xmlMessageAsString) throws Exception {
		XMLInputFactory inputFactory = XMLInputFactory.newInstance();
		inputFactory.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false);
		StringReader stringReader = new StringReader(xmlMessageAsString);
		final XMLEventReader reader = inputFactory.createXMLEventReader(stringReader);
		List<RegisteringUser> securityUsersList = new ArrayList<RegisteringUser>();
		@SuppressWarnings("unused")
		int count = 0;
		List<String> deleteList = null;
		List<String> addList = null;
		RegisteringUser securityUser = null;
		boolean isEid = false;
		boolean isEmail = false;
		boolean isFirstName = false;
		boolean isLastName = false;
		boolean isPhone = false;
		boolean isCustomerRole = false;
		boolean isDeleteType = false;
		boolean isDeleteList = false;
		boolean isAddType = false;
		boolean isAddList = false;
		boolean isEdsRole = false;
		boolean isCustomerState = false;
		boolean isCustomerCountry = false;
		boolean isCustomerCity = false;

		try {
			while (reader.hasNext()) {
				XMLEvent event = (XMLEvent) reader.next();

				if (event.isStartElement()) {
					StartElement element = event.asStartElement();

					if (element.getName().getLocalPart().equals(MODIFY_REQUEST) || element.getName().getLocalPart().equals(ADD_REQUEST)) {
						securityUser = new RegisteringUser();
						deleteList = new ArrayList<String>();
						addList = new ArrayList<String>();
						Attribute attribute = element.getAttributeByName(new QName(REQUEST_ID));
						String requestId = attribute.getValue();
						securityUser.setJmsReqId(requestId);
						continue;
					}
					if (element.getName().getLocalPart().equals(MODIFICATION)) {
						Attribute attribute = element.getAttributeByName(new QName(NAME));
						String attributeValue = attribute.getValue();
						if (attributeValue.equals(EID)) {
							isEid = true;
						} else if (attributeValue.equals(EMAIL)) {
							isEmail = true;
						} else if (attributeValue.equals(FIRSTNAME)) {
							isFirstName = true;
						} else if (attributeValue.equals(LASTNAME)) {
							isLastName = true;
						} else if (attributeValue.equals(PHONE)) {
							isPhone = true;
						} else if (attributeValue.equals(CUSTOMERROLE)) {
							isCustomerRole = true;
						} else if (attributeValue.equals(DELETETYPE)) {
							isDeleteType = true;
						} else if (attributeValue.equals(DELETELIST)) {
							isDeleteList = true;
						} else if (attributeValue.equals(ADDTYPE)) {
							isAddType = true;
						} else if (attributeValue.equals(ADDLIST)) {
							isAddList = true;
						} else if (attributeValue.equals(EDSROLE)) {
							isEdsRole = true;
						} else if (attributeValue.equals(CUSTOMERSTATE)) {
							isCustomerState = true;
						} else if (attributeValue.equals(CUSTOMERCOUNTRY)) {
							isCustomerCountry = true;
						} else if (attributeValue.equals(CUSTOMERCITY)) {
							isCustomerCity = true;
						}
						continue;
					}
					if (element.getName().getLocalPart().equals(VALUE)) {
						event = (XMLEvent) reader.next();

						if (event.isCharacters()) {
							String value = event.asCharacters().getData();
							if (isEid) {
								securityUser.setEid(value);
							} else if (isEmail) {
								securityUser.setEmail(value);
							} else if (isFirstName) {
								securityUser.setFirstName(value);
							} else if (isLastName) {
								securityUser.setLastName(value);
							} else if (isPhone) {
								securityUser.setPhone(value);
							} else if (isCustomerRole) {
								securityUser.setGroupName(value);
							} else if (isDeleteType) {
								securityUser.setDeleteType(value);
							} else if (isDeleteList) {
								deleteList.add(value.trim());
							} else if (isAddType) {
								securityUser.setAddType(value);
							} else if (isAddList) {
								addList.add(value);
							} else if (isEdsRole) {
								securityUser.setRole(value);
							} else if (isCustomerState) {
								securityUser.setState(value);
							} else if (isCustomerCountry) {
								securityUser.setCountry(value);
							} else if (isCustomerCity) {
								securityUser.setCity(value);
							}

						}
						continue;
					}

				}
				if (event.isEndElement()) {

					EndElement endElement = event.asEndElement();
					if (endElement.getName().getLocalPart().equals(MODIFICATION)) {
						isEid = false;
						isEmail = false;
						isFirstName = false;
						isLastName = false;
						isPhone = false;
						isCustomerRole = false;
						isDeleteType = false;
						isDeleteList = false;
						isAddType = false;
						isAddList = false;
						isEdsRole = false;
						isCustomerState = false;
						isCustomerCountry = false;
						isCustomerCity = false;
						continue;
					}
				}
				if (event.isEndElement()) {

					EndElement endElement = event.asEndElement();
					if (endElement.getName().getLocalPart().equals(MODIFY_REQUEST) || endElement.getName().getLocalPart().equals(ADD_REQUEST)) {
						securityUser.setDeleteList(deleteList);
						securityUser.setAddList(addList);
						securityUsersList.add(securityUser);
						count++;
						deleteList = null;
						addList = null;
						continue;
					}
				}
			}

		} finally {
			reader.close();
		}
		return securityUsersList;
	}

}
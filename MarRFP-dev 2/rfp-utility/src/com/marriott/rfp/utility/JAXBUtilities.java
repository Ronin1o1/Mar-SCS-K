package com.marriott.rfp.utility;

import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.util.GregorianCalendar;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeConstants;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.transform.Source;
import javax.xml.transform.sax.SAXSource;

import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class JAXBUtilities {

	private static DatatypeFactory df = null;
	static {
		try {
			df = DatatypeFactory.newInstance();
		} catch (DatatypeConfigurationException dce) {
			throw new IllegalStateException("Exception while obtaining DatatypeFactory instance", dce);
		}
	}

	public static XMLGregorianCalendar asXMLGregorianCalendar(java.util.Date date) {
		if (date == null) {
			return null;
		} else {
			GregorianCalendar gc = new GregorianCalendar();
			gc.setTimeInMillis(date.getTime());
			XMLGregorianCalendar xgc = df.newXMLGregorianCalendar(gc);
			xgc.setTimezone(DatatypeConstants.FIELD_UNDEFINED);
			xgc.setTime(DatatypeConstants.FIELD_UNDEFINED, DatatypeConstants.FIELD_UNDEFINED, DatatypeConstants.FIELD_UNDEFINED);
			return xgc;
		}
	}

	public static java.util.Date asDate(XMLGregorianCalendar xgc) {
		if (xgc == null) {
			return null;
		} else {
			return xgc.toGregorianCalendar().getTime();
		}
	}

	/**
	 * Generate XML from a JAXB annotated object
	 * 
	 * @param root
	 *            the root object
	 * @return xml string
	 * @throws JAXBException
	 *             any JAXB exception
	 */
	public static String generateXml(Object root) throws JAXBException {
		if (root == null) {
			return null;
		}
		Marshaller marshaller = JAXBContext.newInstance(root.getClass().getPackage().getName()).createMarshaller();
		marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

		Writer writer = new StringWriter();
		marshaller.marshal(root, writer);
		return writer.toString();
	}

	/**
	 * Parse an XML and create and populate the object
	 * 
	 * @param xml
	 *            the xml
	 * @param rootClass
	 *            root object class
	 * @return the root object with its children
	 * @throws JAXBException
	 *             any parsing exception
	 * @throws ParserConfigurationException
     * @throws SAXException            
	 */
	@SuppressWarnings("unchecked")
	public static <T> T parseXml(String xml, Class<T> rootClass) throws JAXBException, ParserConfigurationException, SAXException {
		SAXParserFactory spf = SAXParserFactory.newInstance();
        spf.setFeature("http://xml.org/sax/features/external-general-entities", false);
        spf.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
        spf.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
        spf.setNamespaceAware(true);
        Source xmlSource = new SAXSource(spf.newSAXParser().getXMLReader(),
                                        new InputSource(new StringReader(xml)));
        return (T)JAXBContext.newInstance(rootClass.getPackage().getName())
                .createUnmarshaller()
                .unmarshal(xmlSource);
	}

}

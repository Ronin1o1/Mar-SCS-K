package com.marriott.rfp.business.hpp.impl;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.xml.ws.BindingProvider;
import javax.xml.ws.WebServiceRef;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.hpp.api.HppPublishService;
import com.marriott.rfp.business.hpp.impl.util.PGOOSUtils;
import com.marriott.rfp.object.pgoos.HotelAccountInfo;
import com.marriott.rfp.object.pgoos.HotelsToPublish;
import com.marriott.rfp.object.pgoos.PublishHotelResponse;
import com.marriott.rfp.object.pgoos.PublishResponse;
import com.marriott.rfp.object.pgoos.RoomPool;
import com.marriott.rfp.webservice.hpp.btrates.BTPublishRequest;
import com.marriott.rfp.webservice.hpp.btrates.BTPublishResponse;
import com.marriott.rfp.webservice.hpp.btrates.BTRateService;
import com.marriott.rfp.webservice.hpp.btrates.BTRateServicePortType;
import com.marriott.rfp.webservice.hpp.btrates.BTRatesRequest;
import com.marriott.rfp.webservice.hpp.btrates.BTRatesResponse;
import com.marriott.rfp.webservice.hpp.btrates.FaultMessage_Exception;
import com.marriott.rfp.utility.ConfigurationUtility;
import java.net.URL;
import javax.xml.namespace.QName;

@Transactional("transactionManagerRfpCommon")
@Service
public class HppPublishServiceImpl implements HppPublishService {

	private static final Logger logger = Logger.getLogger(HppPublishServiceImpl.class.getName());
	private static final QName SERVICE_NAME = new QName("http://com/marriott/rma/webservice/btrates", "BTRateService");

	// @WebServiceRef(name = "BTRateService", wsdlLocation =
	// "file:/C:/Users/gkris192/Git/MarRFP/rfp-business-publish-impl/src/main/resources/META-INF/wsdl/BTRateService.wsdl",
	// value = com.marriott.rfp.webservice.hpp.btrates.BTRateService.class)
	private BTRateService btService;

	public HppPublishServiceImpl() {
	}

	public HppPublishServiceImpl(BTRateService service) {
		this.btService = service;
	}

	public List<PublishResponse> publishRateEntity(HotelAccountInfo hotelAccount, String urlForBTService,
			Boolean holdPublish, String byPeriod, List<RoomPool> rateProgramList) {
		BTRatesRequest btRateRequest = null;
		BTRatesResponse btResponse = null;
		List<PublishResponse> response = null;
		boolean bError = false;
		try {
			btRateRequest = PGOOSUtils.convertToBTRatesRequest(hotelAccount, holdPublish, byPeriod, rateProgramList);
			logger.log(Level.INFO, "publishRateEntity BTRatesRequest" + btRateRequest);
		} catch (Exception ex) {
			logger.log(Level.SEVERE, "Error for hotel_accountinfoid:" + hotelAccount.getHotel_accountinfoid());
			ex.printStackTrace();
			bError = true;
		}
		if (!bError) {
			if (btRateRequest != null) {
				try {
					// SWIRM-1617-Throttling changes
					ConfigurationUtility.delay(true);
					btResponse = publishBTRateQuest(btRateRequest, urlForBTService);
					logger.log(Level.INFO, "btRateRequest: " + btRateRequest);
					logger.log(Level.INFO, "Got BTRatesResponse  for  processid=" + btRateRequest.getProcessId());
					response = PGOOSUtils.convertFromBTRatesResponse(btResponse);
				} catch (Exception fme) {
					logger.log(Level.INFO, "BTRatesRequest:\n" + PGOOSUtils.toXML(btRateRequest));

					logger.log(Level.INFO, "BTRatesResponse  for  processid=" + btRateRequest.getProcessId() + ": "
							+ fme.getMessage());
					logger.log(Level.INFO, "btRateRequest" + btRateRequest);
					response = PGOOSUtils.convertFromFaultMessage_Exception(fme, btRateRequest);
					logger.log(Level.SEVERE, fme.getMessage());

				}
			}
		}
		return response;
	}

	private BTRatesResponse publishBTRateQuest(BTRatesRequest btRateRequest, String urlForBTService)
			throws FaultMessage_Exception {

		BTRatesResponse btResponse = null;

		BTRateServicePortType port = getBTServicePort(urlForBTService);

		logger.log(Level.INFO, "Sending BTRatesRequest and port is " + port);
		logger.log(Level.INFO, "BTRatesRequest: " + btRateRequest);
		btResponse = port.sendBTRates(btRateRequest);
		logger.log(Level.INFO, "Received BTRatesResponse\n");
		logger.log(Level.INFO, "Received BTRatesResponse\n" + btResponse);

		return btResponse;
	}

	public List<PublishHotelResponse> publishHotels(List<HotelsToPublish> hotellist, String eid,
			String urlForBTService) {

		BTPublishRequest btpublishRequest = PGOOSUtils.convertToBTPublishRequest(hotellist, eid);

		List<PublishHotelResponse> response = null;

		try {
			// SWIRM-1617-Throttling changes
			ConfigurationUtility.delay(true);
			BTPublishResponse btResponse = publishBTPublishQuest(btpublishRequest, urlForBTService);
			logger.log(Level.INFO, "btpublishRequest is " + btpublishRequest);
			logger.log(Level.INFO, "Got BTPublishResponse and btResponse is " + btResponse);
			response = PGOOSUtils.convertFromBTPublishResponse(btResponse);
		} catch (Exception fme) {
			logger.log(Level.INFO, "BTPublishResponse:\n" + PGOOSUtils.toXML(btpublishRequest));
			logger.log(Level.SEVERE, fme.getMessage());

			response = PGOOSUtils.convertFromFaultMessage_Exception(fme, btpublishRequest);
		}

		return response;
	}

	private BTPublishResponse publishBTPublishQuest(BTPublishRequest btpublishRequest, String urlForBTService)
			throws FaultMessage_Exception {

		BTPublishResponse btResponse = null;

		BTRateServicePortType port = getBTServicePort(urlForBTService);

		logger.log(Level.INFO, "Sending BTPublishRequest and port is " + port);
		logger.log(Level.INFO, "Sending BTPublishRequest and btpublishRequest:" + btpublishRequest);
		btResponse = port.publishBTRates(btpublishRequest);
		logger.log(Level.INFO, "Received BTPublishRequest\n");
		logger.log(Level.INFO, "Received BTPublishRequest\n" + btResponse);

		return btResponse;
	}

	private BTRateServicePortType getBTServicePort(String urlForBTService) {
		URL url = null;

		url = com.marriott.rfp.webservice.hpp.btrates.BTRateService.class
				.getResource("/META-INF/wsdl/BTRateService.wsdl");
		logger.info("url formed" + url);

		BTRateService bts = new BTRateService(url, SERVICE_NAME);

		BTRateServicePortType port = bts.getBTRateServicePort();

		// BTRateServicePortType port = btService.getBTRateServicePort();

		if (StringUtils.isNotEmpty(urlForBTService)) {
			((BindingProvider) port).getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY,
					urlForBTService);
		}
		return port;
		// return null;
	}

}

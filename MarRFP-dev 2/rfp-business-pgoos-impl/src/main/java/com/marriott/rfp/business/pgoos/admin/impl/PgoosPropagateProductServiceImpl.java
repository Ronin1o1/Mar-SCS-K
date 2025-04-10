package com.marriott.rfp.business.pgoos.admin.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pgoos.admin.api.PgoosPropagateProductService;
import com.marriott.rfp.business.rd.api.RateProductService;
import com.marriott.rfp.dataaccess.pgoos.product.api.PGOOSProductManager;
import com.marriott.rfp.dataaccess.rd.rateproduct.api.RateProductManager;
import com.marriott.rfp.object.pgoos.propagate.PGOOSAccountProduct;
import com.marriott.rfp.object.pgoos.propagate.PGOOSHotelAccountProduct;
import com.marriott.rfp.object.pgoos.propagate.PGOOSProductAmenity;
import com.marriott.rfp.object.roomdef.beans.Errors;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinition;
import com.marriott.rfp.object.roomdef.beans.RateProductDefinitions;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDataDictionaryRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsListRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsNotifRS;
import com.marriott.rfp.object.roomdef.beans.rateproduct.MI_RateProductDefinitionsRS;
import com.marriott.rfp.object.user.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Session Bean implementation class PgoosPropagateProductServiceImpl
 */

@Service()
@Transactional("transactionManagerRfpCommon")
public class PgoosPropagateProductServiceImpl implements PgoosPropagateProductService {

	private static final Logger log = LoggerFactory.getLogger(PgoosPropagateProductServiceImpl.class);

	@Autowired
	private  PGOOSProductManager pgoosProductMgr = null;

	@Autowired
	private  RateProductManager rateprod_mgr = null;

	@Autowired
	private  RateProductService rateprod_svc = null;

	private MI_RateProductDataDictionaryRS datadictionary;

	public void accountRunMCBVerifyProdProcess(Long batchid, User user) {

		try {
			pgoosProductMgr.updateCompareAmenityRunmcb(user.getEid());
			//List<PGOOSAccountProduct> aps = pgoosProductMgr.getRunMCBVerifyAccountProduct();
			//accountVerifyProductProcess(aps);

			List<PGOOSAccountProduct> aps2 = pgoosProductMgr.getRunMCBAccountProduct(user.getEid());
			accountMasterProductProcess(aps2, user.getEid());

		} catch (Exception ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public void accountRunMCBHotelProdProcess(Long batchid, User user,long numver) {

		try {
			List<PGOOSHotelAccountProduct> aps3 = pgoosProductMgr.getRunMCBHotelProduct(numver);
			if (aps3 != null && aps3.size() > 0) {
				setRateProductDataDictionary();
				hotelProductProcess(batchid, aps3, user.getEid());
			}
			
		} catch (Exception ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	

	public void accountLiveProductProcess(Long batchid, long hotelid, long accountrecid, User user) {

		try {
			pgoosProductMgr.updateCompareAmenitylive(hotelid, accountrecid);
			//List<PGOOSAccountProduct> aps = pgoosProductMgr.getLiveVerifyAccountProduct(accountrecid);
			//accountVerifyProductProcess(aps);

			List<PGOOSAccountProduct> aps2 = pgoosProductMgr.getLiveAccountProduct(accountrecid);
			accountMasterProductProcess(aps2, user.getEid());

			List<PGOOSHotelAccountProduct> aps3 = pgoosProductMgr.getLiveHotelProduct(hotelid, accountrecid);
			if (aps3 != null && aps3.size() > 0) {
				setRateProductDataDictionary();
				hotelProductProcess(batchid, aps3, user.getEid());
			}
		} catch (Exception ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public void accountBatchProductProcess(Long batchid, String user) {

		try {

			List<PGOOSHotelAccountProduct> aps3 = pgoosProductMgr.getBatchHotelProduct();
			if (aps3 != null && aps3.size() > 0) {
				setRateProductDataDictionary();
				hotelProductProcess(batchid, aps3, user);
			}
		} catch (Exception ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public void accountBatchProductVerifyProcess(Long batchid, String user) {
		try {
			// pgoosProductMgr.updateCompareAmenityBatch();
			//List<PGOOSAccountProduct> aps = pgoosProductMgr.getBatchVerifyAccountProduct();
			//if (aps != null && aps.size() > 0)
//				accountVerifyProductProcess(aps);
		} catch (Exception ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public void accountBatchProductMasterProcess(Long batchid, String user) {
		try {
			List<PGOOSAccountProduct> aps2 = pgoosProductMgr.getBatchAccountProduct();
			if (aps2 != null && aps2.size() > 0)
				accountMasterProductProcess(aps2, user);

		} catch (Exception ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	private void accountMasterProductProcess(List<PGOOSAccountProduct> aps, String user) {
		if (aps.size() > 0) {
			RateProductDefinitions rtnds = null;
			try {
				MI_RateProductDataDictionaryRS dd = rateprod_mgr.getDataDictionary();
				rtnds = rateprod_svc.getFullDataForBlank(dd, null);
			} catch (Exception e) {
				log.error(e.getMessage(),e);
			}
			for (int i = 0; i < aps.size(); i++) {
				PGOOSAccountProduct apm = aps.get(i);
				// create new product
				if (apm.getProductid() == null || apm.getProductid().equals("")) {
					try {
						// set up new product
						RateProductDefinitions rtnds2 = new RateProductDefinitions();
						rtnds2.copyInto(rtnds);
						rtnds2.setProductName("PGOOS Product");
						rtnds2.setManaged("true");
						// create new product on Marsha
						MI_RateProductDefinitionsNotifRS rp_def = rateprod_mgr.setRateProductDefinitions(null, null, rtnds2, user);
						rtnds2 = rp_def.getRateProductDefinitions();
						// update account with new product id
						pgoosProductMgr.setAccountProduct(rtnds2.getProductCode(), apm.getAccountrecid());
					} catch (Exception ex) {
						log.error(ex.getMessage(),ex);
					}
				}
			}
		}
	}

	public long accountProductSize() {
		return pgoosProductMgr.getAccountProductSize();
	}

	public long hotelProductSize(long numver) {
		return pgoosProductMgr.getHotelProductSize(numver);

	}

/*	private void accountVerifyProductProcess(List<PGOOSAccountProduct> aps) {
		if (aps.size() > 0) {
			for (int i = 0; i < aps.size(); i++) {
				PGOOSAccountProduct apm = aps.get(i);
				accountVerifyProductProcess(apm);
			}
		}
	}*/

	public void accountVerifyProductProcess(Long period, Long accountrecid, String productid) {
		if (productid != null && !productid.equals("")) {
			// verify that the product exists
			MI_RateProductDefinitionsListRS rpdl;
			try {
				rpdl = rateprod_mgr.getRateProductDefinitionsList(null, null, productid, null, 200, null, null, null);
				if (rpdl.getRateProductDefinitionsList().getRateProductDefinitions() == null) {
					// if the product does not exist, set the
					// productid
					// to null to force a new create
					productid = null;
				}
			} catch (Exception e1) {
				// if the productid does not exists, then blank out the
				// productid
				if (e1.getMessage() != null && e1.getMessage().equals("Invalid product code")) {
					productid = null;
				} else {
					// logger.error("PGOOS - master product processing -  verify exists "
					// + String.valueOf(apm.getAccountrecid()), e1);
					log.error(e1.getMessage(),e1);
				}
			}
		}
		if (productid == null) {
			pgoosProductMgr.setAccountProduct(productid, accountrecid);
		}
	}

	public void accountVerifyProductProcess(PGOOSAccountProduct apm) {
		if (apm.getProductid() != null && !apm.getProductid().equals("")) {
			// verify that the product exists
			MI_RateProductDefinitionsListRS rpdl;
			try {
				rpdl = rateprod_mgr.getRateProductDefinitionsList(null, null, apm.getProductid(), null, 200, null, null, null);
				if (rpdl.getRateProductDefinitionsList().getRateProductDefinitions() == null) {
					// if the product does not exist, set the
					// productid
					// to null to force a new create
					apm.setProductid(null);
				}
			} catch (Exception e1) {
				// if the productid does not exists, then blank out the
				// productid
				if (e1.getMessage() != null && e1.getMessage().equals("Invalid product code")) {
					apm.setProductid(null);
				} else {
					// logger.error("PGOOS - master product processing -  verify exists "
					// + String.valueOf(apm.getAccountrecid()), e1);
					log.error(e1.getMessage(),e1);
				}
			}
		}
		if (apm.getProductid() == null) {
			pgoosProductMgr.setAccountProduct(apm.getProductid(), apm.getAccountrecid());
		}
	}

	private void setRateProductDataDictionary() {
		datadictionary = rateprod_mgr.getDataDictionary();
	}

	public void hotelProductProcess(Long batchid, Long hotelid, Long accountrecid, String marshacode, String productid, String amenity_diff, String isAer, String user) {
		setRateProductDataDictionary();
		hotelProductProcessRec(batchid, hotelid, accountrecid, marshacode, productid, amenity_diff, isAer, user);
	}

	private void hotelProductProcessRec(Long batchid, Long hotelid, Long accountrecid, String marshacode, String productid, String amenity_diff, String isAer, String user) {
		List<PGOOSProductAmenity> amenities;
		try {
			RateProductDefinitions rtnds = null;
			if (productid != null && !productid.equals("")) {
				// verify that the product exists at the hotel level
				MI_RateProductDefinitionsListRS rpdl;
				String level;
				try {
					String amenitiesSet = "";
					if (!amenity_diff.equals("Y")) {
						rpdl = rateprod_mgr.getRateProductDefinitionsList(marshacode, null, productid, null, 200, null, null, null);
						level = "";
						if (rpdl.getRateProductDefinitionsList().getRateProductDefinitions() != null) {
							RateProductDefinitions[] rpd = rpdl.getRateProductDefinitionsList().getRateProductDefinitions();
							if (rpd != null && rpd.length > 0) {
								level = rpd[0].getLevel();
							}
							MI_RateProductDefinitionsRS rpds = rateprod_mgr.getRateProductDefinitions(marshacode, null, productid, level);
							rtnds = rpds.getRateProductDefinitions();
							rtnds = rateprod_svc.getFullDataForBlank(datadictionary, rtnds);
							rtnds.setProductCode(rpds.getRateProductDefinitions().getProductCode());
							rtnds.setProductName(rpds.getRateProductDefinitions().getProductName());
							rtnds.setManaged("true");
							rtnds.setLevel("Hotel");
							if (isAer.equals("N")) {
								amenities = pgoosProductMgr.getAccountAmenities(accountrecid, hotelid);
							} else {
								amenities = pgoosProductMgr.getHotelAmenities(accountrecid, hotelid);
								boolean check0003 = false, check0004 = false;
								String str0003 = "", str0004 = "";
								int i0003 = 0, i0004 = 0;
								for( int i=0; i<amenities.size(); i++){
									if (amenities.get(i).getFr_rp_name().equalsIgnoreCase("MPPI") && amenities.get(i).getFr_rp_code().equalsIgnoreCase("0003")){
										check0003 = true;
										str0003 = amenities.get(i).getAmenityvalue();
										i0003 = i;
									}
									if (amenities.get(i).getFr_rp_name().equalsIgnoreCase("MPPI") && amenities.get(i).getFr_rp_code().equalsIgnoreCase("0004")){
										check0004 = true;
										str0004 = amenities.get(i).getAmenityvalue();
										i0004 = i;
									}
								}
								if (check0003 && check0004){
									if (str0003.equalsIgnoreCase("Y")){
										amenities.get(i0004).setAmenityvalue("N");
									}
									else if (str0003.equalsIgnoreCase("N") && str0004.equalsIgnoreCase("Y")){
										amenities.get(i0003).setAmenityvalue("Y");
										amenities.get(i0004).setAmenityvalue("N");
									}
								}
							}

							RateProductDefinition[] rtnd = rtnds.getRateProductDefinition();
							for (int iAmm = 0; iAmm < amenities.size(); iAmm++) {
								PGOOSProductAmenity pam = (PGOOSProductAmenity) amenities.get(iAmm);
								for (int iRtnd = 0; iRtnd < rtnd.length; iRtnd++) {
									if (pam.getFr_rp_listcode().equals(rtnd[iRtnd].getRP_ListCode()) && pam.getFr_rp_groupcode().equals(rtnd[iRtnd].getRP_GroupCode())
											&& pam.getFr_rp_code().equals(rtnd[iRtnd].getRP_Code()) && pam.getFr_rp_name().equals(rtnd[iRtnd].getRP_Name())) {
										rtnd[iRtnd].setAvailabilityInd(pam.getAmenityvalue());
										rtnd[iRtnd].setManaged(Boolean.valueOf(pam.getAmenityvalue().equals("Y")).toString()); // set
										// to
										// managed
										// if
										// amenity
										// is Y
										if (pam.getAmenityvalue().equals("Y")) {
											if (!amenitiesSet.equals(""))
												amenitiesSet += ", ";
											amenitiesSet += rtnd[iRtnd].getRP_CodeName().trim();
										}
										break;
									}
								}
							}
							if (amenitiesSet.equals("")) {
								amenitiesSet = "No amenities to set to Yes";
								boolean amenityYes = false;
								boolean rateIncludedManaged = false;
								for (int iRtnd = 0; iRtnd < rtnd.length; iRtnd++) {
									if (!amenityYes && rtnd[iRtnd].getAvailabilityInd().equals("Y")) {
										if (!(rtnd[iRtnd].getRP_ListCode().equals("0202") && rtnd[iRtnd].getRP_GroupCode().equals("0000") && rtnd[iRtnd].getRP_Code().equals("0002") && rtnd[iRtnd]
												.getRP_Name().equals("MPMT"))) {
											amenityYes = true;
											break;
										}
									}
									if (rtnd[iRtnd].getRP_ListCode().equals("0202") && rtnd[iRtnd].getRP_GroupCode().equals("0000") && rtnd[iRtnd].getRP_Code().equals("0002")
											&& rtnd[iRtnd].getRP_Name().equals("MPMT")) {
										if (rtnd[iRtnd].getManaged().equals("true")) {
											rateIncludedManaged = true;
										} else
											break;
									}
								}
								if (rateIncludedManaged) {
									for (int iRtnd = 0; iRtnd < rtnd.length; iRtnd++) {
										if (rtnd[iRtnd].getRP_ListCode().equals("0202") && rtnd[iRtnd].getRP_GroupCode().equals("0000") && rtnd[iRtnd].getRP_Code().equals("0002")
												&& rtnd[iRtnd].getRP_Name().equals("MPMT")) {
											if (!amenityYes)
												rtnd[iRtnd].setAvailabilityInd("N");
											rtnd[iRtnd].setManaged("false");
											break;
										}
									}
								}
							} else {
								// set rate includes to y and managed
								// for BT
								// rates
								for (int iRtnd = 0; iRtnd < rtnd.length; iRtnd++) {
									if (rtnd[iRtnd].getRP_ListCode().equals("0202") && rtnd[iRtnd].getRP_GroupCode().equals("0000") && rtnd[iRtnd].getRP_Code().equals("0002")
											&& rtnd[iRtnd].getRP_Name().equals("MPMT")) {
										rtnd[iRtnd].setAvailabilityInd("Y");
										rtnd[iRtnd].setManaged("true");
										break;
									}
								}
							}
							// MI_RateProductDefinitionsNotifRS
							MI_RateProductDefinitionsNotifRS rtnds_1 = rateprod_mgr.setRateProductDefinitions(marshacode, null, rtnds, user);
							if (rtnds_1.getErrors() == null)
								pgoosProductMgr.setHotelProduct(batchid, null, hotelid, accountrecid, "PUBL", null, amenitiesSet, user);
							else {
								Errors errs = rtnds_1.getErrors();
								String theerror = "";
								if (errs != null) {
									com.marriott.rfp.object.roomdef.beans.Error[] err = errs.getError();
									if (err != null)
										theerror = err[0].getShortText();
								}
								pgoosProductMgr.setHotelProduct(batchid, 100001L, hotelid, accountrecid, "FAIL", theerror, null, user);
							}

						}
					}
				} catch (Exception ex) {
					pgoosProductMgr.setHotelProduct(batchid, 100000L, hotelid, accountrecid, "FAIL", "Unable to process", null, user);
					log.error(ex.getMessage(),ex);
				}
			}
		} catch (Exception ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	private void hotelProductProcess(Long batchid, List<PGOOSHotelAccountProduct> aps, String user) {
		try {
			if (aps != null && aps.size() > 0) {
				for (int i = 0; i < aps.size(); i++) {
					PGOOSHotelAccountProduct apm = (PGOOSHotelAccountProduct) aps.get(i);
					hotelProductProcessRec(batchid, apm.getHotelid(), apm.getAccountrecid(), apm.getMarshaCode(), apm.getProductid(), apm.getAmenity_diff(), apm.getIsAer(), user);
				}
			}
		} catch (Exception ex) {
			log.error(ex.getMessage(),ex);
		}
	}

	public void setDatadictionary(MI_RateProductDataDictionaryRS datadictionary) {
		this.datadictionary = datadictionary;
	}

	public MI_RateProductDataDictionaryRS getDatadictionary() {
		return datadictionary;
	}

}

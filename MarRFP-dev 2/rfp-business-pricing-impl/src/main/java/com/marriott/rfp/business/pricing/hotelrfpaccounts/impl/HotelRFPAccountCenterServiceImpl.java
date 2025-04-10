package com.marriott.rfp.business.pricing.hotelrfpaccounts.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.hotelrfpaccounts.api.HotelRFPAccountCenterService;
import com.marriott.rfp.dataacess.pricing.hotel.api.HotelPricingManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.HotelAccountCenterManager;
import com.marriott.rfp.dataacess.pricing.hotelrfp.api.NobidReasonManager;
import com.marriott.rfp.dataacess.pricing.period.api.PeriodManager;
import com.marriott.rfp.dataacess.pricing.portfolio.api.AccountRatesManager;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.pricing.account.AccountCenterInfo;
import com.marriott.rfp.object.pricing.filterLists.Orderby;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.filterLists.PricingAccountFilterValue;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.hotelrfp.AccountCenterView;
import com.marriott.rfp.object.pricing.hotelrfp.AccountNew;
import com.marriott.rfp.object.pricing.hotelrfp.AccountNotViewable;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountCenter;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountCenterUpdate;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountCenterView;
import com.marriott.rfp.object.pricing.hotelrfp.HotelNobidReason;
import com.marriott.rfp.object.pricing.hotelrfp.MultiHotelAccountCenterFilterLists;
import com.marriott.rfp.object.pricing.hotelrfp.MultiHotelAccountCenterSearch;
import com.marriott.rfp.object.pricing.hotelrfp.PriceButtonProductData;
import com.marriott.rfp.object.pricing.hotelrfp.QuickHotelAccountCenter;
import com.marriott.rfp.object.pricing.hotelrfp.RebidStatusAlert;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.NumberUtility;

/**
 * Session Bean implementation class
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class HotelRFPAccountCenterServiceImpl implements HotelRFPAccountCenterService {

	@Autowired
	private PeriodManager periodMgr = null;

	@Autowired
	HotelAccountCenterManager accountcenterMgr = null;

	@Autowired
	NobidReasonManager nobidReasonMgr = null;

	@Autowired
	HotelPricingManager hotelPricingMgr = null;

	@Autowired
	AccountRatesManager accountRatesMgr = null;

	public String findRebidPendingAlert(long hotelrfpid, String accountpricingtype, User user) {
		RebidStatusAlert rpa = accountcenterMgr.findRebidPendingAlert(hotelrfpid, accountpricingtype, user);
		return findRebidPendingAlertString(rpa);
	}

	private String findRebidPendingAlertString(RebidStatusAlert rpa) {
		String pendingAlert = "";
		if (rpa.getNumrebidpending() > 0) {
			pendingAlert = rpa.getNumrebidpending() + " account";
			if (rpa.getNumrebidpending() == 1)
				pendingAlert += " is ";
			else
				pendingAlert += "s are ";
			pendingAlert += "pending rebid.";
			if (rpa.getNumrebidpending_past() > 0) {
				pendingAlert += "  " + rpa.getNumrebidpending_past() + " account rebid";
				if (rpa.getNumrebidpending_past() == 1)
					pendingAlert += " is ";
				else
					pendingAlert += "s are ";
				pendingAlert += "past due.";
			}
		}
		return pendingAlert;
	}
	
	private String findMultiRebidPendingAlertString(RebidStatusAlert rpa) {
		String pendingAlert = "";
		if (rpa.getNumrebidpending() > 0) {
			pendingAlert = rpa.getNumrebidpending() + " hotel";
			if (rpa.getNumrebidpending() == 1)
				pendingAlert += " is ";
			else
				pendingAlert += "s are ";
			pendingAlert += "pending rebid.";
			if (rpa.getNumrebidpending_past() > 0) {
				pendingAlert += "  " + rpa.getNumrebidpending_past() + " hotel rebid";
				if (rpa.getNumrebidpending_past() == 1)
					pendingAlert += " is ";
				else
					pendingAlert += "s are ";
				pendingAlert += "past due.";
			}
		}
		return pendingAlert;
	}

	public AccountCenterView findMultiHotelAccountCenterDetail(MultiHotelAccountCenterSearch mhacsearch, String filterString, Orderby orderby, Page page, User user) {

		AccountCenterView acv = new AccountCenterView();
		AccountCenterInfo aci = null;
		List<HotelAccountCenter> accountList = null;
		long numHotelAccounts = 0;
		int numproducts = 2;
		if (mhacsearch.getAccountrecid() != null && mhacsearch.getAccountrecid() != 0) {
			aci = accountcenterMgr.findAccountCenterAccountInfo(mhacsearch.getAccountrecid());
			accountList = accountcenterMgr.findMultiHotelCenterDetail(mhacsearch, filterString, aci.getCan_regionalize(), orderby, page, user);
			numHotelAccounts = accountcenterMgr.findNumMultiHotelCenterDetails(mhacsearch, filterString, aci.getCan_regionalize(), user);

			acv.setHotelAccountCenterList(accountList);
			acv.setAllowFloatNoCiel(aci.getAllow_floatnociel().equals("Y"));
			acv.setShowOffcycleProducts(aci.getOffcycle().equals("Y"));
			acv.setTotalPages(NumberUtility.getTotalPages(numHotelAccounts, page.getMaxpagelen()));
			if (aci.getAer_account().equals("Y")) {
				acv.setShowGPP(true);
				numproducts++;
			}
			if (aci.getGovvpproductenabled().equals("Y")) {
				acv.setShowGovVP(true);
				numproducts++;
			}
			if (acv.getAllowFloatNoCiel())
				numproducts++;
			if (acv.getShowOffcycleProducts())
				numproducts++;
			if (aci.getAllow_no_bid() != null && aci.getAllow_no_bid().equals("Y"))
				numproducts++;
			setProductView(accountList, aci, acv.getAllowFloatNoCiel(), user);
			acv.setRebidAlert(findMultiHotelRebidPendingAlert(mhacsearch.getAccountrecid(), aci.getCan_regionalize(), user));
		}
		acv.setNumProducts(numproducts);
		return acv;
	}

	public AccountCenterView findAccountRatesDetail(PricingFilterSelections filterValues, User user) {

		AccountCenterView acv = new AccountCenterView();
		AccountCenterInfo aci = null;
		List<HotelAccountCenter> accountList = null;
		int numproducts = 2;
		if (filterValues != null && filterValues.getAccountFilter() != null) {
			PricingAccountFilterValue afv = filterValues.getAccountFilter();
			if (afv.getAccountrecid() != null && afv.getAccountrecid() != 0) {
				aci = accountcenterMgr.findAccountCenterAccountInfo(afv.getAccountrecid());
				accountList = accountRatesMgr.findAccountRates(filterValues, user);

				acv.setHotelAccountCenterList(accountList);
				acv.setAllowFloatNoCiel(aci.getAllow_floatnociel().equals("Y"));
				if (aci.getAer_account().equals("Y")) {
					acv.setShowGPP(true);
					numproducts++;
				}
				if (aci.getGovvpproductenabled().equals("Y")) {
					acv.setShowGovVP(true);
					numproducts++;
				}
				if (acv.getAllowFloatNoCiel())
					numproducts++;
				setProductView(accountList, aci, acv.getAllowFloatNoCiel(), user);
			}
		}
		acv.setNumProducts(numproducts);
		return acv;
	}

	public AccountCenterView findAccountCenterDetail(long hotelrfpid, long period, String accountpricingtype, String filterString, String displayString, String dueDateFrom, String dueDateTo, Orderby orderby, Page page, User user, 
			HotelDetailData hotelDetailData) {

		accountcenterMgr.checkAccountCenter(hotelrfpid, user);
		AccountCenterView acv = new AccountCenterView();
		List<HotelAccountCenter> accountList = accountcenterMgr.findAccountCenterDetail(hotelrfpid, period, accountpricingtype, filterString, displayString, dueDateFrom, dueDateTo, orderby, page, user); 

		acv.setHotelAccountCenterList(accountList);
		acv = accountcenterMgr.fetchcbccounts(acv, hotelrfpid, period);
		if (accountpricingtype.equals("L"))
			acv.setAllowFloatNoCiel(true);
		else
			acv.setAllowFloatNoCiel(accountcenterMgr.findAllowFloatNoCiel(hotelrfpid, user));

		acv.setHasGovPerDiem(accountcenterMgr.findHasGovPerDiemPricing(hotelrfpid));
		acv.setShowOffcycleProducts(accountcenterMgr.findShowOffcycleProducts(hotelrfpid, accountpricingtype, user));
		long numHotelAccounts = accountcenterMgr.findNumAccountCenterDetail(hotelrfpid, period, accountpricingtype, filterString, displayString, dueDateFrom, dueDateTo, user); 
		acv.setTotalPages(NumberUtility.getTotalPages(numHotelAccounts, page.getMaxpagelen()));
		int numproducts = 3;
		if (!accountpricingtype.equals("L") && hotelDetailData.getExclude_aer().equals("N")) {
			acv.setShowGPP(true);
			numproducts++;
		}
		if (!hotelDetailData.getIsInternational() && acv.getHasGovPerDiem()) {
			acv.setShowGovVP(true);
			numproducts++;
		}
		if (acv.getAllowFloatNoCiel())
			numproducts++;
		if (acv.getShowOffcycleProducts())
			numproducts++;
		acv.setNumProducts(numproducts);
		setProductView(accountList, acv.getAllowFloatNoCiel(), acv.getHasGovPerDiem(), hotelDetailData, user, accountpricingtype);
		acv.setRebidAlert(findRebidPendingAlert(hotelrfpid, accountpricingtype, user));
		return acv;
	}

	private void setProductView(List<HotelAccountCenter> accountList, boolean bAllowFlotNoCiel, boolean hasGovPerDiem, HotelDetailData hdd, User user, String accountpricingtype) {
		if (accountList == null)
			return;
		for (int i = 0; i < accountList.size(); i++) {
			HotelAccountCenter hac = accountList.get(i);
			HotelAccountCenterView hacv = new HotelAccountCenterView();
			/*
			 * no pricing - for off-cycle accounts that are not gpp (aer) if the
			 * account is not locked
			 */
			hacv.setViewNoPricing(false);
			hacv.setEditNoPricing(false);
			if ((hac.getOffcycle().equals("Y") && !(hac.getAer_account().equals("Y") && hdd.getExclude_aer().equals("N"))) || 
					(hac.getOffcycle().equals("Y") && hac.getAer_account().equals("Y") && hdd.getExclude_aer().equals("N") && hac.getIs_ritz_gpp().equals("N"))) {
				if (hac.getRatetype_selected() != null && hac.getRatetype_selected() == 0)
					hacv.setViewNoPricing(true);
				if (hac.getIsLocked() == null || hac.getIsLocked().equals("N")) {
					hacv.setEditNoPricing(true);
					hacv.setViewNoPricing(true);
				}

			}
			/*
			 * fixed pricing -for regular accounts (not off-cycle or gpp (unless
			 * the brand does not participate in gpp
			 */
			hacv.setViewFixedPricing(false);
			hacv.setEditFixedPricing(false);
			if ((hac.getOffcycle().equals("N") && !(hac.getAer_account().equals("Y") && hdd.getExclude_aer().equals("N"))) || 
					(hac.getOffcycle().equals("N") && hac.getAer_account().equals("Y") && hdd.getExclude_aer().equals("N") && hac.getIs_ritz_gpp().equals("N"))) {
				if (user.getIsHotelUser() && hac.getRatetype_selected() == null)
					hacv.setViewFixedPricing(false);
				else if ((user.getIsHotelUser() || user.getIsLimitedSalesUser()) && (hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20 && accountpricingtype.equals("C")) &&
						hac.getIsSolicited().equals("N") && (hac.getIsLocked() == null || hac.getIsLocked().equals("N"))) 
					{
					hacv.setViewFixedPricing(true);
					hacv.setEditFixedPricing(true);
					}
				else {
					if (hac.getRatetype_selected() != null && hac.getRatetype_selected() == 1)
						hacv.setViewFixedPricing(true);
					if (user.getIsReadOnly())
						hacv.setEditFixedPricing(false);
					else if (user.getIsHotelUser() && hac.getIsLocked() != null && hac.getIsLocked().equals("Y") && hac.getRatetype_selected() != 1)
						hacv.setEditFixedPricing(false);
					else if (hac.getRatetype_selected() != null) {
						hacv.setEditFixedPricing(true);
						hacv.setViewFixedPricing(true);
					}
				}
			}

			/*
			 * gpp pricing -for gpp accounts (unless the brand does not
			 * participate in gpp
			 */
			hacv.setViewGPPPricing(false);
			hacv.setEditGPPPricing(false);
			if (hac.getAer_account().equals("Y") && hdd.getExclude_aer().equals("N") && hac.getIs_ritz_gpp().equals("Y")) {
				if ((user.getIsHotelUser() ||user.getIsLimitedSalesUser()) && hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20 && accountpricingtype.equals("C") && (hac.getIsLocked() != null && hac.getIsLocked().equals("Y"))){
					hacv.setViewGPPPricing(false); }
				else if( (user.getIsHotelUser() || user.getIsLimitedSalesUser()) && hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20 && accountpricingtype.equals("C")
						&& hac.getIsSolicited().equals("N") && hac.getIsLocked() == null )
				   {
					hacv.setViewGPPPricing(true); 
					hacv.setEditGPPPricing(true);}
				
				else {
					if (hac.getRatetype_selected() != null && hac.getRatetype_selected() == 18)
						hacv.setViewGPPPricing(true);
					if (user.getIsReadOnly())
						hacv.setEditGPPPricing(false);
					else if (user.getIsHotelUser() && hac.getIsLocked() != null && hac.getIsLocked().equals("Y") && hac.getRatetype_selected() != null && hac.getRatetype_selected() != 18)
						hacv.setEditGPPPricing(true);
					else if (hac.getRatetype_selected() != null) {
						hacv.setEditGPPPricing(true);
						hacv.setViewGPPPricing(true);
					}
				}
			}

			/*
			 * vp pricing - volume producer for non government accounts and for
			 * government accounts where the hotel is international
			 */
			hacv.setViewVPPricing(false);
			hacv.setEditVPPricing(false);
			if ((hac.getGovvpproductenabled() == null || hac.getGovvpproductenabled().equals("N")) || hdd.getIsInternational()) {
				if (user.getIsHotelUser()) {
					if ( (user.getIsHotelUser() ||user.getIsLimitedSalesUser()) && hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20 && (accountpricingtype.equals("C") && (hac.getIsLocked() != null && hac.getIsLocked().equals("Y"))))
					{
					hacv.setViewVPPricing(false);
					}
					else if((user.getIsHotelUser() ||user.getIsLimitedSalesUser()) &&	hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20 && accountpricingtype.equals("C") && hac.getIsSolicited().equals("N") && hac.getIsLocked() == 
						null )
				   {
					hacv.setViewVPPricing(true); 
					hacv.setEditVPPricing(true);}
					
					else {
						if (hac.getRatetype_selected() == hac.getVolunteeredratetype())
							hacv.setViewVPPricing(true);
						if (hac.getIsLocked() != null && hac.getIsLocked().equals("Y") && hac.getRatetype_selected() == hac.getVolunteeredratetype())
							hacv.setEditVPPricing(false);
						else if (hac.getRatetype_selected() != null) {
							hacv.setEditVPPricing(true);
							hacv.setViewVPPricing(true);
						}
					}
				} else {
					if (hac.getRatetype_selected() == hac.getVolunteeredratetype())
						hacv.setViewVPPricing(true);
					if (user.getIsReadOnly())
						hacv.setEditVPPricing(false);
					else if (user.getIsHotelUser() && hac.getIsLocked() != null && hac.getIsLocked().equals("Y") && hac.getRatetype_selected() == hac.getVolunteeredratetype())
						hacv.setEditVPPricing(false);
					else if (hac.getRatetype_selected() != null) {
						hacv.setEditVPPricing(true);
						hacv.setViewVPPricing(true);
					}
				}
			}

			/*
			 * gvp pricing - government volume producer for government accounts
			 * where the hotel is not international
			 */
			hacv.setViewGVPPricing(false);
			hacv.setEditGVPPricing(false);
			if ((hac.getGovvpproductenabled() != null && hac.getGovvpproductenabled().equals("Y")) && !hdd.getIsInternational() && hasGovPerDiem) {
				if (user.getIsHotelUser() && (hac.getRatetype_selected() == null || hac.getRatetype_selected() == 19)) {
					hacv.setViewGVPPricing(true);
					if (hac.getIsLocked() != null && hac.getIsLocked().equals("Y") && (hac.getRatetype_selected() == null || hac.getRatetype_selected() == 19))
						hacv.setEditGVPPricing(false);
					else
						hacv.setEditGVPPricing(true);
				} else {
					if (hac.getRatetype_selected() == 19)
						hacv.setViewGVPPricing(true);
					if (user.getIsReadOnly())
						hacv.setEditGVPPricing(false);
					else if (user.getIsHotelUser() && hac.getIsLocked() != null && hac.getIsLocked().equals("Y") && (hac.getRatetype_selected() == null || hac.getRatetype_selected() == 19))
						hacv.setEditGVPPricing(false);
					else if (hac.getRatetype_selected() != null) {
						hacv.setEditGVPPricing(true);
						hacv.setViewGVPPricing(true);
					}
				}
			}

			/*
			 * fvp pricing -floating volume producer
			 */
			hacv.setViewFloatVPPricing(false);
			hacv.setEditFloatVPPricing(false);
			if (bAllowFlotNoCiel && ((hac.getAllow_floatnociel() != null && hac.getAllow_floatnociel().equals("Y")) || (hac.getRatetype_selected() == null || hac.getRatetype_selected() == 20))) {
				if (user.getIsHotelUser() && hac.getAllowHotelcanPriceFloatVP() != null && hac.getAllowHotelcanPriceFloatVP().equals("Y")) {
					if (accountpricingtype.equals("L") || accountpricingtype.equals("C")) {
						if ((hac.getRatetype_selected() != null && (hac.getRatetype_selected() == 20 || hac.getRatetype_selected() == 1 || hac.getRatetype_selected() == 18))
								|| (hac.getIsLocked() == null || hac.getIsLocked().equals("N")))
							hacv.setViewFloatVPPricing(true);
						hacv.setEditFloatVPPricing(true);
						if ((hac.getRatetype_selected() != null && (hac.getRatetype_selected() == 20)) && (hac.getIsLocked() != null && hac.getIsLocked().equals("Y")))
							hacv.setEditFloatVPPricing(false);

					} else if ((hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20) || accountpricingtype.equals("L") || accountpricingtype.equals("C")) {
						hacv.setViewFloatVPPricing(true);
						if ((accountpricingtype.equals("L") || accountpricingtype.equals("C")) && (hac.getIsLocked() == null || hac.getIsLocked().equals("N")))
							hacv.setEditFloatVPPricing(true);
					}
				} else {
					if (hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20)
						hacv.setViewFloatVPPricing(true);
					if (user.getIsReadOnly())
						hacv.setEditFloatVPPricing(false);
					else if (user.getIsHotelUser())
						hacv.setEditFloatVPPricing(false);
					else if (hac.getRatetype_selected() != null) {
						hacv.setEditFloatVPPricing(true);
						hacv.setViewFloatVPPricing(true);
					}
				}
			}

			/*
			 * nb pricing -no bid  
			 */
			hacv.setViewNBPricing(false);
			hacv.setEditNBPricing(false);
			if (hac.getAllow_no_bid() != null && hac.getAllow_no_bid().equals("Y")) {
				if (hac.getIsSelected() == null || (hac.getIsSelected() != null && !hac.getIsSelected().equals("Y"))) {
					//if ((hac.getAer_account() != null && !hac.getAer_account().equals("Y")) || hdd.getExclude_aer().equals("Y")) {
						if (user.getIsHotelUser() && hac.getRatetype_selected() == null)
							hacv.setViewNBPricing(false);
						else if ((user.getIsHotelUser() || user.getIsLimitedSalesUser()) && (hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20 && accountpricingtype.equals("C")) && hac.getIsSolicited().equals("N") &&
							(hac.getIsLocked() == null || hac.getIsLocked().equals("N"))) 
						{
							hacv.setViewNBPricing(true);
							hacv.setEditNBPricing(true);
						}
						else {
							if (hac.getRatetype_selected() != null && hac.getRatetype_selected() == 17)
								hacv.setViewNBPricing(true);
							if (user.getIsReadOnly())
								hacv.setEditNBPricing(false);
							else if (hac.getRatetype_selected() != null) {
								hacv.setEditNBPricing(true);
								hacv.setViewNBPricing(true);
							}
						}
					//}
				}
			}
			
			hacv.setViewPriceit(false);
			if (hac.getRatetype_selected() != null && hac.getRatetype_selected() != 0 && hac.getRatetype_selected() != 17
					&& (hac.getRatetype_selected() == 19 || hac.getRatetype_selected() == 20 || hac.getRatetype_selected() == hac.getVolunteeredratetype())
					|| (hac.getIsSelected() != null && hac.getIsSelected().equals("Y")))
				hacv.setViewPriceit(true);

			hac.setHotelAccountCenterView(hacv);
		}
	}

	private void setProductView(List<HotelAccountCenter> accountList, AccountCenterInfo aci, boolean bAllowFlotNoCiel, User user) {
		if (accountList == null)
			return;
		for (int i = 0; i < accountList.size(); i++) {
			HotelAccountCenter hac = accountList.get(i);
			HotelAccountCenterView hacv = new HotelAccountCenterView();
			/*
			 * no pricing - for off-cycle accounts that are not gpp (aer) if the
			 * account is not locked
			 */
			hacv.setViewNoPricing(false);
			hacv.setEditNoPricing(false);
			if ((aci.getOffcycle().equals("Y") && !(aci.getAer_account().equals("Y") && hac.getExcludeaer().equals("N"))) || 
					(aci.getOffcycle().equals("Y") && aci.getAer_account().equals("Y") && hac.getExcludeaer().equals("N") && hac.getIs_ritz_gpp().equals("N"))) {
				if (hac.getRatetype_selected() != null && hac.getRatetype_selected() == 0)
					hacv.setViewNoPricing(true);
				if (hac.getIsLocked() == null || hac.getIsLocked().equals("N")) {
					hacv.setEditNoPricing(true);
					hacv.setViewNoPricing(true);
				}

			}
			/*
			 * fixed pricing -for regular accounts (not off-cycle or gpp (unless
			 * the brand does not participate in gpp
			 */
			hacv.setViewFixedPricing(false);
			hacv.setEditFixedPricing(false);
			if ((aci.getOffcycle().equals("N") && !(aci.getAer_account().equals("Y") && hac.getExcludeaer().equals("N"))) || 
					(aci.getOffcycle().equals("N") && aci.getAer_account().equals("Y") && hac.getExcludeaer().equals("N") && hac.getIs_ritz_gpp().equals("N"))) {
				if (user.getIsHotelUser() && hac.getRatetype_selected() == null) {
					hacv.setViewFixedPricing(false); }
			else if ((user.getIsHotelUser() || user.getIsLimitedSalesUser()) && (hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20 
						&& aci.getAccountpricingtype().equals("C")) &&  hac.getIsSolicited().equals("N") && 
					(hac.getIsLocked() == null || hac.getIsLocked().equals("N")))  {
					hacv.setViewFixedPricing(true);
				 hacv.setEditFixedPricing(true);
			}
				else {
					if (hac.getRatetype_selected() == null)
						hacv.setViewFixedPricing(false);
					else {
						if (hac.getRatetype_selected() == 1)
							hacv.setViewFixedPricing(true);
						if (user.getIsReadOnly())
							hacv.setEditFixedPricing(false);
						else if (user.getIsHotelUser() && hac.getIsLocked() != null && hac.getIsLocked().equals("Y") && !hac.getRatetype_selected().equals(1))
							hacv.setEditFixedPricing(false);
						else {
							hacv.setEditFixedPricing(true);
							hacv.setViewFixedPricing(true);
						}
					}
				}
			}

			/*
			 * gpp pricing -for gpp accounts (unless the brand does not
			 * participate in gpp
			 */
			hacv.setViewGPPPricing(false);
			hacv.setEditGPPPricing(false);
			if (aci.getAer_account().equals("Y") && hac.getExcludeaer().equals("N") && hac.getRatetype_selected() != null && hac.getIs_ritz_gpp().equals("Y")) {
				if (user.getIsHotelUser() && hac.getRatetype_selected().equals(18))
					hacv.setViewGPPPricing(false);
				else if ((user.getIsHotelUser() ||user.getIsLimitedSalesUser()) && hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20
						&& (aci.getAccountpricingtype().equals("C") && (hac.getIsLocked() != null && hac.getIsLocked().equals("Y")))){
					hacv.setViewGPPPricing(false); }
				else if( (user.getIsHotelUser() ||user.getIsLimitedSalesUser())  && hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20 && aci.getAccountpricingtype().equals("C")
						&& hac.getIsSolicited().equals("N") && hac.getIsLocked() == null )
				   {
				    hacv.setViewGPPPricing(true); 
					hacv.setEditGPPPricing(true);}
		  	    
				else {
					if (hac.getRatetype_selected() != null && hac.getRatetype_selected().equals(18))
						hacv.setViewGPPPricing(true);
					if (user.getIsReadOnly())
						hacv.setEditGPPPricing(false);
					
					else if (user.getIsHotelUser() && hac.getIsLocked() != null && hac.getIsLocked().equals("Y") && hac.getRatetype_selected() != 18)
						hacv.setEditGPPPricing(false);
					else {
						hacv.setEditGPPPricing(true);
						hacv.setViewGPPPricing(true);
					}
				}
			}

			/*
			 * vp pricing - volume producer for non government accounts and for
			 * government accounts where the hotel is international
			 */
			hacv.setViewVPPricing(false);
			hacv.setEditVPPricing(false);
			if (hac.getRatetype_selected() != null
					&& aci.getRatetypeid() != null
					&& ((aci.getGovvpproductenabled() == null || aci.getGovvpproductenabled().equals("N")) || hac.getHasgovperdiempricing() == null || hac.getHasgovperdiempricing().equals("N") || hac
							.getIsInternational().equals("Y"))) {

				if (user.getIsHotelUser()) {
					if ((user.getIsHotelUser() ||user.getIsLimitedSalesUser()) && hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20
							&& (aci.getAccountpricingtype().equals("C") && (hac.getIsLocked() != null && hac.getIsLocked().equals("Y")))){
						hacv.setViewVPPricing(false); }
					else if((user.getIsHotelUser() ||user.getIsLimitedSalesUser()) &&	hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20 && aci.getAccountpricingtype().equals("C")
							&& hac.getIsSolicited().equals("N") && hac.getIsLocked() == null )
					   {
						hacv.setViewVPPricing(true); 
						hacv.setEditVPPricing(true);}
					else {
						if (hac.getRatetype_selected() == hac.getVolunteeredratetype())
							hacv.setViewVPPricing(true);
						if (hac.getIsLocked() != null && hac.getIsLocked().equals("Y") && hac.getRatetype_selected() == hac.getVolunteeredratetype())
							hacv.setEditVPPricing(false);
						else if (hac.getRatetype_selected() != null) {
							hacv.setEditVPPricing(true);
							hacv.setViewVPPricing(true);
						}
					}
				} else {
					if (hac.getRatetype_selected().equals(aci.getRatetypeid()))
						hacv.setViewVPPricing(true);
					if (user.getIsReadOnly())
						hacv.setEditVPPricing(false);
					else if (user.getIsHotelUser() && hac.getIsLocked() != null && hac.getIsLocked().equals("Y") && hac.getRatetype_selected().equals(aci.getRatetypeid()))
						hacv.setEditVPPricing(false);
					else {
						hacv.setEditVPPricing(true);
						hacv.setViewVPPricing(true);
					}
				}
			}

			/*
			 * gvp pricing - government volume producer for government accounts
			 * where the hotel is not international
			 */
			hacv.setViewGVPPricing(false);
			hacv.setEditGVPPricing(false);
			if ((aci.getGovvpproductenabled() != null && aci.getGovvpproductenabled().equals("Y")) && hac.getHasgovperdiempricing() != null && hac.getHasgovperdiempricing().equals("Y")
					&& hac.getRatetype_selected() != null && !hac.getIsInternational().equals("Y")) {
				if (user.getIsHotelUser() && hac.getRatetype_selected() != null && hac.getRatetype_selected().equals(19)) {
					hacv.setViewGVPPricing(true);
					if (hac.getIsLocked() != null && hac.getIsLocked().equals("Y") && (hac.getRatetype_selected() == null || !hac.getRatetype_selected().equals(19)))
						hacv.setEditGVPPricing(false);
					else
						hacv.setEditGVPPricing(true);
				} else {
					if (hac.getRatetype_selected() == 19)
						hacv.setViewGVPPricing(true);
					if (user.getIsReadOnly())
						hacv.setEditGVPPricing(false);
					else if (user.getIsHotelUser() && hac.getIsLocked() != null && hac.getIsLocked().equals("Y") && (hac.getRatetype_selected() == null || !hac.getRatetype_selected().equals(19)))
						hacv.setEditGVPPricing(false);
					else {
						hacv.setEditGVPPricing(true);
						hacv.setViewGVPPricing(true);
					}
				}
			}
			/*
			 * fvp pricing -floating volume producer
			 */
			hacv.setViewFloatVPPricing(false);
			hacv.setEditFloatVPPricing(false);
			if (bAllowFlotNoCiel) {
				if (user.getIsHotelUser() && aci.getAllowHotelcanPriceFloatVP() != null && aci.getAllowHotelcanPriceFloatVP().equals("Y")) {
					if (aci.getAccountpricingtype().equals("L") || aci.getAccountpricingtype().equals("C")) {
						if ((hac.getRatetype_selected() != null && (hac.getRatetype_selected() == 20 || hac.getRatetype_selected() == 1 || hac.getRatetype_selected() == 18))
								|| (hac.getIsLocked() == null || hac.getIsLocked().equals("N")))
							hacv.setViewFloatVPPricing(true);
						hacv.setEditFloatVPPricing(true);
						if ((hac.getRatetype_selected() != null && (hac.getRatetype_selected() == 20)) && (hac.getIsLocked() != null && hac.getIsLocked().equals("Y")))
							hacv.setEditFloatVPPricing(false);

					} else if ((hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20) || aci.getAccountpricingtype().equals("L")) {
						hacv.setViewFloatVPPricing(true);
						if (aci.getAccountpricingtype().equals("L") && (hac.getIsLocked() == null || hac.getIsLocked().equals("N")))
							hacv.setEditFloatVPPricing(true);
					}

				}else {
					if (hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20)
						hacv.setViewFloatVPPricing(true);
					if (user.getIsReadOnly())
						hacv.setEditFloatVPPricing(false);
					else if (user.getIsHotelUser())
						hacv.setEditFloatVPPricing(false);
					else {
						hacv.setEditFloatVPPricing(true);
						hacv.setViewFloatVPPricing(true);
					}
				}
			}

			/*
			 * nb pricing -no bid
			 */
			hacv.setViewNBPricing(false);
			hacv.setEditNBPricing(false);
			if (hac.getRatetype_selected() != null && aci.getAllow_no_bid() != null && aci.getAllow_no_bid().equals("Y")) {
				if (hac.getIsSelected() == null || (hac.getIsSelected() != null && !hac.getIsSelected().equals("Y"))) {
					//if ((aci.getAer_account() != null && !aci.getAer_account().equals("Y")) || hac.getExcludeaer().equals("Y")) {
						if (user.getIsHotelUser() && hac.getRatetype_selected() == null) {
							hacv.setViewNBPricing(false); }
					else if ((user.getIsHotelUser() || user.getIsLimitedSalesUser()) && (hac.getRatetype_selected() != null && hac.getRatetype_selected() == 20
							&& aci.getAccountpricingtype().equals("C")) &&
					hac.getIsSolicited().equals("N") &&( hac.getIsLocked() == null || hac.getIsLocked().equals("N")))
							{
								hacv.setViewNBPricing(true);
								hacv.setEditNBPricing(true);
							}
						else {
							if (hac.getRatetype_selected() == 17)
								hacv.setViewNBPricing(true);
							if (user.getIsReadOnly())
								hacv.setEditNBPricing(false);
							else {
								hacv.setEditNBPricing(true);
								hacv.setViewNBPricing(true);
							}
						}
					//}
				}
			}
			
			hacv.setViewPriceit(false);
			if (hac.getRatetype_selected() != null && hac.getRatetype_selected() != 0 && hac.getRatetype_selected() != 17
					&& (hac.getRatetype_selected() == 19 || hac.getRatetype_selected() == 20 || hac.getRatetype_selected() == hac.getVolunteeredratetype())
					|| (hac.getIsSelected() != null && hac.getIsSelected().equals("Y")))
				hacv.setViewPriceit(true);
			hac.setShow_questions_always(aci.getShow_questions_always());
			hac.setHotelAccountCenterView(hacv);
		}
	}

	public List<AccountNotViewable> getAccountNotViewableList(long period, User user, String marshacode, String accountPricingType) {
		return accountcenterMgr.getAccountNotViewableList(period, user, marshacode, accountPricingType);
	}

	public List<AccountNotViewable> getAccountOffcycleNotViewableList(long period, User user, String marshacode, String accountPricingType) {
		return accountcenterMgr.getAccountOffcycleNotViewableList(period, user, marshacode, accountPricingType);
	}

	public List<HotelNobidReason> findNobidReasons() {
		return nobidReasonMgr.findNobidReasons();
	}

	public void updateAccountCenter(Map<Long, HotelAccountCenterUpdate> hotelAccountCenterUpdate, User user) {
		for (Long key : hotelAccountCenterUpdate.keySet()) {
			if (hotelAccountCenterUpdate.get(key).getChanged() != null && hotelAccountCenterUpdate.get(key).getChanged().equals("Y"))
				accountcenterMgr.update(key, hotelAccountCenterUpdate.get(key), user);
		}
	}

	public void updatePortfolioAccountRates(Map<Long, HotelAccountCenterUpdate> hotelAccountCenterUpdate, User user) {
		if (hotelAccountCenterUpdate != null) {
			for (Long key : hotelAccountCenterUpdate.keySet()) {
				if (hotelAccountCenterUpdate.get(key).getChanged() != null && hotelAccountCenterUpdate.get(key).getChanged().equals("Y"))
					accountcenterMgr.update_portfolio(key, hotelAccountCenterUpdate.get(key), user);
			}
		}
	}

	public String findMultiHotelRebidPendingAlert(long accountrecid, String canregionalize, User user) {
		RebidStatusAlert rpa = accountcenterMgr.findMultiHotelRebidPendingAlert(accountrecid, canregionalize, user);
		return findMultiRebidPendingAlertString(rpa);
	}

	public MultiHotelAccountCenterFilterLists getMultiHotelAccountCenterFilterList(User user) {
		MultiHotelAccountCenterFilterLists filterlist = new MultiHotelAccountCenterFilterLists();
		filterlist.setBrandlist(hotelPricingMgr.getAffiliations());
		filterlist.setPeriodlist(periodMgr.findAllPeriodsForRole(user.getRole()));
		return filterlist;
	}

	public List<AccountNew> getNewAccounts(Long newforXdays, User user) {
		return accountcenterMgr.getNewAccounts(newforXdays, user);
	}

	public List<QuickHotelAccountCenter> getStatusChangedAccounts(Long newforXdays, User user, String marshacode) {
		return accountcenterMgr.getStatusChangedAccounts(newforXdays, user, marshacode);
	}

	public List<QuickHotelAccountCenter> getRequestChangedAccounts(Long newforXdays, User user, String marshacode) {
		return accountcenterMgr.getRequestChangedAccounts(newforXdays, user, marshacode);
	}

	public List<QuickHotelAccountCenter> getCBCChangedAccounts(Long newforXdays, User user, String marshacode) {
		return accountcenterMgr.getCBCChangedAccounts(newforXdays, user, marshacode);
	}

	public List<QuickHotelAccountCenter> getRebidDueAccounts(User user, String marshacode) {
		return accountcenterMgr.getRebidDueAccounts(user, marshacode);
	}
	
	public PriceButtonProductData getAccountMaintanenceFloatData(Long accountRecID) {
		return accountcenterMgr.findAccountMaintanenceFloatData(accountRecID);
	}

}

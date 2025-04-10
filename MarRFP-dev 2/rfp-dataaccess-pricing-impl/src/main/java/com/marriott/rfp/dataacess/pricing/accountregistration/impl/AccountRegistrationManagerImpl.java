package com.marriott.rfp.dataacess.pricing.accountregistration.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.accountregistration.api.AccountRegistrationManager;
import com.marriott.rfp.object.pricing.accountregistration.AccountRegistration;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.DateUtility;

/**
 * Session Bean implementation class AccountManagerImpl
 */
@Service
public class AccountRegistrationManagerImpl implements AccountRegistrationManager {

	private static final Logger log = LoggerFactory.getLogger(AccountRegistrationManagerImpl.class);
    @PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

    public void registerCentralAccount(AccountRegistration accountReg, User user) {
		
    	Query q = em
		.createNativeQuery("begin Insert into MFPDBO.CENTRAL_ACCOUNT_REGISTER(central_account_registerid, period, EID, accountid, "
					+ " accounttype, accounturl, pricingperiodid, utilize_third_party, account_thirdparty_refid, " 
					+ "req_rate_cycle, btroomnightspan, clientduedate, roomnightprod, accountname, CREATEDBY_EID, create_date, account_lead_phone,account_lead_email,RATELOADINSTR,HASPRIORPRICE,CLIENT_PREFERREDNAME,other_thirdpartyname"
					+ " , loginIdReceived , solicitPricing , reasontoprice , twoyearpricing , offcyclepricing , commrates , flatrates, salesregionid ) "
					+ " select mfpdbo.CENTRAL_ACCOUNT_REGISTER_SEQ.nextval,?,?,?,?,?,?,?,?,?,?,TO_DATE(?, 'mm/dd/yyyy'),?,?,?, sysdate,?,?,?,?,?,?,?,?,?,?,?,?,?,? from dual; commit; end; ");
    	
			q.setParameter(1, accountReg.getRegPeriod());
			q.setParameter(2, accountReg.getEid());
			q.setParameter(3, accountReg.getAccountID());
			q.setParameter(4, accountReg.getAccountType());
			q.setParameter(5, accountReg.getAccountUrl());
			q.setParameter(6, accountReg.getPricingperiodid());
			q.setParameter(7, accountReg.getUtilThirdParty());
			q.setParameter(8, accountReg.getThirdPartyId());
			q.setParameter(9, accountReg.getReqRateCycle());
			q.setParameter(10, accountReg.getBtRoomNightSpan() );
			q.setParameter(11, DateUtility.formatShortDate(accountReg.getClientDueDate()));
			q.setParameter(12, accountReg.getRoomNight());
			q.setParameter(13, accountReg.getAccountName());
			q.setParameter(14, user.getEid());
			q.setParameter(15, accountReg.getAccountLeadPhone());
			q.setParameter(16, accountReg.getAccountLeadEmail());
			q.setParameter(17, accountReg.getRateLoadInstr());
			q.setParameter(18, accountReg.getHaspriorprice());
			q.setParameter(19, accountReg.getClientPreferredName());
			q.setParameter(20, accountReg.getOtherthirdpartyname());
			q.setParameter(21, accountReg.getLoginIdReceived());
			q.setParameter(22, accountReg.getSolicitPricing());
			q.setParameter(23, accountReg.getReasonToPrice());			
			q.setParameter(24, accountReg.getTwoyearpricing());
			q.setParameter(25, accountReg.getOffcyclepricing());
			q.setParameter(26, accountReg.getCommrates());
			q.setParameter(27, accountReg.getFlatrates());
			q.setParameter(28, accountReg.getSalesRegionID());
			q.executeUpdate();
			//Adding below print statements to monitor the values passed for account registration in logs
			//DO NOT DELETE THESE PRINT STATEMENTS
			log.info("*************Account Registration*************");
			log.info("1. accountReg.getRegPeriod()-->"+accountReg.getRegPeriod());
			log.info("2. accountReg.getEid()-->"+accountReg.getEid());
			log.info("3. accountReg.getAccountID()-->"+accountReg.getAccountID());
			log.info("4. accountReg.getAccountType()-->"+accountReg.getAccountType());
			log.info("5. accountReg.getAccountUrl()-->"+accountReg.getAccountUrl());
			log.info("6. accountReg.getPricingperiodid()-->"+accountReg.getPricingperiodid());
			log.info("7. accountReg.getUtilThirdParty()-->"+accountReg.getUtilThirdParty());
			log.info("8. accountReg.getThirdPartyId()-->"+accountReg.getThirdPartyId());
			log.info("9. accountReg.getReqRateCycle()-->"+accountReg.getReqRateCycle());
			log.info("10. accountReg.getBtRoomNightSpan()-->"+accountReg.getBtRoomNightSpan());
			log.info("11. accountReg.getClientDueDate()-->"+DateUtility.formatShortDate(accountReg.getClientDueDate()));
			log.info("12. accountReg.getRoomNight()-->"+accountReg.getRoomNight());
			log.info("13. accountReg.getAccountName()-->"+accountReg.getAccountName());
			log.info("14. user.getEid()-->"+user.getEid());
			log.info("15. accountReg.getAccountLeadPhone()-->"+accountReg.getAccountLeadPhone());
			log.info("16. accountReg.getAccountLeadEmail()-->"+accountReg.getAccountLeadEmail());
			log.info("17. accountReg.getRateLoadInstr()-->"+accountReg.getRateLoadInstr());
			log.info("18. accountReg.getHaspriorprice()-->"+accountReg.getHaspriorprice());
			log.info("19. accountReg.getClientPreferredName()-->"+accountReg.getClientPreferredName());
			log.info("20. accountReg.getOtherthirdpartyname()-->"+accountReg.getOtherthirdpartyname());
			log.info("21. accountReg.getLoginIdReceived()-->"+accountReg.getLoginIdReceived());
			log.info("22. accountReg.getSolicitPricing()-->"+accountReg.getSolicitPricing());
			log.info("23. accountReg.getReasonToPrice()-->"+accountReg.getReasonToPrice());
			log.info("24. accountReg.getTwoyearpricing()-->"+accountReg.getTwoyearpricing());
			log.info("25. accountReg.getOffcyclepricing()-->"+accountReg.getOffcyclepricing());
			log.info("26. accountReg.getCommrates()-->"+accountReg.getCommrates());
			log.info("27. accountReg.getFlatrates()-->"+accountReg.getFlatrates());
			log.info("28. accountReg.getSalesRegionID()-->"+accountReg.getSalesRegionID());
    }

    public void registerNonCentralAccount(AccountRegistration accountReg, User user) {
		Query q = em
		.createNativeQuery("begin Insert into MFPDBO.ACCOUNT_REGISTER(account_registerid, period, EID, accountid, "
						+ " accounttype, accounturl, pricingperiodid, rateloadinstr, "
						+ " utilize_third_party, account_thirdparty_refid, req_rate_cycle,createdby_eid, create_date, iscentral,account_lead_phone,other_thirdpartyname, salesregionid) "
						+ " select mfpdbo.ACCOUNT_REGISTER_SEQ.nextval,?,?,?,?,?,?,?,?,?,?,?, sysdate, 'N',?,?,? from dual; commit; end; ");
			q.setParameter(1, accountReg.getRegPeriod());
			q.setParameter(2, accountReg.getEid());
			q.setParameter(3, accountReg.getAccountID());
			q.setParameter(4, accountReg.getAccountType());
			q.setParameter(5, accountReg.getAccountUrl());
			q.setParameter(6, accountReg.getPricingperiodid());
			q.setParameter(7, accountReg.getRateLoadInstr());
			q.setParameter(8, accountReg.getUtilThirdParty());
			q.setParameter(9, accountReg.getThirdPartyId());
			q.setParameter(10, accountReg.getReqRateCycle());
			q.setParameter(11, user.getEid());
			q.setParameter(12, accountReg.getAccountLeadPhone());
			q.setParameter(13, accountReg.getOtherthirdpartyname());
			q.executeUpdate();
    }

}

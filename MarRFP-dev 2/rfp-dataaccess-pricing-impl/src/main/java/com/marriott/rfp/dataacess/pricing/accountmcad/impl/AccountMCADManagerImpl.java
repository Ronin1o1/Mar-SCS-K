package com.marriott.rfp.dataacess.pricing.accountmcad.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.accountmcad.api.AccountMCADManager;
import com.marriott.rfp.object.pricing.account.MCADData;
import com.marriott.rfp.object.pricing.account.MCADDetail;

/**
 * Session Bean implementation class AccountManagerImpl
 */
@Service
public class AccountMCADManagerImpl implements AccountMCADManager {

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	@SuppressWarnings("unchecked")
	public List<MCADData> findOracleMCAD(long accountrecid) {

		String queryString = "SELECT accountrecid, t0.businessid, businessname, t0.parentbusinessid, t0.ultimatebusinessid, globalbusinessid, "
				+ " cityname, state,  country_code countrycode,  siccode1desc, deployed_level businesslevelcode "
				+ " FROM mfpdbo.businessfacts t0, mfpdbo.account_mcad_lookup t1 "
				+ " WHERE t0.businessid = t1.businessid AND t0.parentbusinessid = t1.parentbusinessid AND t0.global_business_id = t1.globalbusinessid "
				+ " AND t1.accountrecid = ?1 ";

		Query q = em.createNativeQuery(queryString, MCADData.class);

		q.setParameter(1, accountrecid);

		List<MCADData> accountList = q.getResultList();

		return accountList;
	}

	public MCADDetail findOracleMCADDetail(long accountrecid, long businessid) {

		String queryString = "SELECT accountrecid, account_natural_key account_nat_key, t0.businessid, businessname, "
				+ " t0.parentbusinessid, parentbusinessname, t0.ultimatebusinessid, ultimatebusinessname, globalbusinessid, "
				+ " streetaddress1 streetaddress, cityname, stateabbrev, zipcode, country_code countrycode, zipplusfourcode zipfourcode, latitude, longitude, "
				+ " suite, telephoneareacode areacode, phonenumber, emp_all_lactions empalllocations, siccode1, siccode1desc, primary_naics_code primarynaicscode, "
				+ " primary_naics_desc primarynaicsdesc, fortune_1000_flag fortune100flag, location_code locationcode, location_desc locationdesc, company_type_code companytypecode, company_type_desc companytypedesc,"
				+ " cbsa_code_id cbsacodeid, cbsa_code_desc cbsacodedesc, deployed_level businesslevelcode, lastupdated   FROM mfpdbo.businessfacts t0, mfpdbo.account_mcad_lookup t1"
				+ " WHERE t0.businessid = t1.businessid   AND t0.parentbusinessid = t1.parentbusinessid "
				+ "   AND t0.global_business_id = t1.globalbusinessid   AND t1.accountrecid = ?1  AND t1.businessid = ?2";

		Query q = em.createNativeQuery(queryString, MCADDetail.class);

		q.setParameter(1, accountrecid);
		q.setParameter(2, businessid);

		MCADDetail accountList = (MCADDetail) q.getSingleResult();
		return accountList;
	}

	public void updateMCAD(long accountrecid, MCADDetail mcadDetail) {
		String queryString = "{call mfpproc.SP_INSERT_ACCOUNT_MCAD2(?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21, ?22, ?23, ?24, ?25, ?26, ?27, ?28, ?29, ?30, ?31, ?32, ?33, ?34, ?35)}";
		Query q = em.createNativeQuery(queryString);
		q.setParameter(1, accountrecid);
		q.setParameter(2, mcadDetail.getAccount_nat_key());
		q.setParameter(3, mcadDetail.getBusinesslevelcode());
		q.setParameter(4, mcadDetail.getBusinessid());
		q.setParameter(5, mcadDetail.getBusinessname());
		q.setParameter(6, mcadDetail.getParentbusinessid());
		q.setParameter(7, mcadDetail.getParentbusinessname());
		q.setParameter(8, mcadDetail.getUltimatebusinessid());
		q.setParameter(9, mcadDetail.getUltimatebusinessname());
		q.setParameter(10, mcadDetail.getGlobalbusinessid());
		q.setParameter(11, mcadDetail.getStreetaddress());
		q.setParameter(12, mcadDetail.getCityname());
		q.setParameter(13, mcadDetail.getStateabbrev());
		q.setParameter(14, mcadDetail.getState());
		q.setParameter(15, mcadDetail.getZipcode());
		q.setParameter(16, mcadDetail.getZipfourcode());
		q.setParameter(17, mcadDetail.getCountrycode());
		q.setParameter(18, mcadDetail.getLatitude());
		q.setParameter(19, mcadDetail.getLongitude());
		q.setParameter(20, mcadDetail.getSuite());
		q.setParameter(21, mcadDetail.getAreacode());
		q.setParameter(22, mcadDetail.getPhonenumber());
		q.setParameter(23, mcadDetail.getEmpalllocations());
		q.setParameter(24, mcadDetail.getSiteemployeenumber());
		q.setParameter(25, mcadDetail.getSiccode1());
		q.setParameter(26, mcadDetail.getSiccode1desc());
		q.setParameter(27, mcadDetail.getPrimarynaicscode());
		q.setParameter(28, mcadDetail.getPrimarynaicsdesc());
		q.setParameter(29, mcadDetail.getFortune100flag());
		q.setParameter(30, mcadDetail.getLocationcode());
		q.setParameter(31, mcadDetail.getLocationdesc());
		q.setParameter(32, mcadDetail.getCompanytypecode());
		q.setParameter(33, mcadDetail.getCompanytypedesc());
		q.setParameter(34, mcadDetail.getCbsacodeid());
		q.setParameter(35, mcadDetail.getCbsacodedesc());
		q.executeUpdate();
	}

	public void deleteMCAD(long accountrecid) {
		String queryString = "begin mfpproc.SP_DELETE_ACCOUNT_MCAD2(?1); end;";
		Query q = em.createNativeQuery(queryString);
		q.setParameter(1, accountrecid);
		q.executeUpdate();
	}

}

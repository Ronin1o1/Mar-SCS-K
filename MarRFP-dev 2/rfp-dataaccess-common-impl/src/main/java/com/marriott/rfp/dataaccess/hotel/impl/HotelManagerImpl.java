package com.marriott.rfp.dataaccess.hotel.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.hotel.api.HotelManager;
import com.marriott.rfp.object.hotel.HotelDetailData;
import com.marriott.rfp.object.hotel.HotelJson;
import com.marriott.rfp.object.hotel.HotelList;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.hotel.HotelPeriodData;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class HotelManagerImpl
 */
@Service
public class HotelManagerImpl implements HotelManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;

	/**
	 * Default constructor.
	 */
	public HotelManagerImpl() {

	}

	public List<HotelList> findAllProperties() {
		String queryString = "select marshacode, name  from mfpdbo.hotel where partition_idx='M' order by marshacode";

		Query q = em.createNativeQuery(queryString, HotelList.class);
		@SuppressWarnings("unchecked")
		List<HotelList> hotelList = q.getResultList();
		return hotelList;
	}

	public List<HotelListData> findAllPropertiesForFmtRateLogin(User user) {
		return findAllPropertiesForLoginName(user, true, true);
	}

	public List<HotelListData> findAllPropertiesForPricing(User user) {
		return findAllPropertiesForLoginName(user, false, false);
	}

	public List<HotelListData> findAllPropertiesForPricing(User user, Integer orderBy) {
		return findAllPropertiesForLoginName(user, false, false, orderBy);
	}

	@SuppressWarnings("unchecked")
	private List<HotelListData> findAllPropertiesForLoginName(User user, boolean bIncludeResVilles, boolean bPLUOnly) {
		String queryString = "select h.hotelid, h.marshacode, nvl(h.name,'') hotelName, h.affiliationid, nvl(h.country,'') country ";
		if (user.getHasLimitedHotels()) {
			queryString += "from mfpdbo.hotel h, mfpdbo.ds_user du, mfpdbo.ds_group dg, mfpdbo.ds_propusers dpu "
					+ " where lower(du.eid)=lower(?1) and dg.ou_group in ('MFPUSER', 'MFPFSALE') and dpu.cn_userid=du.cn_userid and dpu.ou_groupid=dg.ou_groupid and "
					+ " dpu.marshacode = h.marshacode and partition_idx='M' ";
		} else {
			queryString += " from mfpdbo.hotel h where (marshacode >='A') and h.partition_idx in ('M' ";
			if (bIncludeResVilles)
				queryString += ", 'R'";
			queryString += ") ";
		}
		if (bPLUOnly)
			queryString += " and h.plu_flag='Y' ";

		queryString += " order by   h.marshacode asc";

		Query q = em.createNativeQuery(queryString, HotelListData.class);

		if (user.getHasLimitedHotels())
			q.setParameter(1, user.getEid());
		List<HotelListData> hotelList = q.getResultList();

		return hotelList;
	}

	@SuppressWarnings("unchecked")
	private List<HotelListData> findAllPropertiesForLoginName(User user, boolean bIncludeResVilles, boolean bPLUOnly, Integer orderBy) {
		String queryString = "select h.hotelid, h.marshacode, nvl(h.name,'') hotelName, h.affiliationid,nvl(h.CITY, ' ') city, nvl(h.STATE, ' ') state,  nvl(h.country,'') country ";
		if (user.getHasLimitedHotels()) {
			queryString += "from mfpdbo.hotel h, mfpdbo.ds_user du, mfpdbo.ds_group dg, mfpdbo.ds_propusers dpu "
					+ " where lower(du.eid)=lower(?1) and dg.ou_group in ('MFPUSER', 'MFPFSALE') and dpu.cn_userid=du.cn_userid and dpu.ou_groupid=dg.ou_groupid and "
					+ " dpu.marshacode = h.marshacode and partition_idx='M' ";
		} else {
			queryString += " from mfpdbo.hotel h where (marshacode >='A') and h.partition_idx in ('M' ";
			if (bIncludeResVilles)
				queryString += ", 'R'";
			queryString += ") ";
		}
		if (bPLUOnly)
			queryString += " and h.plu_flag='Y' ";
		if (orderBy == null)
			orderBy = 0;
		queryString += " order by  ";
		switch (orderBy) {
		case 0:
			queryString += " h.marshacode asc";
			break;
		case 1:
			queryString += "  substr(h.NAME,1,40)  ASC";
			break;
		case 2:
			queryString += "  nvl(h.CITY, ' ')  ,  substr(h.NAME,1,40)  ASC";
			break;
		case 3:
			queryString += "  nvl(h.STATE, ' ') asc, nvl(h.CITY, ' ')  ,  substr(h.NAME,1,40)  ASC";
			break;
		case 4:
			queryString += " nvl(h.COUNTRY, ' ') ASC ,  nvl(h.STATE, ' ') ASC , nvl(h.CITY, ' ')  ,  substr(h.NAME,1,40)  ASC";
			break;
		default:
			queryString += " h.marshacode asc";
			break;
		}

		Query q = em.createNativeQuery(queryString, HotelListData.class);

		if (user.getHasLimitedHotels())
			q.setParameter(1, user.getEid());
		List<HotelListData> hotelList = q.getResultList();

		return hotelList;
	}

	public List<HotelJson> findfilteredAllPropertiesForPricing(User user, long count, long start, String filter) {
		return findfilteredAllPropertiesForLoginName(user, count, start, filter, false, false);
	}

	private List<HotelJson> findfilteredAllPropertiesForLoginName(User user, long count, long start, String filter, boolean bIncludeResVilles, boolean bPLUOnly) {
		long endvalue = start + count + 1;
		long startvalue = start;
		String filterString = "";
		if (filter.length() > 1) {
			filterString = filter.toUpperCase();
			if (filterString.endsWith("*"))
				filterString = filterString.substring(0, filter.length() - 1);
		}
		String queryString = "select marshacode,  hotelName name " + " from (select marshacode,  hotelName, rownum anum "
				+ "from (select h.marshacode, h.marshacode || ' - ' ||  nvl(h.name,'') hotelName ";
		if (user.getHasLimitedHotels()) {
			queryString += "from mfpdbo.hotel h, mfpdbo.ds_user du, mfpdbo.ds_group dg, mfpdbo.ds_propusers dpu "
					+ " where lower(du.eid)=lower(?1) and dg.ou_group in ('MFPUSER', 'MFPFSALE') and dpu.cn_userid=du.cn_userid and dpu.ou_groupid=dg.ou_groupid and "
					+ " dpu.marshacode = h.marshacode and partition_idx='M' ";
		} else {
			queryString += " from mfpdbo.hotel h where (marshacode >='A') and h.partition_idx in ('M' ";
			if (bIncludeResVilles)
				queryString += ", 'R'";
			queryString += ") ";
		}
		if (bPLUOnly)
			queryString += " and h.plu_flag='Y' ";
		queryString += " AND UPPER (h.marshacode || ' - ' ||  nvl(h.name,'')) LIKE UPPER ('" + StringUtility.replaceSingleQuotes(filterString) + "%')";
		queryString += " order by h.marshacode ASC))  where anum>" + startvalue + " and anum<=" + endvalue;
		Query q = em.createNativeQuery(queryString, HotelJson.class);

		if (user.getHasLimitedHotels())
			q.setParameter(1, user.getEid());
		@SuppressWarnings("unchecked")
		List<HotelJson> hotelList = q.getResultList();

		return hotelList;
	}

	public HotelDetailData findPropertyDetail(String marshaCode) {
		/*
		 * Changes for Ticket number:RMSDB00011509 starts here
		 * Retrived one more variable isbrandritzcarlton from the below select query from the newly 
		 * created function mfpproc.fn_isbrandritzcarlton
		 */
		String queryString = "SELECT   a.hotelid, a.marshacode, NVL (a.name, ' ') hotelName, a.affiliationid, NVL (a.franch_flag, ' ') franch_flag, mfpproc.fn_isbrandedition (a.affiliationid) isbrandedition,mfpproc.fn_isbrandluxury (a.affiliationid) isbrandluxury,  " 
				+ " mfpproc.fn_isbrandextendedstay (a.affiliationid) isbrandextendedstay,mfpproc.fn_isbrandritzcarlton (a.affiliationid) isbrandritzcarlton, mfpproc.fn_exclude_aer (a.affiliationid) exclude_aer, nvl(a.country,'') country, "
				+ " NVL (a.address1, ' ') address1, NVL (a.address2, ' ') address2, NVL (a.city, ' ') || ', ' ||  DECODE (a.country, 'US', NVL ( (SELECT   statename "
				+ " FROM   mfpdbo.state WHERE   state.state = a.state), ' ') || ', ', decode(a.province, '', '', a.province || ', ') || NVL (d.displayname, ' ') || ' ' ) || NVL (a.zip, ' ') citycountryzip, "
				+ " NVL (b.main_phone_incl, ' ') main_phone_incl, haf.breakfast_incl_corp_rates breakinrates, mfpproc.fn_brandservicetype(a.affiliationid) servicetype "
				+ " FROM   mfpdbo.hotel a, mfpdbo.edie_report_info b, mfpdbo.country d, mfpdbo.hotelaffiliation haf  "
				+ " WHERE   a.hotelid = b.hotelid AND a.country = d.country and a.affiliationid=haf.affiliationid AND marshacode = ?1 ";

		Query q = em.createNativeQuery(queryString, HotelDetailData.class);
		q.setParameter(1, marshaCode);
		HotelDetailData hotelDetailData = (HotelDetailData) q.getSingleResult();

		return hotelDetailData;
	}

	public List<String> getCities(String country, String state) {
		String queryString = "SELECT distinct city  FROM  mfpdbo.HOTEL WHERE (Country =?1) and partition_idx='M' ";
		if (country.equals("US"))
			queryString += " and (STATE =?2)";
		queryString += "order by city";

		Query q = em.createNativeQuery(queryString, String.class);
		q.setParameter(1, country);
		if (country.equals("US"))
			q.setParameter(2, state);
		@SuppressWarnings("unchecked")
		List<String> cityList = q.getResultList();
		return cityList;
	}

	private boolean UserHasProperties(User user, boolean bIncludeResVilles, boolean bPLUOnly) {
		String queryString = "select count(*) ";
		if (user.getHasLimitedHotels()) {
			queryString += "from mfpdbo.hotel h, mfpdbo.ds_user du, mfpdbo.ds_group dg, mfpdbo.ds_propusers dpu "
					+ " where lower(du.eid)=lower(?1) and dg.ou_group in ('MFPUSER', 'MFPFSALE') and dpu.cn_userid=du.cn_userid and dpu.ou_groupid=dg.ou_groupid and "
					+ " dpu.marshacode = h.marshacode and partition_idx='M' ";
		} else {
			queryString += " from mfpdbo.hotel h where (marshacode >='A') and h.partition_idx in ('M' ";
			if (bIncludeResVilles)
				queryString += ", 'R'";
			queryString += ") ";
		}
		if (bPLUOnly)
			queryString += " and h.plu_flag='Y' ";

		Query q = em.createNativeQuery(queryString, Long.class);

		if (user.getHasLimitedHotels())
			q.setParameter(1, user.getEid());
		Long numHotels = 0L;
		try {
			numHotels = (Long) q.getSingleResult();
		} catch (NoResultException e) {
			numHotels = 0L;
		}
		return !(numHotels == null || numHotels.longValue() == 0);
	}

	public boolean UserHasPropertiesForPricing(User user) {
		return UserHasProperties(user, false, false);
	}
	
	public List<HotelPeriodData> findAllPeriodsforProperty(String marshaCode, String role) {
		String queryString = "select hr.hotelrfpid,p.period,hr.nopricing from "
							+ "(select hotelid,hotelrfpid,period,nopricing FROM mfpdbo.hotelrfp WHERE hotelid = (select hotelid from mfpdbo.hotel where marshacode = ?1) ) hr, mfpdbo.period p  "
							+ "where p.period = hr.period ";
		if (role.equalsIgnoreCase("MFPUSER"))
		{
			queryString += " and p.hotelsview = 'Y' ";
		}
		queryString += " order by p.period desc";
			
		Query q = em.createNativeQuery(queryString, HotelPeriodData.class);
		q.setParameter(1, marshaCode);
		@SuppressWarnings("unchecked")
		List<HotelPeriodData> hotelPeriodData = q.getResultList();
		return hotelPeriodData;
	}
}

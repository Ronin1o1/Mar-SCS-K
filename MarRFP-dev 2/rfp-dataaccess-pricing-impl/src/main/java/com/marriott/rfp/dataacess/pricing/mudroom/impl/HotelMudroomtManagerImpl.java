package com.marriott.rfp.dataacess.pricing.mudroom.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.mudroom.api.HotelMudroomManager;
import com.marriott.rfp.object.pricing.mudroom.HotelMudroom;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.StringUtility;

/**
 * Session Bean implementation class AccountManagerImpl
 */

@Service
public class HotelMudroomtManagerImpl implements HotelMudroomManager {
	private static final Logger log = LoggerFactory.getLogger(HotelMudroomtManagerImpl.class);

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
    EntityManager em;

   public HotelMudroom findHotelRespondent(User user)  {

	String queryString = "SELECT b.Hoteluser_Respondentid hotelRespondentid, a.cn_firstname || ' ' || a.cn_lastname personName, b.persontitle, "
		+ " b.countrycode, b.areacitycode, b.phonenumber, b.faxnumber, "
		+ " DECODE (b.email, '', a.cn_mail, b.email) email,  lower(decode(b.eid1, null, a.eid2, b.eid1)) eid"
		+ " FROM (SELECT UPPER (eid) eid1, Hoteluser_Respondentid, persontitle, countrycode, "
		+ " areacitycode, phonenumber, faxnumber,  email "
		+ " FROM mfpdbo.hoteluser_respondent where upper(eid)=upper('" + StringUtility.replaceSingleQuotes(user.getEid()) + "')) b, "
		+ " (select upper(eid) eid2, cn_firstname, cn_lastname, cn_mail from mfpdbo.ds_user where upper(eid)=upper('" + StringUtility.replaceSingleQuotes(user.getEid()) + "')) a "
		+ "  WHERE a.eid2 = b.eid1(+) ";

	Query q = em.createNativeQuery(queryString, HotelMudroom.class);
	HotelMudroom hotelRes;
	try {
		hotelRes = (HotelMudroom) q.getSingleResult();
	} catch (NoResultException e) {
		hotelRes = new HotelMudroom();
	}

	return hotelRes;
   }
   
	public void updateHotelRespondent(HotelMudroom hotelRespondent) {
		try {
		    OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
		    Connection con = (Connection) kem.getConnection();
		    try {
			CallableStatement cstmt = con.prepareCall("{call mfpproc.sp_insertupdate_HotlRespondent(?,?,?,?,?,?,?,?,null,null,?)}");
			try {
				cstmt.setString(1, hotelRespondent.getPersonName());
				cstmt.setString(2, hotelRespondent.getPersonTitle());
				cstmt.setString(3, hotelRespondent.getCountryCode());
				cstmt.setString(4, hotelRespondent.getAreaCityCode());
				cstmt.setString(5, hotelRespondent.getPhoneNumber());
				cstmt.setString(6, hotelRespondent.getFaxNumber());
				cstmt.setString(7, hotelRespondent.getEmail());
				cstmt.setString(8, hotelRespondent.getEid());
				cstmt.registerOutParameter(9, Types.NUMERIC);
				cstmt.execute();
				hotelRespondent.setHotelRespondentid(new Long(cstmt.getLong(9)));
			} finally {
			    cstmt.close();
			}
		    } finally {
			con.close();
		    }
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		    hotelRespondent.setHotelRespondentid(new Long(0));
		}

	}
}

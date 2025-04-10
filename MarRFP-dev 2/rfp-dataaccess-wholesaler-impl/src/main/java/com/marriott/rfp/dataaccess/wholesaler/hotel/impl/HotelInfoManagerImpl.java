package com.marriott.rfp.dataaccess.wholesaler.hotel.impl;


import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.marriott.rfp.dataaccess.wholesaler.hotel.api.HotelInfoManager;
import com.marriott.rfp.object.wholesaler.hotel.HotelInfo;
import org.springframework.stereotype.Service;

/**
 * Session Bean implementation class HotelInfoManagerImpl
 */
@Service
public class HotelInfoManagerImpl implements HotelInfoManager {

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em; 

	public HotelInfoManagerImpl() { }

	public HotelInfo findHotelInfo(String marshacode,long period) {
		String queryString = "SELECT a.hotelid, a.marshacode, NVL (a.name, '') hotelName,"+
		 "NVL(a.country,'') country,NVL (a.address1, '') address1,"+
		 "NVL (a.address2, '') address2, NVL (a.city, '') city,NVL(a.zip,'')zip," +
		 "decode(a.zip,'',decode(d.zipcoderequired,'Y',zipcoderequired),'zipcodok') ziprequried,"+
		 "NVL(a.state,'')state,nvl(a.province,'')province ,"+
		 "NVL (b.main_phone_incl, '') mainphone,"+
		 "NVL(b.main_fax_incl,'')mainfax,b.NEARESTCITY Location,NVL(b.airport1_name,'')airport1name,NVL(b.airport1_code,'') airport1code"+
		 ",decode(b.airport1_transtype,'R','Rail','T','Taxi','S','Shuttle','W','Walking Distance','A',AIRPORT1_ALTTRANSNAME)"+
		 " airport1transtype"+
		 ",decode(b.airport1_transtype,'W','NA',decode(airport1_transfee,'0',decode(airport1_transtype, 'S','Complimentary'),airport1_transfee))"+
		 " airport1transfee"+
		 ",decode(airport1_transtype_2,'R','Rail','T','Taxi','S','Shuttle','W','Walking Distance','A',AIRPORT1_ALTTRANSNAME)"+
		 " airport1transtype2"+
		 ",decode(airport1_transtype_2,'W','NA',decode(airport1_transfee_2,'0',decode(airport1_transtype_2,'S','Complimentary'),airport1_transfee_2))"+
		 " airport1transfee2"+
		 ",NVL(b.airport2_name,'')airport2name,NVL(b.airport2_code,'') airport2code"+
		 ",decode(b.airport2_transtype,'R','Rail','T','Taxi','S','Shuttle','W','Walking Distance','A',AIRPORT2_ALTTRANSNAME) "+
		 "airport2transtype"+
		 ",decode(b.airport2_transtype,'W','NA',decode(airport2_transfee,'0',decode(airport2_transfee,'S','Complimentary'),airport2_transfee)) "+
		 "airport2transfee"+
		 ",decode(airport2_transtype_2,'R','Rail','T','Taxi','S','Shuttle','W','Walking Distance','A',AIRPORT2_ALTTRANSNAME) "+
		 "airport2transtype2"+
		 ",decode(airport2_transtype_2,'W','NA',decode(airport2_transfee_2,'0',decode(airport2_transtype_2,'S','Complimentary'),airport2_transfee_2)) "+
		 "airport2transfee2"+
		 ",NVL(b.airport3_name,'')airport3name,NVL(b.airport3_code,'')airport3code"+
		 ",decode(b.airport3_transtype,'R','Rail','T','Taxi','S','Shuttle','W','Walking Distance','A',AIRPORT3_ALTTRANSNAME) "+
		 "airport3transtype"+
		 ",decode(b.airport3_transtype,'W','NA',decode(airport3_transfee,'0',decode(airport3_transtype,'S','Complimentary'),airport3_transfee)) "+
		 "airport3transfee"+
		 ",decode(airport3_transtype_2,'R','Rail','T','Taxi','S','Shuttle','W','Walking Distance','A',AIRPORT3_ALTTRANSNAME) "+
		 "airport3transtype2"+
		 ",decode(airport3_transtype_2,'W','NA',decode(airport3_transfee_2,'0',decode(airport3_transtype_2,'S','Complimentary'),airport3_transfee_2)) "+
		 "airport3transfee2, a.affiliationid "+
		 "FROM  mfpdbo.hotel a, mfpdbo.edie_report_info b, mfpdbo.country d "+
		 "WHERE  a.hotelid = b.hotelid(+) AND a.country = d.country "+
		 "AND a.marshacode=?1";
			 
		Query q = em.createNativeQuery(queryString, HotelInfo.class);
		q.setParameter(1, marshacode);
		HotelInfo hotelInfoList = (HotelInfo)q.getSingleResult();
	    return hotelInfoList;
	}
	
}
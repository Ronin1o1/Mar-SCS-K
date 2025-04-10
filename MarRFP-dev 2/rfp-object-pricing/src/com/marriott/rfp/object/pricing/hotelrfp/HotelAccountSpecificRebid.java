package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class HotelAccountSpecificRebid implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long accountrecid;
	private Long hotel_accountinfoid;
	private Long hotelid;
	private Long hotelrfpid;
	private Date rebid_due;
	private Date rebid_due2;
	private Date rebid_due3;
	private String rebid_notes;
	private String rebid_notes2;
	private String rebid_notes3;
	private Long rebidstatus;
	private Long rebidstatus2;
	private Long rebidstatus3;
	private String rebidstatus_desc;
	private String rebidstatus_desc2;
	private Long rebidRound;
	private HotelAccountSpecificRebidViewInfo hasRebidViewInfo;
	private Date last_updatedrebid1;
	private Date last_updatedrebid2;
	private Date last_updatedrebid3;
	private String lastupdaterebid1eid;
	private String lastupdaterebid2eid;
	private String lastupdaterebid3eid;
	private String lastupdaterebid1email;
	private String lastupdaterebid2email;
	private String lastupdaterebid3email;
	
	public Date getLast_updatedrebid1() {
		return last_updatedrebid1;
	}

	public void setLast_updatedrebid1(Date last_updatedrebid1) {
		this.last_updatedrebid1 = last_updatedrebid1;
	}

	public Date getLast_updatedrebid2() {
		return last_updatedrebid2;
	}

	public void setLast_updatedrebid2(Date last_updatedrebid2) {
		this.last_updatedrebid2 = last_updatedrebid2;
	}

	public Date getLast_updatedrebid3() {
		return last_updatedrebid3;
	}

	public void setLast_updatedrebid3(Date last_updatedrebid3) {
		this.last_updatedrebid3 = last_updatedrebid3;
	}

	public String getLastupdaterebid1eid() {
		return lastupdaterebid1eid;
	}

	public void setLastupdaterebid1eid(String lastupdaterebid1eid) {
		this.lastupdaterebid1eid = lastupdaterebid1eid;
	}

	public String getLastupdaterebid2eid() {
		return lastupdaterebid2eid;
	}

	public void setLastupdaterebid2eid(String lastupdaterebid2eid) {
		this.lastupdaterebid2eid = lastupdaterebid2eid;
	}

	public String getLastupdaterebid3eid() {
		return lastupdaterebid3eid;
	}

	public void setLastupdaterebid3eid(String lastupdaterebid3eid) {
		this.lastupdaterebid3eid = lastupdaterebid3eid;
	}

	public String getLastupdaterebid1email() {
		return lastupdaterebid1email;
	}

	public void setLastupdaterebid1email(String lastupdaterebid1email) {
		this.lastupdaterebid1email = lastupdaterebid1email;
	}

	public String getLastupdaterebid2email() {
		return lastupdaterebid2email;
	}

	public void setLastupdaterebid2email(String lastupdaterebid2email) {
		this.lastupdaterebid2email = lastupdaterebid2email;
	}

	public String getLastupdaterebid3email() {
		return lastupdaterebid3email;
	}

	public void setLastupdaterebid3email(String lastupdaterebid3email) {
		this.lastupdaterebid3email = lastupdaterebid3email;
	}

	public String getFormattedLast_updatedrebid1() {
		return DateUtility.formatLongDate(last_updatedrebid1);
	}
	
	public String getFormattedLast_updatedrebid2() {
		return DateUtility.formatLongDate(last_updatedrebid2);
	}
	
	public String getFormattedLast_updatedrebid3() {
		return DateUtility.formatLongDate(last_updatedrebid3);
	}
	
	public Long getAccountrecid() {
		return accountrecid;
	}

	public Long getHotel_accountinfoid() {
		return hotel_accountinfoid;
	}

	public Long getHotelid() {
		return hotelid;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}

	public Date getRebid_due() {
		return rebid_due;
	}

	public String getLongRebid_due() {
		return DateUtility.formatLongDate(rebid_due);
	}

	public Date getRebid_due2() {
		return rebid_due2;
	}

	public String getLongRebid_due2() {
		return DateUtility.formatLongDate(rebid_due2);
	}

	public Date getRebid_due3() {
		return rebid_due3;
	}

	public String getLongRebid_due3() {
		return DateUtility.formatLongDate(rebid_due3);
	}

	public String getRebid_notes() {
		return rebid_notes;
	}

	public String getRebid_notes2() {
		return rebid_notes2;
	}

	public String getRebid_notes3() {
		return rebid_notes3;
	}

	public Long getRebidstatus() {
		return rebidstatus;
	}

	public Long getRebidstatus2() {
		return rebidstatus2;
	}

	public Long getRebidstatus3() {
		return rebidstatus3;
	}

	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public void setRebid_due(Date rebid_due) {
		this.rebid_due = rebid_due;
	}

	public void setRebid_due2(Date rebid_due2) {
		this.rebid_due2 = rebid_due2;
	}

	public void setRebid_due3(Date rebid_due3) {
		this.rebid_due3 = rebid_due3;
	}

	public void setRebid_notes(String rebid_notes) {
		this.rebid_notes = rebid_notes;
	}

	public void setRebid_notes2(String rebid_notes2) {
		this.rebid_notes2 = rebid_notes2;
	}

	public void setRebid_notes3(String rebid_notes3) {
		this.rebid_notes3 = rebid_notes3;
	}

	public void setRebidstatus(Long rebidstatus) {
		this.rebidstatus = rebidstatus;
	}

	public void setRebidstatus2(Long rebidstatus2) {
		this.rebidstatus2 = rebidstatus2;
	}

	public void setRebidstatus3(Long rebidstatus3) {
		this.rebidstatus3 = rebidstatus3;
	}

	public void setRebidstatus_desc(String rebidstatus_desc) {
		this.rebidstatus_desc = rebidstatus_desc;
	}

	public String getRebidstatus_desc() {
		return rebidstatus_desc;
	}

	public void setRebidstatus_desc2(String rebidstatus_desc2) {
		this.rebidstatus_desc2 = rebidstatus_desc2;
	}

	public String getRebidstatus_desc2() {
		return rebidstatus_desc2;
	}

	public void setRebidRound(Long rebidRound) {
		this.rebidRound = rebidRound;
	}

	public Long getRebidRound() {
		return rebidRound;
	}

	public void setHasRebidViewInfo(HotelAccountSpecificRebidViewInfo hasRebidViewInfo) {
		this.hasRebidViewInfo = hasRebidViewInfo;
	}

	public HotelAccountSpecificRebidViewInfo getHasRebidViewInfo() {
		return hasRebidViewInfo;
	}

	public void setHotel_accountinfoid(Long hotel_accountinfoid) {
		this.hotel_accountinfoid = hotel_accountinfoid;
	}

}

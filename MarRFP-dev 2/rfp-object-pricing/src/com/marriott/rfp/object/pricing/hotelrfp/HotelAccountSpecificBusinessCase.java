package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;
import com.marriott.rfp.utility.DateUtility;

public class HotelAccountSpecificBusinessCase implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String bus_reason;
	private String competitor_info;
	private String market_notes;		 
	private String notestext_existinghotel;
	private String notestext_preopeninghotel;
	private String trvler_endorse;
	private String trvler_info;
	private String isSolicited;
	private String business_case;
	private String cbcstatus;
	private Date cbc_softduedate;
	private String ispastcbc;
	private Long rm_nights;	 
	private String pid;
	private long cbc_count;
	private long cbc_request;

	private long max_cbc;

	public long getCbc_count() {
		return cbc_count;
	}

	public void setCbc_count(long cbc_count) {
		this.cbc_count = cbc_count;
	}


	public long getMax_cbc() {
		return max_cbc;
	}

	public void setMax_cbc(long max_cbc) {
		this.max_cbc = max_cbc;
	}

	public long getCbc_request() {
		return cbc_request;
	}

	public void setCbc_request(long cbc_request) {
		this.cbc_request = cbc_request;
	}

	public String getBus_reason() {
		return bus_reason;
	}

	public void setBus_reason(String bus_reason) {
		this.bus_reason = bus_reason;
	}

	public String getCompetitor_info() {
		return competitor_info;
	}

	public void setCompetitor_info(String competitor_info) {
		this.competitor_info = competitor_info;
	}

	public String getMarket_notes() {
		return market_notes;
	}

	public void setMarket_notes(String market_notes) {
		this.market_notes = market_notes;
	}
	public String getNotestext_existinghotel() {
		return notestext_existinghotel;
	}

	public void setNotestext_existinghotel(String notestext_existinghotel) {
		this.notestext_existinghotel = notestext_existinghotel;
	}
	public String getNotestext_preopeninghotel() {
		return notestext_preopeninghotel;
	}

	public void setNotestext_preopeninghotel(String notestext_preopeninghotel) {
		this.notestext_preopeninghotel = notestext_preopeninghotel;
	}
	
	public String getTrvler_endorse() {
		return trvler_endorse;
	}

	public void setTrvler_endorse(String trvler_endorse) {
		this.trvler_endorse = trvler_endorse;
	}

	public String getTrvler_info() {
		return trvler_info;
	}

	public void setTrvler_info(String trvler_info) {
		this.trvler_info = trvler_info;
	}

	public String getIsSolicited() {
		return isSolicited;
	}

	public void setIsSolicited(String isSolicited) {
		this.isSolicited = isSolicited;
	}

	public String getBusiness_case() {
		return business_case;
	}

	public void setBusiness_case(String business_case) {
  		this.business_case = business_case;
	}

	public String getCbcstatus() {
		return cbcstatus;
	}

	public void setCbcstatus(String cbcstatus) {
		this.cbcstatus = cbcstatus;
	}

	public Date getCbc_softduedate() {
		return cbc_softduedate;
	}

	public void setCbc_softduedate(Date cbc_softduedate) {
		this.cbc_softduedate = cbc_softduedate;
	}

	public String getIspastcbc() {
		return ispastcbc;
	}

	public void setIspastcbc(String ispastcbc) {
		this.ispastcbc = ispastcbc;
	}

	public String getShortCbc_softduedate() {
		return DateUtility.formatShortDate(cbc_softduedate);
	}

	public void setRm_nights(Long rm_nights) {
		this.rm_nights = rm_nights;
	}

	public Long getRm_nights() {
		return rm_nights;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getPid() {
		return pid;
	}


	
}

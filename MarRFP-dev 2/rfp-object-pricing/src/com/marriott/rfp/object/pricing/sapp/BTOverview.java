package com.marriott.rfp.object.pricing.sapp;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BTOverview {
	private static final Logger log = LoggerFactory.getLogger(BTOverview.class);

	private String relocat_intermediary;
	private String competitors_bybrand;
	private String pref_air_partners;
	private String pref_car_rental;
	private String pref_hotel;
	private String requiretext;
	private String requesttext;	   
	private String notestext_existinghotel;
	private String notestext_preopeninghotel;
	private String org_buying_struct;
	private String reservationstext;
	private String policies;
	private String solutions;
	private String inter_strategy;
	private String online_solut_util;
	private String onl_bkg_tool;
	private Long adopt_rate_bkg_tool;
	private String btOnly;
	private Date lastupdate_bt_overview;
	private Date cbc_softduedate;
	private String roomtypetext;

	public String getRelocat_intermediary() {
		return relocat_intermediary;
	}

	public void setRelocat_intermediary(String relocat_intermediary) {
		this.relocat_intermediary = relocat_intermediary;
	}

	public String getCompetitors_bybrand() {
		return competitors_bybrand;
	}

	public void setCompetitors_bybrand(String competitors_bybrand) {
		this.competitors_bybrand = competitors_bybrand;
	}

	public String getPref_air_partners() {
		return pref_air_partners;
	}

	public void setPref_air_partners(String pref_air_partners) {
		this.pref_air_partners = pref_air_partners;
	}

	public String getPref_car_rental() {
		return pref_car_rental;
	}

	public void setPref_car_rental(String pref_car_rental) {
		this.pref_car_rental = pref_car_rental;
	}

	public String getPref_hotel() {
		return pref_hotel;
	}

	public void setPref_hotel(String pref_hotel) {
		this.pref_hotel = pref_hotel;
	}

	public String getRequiretext() {
		return requiretext;
	}

	public void setRequiretext(String requiretext) {
		this.requiretext = requiretext;
	}

	public String getRequesttext() {
		return requesttext;
	}

	public void setRequesttext(String requesttext) {
		this.requesttext = requesttext;
	}
	public String getNotestext_preopeninghotel() {
		return notestext_preopeninghotel;
	}

	public void setNotestext_preopeninghotel(String notestext_preopeninghotel) {
		this.notestext_preopeninghotel = notestext_preopeninghotel;
	}

	public String getNotestext_existinghotel() {
		return notestext_existinghotel;
	}

	public void setNotestext_existinghotel(String notestext_existinghotel) {
		this.notestext_existinghotel = notestext_existinghotel;
	}
	
	public String getOrg_buying_struct() {
		return org_buying_struct;
	}

	public void setOrg_buying_struct(String org_buying_struct) {
		this.org_buying_struct = org_buying_struct;
	}

	public String getReservationstext() {
		return reservationstext;
	}

	public void setReservationstext(String reservationstext) {
		this.reservationstext = reservationstext;
	}

	public String getPolicies() {
		return policies;
	}

	public void setPolicies(String policies) {
		this.policies = policies;
	}

	public String getSolutions() {
		return solutions;
	}

	public void setSolutions(String solutions) {
		this.solutions = solutions;
	}

	public String getInter_strategy() {
		return inter_strategy;
	}

	public void setInter_strategy(String inter_strategy) {
		this.inter_strategy = inter_strategy;
	}

	public String getOnline_solut_util() {
		return online_solut_util;
	}

	public void setOnline_solut_util(String online_solut_util) {
		this.online_solut_util = online_solut_util;
	}

	public String getOnl_bkg_tool() {
		return onl_bkg_tool;
	}

	public void setOnl_bkg_tool(String onl_bkg_tool) {
		this.onl_bkg_tool = onl_bkg_tool;
	}

	public Long getAdopt_rate_bkg_tool() {
		return adopt_rate_bkg_tool;
	}

	public void setAdopt_rate_bkg_tool(Long adopt_rate_bkg_tool) {
		this.adopt_rate_bkg_tool = adopt_rate_bkg_tool;
	}

	public String getBtOnly() {
		return btOnly;
	}

	public void setBtOnly(String btOnly) {
		this.btOnly = btOnly;
	}

	public Date getLastupdate_bt_overview() {
		return lastupdate_bt_overview;
	}

	public void setLastupdate_bt_overview(Date lastupdate_bt_overview) {
		this.lastupdate_bt_overview = lastupdate_bt_overview;
	}

	public void setCbc_softduedate(Date cbc_softduedate) {
		if ( cbc_softduedate != null )
			this.cbc_softduedate = cbc_softduedate;
		else
			try {
				this.cbc_softduedate = DateUtility.parseDate("01/31/9999 00:00:00.0");
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				log.error(e.getMessage(),e);
			}
	}

	public Date getCbc_softduedate() {
		return cbc_softduedate;
	}

	public String getShortCbc_softduedate() {
		return DateUtility.formatShortDate(cbc_softduedate);
	}

	public void setStrCbc_softduedate(String strCbc_softduedate) {
		try {
			cbc_softduedate = DateUtility.parseDate(strCbc_softduedate);
		} catch (ParseException e) {
		}
	}

	public String getRoomtypetext() {
		return roomtypetext;
}
	public void setRoomtypetext(String roomtypetext) {
		this.roomtypetext = roomtypetext;
	}
	

}
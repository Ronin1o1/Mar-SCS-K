package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;

import com.marriott.rfp.utility.NumberUtility;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class SCPTAcctHistSummary implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long scpt_accountid;
	private Long scpt_detailid;
	private String accountname;
	private String accountsegment;
	private Long hotelid;
	private Long period;
	private Long accountid;
	private Long sctypeid;
	private String prevaccepted;
	private String twoyearprevaccepted;
	private Long prevgrade;
	private Long twoyearprevgrade;
	private Long threeyearprevgrade;
	private Long prevyear_rn_sun;
	private Long prevyear_rn_mon;
	private Long prevyear_rn_tue;
	private Long prevyear_rn_wed;
	private Long prevyear_rn_thu;
	private Long prevyear_rn_fri;
	private Long prevyear_rn_sat;
	private Long prevyear_staypatterngrade;
	private Double squatter_book_pct;
	private Long squatter_book_grade;
	private Double elite_rewards_mbr_pct;
	private Long elite_rewards_mbr_grade;
	private Double agency_compliance_pct;
	private Long agency_compliance_grade;
	private Long prevyear_ytd_rn;
	private Long twoyearprev_ytd_rn;
	private Long threeyearprev_ytd_rn;
	private Double yoy_ytd_change_pct;
	private Long yoy_ytd_change;
	private Double prevyear_acct_rate_net;
	private Double twoyearprev_acct_rate_net;
	private Double threeyearprev_acct_rate_net;
	private Double yoy_ytd_netchange_pct;
	private Double yoy_ytd_netchange;
	private Double prevyear_wgt_retail_rate;
	private Double twoyearprev_wgt_retail_rate;
	private Double threeyearprev_wgt_retail_rate;
	private Double prevyear_dsc_retail_pct;
	private Double twoyearprev_dsc_retail_pct;
	private Double threeyearprev_dsc_retail_pct;
	private Double prevyear_acct_rev_net;
	private Double twoyearprev_acct_rev_net;
	private Double threeyearprev_acct_rev_net;
	private Double yoy_ytd_revchange_pct;
	private Double yoy_ytd_revchange;
	private Long fy_fcst_vol;
	private Double rcmd_tgt_increase_pct;
	private Long accountrecid;
	private String accountstatus;
	private String scpt_typename;
	private Double total_multiplier;
	private Double anticipate_inc_retail_pct;
	private Double retail_adr;
	private Double prevyear_retailadr;
	private String chg;

	/*include*/
	public String getAccountname() {
		return accountname;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public void setAccountid(Long accountid) {
		this.accountid = accountid;
	}

	@JsonIgnore
	public Long getAccountid() {
		return accountid;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	/*include*/	
	public Long getPeriod() {
		return period;
	}

	/*include*/
	public Long getScpt_accountid() {
		return scpt_accountid;
	}

	public void setScpt_accountid(Long scpt_accountid) {
		this.scpt_accountid = scpt_accountid;
	}
	@JsonIgnore 
	public Long getScpt_detailid() {
		return scpt_detailid;
	}

	public void setScpt_detailid(Long scpt_detailid) {
		this.scpt_detailid = scpt_detailid;
	}

	@JsonIgnore
	public String getAccountsegment() {
		return accountsegment;
	}

	public void setAccountsegment(String accountsegment) {
		this.accountsegment = accountsegment;
	}
    
	/*include*/
	public Long getHotelid() {
		return hotelid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	@JsonIgnore
	public String getPrevaccepted() {
		return prevaccepted;
	}

	public void setPrevaccepted(String prevaccepted) {
		this.prevaccepted = prevaccepted;
	}
	
	@JsonIgnore
	public String getTwoyearprevaccepted() {
		return twoyearprevaccepted;
	}

	public void setTwoyearprevaccepted(String twoyearprevaccepted) {
		this.twoyearprevaccepted = twoyearprevaccepted;
	}

	/*include*/
	public Long getPrevgrade() {
		return prevgrade;
	}

	public void setPrevgrade(Long prevgrade) {
		this.prevgrade = prevgrade;
	}

	/*include*/
	public Long getTwoyearprevgrade() {
		return twoyearprevgrade;
	}

	public void setTwoyearprevgrade(Long twoyearprevgrade) {
		this.twoyearprevgrade = twoyearprevgrade;
	}
	@JsonIgnore
	public Long getThreeyearprevgrade() {
		return threeyearprevgrade;
	}

	public void setThreeyearprevgrade(Long threeyearprevgrade) {
		this.threeyearprevgrade = threeyearprevgrade;
	}

	/*include*/
	public Long getPrevyear_rn_sun() {
		return prevyear_rn_sun;
	}

	/*include*/
	public String getPrevyear_rn_sunpct() {
		return getPrevyear_rn_dow_pct(prevyear_rn_sun);
	}

	public void setPrevyear_rn_sun(Long prevyear_rn_sun) {
		this.prevyear_rn_sun = prevyear_rn_sun;
	}

	/*include*/
	public Long getPrevyear_rn_mon() {
		return prevyear_rn_mon;
	}

	/*include*/
	public String getPrevyear_rn_monpct() {
		return getPrevyear_rn_dow_pct(prevyear_rn_mon);
	}

	public void setPrevyear_rn_mon(Long prevyear_rn_mon) {
		this.prevyear_rn_mon = prevyear_rn_mon;
	}

	/*include*/
	public Long getPrevyear_rn_tue() {
		return prevyear_rn_tue;
	}
	/*include*/
	public String getPrevyear_rn_tuepct() {
		return getPrevyear_rn_dow_pct(prevyear_rn_tue);
	}

	public void setPrevyear_rn_tue(Long prevyear_rn_tue) {
		this.prevyear_rn_tue = prevyear_rn_tue;
	}

	/*include*/
	public Long getPrevyear_rn_wed() {
		return prevyear_rn_wed;
	}

	/*include*/
	public String getPrevyear_rn_wedpct() {
		return getPrevyear_rn_dow_pct(prevyear_rn_wed);
	}

	public void setPrevyear_rn_wed(Long prevyear_rn_wed) {
		this.prevyear_rn_wed = prevyear_rn_wed;
	}

	/*include*/
	public Long getPrevyear_rn_thu() {
		return prevyear_rn_thu;
	}

	/*include*/
	public String getPrevyear_rn_thupct() {
		return getPrevyear_rn_dow_pct(prevyear_rn_thu);
	}

	public void setPrevyear_rn_thu(Long prevyear_rn_thu) {
		this.prevyear_rn_thu = prevyear_rn_thu;
	}

	/*include*/
	public Long getPrevyear_rn_fri() {
		return prevyear_rn_fri;
	}

	/*include*/
	public String getPrevyear_rn_fripct() {
		return getPrevyear_rn_dow_pct(prevyear_rn_fri);
	}

	public void setPrevyear_rn_fri(Long prevyear_rn_fri) {
		this.prevyear_rn_fri = prevyear_rn_fri;
	}

	/*include*/
	public Long getPrevyear_rn_sat() {
		return prevyear_rn_sat;
	}

	/*include*/
	public String getPrevyear_rn_satpct() {
		return getPrevyear_rn_dow_pct(prevyear_rn_sat);
	}

	public void setPrevyear_rn_sat(Long prevyear_rn_sat) {
		this.prevyear_rn_sat = prevyear_rn_sat;
	}
	@JsonIgnore
	private String getPrevyear_rn_dow_pct(Long dow_rn) {
		String pctStr = "";
		if (dow_rn !=null && prevyear_ytd_rn != null && prevyear_ytd_rn > 0) {
			Double pct = ((double) dow_rn / (double)prevyear_ytd_rn) * 100;
			pctStr = NumberUtility.formatWholePercentage(pct) + "%";
		}
		return pctStr;
	}

	/*include*/
	public Long getPrevyear_staypatterngrade() {
		return prevyear_staypatterngrade;
	}

	public void setPrevyear_staypatterngrade(Long prevyear_staypatterngrade) {
		this.prevyear_staypatterngrade = prevyear_staypatterngrade;
	}
	
	@JsonIgnore
	public Double getSquatter_book_pct() {
		return squatter_book_pct;
	}
	
	@JsonIgnore
	public String getSquatter_book_pctstr() {
		return percentString(squatter_book_pct);
	}

	public void setSquatter_book_pct(Double squatter_book_pct) {
		this.squatter_book_pct = squatter_book_pct;
	}
	
	@JsonIgnore
	public Long getSquatter_book_grade() {
		return squatter_book_grade;
	}

	public void setSquatter_book_grade(Long squatter_book_grade) {
		this.squatter_book_grade = squatter_book_grade;
	}
	
	@JsonIgnore
	public Double getElite_rewards_mbr_pct() {
		return elite_rewards_mbr_pct;
	}

	public void setElite_rewards_mbr_pct(Double elite_rewards_mbr_pct) {
		this.elite_rewards_mbr_pct = elite_rewards_mbr_pct;
	}
	
	@JsonIgnore
	public String getElite_rewards_mbr_pctstr() {
		return percentString(elite_rewards_mbr_pct);
	}
	
	@JsonIgnore
	public Long getElite_rewards_mbr_grade() {
		return elite_rewards_mbr_grade;
	}

	public void setElite_rewards_mbr_grade(Long elite_rewards_mbr_grade) {
		this.elite_rewards_mbr_grade = elite_rewards_mbr_grade;
	}
	
	@JsonIgnore
	public Double getAgency_compliance_pct() {
		return agency_compliance_pct;
	}
	
	@JsonIgnore
	public String getAgency_compliance_pctstr() {
		return percentString(agency_compliance_pct);
	}

	public void setAgency_compliance_pct(Double agency_compliance_pct) {
		this.agency_compliance_pct = agency_compliance_pct;
	}
	
	@JsonIgnore
	public Long getAgency_compliance_grade() {
		return agency_compliance_grade;
	}

	public void setAgency_compliance_grade(Long agency_compliance_grade) {
		this.agency_compliance_grade = agency_compliance_grade;
	}

	/*include*/
	public Long getPrevyear_ytd_rn() {
		return prevyear_ytd_rn;
	}

	public void setPrevyear_ytd_rn(Long prevyear_ytd_rn) {
		this.prevyear_ytd_rn = prevyear_ytd_rn;
	}

	/*include*/
	public Long getTwoyearprev_ytd_rn() {
		return twoyearprev_ytd_rn;
	}

	public void setTwoyearprev_ytd_rn(Long twoyearprev_ytd_rn) {
		this.twoyearprev_ytd_rn = twoyearprev_ytd_rn;
	}
	@JsonIgnore
	public Long getThreeyearprev_ytd_rn() {
		return threeyearprev_ytd_rn;
	}

	public void setThreeyearprev_ytd_rn(Long threeyearprev_ytd_rn) {
		this.threeyearprev_ytd_rn = threeyearprev_ytd_rn;
	}

	/*include*/
	public Double getYoy_ytd_change_pct() {
		return yoy_ytd_change_pct;
	}
	@JsonIgnore
	public String getYoy_ytd_change_pctstr() {
		return percentString(yoy_ytd_change_pct);
	}

	public void setYoy_ytd_change_pct(Double yoy_ytd_change_pct) {
		this.yoy_ytd_change_pct = yoy_ytd_change_pct;
	}

	/*include*/
	public Long getYoy_ytd_change() {
		return yoy_ytd_change;
	}

	public void setYoy_ytd_change(Long yoy_ytd_change) {
		this.yoy_ytd_change = yoy_ytd_change;
	}

	/*include*/
	public Double getPrevyear_acct_rate_net() {
		return prevyear_acct_rate_net;
	}

	public void setPrevyear_acct_rate_net(Double prevyear_acct_rate_net) {
		this.prevyear_acct_rate_net = prevyear_acct_rate_net;
	}

	/*include*/
	public Double getTwoyearprev_acct_rate_net() {
		return twoyearprev_acct_rate_net;
	}

	public void setTwoyearprev_acct_rate_net(Double twoyearprev_acct_rate_net) {
		this.twoyearprev_acct_rate_net = twoyearprev_acct_rate_net;
	}
	
	@JsonIgnore
	public Double getThreeyearprev_acct_rate_net() {
		return threeyearprev_acct_rate_net;
	}

	public void setThreeyearprev_acct_rate_net(Double threeyearprev_acct_rate_net) {
		this.threeyearprev_acct_rate_net = threeyearprev_acct_rate_net;
	}

	/*include*/
	public Double getYoy_ytd_netchange_pct() {
		return yoy_ytd_netchange_pct;
	}
	
	@JsonIgnore
	public String getYoy_ytd_netchange_pctstr() {
		return percentString(yoy_ytd_netchange_pct);
	}

	public void setYoy_ytd_netchange_pct(Double yoy_ytd_netchange_pct) {
		this.yoy_ytd_netchange_pct = yoy_ytd_netchange_pct;
	}

	/*include*/
	public Double getYoy_ytd_netchange() {
		return yoy_ytd_netchange;
	}

	public void setYoy_ytd_netchange(Double yoy_ytd_netchange) {
		this.yoy_ytd_netchange = yoy_ytd_netchange;
	}
	
	@JsonIgnore
	public Double getPrevyear_wgt_retail_rate() {
		return prevyear_wgt_retail_rate;
	}

	public void setPrevyear_wgt_retail_rate(Double prevyear_wgt_retail_rate) {
		this.prevyear_wgt_retail_rate = prevyear_wgt_retail_rate;
	}
	
	@JsonIgnore
	public Double getTwoyearprev_wgt_retail_rate() {
		return twoyearprev_wgt_retail_rate;
	}

	public void setTwoyearprev_wgt_retail_rate(Double twoyearprev_wgt_retail_rate) {
		this.twoyearprev_wgt_retail_rate = twoyearprev_wgt_retail_rate;
	}
	
	@JsonIgnore
	public Double getThreeyearprev_wgt_retail_rate() {
		return threeyearprev_wgt_retail_rate;
	}

	public void setThreeyearprev_wgt_retail_rate(Double threeyearprev_wgt_retail_rate) {
		this.threeyearprev_wgt_retail_rate = threeyearprev_wgt_retail_rate;
	}
	
	@JsonIgnore
	public Double getPrevyear_dsc_retail_pct() {
		return prevyear_dsc_retail_pct;
	}
	
	@JsonIgnore
	public String getPrevyear_dsc_retail_pctstr() {
		return percentString(prevyear_dsc_retail_pct);
	}

	public void setPrevyear_dsc_retail_pct(Double prevyear_dsc_retail_pct) {
		this.prevyear_dsc_retail_pct = prevyear_dsc_retail_pct;
	}
	
	@JsonIgnore
	public Double getTwoyearprev_dsc_retail_pct() {
		return twoyearprev_dsc_retail_pct;
	}
	
	@JsonIgnore
	public String getTwoyearprev_dsc_retail_pctstr() {
		return percentString(twoyearprev_dsc_retail_pct);
	}

	public void setTwoyearprev_dsc_retail_pct(Double twoyearprev_dsc_retail_pct) {
		this.twoyearprev_dsc_retail_pct = twoyearprev_dsc_retail_pct;
	}
	
	@JsonIgnore
	public Double getThreeyearprev_dsc_retail_pct() {
		return threeyearprev_dsc_retail_pct;
	}
	
	@JsonIgnore
	public String getThreeyearprev_dsc_retail_pctstr() {
		return percentString(threeyearprev_dsc_retail_pct);
	}

	public void setThreeyearprev_dsc_retail_pct(Double threeyearprev_dsc_retail_pct) {
		this.threeyearprev_dsc_retail_pct = threeyearprev_dsc_retail_pct;
	}
	
	@JsonIgnore
	public Double getPrevyear_acct_rev_net() {
		return prevyear_acct_rev_net;
	}

	public void setPrevyear_acct_rev_net(Double prevyear_acct_rev_net) {
		this.prevyear_acct_rev_net = prevyear_acct_rev_net;
	}
	
	@JsonIgnore
	public Double getTwoyearprev_acct_rev_net() {
		return twoyearprev_acct_rev_net;
	}

	public void setTwoyearprev_acct_rev_net(Double twoyearprev_acct_rev_net) {
		this.twoyearprev_acct_rev_net = twoyearprev_acct_rev_net;
	}
	
	@JsonIgnore
	public Double getThreeyearprev_acct_rev_net() {
		return threeyearprev_acct_rev_net;
	}

	public void setThreeyearprev_acct_rev_net(Double threeyearprev_acct_rev_net) {
		this.threeyearprev_acct_rev_net = threeyearprev_acct_rev_net;
	}
	
	@JsonIgnore
	public Double getYoy_ytd_revchange_pct() {
		return yoy_ytd_revchange_pct;
	}
	
	@JsonIgnore
	public String getYoy_ytd_revchange_pctstr() {
		return percentString(yoy_ytd_revchange_pct);
	}

	public void setYoy_ytd_revchange_pct(Double yoy_ytd_revchange_pct) {
		this.yoy_ytd_revchange_pct = yoy_ytd_revchange_pct;
	}
	
	@JsonIgnore
	public Double getYoy_ytd_revchange() {
		return yoy_ytd_revchange;
	}

	public void setYoy_ytd_revchange(Double yoy_ytd_revchange) {
		this.yoy_ytd_revchange = yoy_ytd_revchange;
	}	
	
	@JsonIgnore
	public Double getRcmd_tgt_increase_pct() {
		return rcmd_tgt_increase_pct;
	}
	
	@JsonIgnore
	public String getRcmd_tgt_increase_pctstr() {
		return percentString(rcmd_tgt_increase_pct);
	}

	public void setRcmd_tgt_increase_pct(Double rcmd_tgt_increase_pct) {
		this.rcmd_tgt_increase_pct = rcmd_tgt_increase_pct;
	}
	
	@JsonIgnore
	public Long getSctypeid() {
		return sctypeid;
	}

	public void setSctypeid(Long sctypeid) {
		this.sctypeid = sctypeid;
	}
	
	@JsonIgnore
	public String getPrevgradecolor() {
		return gradeColor(prevgrade);
	}
	
	@JsonIgnore
	public String getTwoyearprevgradecolor() {
		return gradeColor(twoyearprevgrade);
	}
	
	@JsonIgnore
	public String getThreeyearprevgradecolor() {
		return gradeColor(threeyearprevgrade);
	}
	
	@JsonIgnore
	public String getPrevyear_staypatterngradecolor() {
		return gradeColor(prevyear_staypatterngrade);
	}
	
	@JsonIgnore
	public String getElite_rewards_mbr_gradecolor() {
		return gradeColor(elite_rewards_mbr_grade);
	}
	
	@JsonIgnore
	public String getAgency_compliance_gradecolor() {
		return gradeColor(agency_compliance_grade);
	}
	
	@JsonIgnore
	public String getSquatter_book_gradecolor() {
		return gradeColor(squatter_book_grade);
	}

	private String gradeColor(Long grade) {
		String color = null;
		if (grade != null && grade > 0) {
			if (grade == 1) {
				color = "lime";
			} else if (grade == 2) {
				color = "yellow";
			} else if (grade == 3) {
				color = "orange";
			} else if (grade == 4) {
				color = "red";
			}
		}
		return color;
	}
	
	@JsonIgnore
	public Long getAccountrecid() {
		return accountrecid;
	}

	public void setAccountrecid(Long accountrecid) {
		this.accountrecid = accountrecid;
	}
	

	public String getAccountstatus() {
		return accountstatus;
	}

	public void setAccountstatus(String accountstatus) {
		this.accountstatus = accountstatus;
	}
	
	@JsonIgnore
	public String getScpt_typename() {
		return scpt_typename;
	}

	public void setScpt_typename(String scpt_typename) {
		this.scpt_typename = scpt_typename;
	}

	private String percentString(Double pctvalue) {
		String retvalue = "";
		if (pctvalue != null) {
			retvalue = pctvalue.toString() + "%";
		}
		return retvalue;

	}
	
	@JsonIgnore
	public Double getTotal_multiplier() {
		return total_multiplier;
	}

	public void setTotal_multiplier(Double total_multiplier) {
		this.total_multiplier = total_multiplier;
	}
	
	@JsonIgnore
	public Double getAnticipate_inc_retail_pct() {
		return anticipate_inc_retail_pct;
	}

	public void setAnticipate_inc_retail_pct(Double anticipate_inc_retail_pct) {
		this.anticipate_inc_retail_pct = anticipate_inc_retail_pct;
	}	
	
	@JsonIgnore	
	public Double getPrevyear_retailadr() {
		return prevyear_retailadr;
	}

	public void setPrevyear_retailadr(Double prevyear_retailadr) {
		this.prevyear_retailadr = prevyear_retailadr;
	}
	
	@JsonIgnore
	public String getChg() {
		return chg;
	}

	public void setChg(String chg) {
		this.chg = chg;
	}
	
	@JsonIgnore
	public Long getFy_fcst_vol() {
		return fy_fcst_vol;
	}

	public void setFy_fcst_vol(Long fy_fcst_vol) {
		this.fy_fcst_vol = fy_fcst_vol;
	}

	public void setRetail_adr(Double retail_adr) {
		this.retail_adr = retail_adr;
	}
	
	@JsonIgnore
	public Double getRetail_adr() {
		return retail_adr;
	}

}


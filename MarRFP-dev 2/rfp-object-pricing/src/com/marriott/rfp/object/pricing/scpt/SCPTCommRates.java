package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;


public class SCPTCommRates implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long scpt_accountid;
	private Long tiernumber;
	private String tiername;
	private Long roomtypeid;
	private String roomtypename;
	
	private Long scpt_commratesid1;
	private Double prevyear_fcst_rns1;
	private Double fcst_rns1;
	private Double pct_annual_rn1;
	private Double prevyear_rate_gross1;	
	private Double open_rate_gross1;
	private Double target_rate_gross1;
	private Double floor_rate_gross1;
	private Double prev_year_marrfp_rate1;	
	private Double pct_antc_gross_chg1;
	
	private Long scpt_commratesid2;
	private Double prevyear_fcst_rns2;
	private Double fcst_rns2;
	private Double pct_annual_rn2;
	private Double prevyear_rate_gross2;	
	private Double open_rate_gross2;
	private Double target_rate_gross2;
	private Double floor_rate_gross2;
	private Double prev_year_marrfp_rate2;
	private Double pct_antc_gross_chg2;
	
	private Long scpt_commratesid3;
	private Double prevyear_fcst_rns3;
	private Double fcst_rns3;
	private Double pct_annual_rn3;
	private Double prevyear_rate_gross3;	
	private Double open_rate_gross3;
	private Double target_rate_gross3;
	private Double floor_rate_gross3;
	private Double prev_year_marrfp_rate3;
	private Double pct_antc_gross_chg3;
	
	private Long scpt_commratesid4;
	private Double prevyear_fcst_rns4;
	private Double fcst_rns4;
	private Double pct_annual_rn4;
	private Double prevyear_rate_gross4;	
	private Double open_rate_gross4;
	private Double target_rate_gross4;
	private Double floor_rate_gross4;
	private Double prev_year_marrfp_rate4;
	private Double pct_antc_gross_chg4;
	
	private Long scpt_commratesid5;
	private Double prevyear_fcst_rns5;
	private Double fcst_rns5;
	private Double pct_annual_rn5;
	private Double prevyear_rate_gross5;	
	private Double open_rate_gross5;
	private Double target_rate_gross5;
	private Double floor_rate_gross5;
	private Double prev_year_marrfp_rate5;
	private Double pct_antc_gross_chg5;
	
	
	private Double prevyear_war;
	private Double curryear_war;
	
	private Double prevyear_weightedrate;	
	private Double weightedrate;
	private Double weightedrate_chg;
	private Double prev_weightedratenet;
	private Double weightedratenet;
	private Double weightedratenet_chg;
	private Double rcmd_min_rate_net;
	private Double rcmd_max_rate_net;
	private Double total_multiplier;
	private Double pct_antc_rcmd_min;
	private Double pct_accrate_weighted_retail;
	private Double pct_antc_weighted_retail;
	
	private Double pct_prevrate_rcmd_max;
	private Long scpt_breaktypeid;
	private String breakfastname;
	private Long scpt_internettypeid;
	private String internetname;
	private String translocaloffice;
	private String parking;
	private Double pctroomcosts;
	private Double pctfbcosts;
	private Double fixedcosts;
	private String otheramenities;
	private String donotprice;
	private String status;
	private String lra;	
	private String roompoolstatus;
	
	public Long getScpt_accountid() {
		return scpt_accountid;
	}
	public void setScpt_accountid(Long scpt_accountid) {
		this.scpt_accountid = scpt_accountid;
	}
	public Long getTiernumber() {
		return tiernumber;
	}
	public void setTiernumber(Long tiernumber) {
		this.tiernumber = tiernumber;
	}
	public String getTiername() {
		return tiername;
	}
	public void setTiername(String tiername) {
		this.tiername = tiername;
	}
	public Long getRoomtypeid() {
		return roomtypeid;
	}
	public void setRoomtypeid(Long roomtypeid) {
		this.roomtypeid = roomtypeid;
	}
	public String getRoomtypename() {
		return roomtypename;
	}
	public void setRoomtypename(String roomtypename) {
		this.roomtypename = roomtypename;
	}
	public Long getScpt_commratesid1() {
		return scpt_commratesid1;
	}
	public void setScpt_commratesid1(Long scpt_commratesid1) {
		this.scpt_commratesid1 = scpt_commratesid1;
	}
	public Double getPrevyear_fcst_rns1() {
		return prevyear_fcst_rns1;
	}
	public void setPrevyear_fcst_rns1(Double prevyear_fcst_rns1) {
		this.prevyear_fcst_rns1 = prevyear_fcst_rns1;
	}
	public Double getFcst_rns1() {
		return fcst_rns1;
	}
	public void setFcst_rns1(Double fcst_rns1) {
		this.fcst_rns1 = fcst_rns1;
	}
	public Double getPct_annual_rn1() {
		return pct_annual_rn1;
	}
	public void setPct_annual_rn1(Double pct_annual_rn1) {
		this.pct_annual_rn1 = pct_annual_rn1;
	}
	public Double getPrevyear_rate_gross1() {
		return prevyear_rate_gross1;
	}
	public void setPrevyear_rate_gross1(Double prevyear_rate_gross1) {
		this.prevyear_rate_gross1 = prevyear_rate_gross1;
	}
	public Double getOpen_rate_gross1() {
		return open_rate_gross1;
	}
	public void setOpen_rate_gross1(Double open_rate_gross1) {
		this.open_rate_gross1 = open_rate_gross1;
	}
	public Double getTarget_rate_gross1() {
		return target_rate_gross1;
	}
	public void setTarget_rate_gross1(Double target_rate_gross1) {
		this.target_rate_gross1 = target_rate_gross1;
	}
	public Double getFloor_rate_gross1() {
		return floor_rate_gross1;
	}
	public void setFloor_rate_gross1(Double floor_rate_gross1) {
		this.floor_rate_gross1 = floor_rate_gross1;
	}
	public Double getPrev_year_marrfp_rate1() {
		return prev_year_marrfp_rate1;
	}
	public void setPrev_year_marrfp_rate1(Double prev_year_marrfp_rate1) {
		this.prev_year_marrfp_rate1 = prev_year_marrfp_rate1;
	}
	public Double getPct_antc_gross_chg1() {
		return pct_antc_gross_chg1;
	}
	public void setPct_antc_gross_chg1(Double pct_antc_gross_chg1) {
		this.pct_antc_gross_chg1 = pct_antc_gross_chg1;
	}
	public Long getScpt_commratesid2() {
		return scpt_commratesid2;
	}
	public void setScpt_commratesid2(Long scpt_commratesid2) {
		this.scpt_commratesid2 = scpt_commratesid2;
	}
	public Double getPrevyear_fcst_rns2() {
		return prevyear_fcst_rns2;
	}
	public void setPrevyear_fcst_rns2(Double prevyear_fcst_rns2) {
		this.prevyear_fcst_rns2 = prevyear_fcst_rns2;
	}
	public Double getFcst_rns2() {
		return fcst_rns2;
	}
	public void setFcst_rns2(Double fcst_rns2) {
		this.fcst_rns2 = fcst_rns2;
	}
	public Double getPct_annual_rn2() {
		return pct_annual_rn2;
	}
	public void setPct_annual_rn2(Double pct_annual_rn2) {
		this.pct_annual_rn2 = pct_annual_rn2;
	}
	public Double getPrevyear_rate_gross2() {
		return prevyear_rate_gross2;
	}
	public void setPrevyear_rate_gross2(Double prevyear_rate_gross2) {
		this.prevyear_rate_gross2 = prevyear_rate_gross2;
	}
	public Double getOpen_rate_gross2() {
		return open_rate_gross2;
	}
	public void setOpen_rate_gross2(Double open_rate_gross2) {
		this.open_rate_gross2 = open_rate_gross2;
	}
	public Double getTarget_rate_gross2() {
		return target_rate_gross2;
	}
	public void setTarget_rate_gross2(Double target_rate_gross2) {
		this.target_rate_gross2 = target_rate_gross2;
	}
	public Double getFloor_rate_gross2() {
		return floor_rate_gross2;
	}
	public void setFloor_rate_gross2(Double floor_rate_gross2) {
		this.floor_rate_gross2 = floor_rate_gross2;
	}
	public Double getPrev_year_marrfp_rate2() {
		return prev_year_marrfp_rate2;
	}
	public void setPrev_year_marrfp_rate2(Double prev_year_marrfp_rate2) {
		this.prev_year_marrfp_rate2 = prev_year_marrfp_rate2;
	}
	public Double getPct_antc_gross_chg2() {
		return pct_antc_gross_chg2;
	}
	public void setPct_antc_gross_chg2(Double pct_antc_gross_chg2) {
		this.pct_antc_gross_chg2 = pct_antc_gross_chg2;
	}
	public Long getScpt_commratesid3() {
		return scpt_commratesid3;
	}
	public void setScpt_commratesid3(Long scpt_commratesid3) {
		this.scpt_commratesid3 = scpt_commratesid3;
	}
	public Double getPrevyear_fcst_rns3() {
		return prevyear_fcst_rns3;
	}
	public void setPrevyear_fcst_rns3(Double prevyear_fcst_rns3) {
		this.prevyear_fcst_rns3 = prevyear_fcst_rns3;
	}
	public Double getFcst_rns3() {
		return fcst_rns3;
	}
	public void setFcst_rns3(Double fcst_rns3) {
		this.fcst_rns3 = fcst_rns3;
	}
	public Double getPct_annual_rn3() {
		return pct_annual_rn3;
	}
	public void setPct_annual_rn3(Double pct_annual_rn3) {
		this.pct_annual_rn3 = pct_annual_rn3;
	}
	public Double getPrevyear_rate_gross3() {
		return prevyear_rate_gross3;
	}
	public void setPrevyear_rate_gross3(Double prevyear_rate_gross3) {
		this.prevyear_rate_gross3 = prevyear_rate_gross3;
	}
	public Double getOpen_rate_gross3() {
		return open_rate_gross3;
	}
	public void setOpen_rate_gross3(Double open_rate_gross3) {
		this.open_rate_gross3 = open_rate_gross3;
	}
	public Double getTarget_rate_gross3() {
		return target_rate_gross3;
	}
	public void setTarget_rate_gross3(Double target_rate_gross3) {
		this.target_rate_gross3 = target_rate_gross3;
	}
	public Double getFloor_rate_gross3() {
		return floor_rate_gross3;
	}
	public void setFloor_rate_gross3(Double floor_rate_gross3) {
		this.floor_rate_gross3 = floor_rate_gross3;
	}
	public Double getPrev_year_marrfp_rate3() {
		return prev_year_marrfp_rate3;
	}
	public void setPrev_year_marrfp_rate3(Double prev_year_marrfp_rate3) {
		this.prev_year_marrfp_rate3 = prev_year_marrfp_rate3;
	}
	public Double getPct_antc_gross_chg3() {
		return pct_antc_gross_chg3;
	}
	public void setPct_antc_gross_chg3(Double pct_antc_gross_chg3) {
		this.pct_antc_gross_chg3 = pct_antc_gross_chg3;
	}
	public Long getScpt_commratesid4() {
		return scpt_commratesid4;
	}
	public void setScpt_commratesid4(Long scpt_commratesid4) {
		this.scpt_commratesid4 = scpt_commratesid4;
	}
	public Double getPrevyear_fcst_rns4() {
		return prevyear_fcst_rns4;
	}
	public void setPrevyear_fcst_rns4(Double prevyear_fcst_rns4) {
		this.prevyear_fcst_rns4 = prevyear_fcst_rns4;
	}
	public Double getFcst_rns4() {
		return fcst_rns4;
	}
	public void setFcst_rns4(Double fcst_rns4) {
		this.fcst_rns4 = fcst_rns4;
	}
	public Double getPct_annual_rn4() {
		return pct_annual_rn4;
	}
	public void setPct_annual_rn4(Double pct_annual_rn4) {
		this.pct_annual_rn4 = pct_annual_rn4;
	}
	public Double getPrevyear_rate_gross4() {
		return prevyear_rate_gross4;
	}
	public void setPrevyear_rate_gross4(Double prevyear_rate_gross4) {
		this.prevyear_rate_gross4 = prevyear_rate_gross4;
	}
	public Double getOpen_rate_gross4() {
		return open_rate_gross4;
	}
	public void setOpen_rate_gross4(Double open_rate_gross4) {
		this.open_rate_gross4 = open_rate_gross4;
	}
	public Double getTarget_rate_gross4() {
		return target_rate_gross4;
	}
	public void setTarget_rate_gross4(Double target_rate_gross4) {
		this.target_rate_gross4 = target_rate_gross4;
	}
	public Double getFloor_rate_gross4() {
		return floor_rate_gross4;
	}
	public void setFloor_rate_gross4(Double floor_rate_gross4) {
		this.floor_rate_gross4 = floor_rate_gross4;
	}
	public Double getPrev_year_marrfp_rate4() {
		return prev_year_marrfp_rate4;
	}
	public void setPrev_year_marrfp_rate4(Double prev_year_marrfp_rate4) {
		this.prev_year_marrfp_rate4 = prev_year_marrfp_rate4;
	}
	public Double getPct_antc_gross_chg4() {
		return pct_antc_gross_chg4;
	}
	public void setPct_antc_gross_chg4(Double pct_antc_gross_chg4) {
		this.pct_antc_gross_chg4 = pct_antc_gross_chg4;
	}
	public Double getPrevyear_war() {
		return prevyear_war;
	}
	public void setPrevyear_war(Double prevyear_war) {
		this.prevyear_war = prevyear_war;
	}
	public Double getPrevyear_weightedrate() {
		return prevyear_weightedrate;
	}
	public void setPrevyear_weightedrate(Double prevyear_weightedrate) {
		this.prevyear_weightedrate = prevyear_weightedrate;
	}
	public Double getWeightedrate() {
		return weightedrate;
	}
	public void setWeightedrate(Double weightedrate) {
		this.weightedrate = weightedrate;
	}
	public Double getWeightedrate_chg() {
		return weightedrate_chg;
	}
	
	public void setWeightedrate_chg(Double weightedrate_chg) {
		this.weightedrate_chg = weightedrate_chg;
	}
	public Double getPrev_weightedratenet() {
		return prev_weightedratenet;
	}
	public void setPrev_weightedratenet(Double prev_weightedratenet) {
		this.prev_weightedratenet = prev_weightedratenet;
	}
	public Double getWeightedratenet() {
		return weightedratenet;
	}
	public void setWeightedratenet(Double weightedratenet) {
		this.weightedratenet = weightedratenet;
	}
	public Double getWeightedratenet_chg() {
		return weightedratenet_chg;
	}
	public void setWeightedratenet_chg(Double weightedratenet_chg) {
		this.weightedratenet_chg = weightedratenet_chg;
	}
	public Double getRcmd_min_rate_net() {
		return rcmd_min_rate_net;
	}
	public void setRcmd_min_rate_net(Double rcmd_min_rate_net) {
		this.rcmd_min_rate_net = rcmd_min_rate_net;
	}
	public Double getRcmd_max_rate_net() {
		return rcmd_max_rate_net;
	}
	public void setRcmd_max_rate_net(Double rcmd_max_rate_net) {
		this.rcmd_max_rate_net = rcmd_max_rate_net;
	}
	public Double getPct_antc_rcmd_min() {
		return pct_antc_rcmd_min;
	}
	public void setPct_antc_rcmd_min(Double pct_antc_rcmd_min) {
		this.pct_antc_rcmd_min = pct_antc_rcmd_min;
	}
	public Double getPct_accrate_weighted_retail() {
		return pct_accrate_weighted_retail;
	}
	public void setPct_accrate_weighted_retail(Double pct_accrate_weighted_retail) {
		this.pct_accrate_weighted_retail = pct_accrate_weighted_retail;
	}
	public Double getPct_antc_weighted_retail() {
		return pct_antc_weighted_retail;
	}

	public void setPct_antc_weighted_retail(Double pct_antc_weighted_retail) {
		this.pct_antc_weighted_retail = pct_antc_weighted_retail;
	}
	public Long getScpt_breaktypeid() {
		return scpt_breaktypeid;
	}
	public void setScpt_breaktypeid(Long scpt_breaktypeid) {
		this.scpt_breaktypeid = scpt_breaktypeid;
	}
	public String getBreakfastname() {
		return breakfastname;
	}
	public void setBreakfastname(String breakfastname) {
		this.breakfastname = breakfastname;
	}
	public Long getScpt_internettypeid() {
		return scpt_internettypeid;
	}
	public void setScpt_internettypeid(Long scpt_internettypeid) {
		this.scpt_internettypeid = scpt_internettypeid;
	}
	public String getInternetname() {
		return internetname;
	}
	public void setInternetname(String internetname) {
		this.internetname = internetname;
	}
	public String getTranslocaloffice() {
		return translocaloffice;
	}
	public void setTranslocaloffice(String translocaloffice) {
		this.translocaloffice = translocaloffice;
	}
	public String getParking() {
		return parking;
	}
	public void setParking(String parking) {
		this.parking = parking;
	}
	public Double getPctroomcosts() {
		return pctroomcosts;
	}
	public void setPctroomcosts(Double pctroomcosts) {
		this.pctroomcosts = pctroomcosts;
	}
	public Double getPctfbcosts() {
		return pctfbcosts;
	}
	public void setPctfbcosts(Double pctfbcosts) {
		this.pctfbcosts = pctfbcosts;
	}
	public Double getFixedcosts() {
		return fixedcosts;
	}
	public void setFixedcosts(Double fixedcosts) {
		this.fixedcosts = fixedcosts;
	}
	public String getOtheramenities() {
		return otheramenities;
	}
	public void setOtheramenities(String otheramenities) {
		this.otheramenities = otheramenities;
	}
	public String getDonotprice() {
		return donotprice;
	}
	public void setDonotprice(String donotprice) {
		this.donotprice = donotprice;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getLra() {
		return lra;
	}
	public void setLra(String lra) {
		this.lra = lra;
	}
	
	
	
	public String getRoompoolstatus() {
		return roompoolstatus;
	}

	public void setRoompoolstatus(String roompoolstatus) {
		this.roompoolstatus = roompoolstatus;
	}

	public void setTotal_multiplier(Double total_multiplier) {
		this.total_multiplier = total_multiplier;
	}
	
	public Double getTotal_multiplier() {
		return total_multiplier;
	}
	
	public void setPct_prevrate_rcmd_max(Double pct_prevrate_rcmd_max) {
		this.pct_prevrate_rcmd_max = pct_prevrate_rcmd_max;
	}
	public Double getPct_prevrate_rcmd_max() {
		return pct_prevrate_rcmd_max;
	}

		
	public Double getCurryear_war() {
		return curryear_war;
	}
	public void setCurryear_war(Double curryear_war) {
		this.curryear_war = curryear_war;
	}
	public Long getScpt_commratesid5() {
		return scpt_commratesid5;
	}
	public void setScpt_commratesid5(Long scpt_commratesid5) {
		this.scpt_commratesid5 = scpt_commratesid5;
	}
	public Double getPrevyear_fcst_rns5() {
		return prevyear_fcst_rns5;
	}
	public void setPrevyear_fcst_rns5(Double prevyear_fcst_rns5) {
		this.prevyear_fcst_rns5 = prevyear_fcst_rns5;
	}
	public Double getFcst_rns5() {
		return fcst_rns5;
	}
	public void setFcst_rns5(Double fcst_rns5) {
		this.fcst_rns5 = fcst_rns5;
	}
	public Double getPct_annual_rn5() {
		return pct_annual_rn5;
	}
	public void setPct_annual_rn5(Double pct_annual_rn5) {
		this.pct_annual_rn5 = pct_annual_rn5;
	}
	public Double getPrevyear_rate_gross5() {
		return prevyear_rate_gross5;
	}
	public void setPrevyear_rate_gross5(Double prevyear_rate_gross5) {
		this.prevyear_rate_gross5 = prevyear_rate_gross5;
	}
	public Double getOpen_rate_gross5() {
		return open_rate_gross5;
	}
	public void setOpen_rate_gross5(Double open_rate_gross5) {
		this.open_rate_gross5 = open_rate_gross5;
	}
	public Double getTarget_rate_gross5() {
		return target_rate_gross5;
	}
	public void setTarget_rate_gross5(Double target_rate_gross5) {
		this.target_rate_gross5 = target_rate_gross5;
	}
	public Double getFloor_rate_gross5() {
		return floor_rate_gross5;
	}
	public void setFloor_rate_gross5(Double floor_rate_gross5) {
		this.floor_rate_gross5 = floor_rate_gross5;
	}
	public Double getPrev_year_marrfp_rate5() {
		return prev_year_marrfp_rate5;
	}
	public void setPrev_year_marrfp_rate5(Double prev_year_marrfp_rate5) {
		this.prev_year_marrfp_rate5 = prev_year_marrfp_rate5;
	}
	public Double getPct_antc_gross_chg5() {
		return pct_antc_gross_chg5;
	}
	public void setPct_antc_gross_chg5(Double pct_antc_gross_chg5) {
		this.pct_antc_gross_chg5 = pct_antc_gross_chg5;
	}
	
	
	
}

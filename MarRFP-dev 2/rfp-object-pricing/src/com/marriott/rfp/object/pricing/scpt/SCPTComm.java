package com.marriott.rfp.object.pricing.scpt;

import java.io.Serializable;
import java.util.List;
import org.apache.commons.lang.WordUtils;

import com.marriott.rfp.object.pricing.hotelrfp.Season;

import java.text.DecimalFormat;


public class SCPTComm implements Serializable {
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
	private Long accountrecid;
	private String accountstatus;
	private String salesperson;
	private String duedate;
	private Double est_acct_rate_net;
	private Long prevyear_fy_fcst;
	private Long fy_fcst;
	private String show_yoy_comp;
	private Double yoy_retail_change;
	private Double chg_rn_from_ty_pct;
	private Double prevyear_fy_fcst_rate_net;
	private Double ant_acct_rate_chg_ty;
	private List<SCPTCommRates> commRates;
	private List<SCPTDetail> scptdetail;
	private List<Season> seasonList;
	private SCPTCommSetupInfo scptCommSetupInfo;
	private String comments;
	private String groupid;
	
	public Long getScpt_accountid() {
		return scpt_accountid;
	}

	public void setScpt_accountid(Long scpt_accountid) {
		this.scpt_accountid = scpt_accountid;
	}

	public Long getScpt_detailid() {
		return scpt_detailid;
	}

	public void setScpt_detailid(Long scpt_detailid) {
		this.scpt_detailid = scpt_detailid;
	}

	public String getAccountname() {
		return accountname;
	}

	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}

	public String getAccountsegment() {
		return accountsegment;
	}

	public void setAccountsegment(String accountsegment) {
		this.accountsegment = accountsegment;
	}

	public Long getHotelid() {
		return hotelid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}

	public Long getPeriod() {
		return period;
	}

	public void setPeriod(Long period) {
		this.period = period;
	}

	public Long getAccountid() {
		return accountid;
	}

	public void setAccountid(Long accountid) {
		this.accountid = accountid;
	}

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

	public String getSalesperson() {
		return salesperson;
	}

	public void setSalesperson(String salesperson) {
		this.salesperson = salesperson;
	}
	public String getFormattedSalesperson()
	{
		return WordUtils.capitalizeFully(salesperson);

	}
	public String getDuedate() {
		return duedate;
	}

	public void setDuedate(String duedate) {
		this.duedate = duedate;
	}

	public Double getEst_acct_rate_net() {
		return est_acct_rate_net;
	}

	public void setEst_acct_rate_net(Double est_acct_rate_net) {
		this.est_acct_rate_net = est_acct_rate_net;
	}

	public Long getPrevyear_fy_fcst() {
		return prevyear_fy_fcst;
	}

	public void setPrevyear_fy_fcst(Long prevyear_fy_fcst) {
		this.prevyear_fy_fcst = prevyear_fy_fcst;
	}

	public Long getFy_fcst() {
		return fy_fcst;
	}

	public void setFy_fcst(Long fy_fcst) {
		this.fy_fcst = fy_fcst;
	}

	public Double getChg_rn_from_ty_pct() {
		return chg_rn_from_ty_pct;
	}

	public String getChg_rn_from_ty_pctstr() {
		return percentString(chg_rn_from_ty_pct);
	}

	public void setChg_rn_from_ty_pct(Double chg_rn_from_ty_pct) {
		this.chg_rn_from_ty_pct = chg_rn_from_ty_pct;
	}

	public Double getPrevyear_fy_fcst_rate_net() {
		return prevyear_fy_fcst_rate_net;
	}

	public void setPrevyear_fy_fcst_rate_net(Double prevyear_fy_fcst_rate_net) {
		this.prevyear_fy_fcst_rate_net = prevyear_fy_fcst_rate_net;
	}

	private String percentString(Double pctvalue) {
		String retvalue = "";
		if (pctvalue != null) {
			retvalue = pctvalue.toString() + "%";
		}
		return retvalue;

	}

	public Double getAnt_acct_rate_chg_ty() {
		return ant_acct_rate_chg_ty;
	}

	public String getAnt_acct_rate_chg_tystr() {
		return percentString(ant_acct_rate_chg_ty);
	}

	public void setAnt_acct_rate_chg_ty(Double ant_acct_rate_chg_ty) {
		this.ant_acct_rate_chg_ty = ant_acct_rate_chg_ty;
	}

	public List<SCPTCommRates> getCommRates() {
		return commRates;
	}

	public void setCommRates(List<SCPTCommRates> commRates) {
		this.commRates = commRates;
	}

	public String getTotalRNPctChg() {
		Double total = (double) 0;
		String totalStr=null;
		DecimalFormat df = new DecimalFormat("###.##");
		if (commRates != null) {
			for (SCPTCommRates cm : commRates) {
				if (cm != null && cm.getRoomtypeid() != 5) {
					if (cm.getPct_annual_rn1() != null)
						total += cm.getPct_annual_rn1();
					if (cm.getPct_annual_rn2() != null)
						total += cm.getPct_annual_rn2();
					if (cm.getPct_annual_rn3() != null)
						total += cm.getPct_annual_rn3();
					if (cm.getPct_annual_rn4() != null)
						total += cm.getPct_annual_rn4();
				}
			}
		}
		totalStr=df.format(total);
		return totalStr;
	}

	public List<SCPTDetail> getScptdetail() {
		return scptdetail;
	}

	public void setScptdetail(List<SCPTDetail> scptdetail) {
		this.scptdetail = scptdetail;
	}

	public List<Season> getSeasonList() {
		return seasonList;
	}

	public void setSeasonList(List<Season> seasonList) {
		this.seasonList = seasonList;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public SCPTCommSetupInfo getScptCommSetupInfo() {
		return scptCommSetupInfo;
	}

	public void setScptCommSetupInfo(SCPTCommSetupInfo scptCommSetupInfo) {
		this.scptCommSetupInfo = scptCommSetupInfo;
	}

	public String getShow_yoy_comp() {
		return show_yoy_comp;
	}

	public void setShow_yoy_comp(String show_yoy_comp) {
		this.show_yoy_comp = show_yoy_comp;
	}

	public Double getYoy_retail_change() {
		return yoy_retail_change;
	}

	public void setYoy_retail_change(Double yoy_retail_change) {
		this.yoy_retail_change = yoy_retail_change;
	}

	public String getGroupid() {
		return groupid;
	}

	public void setGroupid(String groupid) {
		this.groupid = groupid;
	}


		

}

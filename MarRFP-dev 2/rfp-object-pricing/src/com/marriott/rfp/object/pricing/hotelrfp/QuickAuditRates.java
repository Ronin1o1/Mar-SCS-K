package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class QuickAuditRates implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long seasonid;
	private Date startdate;
	private Date enddate;
	private Long lengthofstayid;
	private Long roomnightsfrom;
	private Long roomnightsto;
	private Double lra_single_rp1;
	private Double lra_double_rp1;
	private Double lra_single_rp2;
	private Double lra_double_rp2;
	private Double lra_single_rp3;
	private Double lra_double_rp3;
	private Double lra_ext_rp1;
	private Double lra_ext_rp2;
	private Double lra_ext_rp3;
	private Double nlra_single_rp1;
	private Double nlra_double_rp1;
	private Double nlra_single_rp2;
	private Double nlra_double_rp2;
	private Double nlra_single_rp3;
	private Double nlra_double_rp3;
	private Double nlra_ext_rp1;
	private Double nlra_ext_rp2;
	private Double nlra_ext_rp3;
	private Double fixed_single_rp1;
	private Double fixed_double_rp1;
	private Double fixed_single_rp2;
	private Double fixed_double_rp2;
	private Double fixed_single_rp3;
	private Double fixed_double_rp3;
	private Double fixed_ext_rp1;
	private Double fixed_ext_rp2;
	private Double fixed_ext_rp3;
	private String startdatediff;
	private String enddatediff;
	private String roomnightsfromdiff;
	private String roomnightstodiff;
	private String lra_single_rp1_diff;
	private String lra_double_rp1_diff;
	private String lra_single_rp2_diff;
	private String lra_double_rp2_diff;
	private String lra_single_rp3_diff;
	private String lra_double_rp3_diff;
	private String lra_ext_rp1_diff;
	private String lra_ext_rp2_diff;
	private String lra_ext_rp3_diff;
	private String nlra_single_rp1_diff;
	private String nlra_double_rp1_diff;
	private String nlra_single_rp2_diff;
	private String nlra_double_rp2_diff;
	private String nlra_single_rp3_diff;
	private String nlra_double_rp3_diff;
	private String nlra_ext_rp1_diff;
	private String nlra_ext_rp2_diff;
	private String nlra_ext_rp3_diff;
	private String fixed_single_rp1_diff;
	private String fixed_double_rp1_diff;
	private String fixed_single_rp2_diff;
	private String fixed_double_rp2_diff;
	private String fixed_single_rp3_diff;
	private String fixed_double_rp3_diff;
	private String fixed_ext_rp1_diff;
	private String fixed_ext_rp2_diff;
	private String fixed_ext_rp3_diff;

	public Long getSeasonid() {
		return seasonid;
	}

	public void setSeasonid(Long seasonid) {
		this.seasonid = seasonid;
	}

	public Date getStartdate() {
		return startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public Date getEnddate() {
		return enddate;
	}

	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}

	public String getSeasonstart() {
		return DateUtility.formatLongDate(startdate);
	}

	public String getSeasonend() {
		return DateUtility.formatLongDate(enddate);
	}

	public Long getLengthofstayid() {
		return lengthofstayid;
	}

	public void setLengthofstayid(Long lengthofstayid) {
		this.lengthofstayid = lengthofstayid;
	}

	public Long getRoomnightsfrom() {
		return roomnightsfrom;
	}

	public void setRoomnightsfrom(Long roomnightsfrom) {
		this.roomnightsfrom = roomnightsfrom;
	}

	public Long getRoomnightsto() {
		return roomnightsto;
	}

	public void setRoomnightsto(Long roomnightsto) {
		this.roomnightsto = roomnightsto;
	}

	public String getStartdatediff() {
		return startdatediff;
	}

	public void setStartdatediff(String startdatediff) {
		this.startdatediff = startdatediff;
	}

	public String getEnddatediff() {
		return enddatediff;
	}

	public void setEnddatediff(String enddatediff) {
		this.enddatediff = enddatediff;
	}

	public String getRoomnightsfromdiff() {
		return roomnightsfromdiff;
	}

	public void setRoomnightsfromdiff(String roomnightsfromdiff) {
		this.roomnightsfromdiff = roomnightsfromdiff;
	}

	public String getRoomnightstodiff() {
		return roomnightstodiff;
	}

	public void setRoomnightstodiff(String roomnightstodiff) {
		this.roomnightstodiff = roomnightstodiff;
	}

	public Double getLra_single_rp1() {
		return lra_single_rp1;
	}

	public void setLra_single_rp1(Double lra_single_rp1) {
		this.lra_single_rp1 = lra_single_rp1;
	}

	public Double getLra_double_rp1() {
		return lra_double_rp1;
	}

	public void setLra_double_rp1(Double lra_double_rp1) {
		this.lra_double_rp1 = lra_double_rp1;
	}

	public Double getLra_single_rp2() {
		return lra_single_rp2;
	}

	public void setLra_single_rp2(Double lra_single_rp2) {
		this.lra_single_rp2 = lra_single_rp2;
	}

	public Double getLra_double_rp2() {
		return lra_double_rp2;
	}

	public void setLra_double_rp2(Double lra_double_rp2) {
		this.lra_double_rp2 = lra_double_rp2;
	}

	public Double getLra_single_rp3() {
		return lra_single_rp3;
	}

	public void setLra_single_rp3(Double lra_single_rp3) {
		this.lra_single_rp3 = lra_single_rp3;
	}

	public Double getLra_double_rp3() {
		return lra_double_rp3;
	}

	public void setLra_double_rp3(Double lra_double_rp3) {
		this.lra_double_rp3 = lra_double_rp3;
	}

	public Double getLra_ext_rp1() {
		return lra_ext_rp1;
	}

	public void setLra_ext_rp1(Double lra_ext_rp1) {
		this.lra_ext_rp1 = lra_ext_rp1;
	}

	public Double getLra_ext_rp2() {
		return lra_ext_rp2;
	}

	public void setLra_ext_rp2(Double lra_ext_rp2) {
		this.lra_ext_rp2 = lra_ext_rp2;
	}

	public Double getLra_ext_rp3() {
		return lra_ext_rp3;
	}

	public void setLra_ext_rp3(Double lra_ext_rp3) {
		this.lra_ext_rp3 = lra_ext_rp3;
	}

	public Double getNlra_single_rp1() {
		return nlra_single_rp1;
	}

	public void setNlra_single_rp1(Double nlra_single_rp1) {
		this.nlra_single_rp1 = nlra_single_rp1;
	}

	public Double getNlra_double_rp1() {
		return nlra_double_rp1;
	}

	public void setNlra_double_rp1(Double nlra_double_rp1) {
		this.nlra_double_rp1 = nlra_double_rp1;
	}

	public Double getNlra_single_rp2() {
		return nlra_single_rp2;
	}

	public void setNlra_single_rp2(Double nlra_single_rp2) {
		this.nlra_single_rp2 = nlra_single_rp2;
	}

	public Double getNlra_double_rp2() {
		return nlra_double_rp2;
	}

	public void setNlra_double_rp2(Double nlra_double_rp2) {
		this.nlra_double_rp2 = nlra_double_rp2;
	}

	public Double getNlra_single_rp3() {
		return nlra_single_rp3;
	}

	public void setNlra_single_rp3(Double nlra_single_rp3) {
		this.nlra_single_rp3 = nlra_single_rp3;
	}

	public Double getNlra_double_rp3() {
		return nlra_double_rp3;
	}

	public void setNlra_double_rp3(Double nlra_double_rp3) {
		this.nlra_double_rp3 = nlra_double_rp3;
	}

	public Double getNlra_ext_rp1() {
		return nlra_ext_rp1;
	}

	public void setNlra_ext_rp1(Double nlra_ext_rp1) {
		this.nlra_ext_rp1 = nlra_ext_rp1;
	}

	public Double getNlra_ext_rp2() {
		return nlra_ext_rp2;
	}

	public void setNlra_ext_rp2(Double nlra_ext_rp2) {
		this.nlra_ext_rp2 = nlra_ext_rp2;
	}

	public Double getNlra_ext_rp3() {
		return nlra_ext_rp3;
	}

	public void setNlra_ext_rp3(Double nlra_ext_rp3) {
		this.nlra_ext_rp3 = nlra_ext_rp3;
	}

	public Double getFixed_single_rp1() {
		return fixed_single_rp1;
	}

	public void setFixed_single_rp1(Double fixed_single_rp1) {
		this.fixed_single_rp1 = fixed_single_rp1;
	}

	public Double getFixed_double_rp1() {
		return fixed_double_rp1;
	}

	public void setFixed_double_rp1(Double fixed_double_rp1) {
		this.fixed_double_rp1 = fixed_double_rp1;
	}

	public Double getFixed_single_rp2() {
		return fixed_single_rp2;
	}

	public void setFixed_single_rp2(Double fixed_single_rp2) {
		this.fixed_single_rp2 = fixed_single_rp2;
	}

	public Double getFixed_double_rp2() {
		return fixed_double_rp2;
	}

	public void setFixed_double_rp2(Double fixed_double_rp2) {
		this.fixed_double_rp2 = fixed_double_rp2;
	}

	public Double getFixed_single_rp3() {
		return fixed_single_rp3;
	}

	public void setFixed_single_rp3(Double fixed_single_rp3) {
		this.fixed_single_rp3 = fixed_single_rp3;
	}

	public Double getFixed_double_rp3() {
		return fixed_double_rp3;
	}

	public void setFixed_double_rp3(Double fixed_double_rp3) {
		this.fixed_double_rp3 = fixed_double_rp3;
	}

	public Double getFixed_ext_rp1() {
		return fixed_ext_rp1;
	}

	public void setFixed_ext_rp1(Double fixed_ext_rp1) {
		this.fixed_ext_rp1 = fixed_ext_rp1;
	}

	public Double getFixed_ext_rp2() {
		return fixed_ext_rp2;
	}

	public void setFixed_ext_rp2(Double fixed_ext_rp2) {
		this.fixed_ext_rp2 = fixed_ext_rp2;
	}

	public Double getFixed_ext_rp3() {
		return fixed_ext_rp3;
	}

	public void setFixed_ext_rp3(Double fixed_ext_rp3) {
		this.fixed_ext_rp3 = fixed_ext_rp3;
	}

	public String getLra_single_rp1_diff() {
		return lra_single_rp1_diff;
	}

	public void setLra_single_rp1_diff(String lra_single_rp1_diff) {
		this.lra_single_rp1_diff = lra_single_rp1_diff;
	}

	public String getLra_double_rp1_diff() {
		return lra_double_rp1_diff;
	}

	public void setLra_double_rp1_diff(String lra_double_rp1_diff) {
		this.lra_double_rp1_diff = lra_double_rp1_diff;
	}

	public String getLra_single_rp2_diff() {
		return lra_single_rp2_diff;
	}

	public void setLra_single_rp2_diff(String lra_single_rp2_diff) {
		this.lra_single_rp2_diff = lra_single_rp2_diff;
	}

	public String getLra_double_rp2_diff() {
		return lra_double_rp2_diff;
	}

	public void setLra_double_rp2_diff(String lra_double_rp2_diff) {
		this.lra_double_rp2_diff = lra_double_rp2_diff;
	}

	public String getLra_single_rp3_diff() {
		return lra_single_rp3_diff;
	}

	public void setLra_single_rp3_diff(String lra_single_rp3_diff) {
		this.lra_single_rp3_diff = lra_single_rp3_diff;
	}

	public String getLra_double_rp3_diff() {
		return lra_double_rp3_diff;
	}

	public void setLra_double_rp3_diff(String lra_double_rp3_diff) {
		this.lra_double_rp3_diff = lra_double_rp3_diff;
	}

	public String getLra_ext_rp1_diff() {
		return lra_ext_rp1_diff;
	}

	public void setLra_ext_rp1_diff(String lra_ext_rp1_diff) {
		this.lra_ext_rp1_diff = lra_ext_rp1_diff;
	}

	public String getLra_ext_rp2_diff() {
		return lra_ext_rp2_diff;
	}

	public void setLra_ext_rp2_diff(String lra_ext_rp2_diff) {
		this.lra_ext_rp2_diff = lra_ext_rp2_diff;
	}

	public String getLra_ext_rp3_diff() {
		return lra_ext_rp3_diff;
	}

	public void setLra_ext_rp3_diff(String lra_ext_rp3_diff) {
		this.lra_ext_rp3_diff = lra_ext_rp3_diff;
	}

	public String getNlra_single_rp1_diff() {
		return nlra_single_rp1_diff;
	}

	public void setNlra_single_rp1_diff(String nlra_single_rp1_diff) {
		this.nlra_single_rp1_diff = nlra_single_rp1_diff;
	}

	public String getNlra_double_rp1_diff() {
		return nlra_double_rp1_diff;
	}

	public void setNlra_double_rp1_diff(String nlra_double_rp1_diff) {
		this.nlra_double_rp1_diff = nlra_double_rp1_diff;
	}

	public String getNlra_single_rp2_diff() {
		return nlra_single_rp2_diff;
	}

	public void setNlra_single_rp2_diff(String nlra_single_rp2_diff) {
		this.nlra_single_rp2_diff = nlra_single_rp2_diff;
	}

	public String getNlra_double_rp2_diff() {
		return nlra_double_rp2_diff;
	}

	public void setNlra_double_rp2_diff(String nlra_double_rp2_diff) {
		this.nlra_double_rp2_diff = nlra_double_rp2_diff;
	}

	public String getNlra_single_rp3_diff() {
		return nlra_single_rp3_diff;
	}

	public void setNlra_single_rp3_diff(String nlra_single_rp3_diff) {
		this.nlra_single_rp3_diff = nlra_single_rp3_diff;
	}

	public String getNlra_double_rp3_diff() {
		return nlra_double_rp3_diff;
	}

	public void setNlra_double_rp3_diff(String nlra_double_rp3_diff) {
		this.nlra_double_rp3_diff = nlra_double_rp3_diff;
	}

	public String getNlra_ext_rp1_diff() {
		return nlra_ext_rp1_diff;
	}

	public void setNlra_ext_rp1_diff(String nlra_ext_rp1_diff) {
		this.nlra_ext_rp1_diff = nlra_ext_rp1_diff;
	}

	public String getNlra_ext_rp2_diff() {
		return nlra_ext_rp2_diff;
	}

	public void setNlra_ext_rp2_diff(String nlra_ext_rp2_diff) {
		this.nlra_ext_rp2_diff = nlra_ext_rp2_diff;
	}

	public String getNlra_ext_rp3_diff() {
		return nlra_ext_rp3_diff;
	}

	public void setNlra_ext_rp3_diff(String nlra_ext_rp3_diff) {
		this.nlra_ext_rp3_diff = nlra_ext_rp3_diff;
	}

	public String getFixed_single_rp1_diff() {
		return fixed_single_rp1_diff;
	}

	public void setFixed_single_rp1_diff(String fixed_single_rp1_diff) {
		this.fixed_single_rp1_diff = fixed_single_rp1_diff;
	}

	public String getFixed_double_rp1_diff() {
		return fixed_double_rp1_diff;
	}

	public void setFixed_double_rp1_diff(String fixed_double_rp1_diff) {
		this.fixed_double_rp1_diff = fixed_double_rp1_diff;
	}

	public String getFixed_single_rp2_diff() {
		return fixed_single_rp2_diff;
	}

	public void setFixed_single_rp2_diff(String fixed_single_rp2_diff) {
		this.fixed_single_rp2_diff = fixed_single_rp2_diff;
	}

	public String getFixed_double_rp2_diff() {
		return fixed_double_rp2_diff;
	}

	public void setFixed_double_rp2_diff(String fixed_double_rp2_diff) {
		this.fixed_double_rp2_diff = fixed_double_rp2_diff;
	}

	public String getFixed_single_rp3_diff() {
		return fixed_single_rp3_diff;
	}

	public void setFixed_single_rp3_diff(String fixed_single_rp3_diff) {
		this.fixed_single_rp3_diff = fixed_single_rp3_diff;
	}

	public String getFixed_double_rp3_diff() {
		return fixed_double_rp3_diff;
	}

	public void setFixed_double_rp3_diff(String fixed_double_rp3_diff) {
		this.fixed_double_rp3_diff = fixed_double_rp3_diff;
	}

	public String getFixed_ext_rp1_diff() {
		return fixed_ext_rp1_diff;
	}

	public void setFixed_ext_rp1_diff(String fixed_ext_rp1_diff) {
		this.fixed_ext_rp1_diff = fixed_ext_rp1_diff;
	}

	public String getFixed_ext_rp2_diff() {
		return fixed_ext_rp2_diff;
	}

	public void setFixed_ext_rp2_diff(String fixed_ext_rp2_diff) {
		this.fixed_ext_rp2_diff = fixed_ext_rp2_diff;
	}

	public String getFixed_ext_rp3_diff() {
		return fixed_ext_rp3_diff;
	}

	public void setFixed_ext_rp3_diff(String fixed_ext_rp3_diff) {
		this.fixed_ext_rp3_diff = fixed_ext_rp3_diff;
	}

}

package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Vector;

import com.marriott.rfp.utility.DateUtility;

public class AccountBlackoutGroup implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Date first_bd_startdate;
	private Date first_bd_enddate;
	private String first_bd_blackname;
	private Date second_bd_startdate;
	private Date second_bd_enddate;
	private String second_bd_blackname;
	private Date third_bd_startdate;
	private Date third_bd_enddate;
	private String third_bd_blackname;
	private Date fourth_bd_startdate;
	private Date fourth_bd_enddate;
	private String fourth_bd_blackname;
	private Date fifth_bd_startdate;
	private Date fifth_bd_enddate;
	private String fifth_bd_blackname;
	private Date sixth_bd_startdate;
	private Date sixth_bd_enddate;
	private String sixth_bd_blackname;
	private Date seventh_bd_startdate;
	private Date seventh_bd_enddate;
	private String seventh_bd_blackname;
	private Date eighth_bd_startdate;
	private Date eighth_bd_enddate;
	private String eighth_bd_blackname;
	private Date nineth_bd_startdate;
	private Date nineth_bd_enddate;
	private String nineth_bd_blackname;
	private Date tenth_bd_startdate;
	private Date tenth_bd_enddate;
	private String tenth_bd_blackname;
	private String offcycle;
	private Date contractstart;
	private Date contractend;
	private String changed;
	private BigDecimal[] hotel_accountinfoarray;
	private List<HotelAccountname> hotelaccountlist;
	private List<HotelBlackoutDate> blackoutList;

	public Date getFirst_bd_startdate() {
		return first_bd_startdate;
	}

	public String getFirst_bd_startdatestr() {
		return DateUtility.formatShortDate(first_bd_startdate);
	}

	public String getFirst_bd_enddatestr() {
		return DateUtility.formatShortDate(first_bd_enddate);
	}

	public void setFirst_bd_startdate(Date first_bd_startdate) {
		this.first_bd_startdate = first_bd_startdate;
	}

	public Date getFirst_bd_enddate() {
		return first_bd_enddate;
	}

	public void setFirst_bd_enddate(Date first_bd_enddate) {
		this.first_bd_enddate = first_bd_enddate;
	}

	public String getFirst_bd_blackname() {
		return first_bd_blackname;
	}

	public void setFirst_bd_blackname(String first_bd_blackname) {
		this.first_bd_blackname = first_bd_blackname;
	}

	public Date getSecond_bd_startdate() {
		return second_bd_startdate;
	}

	public String getSecond_bd_startdatestr() {
		return DateUtility.formatShortDate(second_bd_startdate);
	}

	public String getSecond_bd_enddatestr() {
		return DateUtility.formatShortDate(second_bd_enddate);
	}

	public void setSecond_bd_startdate(Date second_bd_startdate) {
		this.second_bd_startdate = second_bd_startdate;
	}

	public Date getSecond_bd_enddate() {
		return second_bd_enddate;
	}

	public void setSecond_bd_enddate(Date second_bd_enddate) {
		this.second_bd_enddate = second_bd_enddate;
	}

	public String getSecond_bd_blackname() {
		return second_bd_blackname;
	}

	public void setSecond_bd_blackname(String second_bd_blackname) {
		this.second_bd_blackname = second_bd_blackname;
	}

	public Date getThird_bd_startdate() {
		return third_bd_startdate;
	}

	public String getThird_bd_startdatestr() {
		return DateUtility.formatShortDate(third_bd_startdate);
	}

	public String getThird_bd_enddatestr() {
		return DateUtility.formatShortDate(third_bd_enddate);
	}

	public void setThird_bd_startdate(Date third_bd_startdate) {
		this.third_bd_startdate = third_bd_startdate;
	}

	public Date getThird_bd_enddate() {
		return third_bd_enddate;
	}

	public void setThird_bd_enddate(Date third_bd_enddate) {
		this.third_bd_enddate = third_bd_enddate;
	}

	public String getThird_bd_blackname() {
		return third_bd_blackname;
	}

	public void setThird_bd_blackname(String third_bd_blackname) {
		this.third_bd_blackname = third_bd_blackname;
	}

	public Date getFourth_bd_startdate() {
		return fourth_bd_startdate;
	}

	public String getFourth_bd_startdatestr() {
		return DateUtility.formatShortDate(fourth_bd_startdate);
	}

	public String getFourth_bd_enddatestr() {
		return DateUtility.formatShortDate(fourth_bd_enddate);
	}

	public void setFourth_bd_startdate(Date fourth_bd_startdate) {
		this.fourth_bd_startdate = fourth_bd_startdate;
	}

	public Date getFourth_bd_enddate() {
		return fourth_bd_enddate;
	}

	public void setFourth_bd_enddate(Date fourth_bd_enddate) {
		this.fourth_bd_enddate = fourth_bd_enddate;
	}

	public String getFourth_bd_blackname() {
		return fourth_bd_blackname;
	}

	public void setFourth_bd_blackname(String fourth_bd_blackname) {
		this.fourth_bd_blackname = fourth_bd_blackname;
	}

	public Date getFifth_bd_startdate() {
		return fifth_bd_startdate;
	}

	public String getFifth_bd_startdatestr() {
		return DateUtility.formatShortDate(fifth_bd_startdate);
	}

	public String getFifth_bd_enddatestr() {
		return DateUtility.formatShortDate(fifth_bd_enddate);
	}

	public void setFifth_bd_startdate(Date fifth_bd_startdate) {
		this.fifth_bd_startdate = fifth_bd_startdate;
	}

	public Date getFifth_bd_enddate() {
		return fifth_bd_enddate;
	}

	public void setFifth_bd_enddate(Date fifth_bd_enddate) {
		this.fifth_bd_enddate = fifth_bd_enddate;
	}

	public String getFifth_bd_blackname() {
		return fifth_bd_blackname;
	}

	public void setFifth_bd_blackname(String fifth_bd_blackname) {
		this.fifth_bd_blackname = fifth_bd_blackname;
	}

	public Date getSixth_bd_startdate() {
		return sixth_bd_startdate;
	}

	public String getSixth_bd_startdatestr() {
		return DateUtility.formatShortDate(sixth_bd_startdate);
	}

	public String getSixth_bd_enddatestr() {
		return DateUtility.formatShortDate(sixth_bd_enddate);
	}

	public void setSixth_bd_startdate(Date sixth_bd_startdate) {
		this.sixth_bd_startdate = sixth_bd_startdate;
	}

	public Date getSixth_bd_enddate() {
		return sixth_bd_enddate;
	}

	public void setSixth_bd_enddate(Date sixth_bd_enddate) {
		this.sixth_bd_enddate = sixth_bd_enddate;
	}

	public String getSixth_bd_blackname() {
		return sixth_bd_blackname;
	}

	public void setSixth_bd_blackname(String sixth_bd_blackname) {
		this.sixth_bd_blackname = sixth_bd_blackname;
	}

	public Date getSeventh_bd_startdate() {
		return seventh_bd_startdate;
	}

	public void setSeventh_bd_startdate(Date seventh_bd_startdate) {
		this.seventh_bd_startdate = seventh_bd_startdate;
	}

	public String getSeventh_bd_startdatestr() {
		return DateUtility.formatShortDate(seventh_bd_startdate);
	}

	public String getSeventh_bd_enddatestr() {
		return DateUtility.formatShortDate(seventh_bd_enddate);
	}

	public Date getSeventh_bd_enddate() {
		return seventh_bd_enddate;
	}

	public void setSeventh_bd_enddate(Date seventh_bd_enddate) {
		this.seventh_bd_enddate = seventh_bd_enddate;
	}

	public String getSeventh_bd_blackname() {
		return seventh_bd_blackname;
	}

	public void setSeventh_bd_blackname(String seventh_bd_blackname) {
		this.seventh_bd_blackname = seventh_bd_blackname;
	}

	public Date getEighth_bd_startdate() {
		return eighth_bd_startdate;
	}

	public String getEighth_bd_startdatestr() {
		return DateUtility.formatShortDate(eighth_bd_startdate);
	}

	public String getEighth_bd_enddatestr() {
		return DateUtility.formatShortDate(eighth_bd_enddate);
	}

	public void setEighth_bd_startdate(Date eighth_bd_startdate) {
		this.eighth_bd_startdate = eighth_bd_startdate;
	}

	public Date getEighth_bd_enddate() {
		return eighth_bd_enddate;
	}

	public void setEighth_bd_enddate(Date eighth_bd_enddate) {
		this.eighth_bd_enddate = eighth_bd_enddate;
	}

	public String getEighth_bd_blackname() {
		return eighth_bd_blackname;
	}

	public void setEighth_bd_blackname(String eighth_bd_blackname) {
		this.eighth_bd_blackname = eighth_bd_blackname;
	}

	public Date getNineth_bd_startdate() {
		return nineth_bd_startdate;
	}

	public String getNineth_bd_startdatestr() {
		return DateUtility.formatShortDate(nineth_bd_startdate);
	}

	public String getNineth_bd_enddatestr() {
		return DateUtility.formatShortDate(nineth_bd_enddate);
	}

	public void setNineth_bd_startdate(Date nineth_bd_startdate) {
		this.nineth_bd_startdate = nineth_bd_startdate;
	}

	public Date getNineth_bd_enddate() {
		return nineth_bd_enddate;
	}

	public void setNineth_bd_enddate(Date nineth_bd_enddate) {
		this.nineth_bd_enddate = nineth_bd_enddate;
	}

	public String getNineth_bd_blackname() {
		return nineth_bd_blackname;
	}

	public void setNineth_bd_blackname(String nineth_bd_blackname) {
		this.nineth_bd_blackname = nineth_bd_blackname;
	}

	public Date getTenth_bd_startdate() {
		return tenth_bd_startdate;
	}

	public String getTenth_bd_startdatestr() {
		return DateUtility.formatShortDate(tenth_bd_startdate);
	}

	public String getTenth_bd_enddatestr() {
		return DateUtility.formatShortDate(tenth_bd_enddate);
	}

	public void setTenth_bd_startdate(Date tenth_bd_startdate) {
		this.tenth_bd_startdate = tenth_bd_startdate;
	}

	public Date getTenth_bd_enddate() {
		return tenth_bd_enddate;
	}

	public void setTenth_bd_enddate(Date tenth_bd_enddate) {
		this.tenth_bd_enddate = tenth_bd_enddate;
	}

	public String getTenth_bd_blackname() {
		return tenth_bd_blackname;
	}

	public void setTenth_bd_blackname(String tenth_bd_blackname) {
		this.tenth_bd_blackname = tenth_bd_blackname;
	}

	public BigDecimal[] getHotel_accountinfoarray() {
		return hotel_accountinfoarray;
	}

	public void setHotel_accountinfoarray(BigDecimal[] hotel_accountinfoarray) {
		this.hotel_accountinfoarray = hotel_accountinfoarray;
	}

	public void setHotelaccountlist(List<HotelAccountname> hotelaccountlist) {
		this.hotelaccountlist = hotelaccountlist;
	}

	public List<HotelAccountname> getHotelaccountlist() {
		return hotelaccountlist;
	}

	public String getHotelAccountinfoString() {
		String s = "";
		for (int i = 0; i < hotel_accountinfoarray.length; i++) {
			if (s.length() > 0)
				s += ",";
			s += hotel_accountinfoarray[i].toPlainString();
		}
		return s;
	}

	public void setBlackoutList(List<HotelBlackoutDate> blackoutList) {
		this.blackoutList = blackoutList;
	}

	public List<HotelBlackoutDate> getBlackoutList() {
		return blackoutList;
	}

	public void convertToBlackoutList() {
		blackoutList = new Vector<HotelBlackoutDate>();
		if (first_bd_startdate != null) {
			HotelBlackoutDate hbd = new HotelBlackoutDate();
			hbd.setBlackoutid(1L);
			hbd.setStartdate(first_bd_startdate);
			hbd.setEnddate(first_bd_enddate);
			hbd.setBlackname(first_bd_blackname);
			blackoutList.add(hbd);
		}
		if (second_bd_startdate != null) {
			HotelBlackoutDate hbd = new HotelBlackoutDate();
			hbd.setBlackoutid(2L);
			hbd.setStartdate(second_bd_startdate);
			hbd.setEnddate(second_bd_enddate);
			hbd.setBlackname(second_bd_blackname);
			blackoutList.add(hbd);
		}
		if (third_bd_startdate != null) {
			HotelBlackoutDate hbd = new HotelBlackoutDate();
			hbd.setBlackoutid(3L);
			hbd.setStartdate(third_bd_startdate);
			hbd.setEnddate(third_bd_enddate);
			hbd.setBlackname(third_bd_blackname);
			blackoutList.add(hbd);
		}
		if (fourth_bd_startdate != null) {
			HotelBlackoutDate hbd = new HotelBlackoutDate();
			hbd.setBlackoutid(4L);
			hbd.setStartdate(fourth_bd_startdate);
			hbd.setEnddate(fourth_bd_enddate);
			hbd.setBlackname(fourth_bd_blackname);
			blackoutList.add(hbd);
		}
		if (fifth_bd_startdate != null) {
			HotelBlackoutDate hbd = new HotelBlackoutDate();
			hbd.setBlackoutid(5L);
			hbd.setStartdate(fifth_bd_startdate);
			hbd.setEnddate(fifth_bd_enddate);
			hbd.setBlackname(fifth_bd_blackname);
			blackoutList.add(hbd);
		}
		if (sixth_bd_startdate != null) {
			HotelBlackoutDate hbd = new HotelBlackoutDate();
			hbd.setBlackoutid(6L);
			hbd.setStartdate(sixth_bd_startdate);
			hbd.setEnddate(sixth_bd_enddate);
			hbd.setBlackname(sixth_bd_blackname);
			blackoutList.add(hbd);
		}
		if (seventh_bd_startdate != null) {
			HotelBlackoutDate hbd = new HotelBlackoutDate();
			hbd.setBlackoutid(7L);
			hbd.setStartdate(seventh_bd_startdate);
			hbd.setEnddate(seventh_bd_enddate);
			hbd.setBlackname(seventh_bd_blackname);
			blackoutList.add(hbd);
		}
		if (eighth_bd_startdate != null) {
			HotelBlackoutDate hbd = new HotelBlackoutDate();
			hbd.setBlackoutid(8L);
			hbd.setStartdate(eighth_bd_startdate);
			hbd.setEnddate(eighth_bd_enddate);
			hbd.setBlackname(eighth_bd_blackname);
			blackoutList.add(hbd);
		}
		if (nineth_bd_startdate != null) {
			HotelBlackoutDate hbd = new HotelBlackoutDate();
			hbd.setBlackoutid(9L);
			hbd.setStartdate(nineth_bd_startdate);
			hbd.setEnddate(nineth_bd_enddate);
			hbd.setBlackname(nineth_bd_blackname);
			blackoutList.add(hbd);
		}
		if (tenth_bd_startdate != null) {
			HotelBlackoutDate hbd = new HotelBlackoutDate();
			hbd.setBlackoutid(10L);
			hbd.setStartdate(tenth_bd_startdate);
			hbd.setEnddate(tenth_bd_enddate);
			hbd.setBlackname(tenth_bd_blackname);
			blackoutList.add(hbd);
		}
	}

	public void setOffcycle(String offcycle) {
		this.offcycle = offcycle;
	}

	public String getOffcycle() {
		return offcycle;
	}

	public void setContractstart(Date contractstart) {
		this.contractstart = contractstart;
	}

	public Date getContractstart() {
		return contractstart;
	}

	public String getContractstartstr() {
		return DateUtility.formatShortDate(contractstart);
	}

	public void setContractend(Date contractend) {
		this.contractend = contractend;
	}

	public Date getContractend() {
		return contractend;
	}

	public String getContractendstr() {
		return DateUtility.formatShortDate(contractend);
	}

	public void setChanged(String changed) {
		this.changed = changed;
	}

	public String getChanged() {
		return changed;
	}

	public BigDecimal[] convertToHotelArray() {
		if (hotelaccountlist.size() == 0)
			return null;
		BigDecimal[] hotelarray = new BigDecimal[hotelaccountlist.size()];
		int i = 0;
		for (HotelAccountname ha : hotelaccountlist)
			hotelarray[i++] = BigDecimal.valueOf(ha.getHotel_accountinfoid().longValue());

		return hotelarray;
	}

	public String getIsLocked() {
		return "N";
	}

	public long getTotalNumBlackoutDays() {
		long totaldays = 0;
		if (blackoutList != null) {
			for (int i = 0; i < blackoutList.size(); i++)
				totaldays += blackoutList.get(i).getTotalDays();
		}
		return totaldays;
	}
}

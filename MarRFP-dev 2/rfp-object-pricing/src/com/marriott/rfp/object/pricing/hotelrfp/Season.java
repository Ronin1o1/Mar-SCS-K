package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.text.ParseException;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.marriott.rfp.utility.DateUtility;

public class Season implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long rfpseasonid;
	private Long hotelrfpid;
	private Long seasonid;
	private Date startdate;
	private Date enddate;
	
	public Long getRfpseasonid() {
		return rfpseasonid;
	}

	public void setRfpseasonid(Long rfpseasonid) {
		this.rfpseasonid = rfpseasonid;
	}

	public Long getHotelrfpid() {
		return hotelrfpid;
	}

	public void setHotelrfpid(Long hotelrfpid) {
		this.hotelrfpid = hotelrfpid;
	}

	public Long getSeasonid() {
		return seasonid;
	}

	public void setSeasonid(Long seasonid) {
		this.seasonid = seasonid;
	}
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	public Date getStartdate() {
		return startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
	public Date getEnddate() {
		return enddate;
	}
	
	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}
	
	@JsonIgnore
	public String getShortStartdate() {
		return DateUtility.formatShortDate(startdate);
	}
	@JsonIgnore
	public String getShortEnddate() {
		return DateUtility.formatShortDate(enddate);
	}
	
    @JsonIgnore
	public String getConvertedStartdate() {
		return DateUtility.formatConvertedDate(startdate);
	}
	
    @JsonIgnore
	public String getConvertedEnddate() {
		return DateUtility.formatConvertedDate(enddate);
	}
	
    @JsonIgnore
	public String getLongStartdate() {
		return DateUtility.formatLongDate(startdate);
	}
	
    @JsonIgnore
	public String getLongEnddate() {
		return DateUtility.formatLongDate(enddate);
	}
	
	public void setStrStartdate(String strstartdate) {
	    try {
		startdate=DateUtility.parseDate(strstartdate);
	    } catch (ParseException e) {
	    }
	}

	public void setStrEnddate(String strenddate) {
	    try {
		enddate=DateUtility.parseDate(strenddate);
	    } catch (ParseException e) {
	    }
	}

	public long getRoomNights()
    {
          return DateUtility.calcDaysBetweenInclusive(startdate,enddate);
    }
}

package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.marriott.rfp.utility.DateUtility;

public class HotelBlackoutDate implements Serializable, Comparable<HotelBlackoutDate> {
    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private Long rfpblackoutsid;
    private Long hotelrfpid;
    private Long blackoutid;
    @Temporal(TemporalType.DATE)
    private Date startdate;
    @Temporal(TemporalType.DATE)
    private Date enddate;
    private String blackname;

    public Long getRfpblackoutsid() {
        return rfpblackoutsid;
    }

    public void setRfpblackoutsid(Long rfpblackoutsid) {
        this.rfpblackoutsid = rfpblackoutsid;
    }

    public Long getHotelrfpid() {
        return hotelrfpid;
    }

    public void setHotelrfpid(Long hotelrfpid) {
        this.hotelrfpid = hotelrfpid;
    }

    public Long getBlackoutid() {
        return blackoutid;
    }

    public void setBlackoutid(Long blackoutid) {
        this.blackoutid = blackoutid;
    }


    public String getShortStartdate() {
        return DateUtility.formatShortDate(startdate);
    }

    public String getLongStartdate() {
        return DateUtility.formatLongDate(startdate);
    }


    public String getShortEnddate() {
        return DateUtility.formatShortDate(enddate);
    }

    public String getLongEnddate() {
        return DateUtility.formatLongDate(enddate);
    }


    public String getBlackname() {
        return blackname;
    }

    public void setBlackname(String blackname) {
        this.blackname = blackname;
    }

    public long getTotalDays() {
        return DateUtility.calcDaysBetweenInclusive(startdate, enddate);
    }

    public void setStrStartdate(String strstartdate) {
        try {
          this.startdate = DateUtility.parseDate(strstartdate);
        } catch (ParseException e) {
        }
    }

    public void setStrEnddate(String strenddate) {
        try {
            this.enddate = DateUtility.parseDate(strenddate);
        } catch (ParseException e) {
        }
    }

    @Override
    public int compareTo(HotelBlackoutDate o) {
        int lastCmp = startdate.compareTo(o.startdate);
        return (lastCmp != 0 ? lastCmp : enddate.compareTo(o.enddate));
    }

	public Date getStartdate() {
		return startdate;
	}

	public void setStartdate(Date startdate) {
        String strstartdate= new SimpleDateFormat("MM/dd/yyyy").format(startdate);
        setStrStartdate(strstartdate);
		//this.startdate = startdate;
	}

	public Date getEnddate() {

		return enddate;
	}

	public void setEnddate(Date enddate) {
        String strenddate= new SimpleDateFormat("MM/dd/yyyy").format(enddate);
        setStrEnddate(strenddate);

	}
}

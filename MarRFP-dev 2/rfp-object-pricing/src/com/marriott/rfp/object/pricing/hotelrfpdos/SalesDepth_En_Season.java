package com.marriott.rfp.object.pricing.hotelrfpdos;

import java.io.Serializable;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class SalesDepth_En_Season implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private Long salesdepth_en_season_id;
    private Long salesdepthid;
    private Long seasonid;
    private Date startdate;
    private Date enddate;
    private long totalnumseasons;

    public Long getSalesdepth_en_season_id() {
	return salesdepth_en_season_id;
    }

    public void setSalesdepth_en_season_id(Long salesdepth_en_season_id) {
	this.salesdepth_en_season_id = salesdepth_en_season_id;
    }

    public Long getSalesdepthid() {
	return salesdepthid;
    }

    public void setSalesdepthid(Long salesdepthid) {
	this.salesdepthid = salesdepthid;
    }

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

    public String getLongStartdate() {
	return DateUtility.formatLongDate(startdate);
    }

    public String getLongEnddate() {
	return DateUtility.formatLongDate(enddate);
    }

    public void setEnddate(Date enddate) {
	this.enddate = enddate;
    }

    public void setTotalnumseasons(long totalnumseasons) {
	this.totalnumseasons = totalnumseasons;
    }

    public long getTotalnumseasons() {
	return totalnumseasons;
    }

}

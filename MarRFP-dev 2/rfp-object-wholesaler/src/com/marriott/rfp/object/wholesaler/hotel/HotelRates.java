package com.marriott.rfp.object.wholesaler.hotel;

import java.io.Serializable;
import java.text.DecimalFormat;

public class HotelRates implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private long season_id;
    private long daysofweek_id;
    private long bedtype_id;
    private Double rate;
    private long roompoolid;
    
    public long getRoompoolid() {
		return roompoolid;
	}

	public void setRoompoolid(long roompoolid) {
		this.roompoolid = roompoolid;
	}

	public long getSeason_id() {
		return season_id;
	}

	public void setSeason_id(long season_id) {
		this.season_id = season_id;
	}

	public long getDaysofweek_id() {
		return daysofweek_id;
	}

	public void setDaysofweek_id(long daysofweek_id) {
		this.daysofweek_id = daysofweek_id;
	}

	public long getBedtype_id() {
		return bedtype_id;
	}

	public void setBedtype_id(long bedtype_id) {
		this.bedtype_id = bedtype_id;
	}

	public Double getRate() {
		return rate;
    }

    public void setRate(Double rate) {
    	this.rate = rate;
    }

    public void setStrRate(String strrate) {
    	if (strrate == null  || strrate.equals("")) {
    	    this.rate = null;
    	} else if (strrate.equals("N/A")) {
    		this.rate = 0d;
    	} else {
    	    this.rate = Double.valueOf(strrate);
    	}
     }
    
	public String formatRate(double thenum) {
		int num = (int) thenum;
		if (num == thenum) {
			return new DecimalFormat("#0").format(thenum);
		} else {
			return new DecimalFormat("#0.00").format(thenum);
		}
	}

    public String getFormattedRate() {
    	return this.formatRate(rate);
    }

}
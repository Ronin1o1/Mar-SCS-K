package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.util.Date;

import com.marriott.rfp.utility.DateUtility;

public class HotelAccountSpecificFacility implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private String directionstofacility;
    private Double distance;
    private String facility_city;
    private String facility_country;
    private String facility_name;
    private String facility_state_prov;
    private String facility_street;
    private String facility_zip;
    private String ratenotes;
    private Long  rm_nights;
    private String rn_target;
    private Long rn_targetnum;
    private Double shuttle_cost_one_way;
    private boolean canPickFacility;
    private String isLocked;
    private Date last_updateratenotes;
    //INC000006143774  - MarRFP Issue: Nearest Facility - distance unit//
    private String propertyDistanceUnit;
    //INC000006143774  - MarRFP Issue: Nearest Facility - distance unit//

    public String getDirectionstofacility() {
	return directionstofacility;
    }

    public void setDirectionstofacility(String directionstofacility) {
	this.directionstofacility = directionstofacility;
    }

    public Double getDistance() {
	return distance;
    }

    public void setDistance(Double distance) {
	this.distance = distance;
    }

    public void setStrDistance(String strdistance) {
	if (strdistance == null || strdistance.equals(""))
	    this.distance = null;
	else
	    this.distance = Double.valueOf(strdistance);
    }

    public String getFacility_city() {
	return facility_city;
    }

    public void setFacility_city(String facility_city) {
	this.facility_city = facility_city;
    }

    public String getFacility_country() {
	return facility_country;
    }

    public void setFacility_country(String facility_country) {
	this.facility_country = facility_country;
    }

    public String getFacility_name() {
	return facility_name;
    }

    public void setFacility_name(String facility_name) {
	this.facility_name = facility_name;
    }

    public String getFacility_state_prov() {
	return facility_state_prov;
    }

    public void setFacility_state_prov(String facility_state_prov) {
	this.facility_state_prov = facility_state_prov;
    }

    public String getFacility_street() {
	return facility_street;
    }

    public void setFacility_street(String facility_street) {
	this.facility_street = facility_street;
    }

    public String getFacility_zip() {
	return facility_zip;
    }

    public void setFacility_zip(String facility_zip) {
	this.facility_zip = facility_zip;
    }

    public String getRatenotes() {
	return ratenotes;
    }

    public void setRatenotes(String ratenotes) {
	this.ratenotes = ratenotes;
    }

    public Double getShuttle_cost_one_way() {
	return shuttle_cost_one_way;
    }

    public void setShuttle_cost_one_way(Double shuttle_cost_one_way) {
	this.shuttle_cost_one_way = shuttle_cost_one_way;
    }

    public void setStrShuttle_cost_one_way(String strshuttle_cost_one_way) {
	if (strshuttle_cost_one_way == null || strshuttle_cost_one_way.equals(""))
	    this.shuttle_cost_one_way = null;
	else
	    this.shuttle_cost_one_way = Double.valueOf(strshuttle_cost_one_way);
    }

    public Long getRm_nights() {
        return rm_nights;
    }

    public void setRm_nights(Long rm_nights) {
        this.rm_nights = rm_nights;
    }

    public void setRn_target(String rn_target) {
	this.rn_target = rn_target;
    }

    public String getRn_target() {
	return rn_target;
    }

    public void setRn_targetnum(Long rn_targetnum) {
	this.rn_targetnum = rn_targetnum;
    }

    public Long getRn_targetnum() {
	return rn_targetnum;
    }

	public void setCanPickFacility(boolean canPickFacility) {
		this.canPickFacility = canPickFacility;
	}

	public boolean getCanPickFacility() {
		return canPickFacility;
	}

	public String getIsLocked() {
		return isLocked;
	}

	public String getBoolStringIsLocked() {
		if (isLocked == null || isLocked.equals("N"))
			return "false";
		else
			return "true";
	}

	public void setIsLocked(String isLocked) {
		this.isLocked = isLocked;
	}

    public void setLast_updateratenotes(Date last_updateratenotes) {
    	this.last_updateratenotes = last_updateratenotes;
    }

    public Date getLast_updateratenotes() {
    	return last_updateratenotes;
    }

    public String getFormattedLast_updateratenotes() {
		String strdate = "";
		if (last_updateratenotes != null) {
		    strdate = DateUtility.formatLongDate(last_updateratenotes);
		}
		return strdate;
    }
	//INC000006143774  - MarRFP Issue: Nearest Facility - distance unit//
    	public String getPropertyDistanceUnit() {
		return propertyDistanceUnit;
	}

	public void setPropertyDistanceUnit(String propertyDistanceUnit) {
		this.propertyDistanceUnit = propertyDistanceUnit;
	}
	//INC000006143774  - MarRFP Issue: Nearest Facility - distance unit//
}

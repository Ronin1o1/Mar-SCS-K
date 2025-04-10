package com.marriott.rfp.object.pricing.account;

/**
 * Created by msick355 on 3/8/2017.
 */
public class AccountBrand {
    private Long affiliationid;
    private String affiliationname;
    private String canprice;
    private String service_level;
    private Long defaultroompools;
    private Long currentroompool;
    private Long account_percentid;
    private Long default_percent;
    private String servicetype;
    private String gpp_optional_brand;
    private String gpp_value;

    public Long getAffiliationid() {
        return affiliationid;
    }

    public void setAffiliationid(Long affiliationid) {
        this.affiliationid = affiliationid;
    }

    public String getAffiliationname() {
        return affiliationname;
    }

    public void setAffiliationname(String affiliationname) {
        this.affiliationname = affiliationname;
    }

    public String getCanprice() {
        return canprice;
    }

    public void setCanprice(String canprice) {
        this.canprice = canprice;
    }

    public String getService_level() {
        return service_level;
    }

    public void setService_level(String service_level) {
        this.service_level = service_level;
    }

    public Long getDefaultroompools() {
        return defaultroompools;
    }

    public void setDefaultroompools(Long defaultroompools) {
        this.defaultroompools = defaultroompools;
    }

    public Long getCurrentroompool() {
        return currentroompool;
    }

    public void setCurrentroompool(Long currentroompool) {
        this.currentroompool = currentroompool;
    }

    public Long getAccount_percentid() {
        return account_percentid;
    }

    public void setAccount_percentid(Long account_percentid) {
        this.account_percentid = account_percentid;
    }

    public Long getDefault_percent() {
        return default_percent;
    }

    public void setDefault_percent(Long default_percent) {
        this.default_percent = default_percent;
    }

    public String getServicetype() {
        return servicetype;
    }

    public void setServicetype(String servicetype) {
        this.servicetype = servicetype;
    }

	public String getGpp_optional_brand() {
		return gpp_optional_brand;
	}

	public void setGpp_optional_brand(String gpp_optional_brand) {
		this.gpp_optional_brand = gpp_optional_brand;
	}

	public String getGpp_value() {
		return gpp_value;
	}

	public void setGpp_value(String gpp_value) {
		this.gpp_value = gpp_value;
	}
}

package com.marriott.rfp.webapp.dto;

import com.marriott.rfp.object.pricing.hotelrfp.AccountNotViewable;

import java.util.List;

public class HotelAccountNotViewable {
    String accountpricingtype = "C";
    List<AccountNotViewable> accountNotViewable;

    public String getAccountpricingtype() {
        return accountpricingtype;
    }

    public void setAccountpricingtype(String accountpricingtype) {
        this.accountpricingtype = accountpricingtype;
    }

    public List<AccountNotViewable> getAccountNotViewable() {
        return accountNotViewable;
    }

    public void setAccountNotViewable(List<AccountNotViewable> accountNotViewable) {
        this.accountNotViewable = accountNotViewable;
    }
}

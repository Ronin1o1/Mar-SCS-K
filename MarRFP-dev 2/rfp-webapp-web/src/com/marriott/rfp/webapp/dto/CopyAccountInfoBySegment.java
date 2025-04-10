package com.marriott.rfp.webapp.dto;

import com.marriott.rfp.object.pricing.accountsegment.AccountSegment;
import com.marriott.rfp.object.pricing.period.Period;

import java.util.List;

public class CopyAccountInfoBySegment {
    String copyMsg;
    List<Period> fromperiodList;
    List<Period> toperiodList;
    List<AccountSegment> accountSegmentList;

    public String getCopyMsg() {
        return copyMsg;
    }

    public void setCopyMsg(String copyMsg) {
        this.copyMsg = copyMsg;
    }

    public List<Period> getFromperiodList() {
        return fromperiodList;
    }

    public void setFromperiodList(List<Period> fromperiodList) {
        this.fromperiodList = fromperiodList;
    }

    public List<Period> getToperiodList() {
        return toperiodList;
    }

    public void setToperiodList(List<Period> toperiodList) {
        this.toperiodList = toperiodList;
    }

    public List<AccountSegment> getAccountSegmentList() {
        return accountSegmentList;
    }

    public void setAccountSegmentList(List<AccountSegment> accountSegmentList) {
        this.accountSegmentList = accountSegmentList;
    }
}

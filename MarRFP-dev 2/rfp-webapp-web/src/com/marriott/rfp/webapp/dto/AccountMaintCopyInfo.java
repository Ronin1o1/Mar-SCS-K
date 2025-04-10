package com.marriott.rfp.webapp.dto;

import com.marriott.rfp.object.pricing.account.Account;
import com.marriott.rfp.object.pricing.period.Period;

import java.util.List;

public class AccountMaintCopyInfo {
    List<Period> periodList;
    List<Account> accountList;

    public List<Period> getPeriodList() {
        return periodList;
    }

    public void setPeriodList(List<Period> periodList) {
        this.periodList = periodList;
    }

    public List<Account> getAccountList() {
        return accountList;
    }

    public void setAccountList(List<Account> accountList) {
        this.accountList = accountList;
    }
}

package com.marriott.rfp.object.pricing.hotelrfp;

import java.io.Serializable;
import java.text.DecimalFormat;


public class HotelRFPGroupsAndMeetings extends HotelRFP implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String discfb;
	private String discav;
	private Long comprooms;
	private String compparking;
	private String directbill;
	private String grpsmtgrespond;
	private String payterms;
	private String minspend;
	private Long minamount;
	private String maxspend;
	private Long maxamount;
	private Double negratefifty;
	private Double negratehund;
	private String negtranshighrate;
	private String upfrontdep;
	private String corporate_mtngcard;
	private String mtngcardfunds;
	private String cardmax;
	private Long cardmaxamount;
	private String currencycode;
	private String currencyname;
	private Double meetingrmhsiafee;
	
	private String daymtgpkgs;
	private String meetingdaymeetingpckg;
	private String offerday_mtgpackages;
	private String typedaymtgpkgs;
	private String fulldaymtgincl;
	private String halfdaymtgincl;
	private Double fulldayratefifty;
	private Double halfdayratefifty;
	private Double fulldayratehund;
	private Double halfdayratehund;
	private Double taxdaymtgpkgs;
	private String taxdaymtgqouteas;
	private String taxdaymtginclexcl;
	private Double banqsvcamt;
	private String banqsvcqtdas;
	private String banqsvcchgtax;
	private String banqsvcinclexcl;
	private Double costbrkten;
	private Double costbrktwnfive;
	private String intfeeincldaymtg;
	private String lcdcostincldaymtg;
	private String scncostincldaymtg;
	private String tabgrpgmsflg;
	private String tabprcgmsflg;
	private String tabpaygmsflg;
	
	
	
	
	
	public String getDiscfb() {
		return discfb;
	}
	public void setDiscfb(String discfb) {
		this.discfb = discfb;
	}
	public String getDiscav() {
		return discav;
	}
	public void setDiscav(String discav) {
		this.discav = discav;
	}
	public Long getComprooms() {
		return comprooms;
	}
	public void setComprooms(Long comprooms) {
		this.comprooms = comprooms;
	}
	public String getCompparking() {
		return compparking;
	}
	public void setCompparking(String compparking) {
		this.compparking = compparking;
	}
	public String getDirectbill() {
		return directbill;
	}
	public void setDirectbill(String directbill) {
		this.directbill = directbill;
	}
	public String getPayterms() {
		return payterms;
	}
	public void setPayterms(String payterms) {
		this.payterms = payterms;
	}
	public String getMinspend() {
		return minspend;
	}
	public void setMinspend(String minspend) {
		this.minspend = minspend;
	}
	public Long getMinamount() {
		return minamount;
	}
	public void setMinamount(Long minamount) {
		this.minamount = minamount;
	}
	public String getMaxspend() {
		return maxspend;
	}
	public void setMaxspend(String maxspend) {
		this.maxspend = maxspend;
	}
	public Long getMaxamount() {
		return maxamount;
	}
	public void setMaxamount(Long maxamount) {
		this.maxamount = maxamount;
	}
	public String getUpfrontdep() {
		return upfrontdep;
	}
	public void setUpfrontdep(String upfrontdep) {
		this.upfrontdep = upfrontdep;
	}
	public String getCorporate_mtngcard() {
		return corporate_mtngcard;
	}
	public void setCorporate_mtngcard(String corporate_mtngcard) {
		this.corporate_mtngcard = corporate_mtngcard;
	}
	public String getMtngcardfunds() {
		return mtngcardfunds;
	}
	public void setMtngcardfunds(String mtngcardfunds) {
		this.mtngcardfunds = mtngcardfunds;
	}
	public String getCardmax() {
		return cardmax;
	}
	public void setCardmax(String cardmax) {
		this.cardmax = cardmax;
	}
	public Long getCardmaxamount() {
		return cardmaxamount;
	}
	public void setCardmaxamount(Long cardmaxamount) {
		this.cardmaxamount = cardmaxamount;
	}
	public String getCurrencycode() {
		return currencycode;
	}
	public void setCurrencycode(String currencycode) {
		this.currencycode = currencycode;
	}
	public String getCurrencyname() {
		return currencyname;
	}
	public void setCurrencyname(String currencyname) {
		this.currencyname = currencyname;
	}
	public void setMeetingrmhsiafee(Double meetingrmhsiafee) {
		if (meetingrmhsiafee == null)
			this.meetingrmhsiafee = null;
		else
			this.meetingrmhsiafee = meetingrmhsiafee;
	}
	public Double getMeetingrmhsiafee() {
		return meetingrmhsiafee;
	}
	public String getGrpsmtgrespond() {
		return grpsmtgrespond;
	}
	public void setGrpsmtgrespond(String grpsmtgrespond) {
		this.grpsmtgrespond = grpsmtgrespond;
	}

	public String getNegtranshighrate() {
		return negtranshighrate;
	}
	
	public void setNegtranshighrate(String negtranshighrate) {
		this.negtranshighrate = negtranshighrate;
	}
	
	public Double getNegratefifty() {
		return negratefifty;
	}
	
	public void setNegratefifty(Double negratefifty) {
		if (negratefifty == null)
			this.negratefifty = null;
		else
			this.negratefifty = negratefifty;
	}
	
	public Double getNegratehund() {
		return negratehund;
	}
	
	public void setNegratehund(Double negratehund) {
		if (negratehund == null)
			this.negratehund = null;
		else
			this.negratehund = negratehund;
	}
	
	public String getDaymtgpkgs() {
		return daymtgpkgs;
	}
	
	public void setDaymtgpkgs(String daymtgpkgs) {
		this.daymtgpkgs = daymtgpkgs;
	}
	
	public String getTypedaymtgpkgs() {
		return typedaymtgpkgs;
	}
	
	public void setTypedaymtgpkgs(String typedaymtgpkgs) {
		this.typedaymtgpkgs = typedaymtgpkgs;
	}
	
	public String getFulldaymtgincl() {
		return fulldaymtgincl;
	}
	
	public void setFulldaymtgincl(String fulldaymtgincl) {
		this.fulldaymtgincl = fulldaymtgincl;
	}
	
	public String getHalfdaymtgincl() {
		return halfdaymtgincl;
	}
	
	public void setHalfdaymtgincl(String halfdaymtgincl) {
		this.halfdaymtgincl = halfdaymtgincl;
	}
	
	public Double getFulldayratefifty() {
		return fulldayratefifty;
	}
	
	public void setFulldayratefifty(Double fulldayratefifty) {
		if (fulldayratefifty == null)
			this.fulldayratefifty = null;
		else
			this.fulldayratefifty = fulldayratefifty;
	}
	
	public Double getHalfdayratefifty() {
		return halfdayratefifty;
	}
	
	public void setHalfdayratefifty(Double halfdayratefifty) {
		if (halfdayratefifty == null)
			this.halfdayratefifty = null;
		else
			this.halfdayratefifty = halfdayratefifty;
	}
	
	public Double getFulldayratehund() {
		return fulldayratehund;
	}
	
	public void setFulldayratehund(Double fulldayratehund) {
		if (fulldayratehund == null)
			this.fulldayratehund = null;
		else
			this.fulldayratehund = fulldayratehund;
	}
	
	public Double getHalfdayratehund() {
		return halfdayratehund;
	}
	
	public void setHalfdayratehund(Double halfdayratehund) {
		if (halfdayratehund == null)
			this.halfdayratehund = null;
		else	
			this.halfdayratehund = halfdayratehund;
	}
	
	public Double getTaxdaymtgpkgs() {
		return taxdaymtgpkgs;
	}
	
	public void setTaxdaymtgpkgs(Double taxdaymtgpkgs) {
		if (taxdaymtgpkgs == null)
			this.taxdaymtgpkgs = null;
		else		
			this.taxdaymtgpkgs = taxdaymtgpkgs;
	}
	
	public String getTaxdaymtgqouteas() {
		return taxdaymtgqouteas;
	}
	
	public void setTaxdaymtgqouteas(String taxdaymtgqouteas) {
		this.taxdaymtgqouteas = taxdaymtgqouteas;
	}
	
	public String getTaxdaymtginclexcl() {
		return taxdaymtginclexcl;
	}
	
	public void setTaxdaymtginclexcl(String taxdaymtginclexcl) {
		this.taxdaymtginclexcl = taxdaymtginclexcl;
	}
	
	public Double getBanqsvcamt() {
		return banqsvcamt;
	}
	
	public void setBanqsvcamt(Double banqsvcamt) {
		if (banqsvcamt == null)
			this.banqsvcamt = null;
		else			
			this.banqsvcamt = banqsvcamt;
	}
	
	public String getBanqsvcqtdas() {
		return banqsvcqtdas;
	}
	
	public void setBanqsvcqtdas(String banqsvcqtdas) {
		this.banqsvcqtdas = banqsvcqtdas;
	}
	
	public String getBanqsvcchgtax() {
		return banqsvcchgtax;
	}
	
	public void setBanqsvcchgtax(String banqsvcchgtax) {
		this.banqsvcchgtax = banqsvcchgtax;
	}
	
	public String getBanqsvcinclexcl() {
		return banqsvcinclexcl;
	}
	
	public void setBanqsvcinclexcl(String banqsvcinclexcl) {
		this.banqsvcinclexcl = banqsvcinclexcl;
	}
	
	public Double getCostbrkten() {
		return costbrkten;
	}
	
	public void setCostbrkten(Double costbrkten) {
		if (costbrkten == null)
			this.costbrkten = null;
		else
			this.costbrkten = costbrkten;
	}
	
	public Double getCostbrktwnfive() {
		return costbrktwnfive;
	}
	
	public void setCostbrktwnfive(Double costbrktwnfive) {
		if (costbrktwnfive == null)
			this.costbrktwnfive = null;
		else			
			this.costbrktwnfive = costbrktwnfive;
	}
	
	public String getIntfeeincldaymtg() {
		return intfeeincldaymtg;
	}
	
	public void setIntfeeincldaymtg(String intfeeincldaymtg) {
		this.intfeeincldaymtg = intfeeincldaymtg;
	}
	
	public String getLcdcostincldaymtg() {
		return lcdcostincldaymtg;
	}
	
	public void setLcdcostincldaymtg(String lcdcostincldaymtg) {
		this.lcdcostincldaymtg = lcdcostincldaymtg;
	}
	
	public String getScncostincldaymtg() {
		return scncostincldaymtg;
	}
	
	public void setScncostincldaymtg(String scncostincldaymtg) {
		this.scncostincldaymtg = scncostincldaymtg;
	}
	
	public String getTabgrpgmsflg() {
		return tabgrpgmsflg;
	}
	
	public void setTabgrpgmsflg(String tabgrpgmsflg) {
		this.tabgrpgmsflg = tabgrpgmsflg;
	}
	
	public String getTabprcgmsflg() {
		return tabprcgmsflg;
	}
	
	public void setTabprcgmsflg(String tabprcgmsflg) {
		this.tabprcgmsflg = tabprcgmsflg;
	}
	
	public String getTabpaygmsflg() {
		return tabpaygmsflg;
	}
	
	public void setTabpaygmsflg(String tabpaygmsflg) {
		this.tabpaygmsflg = tabpaygmsflg;
	}
	
	public String getOfferday_mtgpackages() {
		return offerday_mtgpackages;
	}
	
	public void setOfferday_mtgpackages(String offerday_mtgpackages) {
		this.offerday_mtgpackages = offerday_mtgpackages;
	}
	
	public String getMeetingdaymeetingpckg() {
		return meetingdaymeetingpckg;
	}
	
	public void setMeetingdaymeetingpckg(String meetingdaymeetingpckg) {
		this.meetingdaymeetingpckg = meetingdaymeetingpckg;
	}
	
	public String formatRate(double thenum) {
			int num = (int) thenum;		
			if (num == thenum) {
				return new DecimalFormat("#0").format(thenum);
			} else {
				return new DecimalFormat("#0.00").format(thenum);
			}
	}

	public String getFmFulldayratefifty(){
		if ( fulldayratefifty == null)	
			return "";
		else 
		return formatRate(this.fulldayratefifty);
	}
	
	public String getFmHalfdayratefifty(){
		if ( halfdayratefifty == null)	
			return "";
		else 
			return formatRate(this.halfdayratefifty);
	}
	
	public String getFmFulldayratehund(){		
		if ( fulldayratehund == null)	
			return "";
		else 
			return formatRate(this.fulldayratehund);
	}
	
	public String getFmHalfdayratehund(){
		if ( halfdayratehund == null)	
			return "";
		else 
		return formatRate(this.halfdayratehund);
	}
	
	public String getFmTaxdaymtgpkgs(){        
		if ( taxdaymtgpkgs == null)	
			return "";
		else 	
			return formatRate(this.taxdaymtgpkgs);
	}
	
	public String getFmBanqsvcamt(){
        if ( banqsvcamt == null)	
        	return "";
        else 	
        	return formatRate(this.banqsvcamt);
	}
	
	public String getFmCostbrkten(){	
        if ( costbrkten == null)	
        	return "";
        else 	
		    return formatRate(this.costbrkten);
	}
	
	public String getFmCostbrktwnfive(){
        if ( costbrktwnfive == null)	
        	return "";
        else 	
        	return formatRate(this.costbrktwnfive);
	}
	public String getFmMeetingrmhsiafee(){
        if ( meetingrmhsiafee == null)	
        	return "";
        else 	
        	return formatRate(this.meetingrmhsiafee);
	}
	public String getFmNegratefifty(){
        if ( negratefifty == null)	
        	return "";
        else 	
        	return formatRate(this.negratefifty);
	}
	public String getFmNegratehund(){
        if ( negratehund == null)	
        	return "";
        else 	
        	return formatRate(this.negratehund);
	}
}



package com.marriott.rfp.object.pricing.filterLists;

import java.io.Serializable;
import java.util.List;
import java.util.Vector;

import com.marriott.rfp.object.hotelaffiliation.HotelAffiliation;
import com.marriott.rfp.object.pricing.account.RateProgram;
import com.marriott.rfp.utility.DateUtility;


public class PricingFilterSelections implements Serializable {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private PricingAccountFilterValue accountFilter;
	private RegionFilterValue areaFilter;
	private String highlightedOnly = "N";
	private Long edieProfile;
	private Long year;
	private List<HotelAffiliation> brandlist;
	private String brandAll = "Y";
	private String managed = "Y";
	private String franchised = "Y";
	private String solicittype;
	private Integer orderBy = 0;
	private String filterString;
	private Long filterMatchType = -1L;
	private Long filterMatchField = -1L;
	private FutureOpeningFilterValue futureOpeningFilter;
	private DateRangeFilterValue dateRangeFilter;
	private String report;
	private String byAccountorByHotel = "A";
	private String scheduleReport = "N";
	private String scheduleReportDate = "";
	private String scheduleReportTime = "";
	private Long hotelProfile;
	private boolean notAccepted = false;
	private boolean hotelSaidDelete = false;
	private boolean excludeGPP = false;
	private String deleteMCB = "N";
	private String pgoosType = "M";
	private String pgoosProcess;
	private String pgoosStatus;
	private Long batchId = 0L;
	private String exceldateformat = "mm/dd/yyyy";
	private String byAccountorByRPGM = "A";
	private List<RateProgram> rateProgList;

	private boolean pgoosInitialLoad = true;
	private String byYear = "N";
	private PgoosFilterLists pgoosFilter;
	private String byDateorByYear = "D";   //Y for Year D for Date
	private String sendVrpe = "";
	private String sendVrpx = "";
	private String sendProd = "";
	private String sendVrpa = "";
	private String stringBrandList = "";
	private String stringRPGMList = "";

	private String list = "";

	/* Cognos : Email Me functionality starts */
	private String emailMe="N";

	public String getEmailMe() {
		return emailMe;
	}
	public void setEmailMe(String emailMe) {
		this.emailMe = emailMe;
	}
	/* Cognos : Email Me functionality ends */

	public PricingFilterSelections() {
		this.accountFilter = new PricingAccountFilterValue();
		this.areaFilter = new RegionFilterValue();
		this.pgoosFilter = new PgoosFilterLists();
		this.dateRangeFilter = new DateRangeFilterValue();
		this.dateRangeFilter.setFromDate(DateUtility.getToday());
		this.dateRangeFilter.setToDate(DateUtility.getToday());

	}

	public PricingAccountFilterValue getAccountFilter() {
		return accountFilter;
	}

	public void setAccountFilter(PricingAccountFilterValue accountFilter) {
		this.accountFilter = accountFilter;
	}

	public RegionFilterValue getAreaFilter() {
		return areaFilter;
	}

	public void setAreaFilter(RegionFilterValue areaFilter) {
		this.areaFilter = areaFilter;
	}

	public Long getEdieProfile() {
		return edieProfile;
	}

	public void setEdieProfile(Long edieProfile) {
		this.edieProfile = edieProfile;
	}

	public Long getYear() {
		return year;
	}

	public void setYear(Long year) {
		this.year = year;
	}

	public void setBrandlist(List<HotelAffiliation> brandlist) {
		this.brandlist = brandlist;
	}

	public List<HotelAffiliation> getBrandlist() {
		return brandlist;
	}

	public void setBrandAll(String brandAll) {
		this.brandAll = brandAll;
	}

	public String getBrandAll() {
		return brandAll;
	}

	public String getStringBrandList() {
		String brandliststring = null;
		if (brandlist != null) {
			brandliststring = "";
			for (int i = 0; i < brandlist.size(); i++) {
				if (brandlist.get(i) != null) {
					if (brandliststring.length() > 0)
						brandliststring += ", ";
					brandliststring += brandlist.get(i).getAffiliationid();
				}
			}
		}
		return brandliststring;
	}

	public void setStringBrandList(String stringBrandList) {
		String[] thebrands = stringBrandList.split(",");
		brandlist = new Vector<HotelAffiliation>();
		for (int i = 0; i < thebrands.length; i++) {
			HotelAffiliation ha = new HotelAffiliation();
			ha.setAffiliationid(Integer.valueOf(thebrands[i]));
			brandlist.add(ha);
		}
	}

	public String getStringRPGMList() {
		String rpgmliststring = null;
		if (rateProgList != null) {
			rpgmliststring = "";
			for (int i = 0; i < rateProgList.size(); i++) {
				if (rateProgList.get(i) != null) {
					if (rpgmliststring.length() > 0)
						rpgmliststring += ", ";
					rpgmliststring += rateProgList.get(i).getRateProg();
				}
			}
		}
		return rpgmliststring;
	}

	public String getStringRpgmList() {
		return stringRPGMList;
	}

	public void setStringRPGMList(String stringRPGMList) {
		String[] therpgm = stringRPGMList.split(",");
		rateProgList = new Vector<RateProgram>();
		for (int i = 0; i < therpgm.length; i++) {
			RateProgram ha = new RateProgram();
			ha.setRateProg(therpgm[i]);
			rateProgList.add(ha);
		}
	}

	public void setManaged(String managed) {
		this.managed = managed;
	}

	public String getManaged() {
		return managed;
	}

	public void setFranchised(String franchised) {
		this.franchised = franchised;
	}

	public String getFranchised() {
		return franchised;
	}

	public void setHighlightedOnly(String highlightedOnly) {
		this.highlightedOnly = highlightedOnly;
	}

	public String getHighlightedOnly() {
		return highlightedOnly;
	}

	public void setSolicittype(String solicittype) {
		this.solicittype = solicittype;
	}

	public String getSolicittype() {
		return solicittype;
	}

	public void setOrderBy(Integer orderBy) {
		if (orderBy == null)
			this.orderBy = 0;
		else
			this.orderBy = orderBy;
	}

	public Integer getOrderBy() {
		return orderBy;
	}

	public void setFilterString(String filterString) {
		this.filterString = filterString;
	}

	public String getFilterString() {
		return filterString;
	}

	public void setFilterMatchType(Long filterMatchType) {
		if (filterMatchType == null)
			this.filterMatchType = -1L;
		else
			this.filterMatchType = filterMatchType;
	}

	public Long getFilterMatchType() {
		return filterMatchType;
	}

	public void setFilterMatchField(Long filterMatchField) {
		if (filterMatchField == null)
			this.filterMatchField = -1L;
		else
			this.filterMatchField = filterMatchField;
	}

	public Long getFilterMatchField() {
		return filterMatchField;
	}

	public void setFutureOpeningFilter(FutureOpeningFilterValue futureOpeningFilter) {
		this.futureOpeningFilter = futureOpeningFilter;
	}

	public FutureOpeningFilterValue getFutureOpeningFilter() {
		return futureOpeningFilter;
	}

	public void setReport(String report) {
		this.report = report;
	}

	public String getReport() {
		return report;
	}

	public boolean isNotAccepted() {
		return notAccepted;
	}

	public String getNotAccepted() {
		String stNotAccepted = "N";
		if (isNotAccepted()) {
			return "Y";
		}
		return stNotAccepted;
	}

	public void setNotAccepted(boolean notAccepted) {
		this.notAccepted = notAccepted;
	}

	public boolean isHotelSaidDelete() {
		return hotelSaidDelete;
	}

	public void setHotelSaidDelete(boolean hotelSaidDelete) {
		this.hotelSaidDelete = hotelSaidDelete;
	}

	public boolean isExcludeGPP() {
		return excludeGPP;
	}

	public String getExcludeGPP() {
		String stExcludeGPP = "N";
		if (isExcludeGPP()) {
			return "Y";
		}
		return stExcludeGPP;
	}

	public void setExcludeGPP(boolean excludeGPP) {
		this.excludeGPP = excludeGPP;
	}

	public String getDeleteMCB() {
		return deleteMCB;
	}

	public void setDeleteMCB(String deleteMCB) {
		this.deleteMCB = deleteMCB;
	}

	public String getPgoosType() {
		return pgoosType;
	}

	public void setPgoosType(String pgoosType) {
		this.pgoosType = pgoosType;
	}

	public boolean isPgoosInitialLoad() {
		return pgoosInitialLoad;
	}

	public void setPgoosInitialLoad(boolean pgoosInitialLoad) {
		this.pgoosInitialLoad = pgoosInitialLoad;
	}

	public String getByYear() {
		return byYear;
	}

	public void setByYear(String byYear) {
		this.byYear = byYear;
	}

	public PgoosFilterLists getPgoosFilter() {
		return pgoosFilter;
	}

	public void setPgoosFilter(PgoosFilterLists pgoosFilter) {
		this.pgoosFilter = pgoosFilter;
	}

	public void setDateRangeFilter(DateRangeFilterValue dateRangeFilter) {
		this.dateRangeFilter = dateRangeFilter;
	}

	public DateRangeFilterValue getDateRangeFilter() {
		return dateRangeFilter;
	}

	public void setByAccountorByHotel(String byAccountorByHotel) {
		this.byAccountorByHotel = byAccountorByHotel;
	}

	public String getByAccountorByHotel() {
		return byAccountorByHotel;
	}

	public void setScheduleReport(String scheduleReport) {
		this.scheduleReport = scheduleReport;
	}

	public String getScheduleReport() {
		return scheduleReport;
	}

	public void setScheduleReportDate(String scheduleReportDate) {
		this.scheduleReportDate = scheduleReportDate;
	}

	public String getScheduleReportDate() {
		return scheduleReportDate;
	}

	public void setScheduleReportTime(String scheduleReportTime) {
		this.scheduleReportTime = scheduleReportTime;
	}

	public String getScheduleReportTime() {
		return scheduleReportTime;
	}

	public void setHotelProfile(Long hotelProfile) {
		this.hotelProfile = hotelProfile;
	}

	public Long getHotelProfile() {
		return hotelProfile;
	}

	public String getPgoosProcess() {
		return pgoosProcess;
	}

	public void setPgoosProcess(String pgoosProcess) {
		this.pgoosProcess = pgoosProcess;
	}

	public String getPgoosStatus() {
		return pgoosStatus;
	}

	public void setPgoosStatus(String pgoosStatus) {
		this.pgoosStatus = pgoosStatus;
	}

	public Long getBatchId() {
		return batchId;
	}

	public void setBatchId(Long batchId) {
		this.batchId = batchId;
	}

	public void setExceldateformat(String exceldateformat) {
		this.exceldateformat = exceldateformat;
	}

	public String getExceldateformat() {
		return exceldateformat;
	}

	public void setByAccountorByRPGM(String byAccountorByRPGM) {
		this.byAccountorByRPGM = byAccountorByRPGM;
	}

	public String getByAccountorByRPGM() {
		return byAccountorByRPGM;
	}

	public void setRateProgList(List<RateProgram> rateProgList) {
		this.rateProgList = rateProgList;
	}

	public List<RateProgram> getRateProgList() {
		return rateProgList;
	}

	public String getByDateorByYear() {
		return byDateorByYear;
	}

	public void setByDateorByYear(String byDateorByYear) {
		this.byDateorByYear = byDateorByYear;
	}

	public String getSendVrpe() {
		return sendVrpe;
	}
	public void setSendVrpe(String sendVrpe) {
		this.sendVrpe = sendVrpe;
	}
	public String getSendVrpx() {
		return sendVrpx;
	}
	public void setSendVrpx(String sendVrpx) {
		this.sendVrpx = sendVrpx;
	}
	public String getSendProd() {
		return sendProd;
	}
	public void setSendProd(String sendProd) {
		this.sendProd = sendProd;
	}
	public String getSendVrpa() {
		return sendVrpa;
	}
	public void setSendVrpa(String sendVrpa) {
		this.sendVrpa = sendVrpa;
	}

	public String getList() {
		return list;
	}

	public void setList(String list) {
		this.list = list;
	}

}
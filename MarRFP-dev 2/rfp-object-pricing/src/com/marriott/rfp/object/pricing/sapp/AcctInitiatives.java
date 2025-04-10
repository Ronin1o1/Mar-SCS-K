package com.marriott.rfp.object.pricing.sapp;

import java.util.List;

public class AcctInitiatives {

	private Long acctinitiativeid;
	private Long accountinfoid;
	private Long seqid;
	private String initiative_name;
	private Long buyinglocid;
	private String plan_tm_lead;
	private Long init_date;
	private String action;
	private String goal;
	private Long revstreamid;
	private String revstream_other;
	private String objective;
	private String exec_plan;
	private String value_mar;
	private String value_act;
	private String results;
	private String comments;
	private Long areaplanid;
	private List<AcctTasks> acctTasks;
	
	public Long getAcctinitiativeid() {
		return acctinitiativeid;
	}
	public void setAcctinitiativeid(Long acctinitiativeid) {
		this.acctinitiativeid = acctinitiativeid;
	}
	public Long getAccountinfoid() {
		return accountinfoid;
	}
	public void setAccountinfoid(Long accountinfoid) {
		this.accountinfoid = accountinfoid;
	}
	public Long getSeqid() {
		return seqid;
	}
	public void setSeqid(Long seqid) {
		this.seqid = seqid;
	}
	public String getInitiative_name() {
		return initiative_name;
	}
	public void setInitiative_name(String initiative_name) {
		this.initiative_name = initiative_name;
	}
	public String getPlan_tm_lead() {
		return plan_tm_lead;
	}
	public void setPlan_tm_lead(String plan_tm_lead) {
		this.plan_tm_lead = plan_tm_lead;
	}
	public Long getInit_date() {
		return init_date;
	}
	public void setInit_date(Long init_date) {
		this.init_date = init_date;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getGoal() {
		return goal;
	}
	public void setGoal(String goal) {
		this.goal = goal;
	}
	public Long getRevstreamid() {
		return revstreamid;
	}
	public void setRevstreamid(Long revstreamid) {
		this.revstreamid = revstreamid;
	}
	public String getRevstream_other() {
		return revstream_other;
	}
	public void setRevstream_other(String revstream_other) {
		this.revstream_other = revstream_other;
	}
	public String getObjective() {
		return objective;
	}
	public void setObjective(String objective) {
		this.objective = objective;
	}
	public String getExec_plan() {
		return exec_plan;
	}
	public void setExec_plan(String exec_plan) {
		this.exec_plan = exec_plan;
	}
	public String getValue_mar() {
		return value_mar;
	}
	public void setValue_mar(String value_mar) {
		this.value_mar = value_mar;
	}
	public String getValue_act() {
		return value_act;
	}
	public void setValue_act(String value_act) {
		this.value_act = value_act;
	}
	public String getResults() {
		return results;
	}
	public void setResults(String results) {
		this.results = results;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public Long getAreaplanid() {
		return areaplanid;
	}
	public void setAreaplanid(Long areaplanid) {
		this.areaplanid = areaplanid;
	}
	public Long getBuyinglocid() {
		return buyinglocid;
	}
	public void setBuyinglocid(Long buyinglocid) {
		this.buyinglocid = buyinglocid;
	}
	public List<AcctTasks> getAcctTasks() {
		return acctTasks;
	}
	public void setAcctTasks(List<AcctTasks> acctTasks) {
		this.acctTasks = acctTasks;
	}
	
	
}
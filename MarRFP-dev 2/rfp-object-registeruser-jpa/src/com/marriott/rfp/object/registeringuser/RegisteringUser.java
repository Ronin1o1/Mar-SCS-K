package com.marriott.rfp.object.registeringuser;

import java.util.List;

import com.marriott.rfp.object.user.User;


/**
 * Entity implementation class for Entity: RegistringUser
 *
 */

public class RegisteringUser  extends User {

	
	private static final long serialVersionUID = 1L;

	private String groupName;
	private String jmsReqId;
	private String addType;
	private List<String> addList;
	private String deleteType;
	private List<String> deleteList;
	
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private String city;	
	private String country;
	private String state;
	
	
	
	
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getJmsReqId() {
		return jmsReqId;
	}
	public void setJmsReqId(String jmsReqId) {
		this.jmsReqId = jmsReqId;
	}
	public String getAddType() {
		return addType;
	}
	public void setAddType(String addType) {
		this.addType = addType;
	}
	public List<String> getAddList() {
		return addList;
	}
	public void setAddList(List<String> addList) {
		this.addList = addList;
	}
	public String getDeleteType() {
		return deleteType;
	}
	public void setDeleteType(String deleteType) {
		this.deleteType = deleteType;
	}
	public List<String> getDeleteList() {
		return deleteList;
	}
	public void setDeleteList(List<String> deleteList) {
		this.deleteList = deleteList;
	}
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	
	
}

package com.marriott.rfp.object.wholesaler.hotel;

import java.io.Serializable;

public class HotelInfo implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private long hotelid; 
	private String marshacode;
	private String hotelName;
	private String country;
	private String city;
	private String address1;
	private String address2;
	private String zip;
	private String state;
	private String province;
	private String mainphone;
	private String mainfax;
	private String Location;
	private String airport1code;
	private String airport1name;
	private String airport1transtype;
	private String airport1transfee;
	private String airport1transtype2;
	private String airport1transfee2;
	private String airport2code;
	private String airport2name;
	private String airport2transtype;
	private String airport2transfee;
	private String airport2transtype2;
	private String airport2transfee2;
	private String airport3code;
	private String airport3name;
	private String airport3transtype;
	private String airport3transfee;
	private String airport3transtype2;
	private String airport3transfee2;
	private StringBuffer message = new StringBuffer("");
	private int messagecount = 0;
	private String ziprequried;
	private long affiliationid;
	
	public long getHotelid() {
		return hotelid;
	}
	
	public void setHotelid(long hotelid) {
		this.hotelid = hotelid;
	}
	
	public String getCity() {
		return city;
	}
	
	public void setCity(String city) {
		this.city = city;
		if(city==null || city.equals("") ){
			setMessage("City");	
	   }
	}
	
	public String getMarshacode() {
		return marshacode;
	}
	
	public void setMarshacode(String marshacode) {
		this.marshacode = marshacode;
	}
	
	public String getHotelName() {
		return hotelName;
	}
	
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	
	public String getCountry() {
		return country;
	}
	
	public void setCountry(String country) {
		this.country = country;
		if(country==null || country.equals("") ){
			setMessage("Country");	
	   }
	}
	
	public String getAddress1() {
		return address1;
	}
	
	public void setAddress1(String address1) {
		this.address1 = address1;
		if(address1==null || address1.equals("") ){
			setMessage("Address 1");	
	   }
	}
	
	public String getAddress2() {
		return address2;
	}
	
	public void setAddress2(String address2) {
		this.address2 = address2;
	}
	
	public String getZip() {
		return zip;
	}
	
	public void setZip(String zip) {
		this.zip = zip;
	}
	
	public String getState() {
		return state;
	}
	
	public void setState(String state) {
		this.state = state;
	}
	
	public String getProvince() {
		return province;
	}
	
	public void setProvince(String province) {
		this.province = province;
	}
	
	public String getMainphone() {
		return mainphone;
	}
	
	public void setMainphone(String mainphone) {
		this.mainphone = mainphone;
		if(mainphone==null || mainphone.equals("") ){
			setMessage("Main Phone");	
	   }
	}
	
	public String getMainfax() {
		return mainfax;
	}
	
	public void setMainfax(String mainfax) {
		this.mainfax = mainfax;
		if(mainfax==null || mainfax.equals("") ){
			setMessage("Main Fax");	
	   }
	}
	
	public String getLocation() {
		return Location;
	}
	
	public void setLocation(String location) {
		Location = location;
		if(location==null || location.equals("") ){
			setMessage("Area/Location");	
	   }
	}
	
	public String getAirport1code() {
		return airport1code;
	}
	
	public void setAirport1code(String airport1code) {
		this.airport1code = airport1code;
		if(airport1code==null || airport1code.equals("") ){
			setMessage("Airport Code 1");	
	   }
	}
	
	public String getAirport1name() {
		return airport1name;
	}
	
	public void setAirport1name(String airport1name) {
		this.airport1name = airport1name;
		if(airport1name==null || airport1name.equals("") ){
			setMessage("Airport Name 1");	
	   }
	}
	
	public String getAirport1transtype() {
		return airport1transtype;
	}
	
	public void setAirport1transtype(String airport1transtype) {
		this.airport1transtype = airport1transtype;
		if(airport1transtype==null || airport1transtype.equals("") ){
			setMessage("One-way Transportation Type Airport 1");	
	   }
	}
	
	public String getAirport1transfee() {
		return airport1transfee;
	}
	
	public void setAirport1transfee(String airport1transfee) {
		this.airport1transfee = airport1transfee;
		if(airport1transfee==null || airport1transfee.equals("") ){
			setMessage("One-way Transportation Cost Airport 1");	
	   }
	}
	
	public String getAirport1transtype2() {
		return airport1transtype2;
	}
	
	public void setAirport1transtype2(String airport1transtype2) {
		this.airport1transtype2 = airport1transtype2;
	}
	
	public String getAirport1transfee2() {
		return airport1transfee2;
	}
	
	public void setAirport1transfee2(String airport1transfee2) {
		this.airport1transfee2 = airport1transfee2;
	}
	
	public String getAirport2code() {
		return airport2code;
	}
	
	public void setAirport2code(String airport2code) {
		this.airport2code = airport2code;
	}
	
	public String getAirport2name() {
		return airport2name;
	}
	
	public void setAirport2name(String airport2name) {
		this.airport2name = airport2name;
	}
	
	public String getAirport2transtype() {
		return airport2transtype;
	}
	
	public void setAirport2transtype(String airport2transtype) {
		this.airport2transtype = airport2transtype;
	}
	
	public String getAirport2transfee() {
		return airport2transfee;
	}
	
	public void setAirport2transfee(String airport2transfee) {
		this.airport2transfee = airport2transfee;
	}
	
	public String getAirport2transtype2() {
		return airport2transtype2;
	}
	
	public void setAirport2transtype2(String airport2transtype2) {
		this.airport2transtype2 = airport2transtype2;
	}
	
	public String getAirport2transfee2() {
		return airport2transfee2;
	}
	
	public void setAirport2transfee2(String airport2transfee2) {
		this.airport2transfee2 = airport2transfee2;
	}
	
	public String getAirport3code() {
		return airport3code;
	}
	
	public void setAirport3code(String airport3code) {
		this.airport3code = airport3code;
	}
	
	public String getAirport3name() {
		return airport3name;
	}
	
	public void setAirport3name(String airport3name) {
		this.airport3name = airport3name;
	}
	
	public String getAirport3transtype() {
		return airport3transtype;
	}
	
	public void setAirport3transtype(String airport3transtype) {
		this.airport3transtype = airport3transtype;
	}
	
	public String getAirport3transfee() {
		return airport3transfee;
	}
	
	public void setAirport3transfee(String airport3transfee) {
		this.airport3transfee = airport3transfee;
	}
	
	public String getAirport3transtype2() {
		return airport3transtype2;
	}
	
	public void setAirport3transtype2(String airport3transtype2) {
		this.airport3transtype2 = airport3transtype2;
	}
	
	public String getAirport3transfee2() {
		return airport3transfee2;
	}
	
	public void setAirport3transfee2(String airport3transfee2) {
		this.airport3transfee2 = airport3transfee2;
	}
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public String getMessage() {
		if (this.message != null)
			return message.toString();
		else
			return null;
	}
	
	public void setMessage(String message) {
		if (messagecount == 0) {
			this.message.append("The following data is MISSING. \\nPlease update in EPIC before proceeding:\\n\\n");
			this.message.append(message + "\\n" );
		} else {			
			this.message.append(message + "\\n" );
			messagecount ++ ;
		}	
		messagecount ++ ;
	}
	
	public int getMessagecount() {
		return messagecount;
	}
	
	public void setMessagecount(int messagecount) {
		this.messagecount = messagecount;
	}
	
	public String getZiprequried() {
		return ziprequried;
	}
	
	public void setZiprequried(String ziprequried) {
		this.ziprequried = ziprequried;
		if(ziprequried != null && ziprequried.equals("Y") ){
			setMessage("Zip Code");	
	   }
	}

	public long getAffiliationid() {
		return affiliationid;
	}

	public void setAffiliationid(long affiliationid) {
		this.affiliationid = affiliationid;
	}
	
}
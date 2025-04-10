package com.marriott.rfp.object.pgoos;


public class PublishHotelResponse {

	private static final String DELIMITER = "|";
	private Long hotelid;
	private String status;
	private String source;
	
	
	private String[] errorCodes;
	private String[] errorMsgs;


	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}


	public String[] getErrorCodes() {
		return errorCodes;
	}

	public void setErrorCodes(String[] errorCodes) {
		this.errorCodes = errorCodes;
	}

	public String[] getErrorMsgs() {
		return errorMsgs;
	}

	public void setErrorMsgs(String[] errorMsgs) {
		this.errorMsgs = errorMsgs;
	}


	private String generateDelimitedString(String[] msgs) {
		StringBuilder builder = new StringBuilder();
		if (msgs != null) {
			builder.append(msgs.length);
			for (String msg : msgs) {
				builder.append(DELIMITER).append(msg);
			}
		}

		return builder.toString();
	}

	private String generateLengthDelimitedString(String[]msgs, int maxlen) {
		String msg=generateDelimitedString(msgs);
		if (msg !=null && msg.length()>maxlen) 
			return msg.substring(0, maxlen-1);
		else
			return msg;
	}
	public String getErrorMessagesAsDelimitedString(){
		String[] eMsgs = getErrorMsgs();
		return generateLengthDelimitedString(eMsgs,4000);
	}
	
	public String getErrorCodesAsDelimitedString(){
		String[] eCodes = getErrorCodes();
		return generateDelimitedString(eCodes);
	}
	

	public Long getHotelid() {
		return hotelid;
	}

	public void setHotelid(Long hotelid) {
		this.hotelid = hotelid;
	}


}


package com.marriott.rfp.mq.data.client.common;

public class RFPMQException extends Exception {

	private static final long serialVersionUID = 3498476168047496048L;
	  private final String errorCode;
	  
	  public RFPMQException(String message, String errorCode)
	  {
	    super(message);
	    this.errorCode = errorCode;
	  }
	  
	  public RFPMQException(Throwable cause, String errorCode)
	  {
	    super(cause);
	    this.errorCode = errorCode;
	  }
	  
	  public RFPMQException(String message, Throwable cause, String errorCode)
	  {
	    super(message, cause);
	    this.errorCode = errorCode;
	  }
	  
	  public String getErrorCode()
	  {
	    return this.errorCode;
	  }
}

package com.marriott.marrfp.batch.core;

import java.io.File;
import java.io.Serializable;
import java.util.List;
import java.util.Vector;

public class SendEmail implements Serializable {
    /**
	 * 
	 */
    private static final long serialVersionUID = 1L;
    private String bcc;
    private String from;
    private boolean highimportance = false;
    private String htmlTextMessage;
    private String plainTextMessage;
    private String subject;
    private List<String> to;
    private List<String> cc;
    private File myFile;
    private String fileName;
    
    public SendEmail(String from, String to, String subject, String plainMessage, String htmlMessage, boolean highimportance) {
	this.from = from;
	setTo(to);
	this.subject = subject;
	this.plainTextMessage = plainMessage;
	this.htmlTextMessage = htmlMessage;
	this.highimportance = highimportance;
    }

    public SendEmail(String from, String to, String bcc, String subject, String plainMessage, String htmlMessage, boolean highimportance) {
	this.from = from;
	setTo(to);
	this.bcc = bcc;
	this.subject = subject;
	this.plainTextMessage = plainMessage;
	this.htmlTextMessage = htmlMessage;
	this.highimportance = highimportance;
    }

    public SendEmail(String from, List<String> to, String subject, String plainMessage, String htmlMessage, boolean highimportance) {
	this.from = from;
	this.to = to;
	this.subject = subject;
	this.plainTextMessage = plainMessage;
	this.htmlTextMessage = htmlMessage;
	this.highimportance = highimportance;
    }

    public SendEmail(String from, List<String> to, String bcc, String subject, String plainMessage, String htmlMessage, boolean highimportance) {
	this.from = from;
	this.to = to;
	this.bcc = bcc;
	this.subject = subject;
	this.plainTextMessage = plainMessage;
	this.htmlTextMessage = htmlMessage;
	this.highimportance = highimportance;
    }

    public SendEmail(String from, List<String> to, List<String> cc, String bcc, String subject, String plainMessage, String htmlMessage,
	    boolean highimportance) {
	this.from = from;
	setTo(to);
	this.cc = cc;
	this.bcc = bcc;
	this.subject = subject;
	this.plainTextMessage = plainMessage;
	this.htmlTextMessage = htmlMessage;
	this.highimportance = highimportance;
    }

    public SendEmail(String from, List<String> to, List<String> cc, String bcc, String subject, String plainMessage, String htmlMessage,
    	boolean highimportance, File myFile, String fileName) {
    	this.from = from;
    	setTo(to);
    	this.cc = cc;
    	this.bcc = bcc;
    	this.subject = subject;
    	this.plainTextMessage = plainMessage;
    	this.htmlTextMessage = htmlMessage;
    	this.highimportance = highimportance;
    	this.myFile = myFile;
    	this.fileName = fileName;
    }
        
	public File getMyFile() {
		return myFile;
	}

	public void setMyFile(File myFile) {
		this.myFile = myFile;
	}    

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
    	
    public String getBcc() {
	return bcc;
    }

    public void setBcc(String bcc) {
	this.bcc = bcc;
    }

    public String getFrom() {
	return from;
    }

    public void setFrom(String from) {
	this.from = from;
    }

    public boolean getHighimportance() {
	return highimportance;
    }

    public void setHighimportance(boolean highimportance) {
	this.highimportance = highimportance;
    }

    public String getHtmlTextMessage() {
	return htmlTextMessage;
    }

    public void setHtmlTextMessage(String htmlTextMessage) {
	this.htmlTextMessage = htmlTextMessage;
    }

    public String getPlainTextMessage() {
	return plainTextMessage;
    }

    public void setPlainTextMessage(String plainTextMessage) {
	this.plainTextMessage = plainTextMessage;
    }

    public String getSubject() {
	return subject;
    }

    public void setSubject(String subject) {
	this.subject = subject;
    }

    public List<String> getTo() {
	return to;
    }

    public void setTo(List<String> to) {
	this.to = to;
    }

    public void setTo(String toPerson) {
	this.to = new Vector<String>();
	to.add(toPerson);
    }

    public List<String> getCc() {
	return cc;
    }

    public void setCc(List<String> cc) {
	this.cc = cc;
    }

}

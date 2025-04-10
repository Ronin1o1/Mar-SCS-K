package com.marriott.marrfp.batch.core;

import java.util.List;
import java.util.Vector;

import org.apache.log4j.Logger;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.marriott.marrfp.batch.core.Contact;
import com.marriott.marrfp.batch.core.HotelSolicitationEmail;
import com.marriott.marrfp.batch.core.SendEmail;
import com.marriott.marrfp.batch.core.SendEmailManagerImpl;
import com.marriott.marrfp.batch.core.BaseTask;
import com.marriott.marrfp.batch.core.Context;
import com.marriott.marrfp.batch.core.AccountDetail;
import com.marriott.marrfp.batch.core.EmailValidator;
import com.marriott.marrfp.batch.dao.HotelSolicitationManagerDao;

public class PortfolioServiceImpl extends BaseTask {
	
	private static final Logger logger = Logger.getLogger(PortfolioServiceImpl.class);
	
	ClassPathXmlApplicationContext classPathXmlApplicationContext = new ClassPathXmlApplicationContext("chaseemail_batch_context.xml");
	
	HotelSolicitationManagerDao dao = classPathXmlApplicationContext.getBean("hotelSolicitationManagerDao", HotelSolicitationManagerDao.class);
	HotelSolicitationEmail hotelSolicitationEmail = new HotelSolicitationEmail();// = classPathXmlApplicationContext.getBean("hotelSolicitationEmail", HotelSolicitationEmail.class); 
	HotelSolicitationEmail m = new HotelSolicitationEmail();
	Contact salesContacts = new Contact();
	Contact maesalesContacts = new Contact();
	SendEmailManagerImpl sendEmailManager = new SendEmailManagerImpl();;
	AccountDetail accountDetail = new AccountDetail();
	EmailValidator emailValidator = new EmailValidator();
	boolean mailsend = true;
	String status, statusFrom = null;
		
	public HotelSolicitationManagerDao getDao() {
		return dao;
	}

	public void setDao(HotelSolicitationManagerDao dao) {
		this.dao = dao;
	}
	
	
	public boolean generateChaseEmailBatch(Long accountrecid, Long hotelid, Long period, String user,
			String addemailtext_screentype, Context context, Long batchid) {
		
		
		boolean bSent = false;
		try {
			m = getEmailData(accountrecid, hotelid, period, addemailtext_screentype);
			if (m != null && m.getSendTo() != null && m.getSendTo().size() > 0 && m.getSendFrom() != null && mailsend == true) {
				try {
					if (m.getSendFrom() != null) {
						boolean result = emailValidator.validateEmail(m.getSendFrom());
						
						if (result == false) {
							if (status != null)
								statusFrom = "Account Leader, ";
							else
								statusFrom = "Account Leader";
							
						}
					}
					if (status != null || statusFrom != null) {
						if (status != null) {
							if (statusFrom != null)
								statusFrom = statusFrom + status;
							else
								statusFrom = status;
						}	
						statusFrom += " email not valid.";
					}
					
					logger.info("status "+ status);
					logger.info("statusFrom "+ statusFrom);
					logger.info("m.getSendFrom() "+ m.getSendFrom());
					logger.info("m.getSendTo() "+ m.getSendTo());
					logger.info("m.getSendCC() "+ m.getSendCC());
					logger.info("m.getSendBCC() "+ m.getSendBCC());
					try {
					sendEmailManager.sendEmail(new SendEmail(m.getSendFrom(), m.getSendTo(), m.getSendCC(), m.getSendBCC(),
							getChaseSubject(m), getChasePlainBodyPart(m), getChaseHtmlBodyPart(m), true));
					
					} catch (Exception e) {
						logger.info("Exception in send email manager"+e);
						e.printStackTrace();
					}
					bSent = true;
					logger.info("Email sent successfully");
					dao.updateChaseEmailMissingData(accountrecid, hotelid, statusFrom, batchid, "Y");
					
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			else {
				accountDetail = dao.getAccountHotelDetail(accountrecid, hotelid);
				bSent = false;
				
				if ( m.getSendTo() == null && m.getSendFrom() == null) {
					logger.info("Account Leader & Pricing contact email missing for hotel "+ accountDetail.getMarshacode() + " in account " + accountDetail.getAccountname());
					dao.updateChaseEmailMissingData(accountrecid, hotelid, "Account Leader & Pricing contact Email missing.", batchid, "N");
				}
				if ( m.getSendFrom() == null ) {
					logger.info("Account Leader email missing for hotel "+ accountDetail.getMarshacode() + " in account " + accountDetail.getAccountname());
					dao.updateChaseEmailMissingData(accountrecid, hotelid, "Account Leader Email missing.", batchid, "N");
				}
				if ( m.getSendTo() == null ) {
					logger.info("Pricing contact email missing for hotel "+ accountDetail.getMarshacode() + " in account " + accountDetail.getAccountname());
					dao.updateChaseEmailMissingData(accountrecid, hotelid, "Pricing contact Email missing.", batchid, "N");
				}
				if (mailsend == false) {
					if (status != null)
						dao.updateChaseEmailMissingData(accountrecid, hotelid, "Pricing contact 1 email not valid.", batchid, "N");
					else
						dao.updateChaseEmailMissingData(accountrecid, hotelid, "Pricing contact 1 email missing.", batchid, "N");
				}
			}
		} catch (Exception e) {
			bSent = false;
			
		}
		
		if (bSent != false) {
			dao.updateEmailSentBatch(accountrecid, hotelid, bSent, user, "chasemail");
		}
		return bSent;
	}


	public HotelSolicitationEmail getEmailData(Long accountrecid, Long hotelid, Long period,
			String addemailtext_screentype) {
		
		try {
			hotelSolicitationEmail = (HotelSolicitationEmail) dao.getEmailBodyData(accountrecid, hotelid,
					addemailtext_screentype);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		hotelSolicitationEmail.setAccountQuestions(dao.getEmailBodyDataQuestions(accountrecid));
		
		List<String> sendTo = new Vector<String>();
		
		List<String> respondentList1 = dao.getEmailBodyDataRespondents(hotelid, period);
		if ( respondentList1.get(0) != null ) {
			
			boolean result = emailValidator.validateEmail(respondentList1.get(0));
			if (result == false ) {
				mailsend = false;
				status = "Pricing Contact 1";
			}
		}
		
		List<String> respondentList2 = dao.getEmailBodyDataRespondents2(hotelid, period,
				addemailtext_screentype);
		List<RespondentEmail> respondentEmail = dao.getEmailBodyDataRespondents3(hotelid, period,
				addemailtext_screentype);
		
		for (RespondentEmail respondent : respondentEmail) {
			if (respondent.getEmail() != null && mailsend != false) {
				boolean result = true;
				try {
					result = emailValidator.validateEmail(respondent.getEmail());
				} catch (Exception e) {
					logger.info("respondent.getEmail() "+ respondent.getEmail());
					e.printStackTrace();
				}
				if (result == false ) {
					if ( respondent.getEmailtypeid().equals("1")) {
						if ( status != null)
							status += ", Pricing Contact 2";
						else
							status = "Pricing Contact 2";
					}
					if ( respondent.getEmailtypeid().equals("2")) {
						if ( status != null)
							status += ", Pricing Contact 3";
						else
							status = "Pricing Contact 3";
					}
					if ( respondent.getEmailtypeid().equals("3")) {
						if ( status != null)
							status += ", Pricing Contact 4";
						else
							status = "Pricing Contact 4";
					}
				}
			}
		}
		
		List<String> respondentList = new Vector<String>();
		respondentList.addAll(respondentList1);
		for (int i = 0; i < respondentList2.size(); i++) {
			boolean result = emailValidator.validateEmail(respondentList2.get(i));
			if (result == true) {
				respondentList.add(respondentList2.get(i));	
			}
		}
		//respondentList.add(respondentList2.get(i));
		sendTo.addAll(respondentList);
		hotelSolicitationEmail.setHotelRespondents(respondentList);
		
		try {
		salesContacts = dao.getEmailBodyDataSalesContact(hotelid, accountrecid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if (salesContacts != null) {
			hotelSolicitationEmail.setSalesContact(salesContacts.getContactname());
			hotelSolicitationEmail.setSalesContactEmail(salesContacts.getContactemail());
			if (addemailtext_screentype != null && !addemailtext_screentype.equalsIgnoreCase("R")) {
				if (salesContacts.getContactemail() != null)
					sendTo.add(salesContacts.getContactemail());
			}
		}
		hotelSolicitationEmail.setSendTo(sendTo);
		
		maesalesContacts = dao.getEmailBodyDataMAESalesContact(hotelid, accountrecid);
		if (maesalesContacts != null) {
			hotelSolicitationEmail.setMaeContact(maesalesContacts.getContactname());
			hotelSolicitationEmail.setMaeContactEmail(maesalesContacts.getContactemail());
		}
		if (hotelSolicitationEmail.getSendfromtype() != null && hotelSolicitationEmail.getSendfromtype() == 8L
				&& hotelSolicitationEmail.getBtamContactEmail() != null
				&& !hotelSolicitationEmail.getBtamContactEmail().trim().equals("")) {
			hotelSolicitationEmail.setSendFrom(hotelSolicitationEmail.getBtamContactEmail());
			hotelSolicitationEmail.setSendBCC(hotelSolicitationEmail.getBtamContactEmail());
		} else {
			if (hotelSolicitationEmail.getGlobalContactEmail() != null
					&& !hotelSolicitationEmail.getGlobalContactEmail().trim().equals("")) {
				hotelSolicitationEmail.setSendFrom(hotelSolicitationEmail.getGlobalContactEmail());
				hotelSolicitationEmail.setSendBCC(hotelSolicitationEmail.getGlobalContactEmail());
			}
		}
		if (hotelSolicitationEmail.getSendfromtype() != 8L && hotelSolicitationEmail.getBtamContactEmail() != null) {
			List<String> sendCC = new Vector<String>();
			sendCC.add(hotelSolicitationEmail.getBtamContactEmail());
			hotelSolicitationEmail.setSendCC(sendCC);
		}
		hotelSolicitationEmail.setAdditionalText(dao.getConstantsDetails("ADD_EMAIL_TEXT"));
		hotelSolicitationEmail.setSiteUrl(dao.getConstantsDetails("SITE_URL"));
		hotelSolicitationEmail.setPricingContactsUrl(dao.getConstantsDetails("PRICINGCONTACTS_URL"));
		return hotelSolicitationEmail;
	}
	
	public String getChaseSubject(HotelSolicitationEmail m) {
		String subject = "Reminder for " + m.getPeriod() + " Pricing from " + m.getAccountname() + " - "
				+ m.getHotelname() + " (" + m.getMarshacode() + ") - Due in MarRFP no later than " + m.getDuedate() + "";
		return subject;
	}
	
	public String getChasePlainBodyPart(HotelSolicitationEmail m) {

		String body = "";
		if (m.getAdditionalText() != null && !m.getAdditionalText().trim().equals(""))
			body += m.getAdditionalText() + "\n\n\n\n";
		body += "**If you are not responsible for BT pricing, please forward to the appropriate person.**&nbsp;\n\n";
		body += "" + m.getAccountname() + "<b>:</b>&nbsp;" + m.getPeriod()
				+ "&nbsp;<b>Hotel Program RFP - Rates in MarRFP are due on</b> &nbsp;" + m.getDuedate() + "\n\n";
		body += " Action Required by &nbsp;" + m.getDuedate() + "&nbsp; \n\n";
		body += "Greetings from Marriott Global Sales!  The due date for participating in the &nbsp;" + m.getPeriod()
				+ "&nbsp; RFP for " + m.getAccountname() + "";
		body += "is&nbsp;" + m.getDuedate() + ".&nbsp;According to MarRFP,&nbsp;" + m.getHotelname() + " ("
				+ m.getMarshacode() + "&nbsp;) was specifically requested by &nbsp;" + m.getAccountname()
				+ "&nbsp;and has not yet responded and/or completed the BT & Group Account Questions in MarRFP.\n\n";
		body += "\n\n";
		body += "\n\n";
		// free from text
		if (m.getFreeFormText() != null && !m.getFreeFormText().trim().equals(""))
			body += "<b>";
		body += m.getFreeFormText() + "\n\n";
		body += "</b>";

		body += "If your property is interested in offering a discounted account specific rate, please log into MarRFP";
		body += " select the <b>Volume Producer</b> option (Volume Producer, Gov Volume Producer, Float Volume Producer), price accordingly, and be sure to complete the cancellation policy question and BT & Group Account Questions, if applicable.\n\n";
		body += "\n\n";

		body +="If your property is not interested in offering a discounted account specific rate, please log into MarRFP and click on the <b>No Bid</b> radio button and select the applicable No Bid reason so that we can communicate your No Bid reason to the client.";
	    body +="For GPP accounts, selecting No Bid will still allow your hotel’s GPP rates to be centrally loaded.";
	    body += "\n\n";
		
		body += "This will be your final opportunity to price as no extensions may be granted. If you have not entered a";
		body += "Volume Producer (VP) rate in MarRFP by the close of business on ," + m.getDuedate()
				+ ", your property may not";
		body += "be presented to the client.\n\n";
		body += "\n\n";

		// Contacts
		if ((m.getGlobalContact() != null && !m.getGlobalContact().trim().equals(""))
				|| ((m.getBtamContact() != null && !m.getBtamContact().trim().equals("")))) {
			body += "For account specific questions, please feel free to contact the following account leaders:\n\n";

			if (m.getGlobalContact() != null && !m.getGlobalContact().trim().equals(""))
				body += "Global Account Executive - " + m.getGlobalContact() + ", " + m.getGlobalContactEmail()
						+ "\n\n";
			if (m.getBtamContact() != null && !m.getBtamContact().trim().equals(""))
				body += "Business Travel Account Manager - " + m.getBtamContact() + ", " + m.getBtamContactEmail()
						+ "\n\n";
		}

		// emails sent to
		List<String> re = m.getHotelRespondents();
		if (re.size() > 0) {
			body += "\n\n Emails were sent to the following RFP Respondents:\n\n";
			for (int j = 0; j < re.size(); j++) {
				body += "    Email " + j + ": " + re.get(j) + "\n";
			}
			body += "\n\n";
		}

		/*
		 * if (m.getSalesContactEmail() != null && !m.getSalesContactEmail().equals(""))
		 * body += "Sales Contact for " + m.getAccountname() + " at this hotel: " +
		 * m.getSalesContactEmail() + "\n\n";
		 */

		body += "For MarRFP or pricing assistance, please contact PAS at &nbsp;" + m.getAdminEmail() + ".\n\n";
		return body;	}

	public String getChaseHtmlBodyPart(HotelSolicitationEmail m) {

		String body = "<HTML><BODY><table style=\"font-family: Arial;font-size: 12px\" cellpadding=\"1\" cellspacing=\"1\" border=\"0\">";
		if (m.getAdditionalText() != null && !m.getAdditionalText().trim().equals(""))
			body += "<tr><td><H1>" + m.getAdditionalText() + "</H1></td></tr>";
		body += "<tr><td>**If you are not responsible for BT pricing, please forward to the appropriate person.**</td></tr><tr><td>&nbsp;</td></tr>";
		body += "<tr><td><b>" + m.getAccountname() + ":&nbsp;" + m.getPeriod()
        + "&nbsp;<b>Hotel Program RFP - Rates in MarRFP are due no later than " + m.getDuedate() + "</b></tr></td>";
         // free from text
        if (m.getFreeFormText() != null && !m.getFreeFormText().trim().equals(""))
        body += "<tr><td><b>" + m.getFreeFormText() + "</b></td></tr><tr><td>&nbsp;</td></tr>";
        body += "<tr><td> Action Required no later than " + m.getDuedate() + " </td></tr>";
        body += "<tr><td>&nbsp;</td></tr>";
		body += "<tr><td>Greetings from Marriott Global Sales!  The due date for participating in the " + m.getPeriod()
				+ " RFP for " + m.getAccountname() + "";
		body += " is " + m.getDuedate() + ". According to MarRFP,&nbsp;" + m.getHotelname() + " (" + m.getMarshacode()
				+ ") was specifically requested by " + m.getAccountname()
				+ " and has not yet responded and/or completed the BT & Group Account Questions in MarRFP.</td></tr>";
		body += "<tr><td>&nbsp;</td></tr>";
						
		body += "<tr><td>If your property is interested in offering a discounted account specific rate, please log into MarRFP";
		body += " select the <b>Volume Producer</b> option (Volume Producer, Float Volume Producer), price accordingly, and be sure to complete the cancellation policy question and BT & Group Account Questions, if applicable.&nbsp;</td></tr>";
		body += "<tr><td>&nbsp;</td></tr>";

		body +="<tr><td>If your hotel is not interested in submitting a discounted account specific rate, please log into MarRFP and click on the <b>No Bid</b> radio button and select the applicable <b>No Bid Reason</b> This includes GPP accounts where the property is unable to offer more than the GPP discount.</td></tr>";
		body += "<tr><td>&nbsp;</td></tr>";		

		body += " <tr><td>This will be your final opportunity to price as no extensions may be granted. If you have not entered a ";
		body += "Volume Producer (VP) rate in MarRFP by the close of business on " + m.getDuedate()
				+ ",&nbsp;your property may not ";
		body += "be presented to the client.</td></tr>";
		body += "<td><tr>";

		if ((m.getGlobalContact() != null && !m.getGlobalContact().trim().equals(""))
				|| ((m.getBtamContact() != null && !m.getBtamContact().trim().equals("")))) {
			body += "<tr><td>For account specific questions, please feel free to contact the following account leaders:</td></tr>";
			if (m.getGlobalContact() != null && !m.getGlobalContact().trim().equals(""))
				body += "<tr><td>Global Account Executive - " + m.getGlobalContact() + ", " + m.getGlobalContactEmail()
						+ "</td></tr>";
			if (m.getBtamContact() != null && !m.getBtamContact().trim().equals(""))
				body += "<tr><td>Business Travel Account Manager - " + m.getBtamContact() + ", "
						+ m.getBtamContactEmail() + "</td></tr>";
		}

		// emails sent to
		List<String> re = m.getHotelRespondents();
		if (re.size() > 0) {
			body += "<tr><td>&nbsp;</td></tr><tr><td>Emails were sent to the following RFP Respondents:</td></tr>";
			body += "<tr><td><UL>";
			for (int j = 0; j < re.size(); j++) {
				int k = j + 1;
				body += "<li>Email " + k + ": " + re.get(j) + "</li>";
			}
			body += "</UL></td></tr><tr><td>&nbsp;</td></tr>";
		}
		// if (m.getSalesContactEmail() != null && !m.getSalesContactEmail().equals(""))
		// body += "<tr><td>Sales Contact for " + m.getAccountname() + " at this hotel:
		// " + m.getSalesContactEmail() + "</td></tr><tr><td>&nbsp;</td></tr>";

		body += "<tr><td>&nbsp;</td></tr>";
		body += "<tr><td>For MarRFP or pricing assistance, please contact PAS at &nbsp;" + m.getAdminEmail()
			+ " or review PAS MGS Page for <a href=\"" + m.getPricingContactsUrl() + "\">Hotel Pricing Contacts</a> for job aids and resources.</td></tr>";
		body += "</table></BODY></HTML>";
		return body;

	}
		
}
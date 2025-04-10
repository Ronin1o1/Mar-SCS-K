package com.marriott.rfp.business.pricing.portfolio.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.marriott.rfp.business.pricing.portfolio.api.PortfolioService;
import com.marriott.rfp.dataaccess.constants.api.RFPConstantsManager;
import com.marriott.rfp.dataaccess.sendemail.api.SendEmailManager;
import com.marriott.rfp.dataaccess.user.api.UserManager;
import com.marriott.rfp.dataacess.pricing.account.api.AccountManager;
import com.marriott.rfp.dataacess.pricing.accountregistration.api.AccountRegistrationManager;
import com.marriott.rfp.dataacess.pricing.accountsegment.api.AccountSegmentManager;
import com.marriott.rfp.dataacess.pricing.accountthirdparty.api.AccountThirdPartyManager;
import com.marriott.rfp.dataacess.pricing.hotel.api.HotelPGOOSMaintenanceManager;
import com.marriott.rfp.dataacess.pricing.period.api.PeriodManager;
import com.marriott.rfp.dataacess.pricing.portfolio.api.AccountStatusListManager;
import com.marriott.rfp.dataacess.pricing.portfolio.api.AccountStatusRefManager;
import com.marriott.rfp.dataacess.pricing.portfolio.api.CBCRequestManager;
import com.marriott.rfp.dataacess.pricing.portfolio.api.HotelSolicitationManager;
import com.marriott.rfp.dataacess.pricing.portfolio.api.PortfolioOrganizationManager;
import com.marriott.rfp.dataacess.pricing.portfolio.api.PortfolioRebidManager;
import com.marriott.rfp.dataacess.pricing.portfolio.api.PortfolioSelectionManager;
import com.marriott.rfp.dataacess.pricing.portfolio.api.PortfolioStatusManager;
import com.marriott.rfp.dataacess.pricing.portfolio.api.PropertyListManager;
import com.marriott.rfp.dataacess.pricing.salesregion.api.SalesRegionManager;
import com.marriott.rfp.object.hotel.HotelListData;
import com.marriott.rfp.object.pricing.account.ThirdPartyRegion;
import com.marriott.rfp.object.pricing.accountregistration.AccountRegistration;
import com.marriott.rfp.object.pricing.filterLists.Page;
import com.marriott.rfp.object.pricing.filterLists.PricingFilterSelections;
import com.marriott.rfp.object.pricing.hotel.HotelPGOOSListData;
import com.marriott.rfp.object.pricing.hotelrfp.Contact;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificPGOOSData;
import com.marriott.rfp.object.pricing.hotelrfp.HotelAccountSpecificRoomPoolData;
import com.marriott.rfp.object.pricing.hotelrfp.RejectionReason;
import com.marriott.rfp.object.pricing.period.PricingPeriod;
import com.marriott.rfp.object.pricing.pgoos.MirrorDetail;
import com.marriott.rfp.object.pricing.pgoos.MirrorDetailDO;
import com.marriott.rfp.object.pricing.pgoos.MirrorRoomClassDetail;
import com.marriott.rfp.object.pricing.pgoos.MirrorRoomPoolDetail;
import com.marriott.rfp.object.pricing.portfolio.AccountStatusList;
import com.marriott.rfp.object.pricing.portfolio.AccountStatusRef;
import com.marriott.rfp.object.pricing.portfolio.CBCRequestAvail;
import com.marriott.rfp.object.pricing.portfolio.CBCRequestSelected;
import com.marriott.rfp.object.pricing.portfolio.CBCSelect;
import com.marriott.rfp.object.pricing.portfolio.CBCStatus;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationAddEmailInfo;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationAvail;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationEmail;
import com.marriott.rfp.object.pricing.portfolio.HotelSolicitationSelected;
import com.marriott.rfp.object.pricing.portfolio.Portfolio;
import com.marriott.rfp.object.pricing.portfolio.PortfolioRebid;
import com.marriott.rfp.object.pricing.portfolio.PortfolioStatus;
import com.marriott.rfp.object.pricing.portfolio.PortfolioStatusDO;
import com.marriott.rfp.object.pricing.portfolio.SolicitSelect;
import com.marriott.rfp.object.pricing.sapp.Contacttype;
import com.marriott.rfp.object.sendemail.SendEmail;
import com.marriott.rfp.object.user.User;
import com.marriott.rfp.utility.DateUtility;
import com.marriott.rfp.utility.NumberUtility;

/**
 * Session Bean implementation class
 */
@Transactional("transactionManagerRfpCommon")
@Service
public class PortfolioServiceImpl implements PortfolioService {

	private static final Logger log = LoggerFactory.getLogger(PortfolioServiceImpl.class);

	@Autowired
	private HotelSolicitationManager hotelSolicitMgr = null;
	
	@Autowired
	private CBCRequestManager cbcRequestMgr = null;

	@Autowired
	private PortfolioOrganizationManager portfolioOrgMgr = null;

	@Autowired
	private PortfolioSelectionManager portfolioSelectionMgr = null;

	@Autowired
	private AccountStatusListManager acctStatusListMgr = null;

	@Autowired
	private RFPConstantsManager constantsMgr = null;

	@Autowired
	private SendEmailManager sendEmailMgr = null;

	@Autowired
	private HotelPGOOSMaintenanceManager hotelpgoosMgr = null;

	@Autowired
	private AccountStatusRefManager acctStatusRefMgr = null;

	@Autowired
	private PortfolioStatusManager portfolioStatusMgr = null;

	@Autowired
	private PortfolioRebidManager portfolioRebidMgr = null;

	@Autowired
	private PropertyListManager propertyListMgr = null;

	@Autowired
	AccountThirdPartyManager accountThirdPartyMgr = null;

	@Autowired
	AccountRegistrationManager accountRegisterMgr = null;

	@Autowired
	AccountSegmentManager accountSegmentMgr = null;

	@Autowired
	AccountManager accountMgr = null;

	@Autowired
	PeriodManager periodMgr = null;

	@Autowired
	UserManager userMgr = null;

	@Autowired
	SalesRegionManager salesRegionMgr = null;

	public List<HotelSolicitationAvail> findAvailHotelSolicitation(PricingFilterSelections filterValues, User user) {
		if (filterValues != null && filterValues.getAccountFilter() != null
				&& filterValues.getAccountFilter().getAccountrecid() != null
				&& filterValues.getAccountFilter().getAccountrecid() != 0)
				return hotelSolicitMgr.findAvailHotelSolicitation(filterValues, user);
		else
			return null;
	}

	public List<HotelSolicitationSelected> findSelectedHotelSolicitation(PricingFilterSelections filterValues,
			User user) {
		if (filterValues != null && filterValues.getAccountFilter() != null
				&& filterValues.getAccountFilter().getAccountrecid() != null
				&& filterValues.getAccountFilter().getAccountrecid() != 0)
			return hotelSolicitMgr.findSelectedHotelSolicitation(filterValues, user);
		else
			return null;
	}

	public String updateAccountSolicitationSelect(long accountrecid, List<SolicitSelect> solicitSelect, User user) {
		return hotelSolicitMgr.updateAccountSolicitationSelect(accountrecid, solicitSelect, user);
	}

	public void updateAccountSolicitationAvail(long accountrecid, List<Long> solictAvail, User user) {
		hotelSolicitMgr.updateAccountSolicitationAvail(accountrecid, solictAvail, user);
	}

	public void sendSolicitationEmails(Long accountrecid, Long period, List<SolicitSelect> solicitSelect, User user) {
		if (accountrecid == null || solicitSelect == null || solicitSelect.size() == 0)
			return;

		String sendEmail = constantsMgr.getSendEmail();
		String chasesendEmail = constantsMgr.getChaseSendEmail();

		if ((sendEmail != null && sendEmail.equals("Y")) || (chasesendEmail != null && chasesendEmail.equals("Y"))) {
			for (int i = 0; i < solicitSelect.size(); i++) {

				if (solicitSelect.get(i).getSendemail() != null && solicitSelect.get(i).getSendemail().equals("Y")) {
					generateEmail(accountrecid, solicitSelect.get(i).getHotelid(), period, user, "S");
				} else if (solicitSelect.get(i).getChasemail() != null
						&& solicitSelect.get(i).getChasemail().equals("Y")) {
					generateChaseEmail(accountrecid, solicitSelect.get(i).getHotelid(), period, user, "S");
				}
			}
			hotelSolicitMgr.deleteAdditionalEmailTextAndDate(accountrecid, "S", user);
		}
	}

	public void sendRebidEmail(Long accountrecid, Long period, List<PortfolioRebid> portfolioRebidList, User user) {
		if (accountrecid == null || portfolioRebidList == null || portfolioRebidList.size() == 0)
			return;

		String chasesendEmail = constantsMgr.getChaseSendEmail();

		if (chasesendEmail != null && chasesendEmail.equals("Y")) {
			List<PortfolioRebid> rebidsToSave = new ArrayList<PortfolioRebid>();
			for (int i = 0; i < portfolioRebidList.size(); i++) {

				if (portfolioRebidList.get(i).getTo_send_chasemail() != null
						&& portfolioRebidList.get(i).getTo_send_chasemail().equals("Y")) {
					PortfolioRebid rebid = portfolioRebidList.get(i);
					generateRebidChaseEmail(accountrecid, rebid.getHotelid(), period, user);
					rebid.setTo_send_chasemail("N");
					rebid.setChasemail_sent_flag("Y");
					rebid.setChanged("Y");
					rebidsToSave.add(rebid);
				}
			}
			if (rebidsToSave.size() > 0) {
				updatePortfolioRebidList(rebidsToSave, accountrecid, user);
			}

			hotelSolicitMgr.deleteAdditionalEmailTextAndDate(accountrecid, "R", user);
		}
	}

	private boolean generateRebidChaseEmail(Long accountrecid, Long hotelid, Long period, User user) {
		boolean bSent = false;
		try {
			HotelSolicitationEmail m = getEmailData(accountrecid, hotelid, period, "R");
			if (m != null && m.getSendTo() != null && m.getSendTo().size() > 0 && m.getSendFrom() != null) {
				try {
					sendEmailMgr.sendEmail(new SendEmail(m.getSendFrom(), m.getSendTo(), m.getSendCC(), m.getSendBCC(),
							getRebidChaseSubject(m), getRebidChasePlainBodyPart(m), getRebidChaseHtmlBodyPart(m),
							true));
					bSent = true;
				} catch (Exception e) {
					bSent = false;
					log.error(e.getMessage(),e);
				}
			}
		} catch (Exception e) {
			bSent = false;
		}
		hotelSolicitMgr.updateRebidEmailSent(accountrecid, hotelid, period, bSent, user);
		return bSent;
	}

	private String getRebidChaseSubject(HotelSolicitationEmail m) {
		String subject = m.getHotelname() + " (" + m.getMarshacode() + ") - Reminder for " + m.getPeriod()
				+ " Rebid from " + m.getAccountname() + " - Due in MarRFP by " + m.getDuedate();
		return subject;
	}

	private String getRebidChasePlainBodyPart(HotelSolicitationEmail m) {

		String body = "";
		body += "**If you are not responsible for BT pricing, please forward to the appropriate person.**&nbsp;\n\n";

		body += "<b>Rebid Response in MarRFP is due by " + m.getDuedate() + " for ";
		body += "" + m.getAccountname() + "&nbsp;" + m.getPeriod() + "&nbsp; Hotel Program RFP </b> &nbsp;\n\n";

		body += " <b>Action Required by " + m.getDuedate() + " </b> &nbsp; \n\n";

		body += "Greetings from Marriott Global Sales!" + "&nbsp;" + "The due date for responding to the "
				+ m.getPeriod();
		body += " rebid request from " + m.getAccountname() + "&nbsp;is&nbsp;" + m.getDuedate() + ". &nbsp;\n";

		body += "According to MarRFP, " + m.getHotelname() + " (" + m.getMarshacode() + ") was requested to rebid by ";
		body += "" + m.getAccountname() + " and has not yet responded to the rebid in MarRFP. &nbsp;\n\n";

		if (m.getFreeFormText() != null && !m.getFreeFormText().trim().equals(""))
			body += m.getFreeFormText() + "\n\n";

		body += "If your property is interested in submitting a rebid, please log into MarRFP, select <b> Submit Rebid</b>, and update the rates, amenities, and/or addendum questions.&nbsp;\n\n";
		body += "If your property is not interested in submitting a rebid, please log into MarRFP and select <b> Decline to Rebid. </b>&nbsp;\n\n ";

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

		List<String> re = m.getHotelRespondents();
		if (re.size() > 0) {
			body += "\n\n Emails were sent to the following RFP Respondents:\n\n";
			for (int j = 0; j < re.size(); j++) {
				body += "    Email " + j + ": " + re.get(j) + "\n";
			}
			body += "\n\n";
		}

		body += "For MarRFP or pricing assistance, please contact PAS at &nbsp;" + m.getAdminEmail() + ".\n\n";
		return body;
	}

	private String getRebidChaseHtmlBodyPart(HotelSolicitationEmail m) {

		String body = "<HTML><BODY><table style=\"font-family: Arial;font-size: 12px\" cellpadding=\"1\" cellspacing=\"1\" border=\"0\">";

		body += "<tr><td>**If you are not responsible for BT pricing, please forward to the appropriate person.**&nbsp;</td></tr><tr><td>&nbsp;</td></tr>";

		body += "<tr><td><b>Rebid Response in MarRFP is due by " + m.getDuedate() + " for ";
		body += "" + m.getAccountname() + "&nbsp;" + m.getPeriod()
				+ "&nbsp; Hotel Program RFP </b> &nbsp;</td></tr><tr><td>&nbsp;</td></tr>";

		body += "<tr><td> <b>Action Required by " + m.getDuedate() + " </b> &nbsp;</td></tr><tr><td>&nbsp;</td></tr>";

		body += "<tr><td>Greetings from Marriott Global Sales!" + "&nbsp;" + "The due date for responding to the "
				+ m.getPeriod();
		body += " rebid request from " + m.getAccountname() + "&nbsp;is&nbsp;" + m.getDuedate() + ". &nbsp;</td></tr>";

		body += "<tr><td>According to MarRFP, " + m.getHotelname() + " (" + m.getMarshacode()
				+ ") was requested to rebid by ";
		body += "" + m.getAccountname()
				+ " and has not yet responded to the rebid in MarRFP. &nbsp;</td></tr><tr><td>&nbsp;</td></tr>";

		if (m.getFreeFormText() != null && !m.getFreeFormText().trim().equals(""))
			body += "<tr><td>" + m.getFreeFormText() + "</td></tr><tr><td>&nbsp;</td></tr>";

		body += "<tr><td>If your property is interested in submitting a rebid, please log into MarRFP, select <b> Submit Rebid</b>, and update the rates, amenities, and/or addendum questions.&nbsp;</td></tr><tr><td>&nbsp;</td></tr>";
		body += "<tr><td>If your property is not interested in submitting a rebid, please log into MarRFP and select <b> Decline to Rebid. </b>&nbsp;</td></tr><tr><td>&nbsp;</td></tr>";

		if ((m.getGlobalContact() != null && !m.getGlobalContact().trim().equals(""))
				|| ((m.getBtamContact() != null && !m.getBtamContact().trim().equals("")))
				||  ((m.getSharedContact() != null && !m.getSharedContact().trim().equals("")))) {
			body += "<tr><td>For account specific questions, please feel free to contact the following account leaders:</td></tr>";
			if (m.getGlobalContact() != null && !m.getGlobalContact().trim().equals(""))
				body += "<tr><td>Global Account Executive - " + m.getGlobalContact() + ", " + m.getGlobalContactEmail()
						+ "</td></tr>";
			if (m.getBtamContact() != null && !m.getBtamContact().trim().equals(""))
				body += "<tr><td>Business Travel Account Manager - " + m.getBtamContact() + ", "
						+ m.getBtamContactEmail() + "</td></tr>";
			if (m.getSharedContact() != null && !m.getSharedContact().trim().equals(""))
				body += "<tr><td>Shared Account Leader - " + m.getSharedContact() + ", "
						+ m.getSharedContactEmail() + "</td></tr>";
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

		body += "<tr><td>&nbsp;</td></tr>";
		body += "<tr><td>For MarRFP or pricing assistance, please contact PAS at &nbsp;" + m.getAdminEmail()
				+ ".</td></tr>";
		body += "</table></BODY></HTML>";
		return body;
	}

	public void sendSolicitationEmails(Long accountrecid, Long period, List<SolicitSelect> solicitSelect, byte[] myFile,
			String fileName, User user) {
		if (accountrecid == null || solicitSelect == null || solicitSelect.size() == 0)
			return;

		String sendEmail = constantsMgr.getSendEmail();
		String chasesendEmail = constantsMgr.getChaseSendEmail();

		if ((sendEmail != null && sendEmail.equals("Y")) || (chasesendEmail != null && chasesendEmail.equals("Y"))) {
			for (int i = 0; i < solicitSelect.size(); i++) {

				if (solicitSelect.get(i).getSendemail() != null && solicitSelect.get(i).getSendemail().equals("Y")) {
					generateEmail(accountrecid, solicitSelect.get(i).getHotelid(), period, myFile, fileName, user, "S");
				} else if (solicitSelect.get(i).getChasemail() != null
						&& solicitSelect.get(i).getChasemail().equals("Y")) {
					generateChaseEmail(accountrecid, solicitSelect.get(i).getHotelid(), period, myFile, fileName, user,
							"S");
				}
			}
			hotelSolicitMgr.deleteAdditionalEmailTextAndDate(accountrecid, "S", user);
		}
	}

	private boolean generateEmail(Long accountrecid, Long hotelid, Long period, byte[] myFile, String fileName, User user,
			String addemailtext_screentype) {
		boolean bSent = false;
		try {
			HotelSolicitationEmail m = getEmailData(accountrecid, hotelid, period, addemailtext_screentype);
			if (m != null && m.getSendTo() != null && m.getSendTo().size() > 0 && m.getSendFrom() != null) {
				try {
					sendEmailMgr.sendEmail(new SendEmail(m.getSendFrom(), m.getSendTo(), m.getSendCC(), m.getSendBCC(),
							getSubject(m), getPlainBodyPart(m), getHtmlBodyPart(m), true, myFile, fileName));
					bSent = true;
				} catch (Exception e) {
					bSent = false;
					log.error(e.getMessage(),e);
				}
			}
		} catch (Exception e) {
			bSent = false;
		}
		hotelSolicitMgr.updateEmailSent(accountrecid, hotelid, bSent, user, "sendemail");
		return bSent;
	}

	private boolean generateChaseEmail(Long accountrecid, Long hotelid, Long period, byte[] myFile, String fileName,
			User user, String addemailtext_screentype) {
		boolean bSent = false;
		try {
			HotelSolicitationEmail m = getEmailData(accountrecid, hotelid, period, addemailtext_screentype);
			if (m != null && m.getSendTo() != null && m.getSendTo().size() > 0 && m.getSendFrom() != null) {
				try {
					sendEmailMgr.sendEmail(new SendEmail(m.getSendFrom(), m.getSendTo(), m.getSendCC(), m.getSendBCC(),
							getChaseSubject(m), getChasePlainBodyPart(m), getChaseHtmlBodyPart(m), true, myFile,
							fileName));
					bSent = true;
				} catch (Exception e) {
					bSent = false;
					log.error(e.getMessage(),e);
				}
			}
		} catch (Exception e) {
			bSent = false;
		}
		hotelSolicitMgr.updateEmailSent(accountrecid, hotelid, bSent, user, "chasemail");
		return bSent;
	}

	private boolean generateEmail(Long accountrecid, Long hotelid, Long period, User user,
			String addemailtext_screentype) {
		boolean bSent = false;
		try {
			HotelSolicitationEmail m = getEmailData(accountrecid, hotelid, period, addemailtext_screentype);
			if (m != null && m.getSendTo() != null && m.getSendTo().size() > 0 && m.getSendFrom() != null) {
				try {
					sendEmailMgr.sendEmail(new SendEmail(m.getSendFrom(), m.getSendTo(), m.getSendCC(), m.getSendBCC(),
							getSubject(m), getPlainBodyPart(m), getHtmlBodyPart(m), true));
					bSent = true;
				} catch (Exception e) {
					bSent = false;
					log.error(e.getMessage(),e);
				}
			}
		} catch (Exception e) {
			bSent = false;
		}
		hotelSolicitMgr.updateEmailSent(accountrecid, hotelid, bSent, user, "sendemail");
		return bSent;
	}

	private boolean generateChaseEmail(Long accountrecid, Long hotelid, Long period, User user,
			String addemailtext_screentype) {
		boolean bSent = false;
		try {
			HotelSolicitationEmail m = getEmailData(accountrecid, hotelid, period, addemailtext_screentype);
			if (m != null && m.getSendTo() != null && m.getSendTo().size() > 0 && m.getSendFrom() != null) {
				try {
					sendEmailMgr.sendEmail(new SendEmail(m.getSendFrom(), m.getSendTo(), m.getSendCC(), m.getSendBCC(),
							getChaseSubject(m), getChasePlainBodyPart(m), getChaseHtmlBodyPart(m), true));
					bSent = true;
				} catch (Exception e) {
					bSent = false;
					log.error(e.getMessage(),e);
				}
			}
		} catch (Exception e) {
			bSent = false;
		}
		hotelSolicitMgr.updateEmailSent(accountrecid, hotelid, bSent, user, "chasemail");
		return bSent;
	}

	private HotelSolicitationEmail getEmailData(Long accountrecid, Long hotelid, Long period,
			String addemailtext_screentype) {
		HotelSolicitationEmail hotelSolicitationEmail = hotelSolicitMgr.getEmailBodyData(accountrecid, hotelid,
				addemailtext_screentype);
		hotelSolicitationEmail.setAccountQuestions(hotelSolicitMgr.getEmailBodyDataQuestions(accountrecid));

		List<String> sendTo = new Vector<String>();
		List<String> respondentList1 = hotelSolicitMgr.getEmailBodyDataRespondents(hotelid, period);
		List<String> respondentList2 = hotelSolicitMgr.getEmailBodyDataRespondents2(hotelid, period,
				addemailtext_screentype);
		List<String> respondentList = new Vector<String>();
		respondentList.addAll(respondentList1);
		respondentList.addAll(respondentList2);
		sendTo.addAll(respondentList);
		hotelSolicitationEmail.setHotelRespondents(respondentList);
		Contact salesContacts = hotelSolicitMgr.getEmailBodyDataSalesContact(hotelid, accountrecid);
		if (salesContacts != null) {
			hotelSolicitationEmail.setSalesContact(salesContacts.getContactname());
			hotelSolicitationEmail.setSalesContactEmail(salesContacts.getContactemail());
			if (addemailtext_screentype != null && !addemailtext_screentype.equalsIgnoreCase("R")) {
				if (salesContacts.getContactemail() != null)
					sendTo.add(salesContacts.getContactemail());
			}
		}
		hotelSolicitationEmail.setSendTo(sendTo);

		Contact maesalesContacts = hotelSolicitMgr.getEmailBodyDataMAESalesContact(hotelid, accountrecid);
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
			// RMBAU-21619 and RMBAU-21620 //
			if (hotelSolicitationEmail.getSendfromtype() != null && hotelSolicitationEmail.getSendfromtype() == 15L
					&& hotelSolicitationEmail.getSharedContactEmail() != null
					&& !hotelSolicitationEmail.getSharedContactEmail().trim().equals("")) {
				hotelSolicitationEmail.setSendFrom(hotelSolicitationEmail.getSharedContactEmail());
				hotelSolicitationEmail.setSendBCC(hotelSolicitationEmail.getSharedContactEmail());
			}
			
			else {
				if (hotelSolicitationEmail.getGlobalContactEmail() != null
						&& !hotelSolicitationEmail.getGlobalContactEmail().trim().equals("")) {
					hotelSolicitationEmail.setSendFrom(hotelSolicitationEmail.getGlobalContactEmail());
					hotelSolicitationEmail.setSendBCC(hotelSolicitationEmail.getGlobalContactEmail());
			}
		}
		}
		// RMBAU-21619 and RMBAU-21620 //
			if (hotelSolicitationEmail.getSendfromtype() != 8L && hotelSolicitationEmail.getSendfromtype() != 15L && hotelSolicitationEmail.getBtamContactEmail() != null) {
			List<String> sendCC = new Vector<String>();
			sendCC.add(hotelSolicitationEmail.getBtamContactEmail());
			hotelSolicitationEmail.setSendCC(sendCC);
		}

		hotelSolicitationEmail.setAdditionalText(constantsMgr.getAddEmailText());

		hotelSolicitationEmail.setSiteUrl(constantsMgr.getSiteUrl());

		hotelSolicitationEmail.setPricingContactsUrl(constantsMgr.getPricingContactsUrl());
		
		return hotelSolicitationEmail;
	}

	private String getSubject(HotelSolicitationEmail m) {
		String subject = m.getHotelname() + " (" + m.getMarshacode() + ") - Request for " + m.getPeriod()
				+ " Pricing from " + m.getAccountname() + " - Due in MarRFP no later than " + m.getDuedate();
		return subject;
	}

	private String getChaseSubject(HotelSolicitationEmail m) {
		String subject = "Reminder for " + m.getPeriod() + " Pricing from " + m.getAccountname() + " - "
				+ m.getHotelname() + " (" + m.getMarshacode() + ") - Due in MarRFP no later than " + m.getDuedate() + "";
		return subject;
	}

	private String getHtmlBodyPart(HotelSolicitationEmail m) {
		String body = "<HTML><BODY><table style=\"font-family: Arial;font-size: 12px\" cellpadding=\"1\" cellspacing=\"1\" border=\"0\">";
		if (m.getAdditionalText() != null && !m.getAdditionalText().trim().equals(""))
			body += "<tr><td><H1>" + m.getAdditionalText() + "</H1></td></tr>";
		body += "<tr><td>**If you are not responsible for BT pricing, please forward to the appropriate person.**</td></tr><tr><td>&nbsp;</td></tr>";

		// free from text
		if (m.getFreeFormText() != null && !m.getFreeFormText().trim().equals(""))
			body += "<tr><td><b>" + m.getFreeFormText() + "<b></td></tr><tr><td>&nbsp;</td></tr>";

		body += "<tr><td>&nbsp;</td></tr>";

		body += "<tr><td>Congratulations!  " + m.getHotelname() + " (" + m.getMarshacode()
				+ ") has been specifically requested by <b>" + m.getAccountname() + "</b> to participate in their "
				+ m.getPeriod() + " Preferred Hotel Program RFP.";

		body += "</td></tr>";
		body += "<tr><td><UL>";
		body += "<li>Please ensure you read the Account Overview in MarRFP </li>";
		body += "<li>Make sure you qualify the account locally (please add the closest office or facility in the account specific screen in MarRFP)</li>";
		if (m.getAccounturl() != null && !m.getAccounturl().trim().equals(""))
			body += "<li>Visit " + m.getAccounturl() + " for more information</li>";
		body += "<li>Please submit your best rates in MarRFP";
		body += " no later than &nbsp;" + m.getDuedate() + "</li>";
		body +="<li>Review cancellation policy answer, if applicable</li>";
		if (m.getAccountPricingType().equals("C"))
			body += "<li>Please complete any addendum questions</li>";
		body += "<li>Add any special amenities in the rate notes section</li>";
		body += "<li>To access MarRFP, click <a href=\"" + m.getSiteUrl() + "\">here</a>. </li>";
		//body += "<li>If your hotel is not interested in submitting a discounted account specific rate, please log into MarRFP and click on the <b>No Bid</b> radio button and select the applicable <b>No Bid Reason</b> This includes GPP accounts where the property is unable to offer more than the GPP discount.</li>";
        body += "<li>If your hotel is not interested in submitting a discounted account specific rate, please log into MarRFP and select the applicable <b>No Bid Reason</b> This includes GPP accounts where the property is unable to offer more than the GPP discount.</li>";
		body += "</UL></td></tr>";

		// account specific questions
		List<String> asq = m.getAccountQuestions();
		if (asq.size() > 0) {
			body += "<tr><td>&nbsp;</td></tr><tr><td>Please respond to these account specific questions in MarRFP by the account due date.</td></tr>";
			body += "<tr><td><UL>";
			for (int i = 0; i < asq.size(); i++) {
				int j = i + 1;
				body += "<li>" + j + ".) " + asq.get(i) + "</li>";
			}
			body += "</UL></td></tr><tr><td>&nbsp;</td></tr>";
		}

		if ((m.getGlobalContact() != null && !m.getGlobalContact().trim().equals(""))
				|| ((m.getBtamContact() != null && !m.getBtamContact().trim().equals("")))
				|| ((m.getSharedContact() != null && !m.getSharedContact().trim().equals("")))) {
			body += "<tr><td>For account specific questions, please feel free to contact the following account leaders:</td></tr>";
			if (m.getGlobalContact() != null && !m.getGlobalContact().trim().equals(""))
				body += "<tr><td>Global Account Executive - " + m.getGlobalContact() + ", " + m.getGlobalContactEmail()
						+ "</td></tr>";
			if (m.getBtamContact() != null && !m.getBtamContact().trim().equals(""))
				body += "<tr><td>Business Travel Account Manager - " + m.getBtamContact() + ", "
						+ m.getBtamContactEmail() + "</td></tr>";
			
			if (m.getSharedContact() != null && !m.getSharedContact().trim().equals(""))
				body += "<tr><td>Shared Account Leader - " + m.getSharedContact() + ", "
						+ m.getSharedContactEmail() + "</td></tr>";
		}

		// emails sent to
		List<String> re = m.getHotelRespondents();
		if (re.size() > 0) {
			body += "<tr><td>&nbsp;</td></tr><tr><td>Emails were sent to the following RFP Respondents.</td></tr>";
			body += "<tr><td><UL>";
			for (int j = 0; j < re.size(); j++) {
				int k = j + 1;
				body += "<li>Email " + k + ": " + re.get(j) + "</li>";
			}
			body += "</UL></td></tr><tr><td>&nbsp;</td></tr>";
		}
		//if (m.getSalesContactEmail() != null && !m.getSalesContactEmail().equals(""))
		//body += "<tr><td>Sales Contact for " + m.getAccountname() + " at this hotel: " + m.getSalesContactEmail()
		//+ "</td></tr><tr><td>&nbsp;</td></tr>";

		body += "<tr><td>&nbsp;</td></tr>";
		body += "<tr><td>For MarRFP or pricing assistance, please contact PAS at &nbsp;" + m.getAdminEmail()
		+ " or review PAS MGS Page for <a href=\"" + m.getPricingContactsUrl() + "\">Hotel Pricing Contacts</a> for job aids and resources.</td></tr>";
		body += "</table></BODY></HTML>";
		
		return body;
	}

	private String getChaseHtmlBodyPart(HotelSolicitationEmail m) {

		String body = "<HTML><BODY><table style=\"font-family: Arial;font-size: 12px\" cellpadding=\"1\" cellspacing=\"1\" border=\"0\">";
		if (m.getAdditionalText() != null && !m.getAdditionalText().trim().equals(""))
			body += "<tr><td><H1>" + m.getAdditionalText() + "</H1></td></tr>";
		body += "<tr><td>**If you are not responsible for BT pricing, please forward to the appropriate person.**</td></tr><tr><td>&nbsp;</td></tr>";
		body += "<tr><td><b>" + m.getAccountname() + ":&nbsp;" + m.getPeriod()
				+ "&nbsp;<b>Hotel Program RFP - Rates in MarRFP are due no later than " + m.getDuedate() + "</b></td></tr>";
		
		body += "<tr><td>&nbsp;</td></tr>";
		
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
		
		//body +="<tr><td>If your hotel is not interested in submitting a discounted account specific rate, please log into MarRFP and click on the <b>No Bid</b> radio button and select the applicable <b>No Bid Reason</b> This includes GPP accounts where the property is unable to offer more than the GPP discount.</td></tr>";
		body +="<tr><td>If your hotel is not interested in submitting a discounted account specific rate, please log into MarRFP and select the applicable <b>No Bid Reason</b> This includes GPP accounts where the property is unable to offer more than the GPP discount.</td></tr>";
	    
		body += "<tr><td>&nbsp;</td></tr>";
		
		body += "<tr><td>This will be your final opportunity to price as no extensions may be granted. If you have not entered a ";
		body += "Volume Producer (VP) rate in MarRFP by the close of business on " + m.getDuedate()
				+ ",&nbsp;your property may not ";
		body += "be presented to the client.</td></tr>";
		body += "<td><tr>";

		if ((m.getGlobalContact() != null && !m.getGlobalContact().trim().equals(""))
				|| ((m.getBtamContact() != null && !m.getBtamContact().trim().equals("")))
				|| ((m.getSharedContact() != null && !m.getSharedContact().trim().equals("")))) {
			body += "<tr><td>For account specific questions, please feel free to contact the following account leaders:</td></tr>";
			if (m.getGlobalContact() != null && !m.getGlobalContact().trim().equals(""))
				body += "<tr><td>Global Account Executive - " + m.getGlobalContact() + ", " + m.getGlobalContactEmail()
						+ "</td></tr>";
			if (m.getBtamContact() != null && !m.getBtamContact().trim().equals(""))
				body += "<tr><td>Business Travel Account Manager - " + m.getBtamContact() + ", "
						+ m.getBtamContactEmail() + "</td></tr>";
			
			if (m.getSharedContact() != null && !m.getSharedContact().trim().equals(""))
				body += "<tr><td>Shared Account Leader - " + m.getSharedContact() + ", "
						+ m.getSharedContactEmail() + "</td></tr>";
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

	private String getPlainBodyPart(HotelSolicitationEmail m) {
		String body = "";
		if (m.getAdditionalText() != null && !m.getAdditionalText().trim().equals(""))
			body += m.getAdditionalText() + "\n\n\n\n";
		body += "**If you are not responsible for BT pricing, please forward to the appropriate person.**\n\n";

		// free from text
		if (m.getFreeFormText() != null && !m.getFreeFormText().trim().equals(""))
			body += "<tr><td><b>" + m.getFreeFormText() + "</b></td></tr><tr><td>&nbsp;</td></tr>";
		body += m.getFreeFormText() + "\n\n";

		body += "Congratulations!  " + m.getHotelname() + " (" + m.getMarshacode()
				+ ") has been specifically requested by " + m.getAccountname() + " to participate in their "
				+ m.getPeriod() + " Preferred Hotel Program RFP.";

		body += "\n\n";
		body += "\n\n";
		body += "    Please ensure you read the Account Overview in MarRFP \n\n";
		body += "    Make sure you qualify the account locally (please add the closest office or facility in the account specific screen in MarRFP)\n\n";
		if (m.getAccounturl() != null && !m.getAccounturl().trim().equals(""))
			body += "    Visit " + m.getAccounturl() + " for more information\n\n";
		body += "Please submit your best rates in MarRFP";
		body += " no later than &nbsp;" + m.getDuedate() + "\n\n";
		body +="Review cancellation policy answer, if applicable";
		if (m.getAccountPricingType().equals("C"))
			body += "    Please complete any addendum questions\n\n";
		body += "    Add any special amenities in the rate notes section\n\n";
		body += "    To access MarRFP, go to: " + m.getSiteUrl() + " \n\n";
		  //body += "    If your hotel is not interested in submitting a discounted account specific rate, please log into MarRFP and click on the No Bid radio button and select the applicable No Bid Reason This includes GPP accounts where the property is unable to offer more than the GPP discount.\n\n";
        body += "    If your hotel is not interested in submitting a discounted account specific rate, please log into MarRFP and select the applicable No Bid Reason This includes GPP accounts where the property is unable to offer more than the GPP discount.\n\n";
        body += "\n\n";

		// account specific questions
		List<String> asq = m.getAccountQuestions();
		if (asq.size() > 0) {
			body += "Please respond to these account specific questions in MarRFP by the account due date.\n";
			for (int i = 0; i < asq.size(); i++) {
				int j = i + 1;
				body += "  " + j + ".) " + asq.get(i) + "\n";
			}
			body += "\n\n";
		}

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
			body += "\n\nEmails were sent to the following RFP Respondents.\n\n";
			for (int j = 0; j < re.size(); j++) {
				body += "    Email " + j + ": " + re.get(j) + "\n";

			}

		}
		if (m.getSalesContactEmail() != null && !m.getSalesContactEmail().equals(""))
			body += "Sales Contact for " + m.getAccountname() + " at this hotel: " + m.getSalesContactEmail() + "\n\n";

		body += "For MarRFP or pricing assistance, please contact " + m.getAdminName() + " at " + m.getAdminEmail() + " or review PAS MGS Page for Hotel Pricing Contacts for job aids and resources.\n\n";
		
		return body;
	}

	private String getChasePlainBodyPart(HotelSolicitationEmail m) {

		String body = "";
		if (m.getAdditionalText() != null && !m.getAdditionalText().trim().equals(""))
			body += m.getAdditionalText() + "\n\n\n\n";
		body += "**If you are not responsible for BT pricing, please forward to the appropriate person.**&nbsp;\n\n";
		body += "" + m.getAccountname() + "<b>:</b>&nbsp;" + m.getPeriod()
				+ "&nbsp;<b>Hotel Program RFP - Rates in MarRFP are due no later than</b> &nbsp;" + m.getDuedate() + "\n\n";
		// free from text
		if (m.getFreeFormText() != null && !m.getFreeFormText().trim().equals("")) {
			body += "<b>";
			body += m.getFreeFormText() + "</b>\n\n";
		}
		body += " Action Required no later than &nbsp;" + m.getDuedate() + "&nbsp; \n\n";
		body += "Greetings from Marriott Global Sales!  The due date for participating in the &nbsp;" + m.getPeriod()
				+ "&nbsp; RFP for " + m.getAccountname() + "";
		body += "is&nbsp;" + m.getDuedate() + ".&nbsp;According to MarRFP,&nbsp;" + m.getHotelname() + " ("
				+ m.getMarshacode() + "&nbsp;) was specifically requested by &nbsp;" + m.getAccountname()
				+ "&nbsp;and has not yet responded and/or completed the BT & Group Account Questions in MarRFP.\n\n";
		body += "\n\n";

		body += "If your property is interested in offering a discounted account specific rate, please log into MarRFP";
		body += " select the <b>Volume Producer</b> option (Volume Producer, Float Volume Producer), price accordingly, and be sure to complete the cancellation policy question and BT & Group Account Questions, if applicable.\n\n";
		body += "\n\n";

		//body +="If your hotel is not interested in submitting a discounted account specific rate, please log into MarRFP and click on the <b>No Bid</b> radio button and select the applicable <b>No Bid Reason</b> This includes GPP accounts where the property is unable to offer more than the GPP discount.";
		body +="If your hotel is not interested in submitting a discounted account specific rate, please log into MarRFP and select the applicable <b>No Bid Reason</b> This includes GPP accounts where the property is unable to offer more than the GPP discount.";
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

		body += "For MarRFP or pricing assistance, please contact PAS at &nbsp;" + m.getAdminEmail() + " or review PAS MGS Page for Hotel Pricing Contacts for job aids and resources.\n\n";
		return body;
		}

	public HotelSolicitationAddEmailInfo getAccountSolicitEmailAdditionalEmail(Long accountrecid,
			String addemailtext_screentype) {
		return hotelSolicitMgr.getAccountSolicitEmailAdditionalEmail(accountrecid, addemailtext_screentype);
	}

	public void updateHotelSolicitationAddEmailInfo(Long accountrecid,
			HotelSolicitationAddEmailInfo hotelSolicitationAddEmailInfo, User user) {
		hotelSolicitMgr.updateHotelSolicitationAddEmailInfo(accountrecid, hotelSolicitationAddEmailInfo, user);
	}

	public List<String> getEmailNotSent(PricingFilterSelections filterValues, String addemailtext_screentype) {
		if (filterValues != null && filterValues.getAccountFilter() != null
				&& filterValues.getAccountFilter().getAccountrecid() != null)
			return hotelSolicitMgr.getEmailNotSent(filterValues, addemailtext_screentype);
		else
			return null;
	}

	public List<Portfolio> findPortfolioOrganization(PricingFilterSelections filterValues, int subsetnum, User user) {
		if (filterValues != null && filterValues.getAccountFilter() != null
				&& filterValues.getAccountFilter().getAccountrecid() != null
				&& filterValues.getAccountFilter().getAccountrecid() != 0)
			return portfolioOrgMgr.findPortfolioOrganization(filterValues, subsetnum, user);
		else
			return null;
	}

	public void updatePortfolioOrganization(long accountrecid, String subset, List<Long> orgSelect, User user) {
		portfolioOrgMgr.updatePortfolioOrganization(accountrecid, subset, orgSelect, user);
	}

	public List<Portfolio> findPortfolioAvail(PricingFilterSelections filterValues, User user) {
		if (filterValues != null && filterValues.getAccountFilter() != null
				&& filterValues.getAccountFilter().getAccountrecid() != null
				&& filterValues.getAccountFilter().getAccountrecid() != 0)
			return portfolioSelectionMgr.findPortfolioAvail(filterValues, user);
		else
			return null;
	}

	public List<Portfolio> findPortfolioSelected(PricingFilterSelections filterValues, User user) {
		if (filterValues != null && filterValues.getAccountFilter() != null
				&& filterValues.getAccountFilter().getAccountrecid() != null
				&& filterValues.getAccountFilter().getAccountrecid() != 0)
			return portfolioSelectionMgr.findPortfolioSelected(filterValues, user);
		else
			return null;
	}

	public String updatePortfolioSelection(long accountrecid, String subset, List<Long> orgSelect, User user) {
		return portfolioSelectionMgr.updatePortfolioSelection(accountrecid, subset, orgSelect, user);
	}

	public void deletePortfolioSelection(long accountrecid, String accountpricingtype, List<Long> orgSelect,
			User user) {
		portfolioSelectionMgr.deletePortfolioSelection(accountrecid, accountpricingtype, orgSelect, user);
	}

	public List<AccountStatusList> findAccountStatusListDetail(long period, String accountpricingtype,
			String accountsegment, int orderBy, Page page, String alphaOrder, User user, String pasManager,
			long accountstatus, String showPortfolio) {
		return acctStatusListMgr.findAccountStatusListDetail(period, accountpricingtype, accountsegment, orderBy, page,
				alphaOrder, user, pasManager, accountstatus, showPortfolio);
	}

	public long getTotalAccoutStatusListPages(long period, String accountpricingtype, String accountsegment,
			int orderBy, String alphaOrder, User user, long maxpagelen, String pasManager, String showPortfolio) {
		long totalNumPages = acctStatusListMgr.getNumAccountStatusListDetail(period, accountpricingtype, accountsegment,
				orderBy, alphaOrder, user, pasManager, showPortfolio);
		return NumberUtility.getTotalPages(totalNumPages, maxpagelen);
	}

	public List<HotelPGOOSListData> findHotelPgoosMaintList(PricingFilterSelections filterValues, User user) {
		if (filterValues != null)
			return hotelpgoosMgr.findHotelPgoosMaintList(filterValues, user);
		else
			return null;
	}

	public void updateHotelPgoosMaintanence(long period, List<HotelPGOOSListData> hotelpgoosmaint, User user) {
		hotelpgoosMgr.updateHotelPgoosMaintanence(period, hotelpgoosmaint, user);
	}

	public void updateAccountStatus(Map<Long, AccountStatusList> acctStatusList, User user) {
		for (Long key : acctStatusList.keySet()) {
			if (acctStatusList.get(key).getChanged() != null && acctStatusList.get(key).getChanged().equals("Y"))
				acctStatusListMgr.update(acctStatusList.get(key), user);
		}
	}

	public List<AccountStatusRef> getAllAccountStatusRef() {
		return acctStatusRefMgr.getAllAccountStatusRef();
	}

	public List<PortfolioStatus> findPortfolioStatus(PricingFilterSelections filterValues, User user) {
		if (filterValues != null && filterValues.getAccountFilter() != null
				&& filterValues.getAccountFilter().getAccountrecid() != null
				&& filterValues.getAccountFilter().getAccountrecid() != 0)
			return mapPortFolioStatus(portfolioStatusMgr.findPortfolioStatus(filterValues, user));
		else
			return null;
	}

	private List<PortfolioStatus> mapPortFolioStatus(List<PortfolioStatusDO> portfolioStatusDOList) {
		List<PortfolioStatus> portfolioStatusList = new ArrayList<PortfolioStatus>();
		List<HotelAccountSpecificRoomPoolData> hotelAccountSpecificRoomPoolDataList = null;
		List<HotelAccountSpecificPGOOSData> hotelAccountSpecificPGOOSDataList = null;
		PortfolioStatus portfolioStatus = null;
		HotelAccountSpecificRoomPoolData hotelAccountSpecificRoomPoolData = null;
		HotelAccountSpecificPGOOSData hotelAccountSpecificPGOOSData = null;
		Map<Long, PortfolioStatus> portfolioStatusMap = new HashMap<Long, PortfolioStatus>();
		Map<String, HotelAccountSpecificRoomPoolData> hotelAccountSpecificRoomPoolDataMap = new HashMap<String, HotelAccountSpecificRoomPoolData>();
		
		if (portfolioStatusDOList != null && portfolioStatusDOList.size() > 0) {
			for (PortfolioStatusDO portfolioStatusDO : portfolioStatusDOList) {

				if (portfolioStatusMap.containsKey(portfolioStatusDO.getHotelid())) {
					portfolioStatus = portfolioStatusMap.get(portfolioStatusDO.getHotelid());
					hotelAccountSpecificRoomPoolDataList = portfolioStatus.getRoomPoolData();

					if (hotelAccountSpecificRoomPoolDataMap.containsKey(portfolioStatusDO.getHotelid().toString()+ portfolioStatusDO.getRoomClassSeq().toString())) {
						hotelAccountSpecificRoomPoolData = hotelAccountSpecificRoomPoolDataMap.get(portfolioStatusDO.getHotelid().toString()+ portfolioStatusDO.getRoomClassSeq().toString());
						hotelAccountSpecificPGOOSDataList = hotelAccountSpecificRoomPoolData.getHotelAccountSpecificPGOOSData();
						hotelAccountSpecificPGOOSData = buildNewHotelAccountSpecificPGOOSData(portfolioStatusDO);
						hotelAccountSpecificPGOOSDataList.add(hotelAccountSpecificPGOOSData);
					} else {

						hotelAccountSpecificPGOOSDataList = new ArrayList<HotelAccountSpecificPGOOSData>();
						hotelAccountSpecificPGOOSData = buildNewHotelAccountSpecificPGOOSData(portfolioStatusDO);
						hotelAccountSpecificPGOOSDataList.add(hotelAccountSpecificPGOOSData);
						hotelAccountSpecificRoomPoolData = new HotelAccountSpecificRoomPoolData();
						hotelAccountSpecificRoomPoolData.setAccepted(portfolioStatusDO.getAcceptedRmPool());
						hotelAccountSpecificRoomPoolData.setLra(portfolioStatusDO.getLra());
						hotelAccountSpecificRoomPoolData.setRejectionreason(portfolioStatusDO.getRejectionReasonRmPool());
						hotelAccountSpecificRoomPoolData.setRejectreasonid(portfolioStatusDO.getRejectReasonIdRmPool());
						hotelAccountSpecificRoomPoolData.setRoompool(portfolioStatusDO.getRoomClassSeq());
						
						hotelAccountSpecificRoomPoolDataList.add(hotelAccountSpecificRoomPoolData);
						hotelAccountSpecificRoomPoolDataMap.put(portfolioStatusDO.getHotelid().toString()+ portfolioStatusDO.getRoomClassSeq().toString(), hotelAccountSpecificRoomPoolData);
					}
					hotelAccountSpecificRoomPoolData.setHotelAccountSpecificPGOOSData(hotelAccountSpecificPGOOSDataList);
					portfolioStatus.setRoomPoolData(hotelAccountSpecificRoomPoolDataList);

				} else {
					
					portfolioStatus=buildNewPortfolioStatus(portfolioStatusDO);
					hotelAccountSpecificRoomPoolDataMap.put(portfolioStatusDO.getHotelid().toString()+ portfolioStatusDO.getRoomClassSeq().toString(), portfolioStatus.getRoomPoolData().get(0));
					portfolioStatusMap.put(portfolioStatusDO.getHotelid(), portfolioStatus);
					portfolioStatusList.add(portfolioStatus);

				}

			}
		}
		
		return portfolioStatusList;
	}
	
	
	private HotelAccountSpecificPGOOSData buildNewHotelAccountSpecificPGOOSData(PortfolioStatusDO portfolioStatusDO) {
		HotelAccountSpecificPGOOSData hotelAccountSpecificPGOOSData=new HotelAccountSpecificPGOOSData();
		hotelAccountSpecificPGOOSData.setPgoos(portfolioStatusDO.getPgoosRmPool());
		hotelAccountSpecificPGOOSData.setRemovalreason(portfolioStatusDO.getRemovalReasonRmPool());
		hotelAccountSpecificPGOOSData.setRemovalreasonid(portfolioStatusDO.getRemovalReasonIdRmPool());
		hotelAccountSpecificPGOOSData.setRoomClassSequence(portfolioStatusDO.getRoomClassSeq());
		hotelAccountSpecificPGOOSData.setRoomPoolSequence(portfolioStatusDO.getRoomPoolSeq());
		return hotelAccountSpecificPGOOSData;
	}
	
	private PortfolioStatus buildNewPortfolioStatus(PortfolioStatusDO portfolioStatusDO) {
		
		PortfolioStatus portfolioStatus = new PortfolioStatus();
		
		HotelAccountSpecificRoomPoolData hotelAccountSpecificRoomPoolData = new HotelAccountSpecificRoomPoolData();
		List<HotelAccountSpecificPGOOSData> hotelAccountSpecificPGOOSDataList = new ArrayList<HotelAccountSpecificPGOOSData>();
		List<HotelAccountSpecificRoomPoolData> hotelAccountSpecificRoomPoolDataList = new ArrayList<HotelAccountSpecificRoomPoolData>();

		HotelAccountSpecificPGOOSData hotelAccountSpecificPGOOSData;
		hotelAccountSpecificPGOOSData = buildNewHotelAccountSpecificPGOOSData(portfolioStatusDO);
		hotelAccountSpecificPGOOSDataList.add(hotelAccountSpecificPGOOSData);

		hotelAccountSpecificRoomPoolData.setAccepted(portfolioStatusDO.getAcceptedRmPool());
		hotelAccountSpecificRoomPoolData.setLra(portfolioStatusDO.getLra());
		hotelAccountSpecificRoomPoolData.setRejectionreason(portfolioStatusDO.getRejectionReasonRmPool());
		hotelAccountSpecificRoomPoolData.setRejectreasonid(portfolioStatusDO.getRejectReasonIdRmPool());
		hotelAccountSpecificRoomPoolData.setRoompool(portfolioStatusDO.getRoomClassSeq());		
		
		hotelAccountSpecificRoomPoolData.setHotelAccountSpecificPGOOSData(hotelAccountSpecificPGOOSDataList);

		hotelAccountSpecificRoomPoolDataList.add(hotelAccountSpecificRoomPoolData);

		portfolioStatus.setChanged(portfolioStatusDO.getChanged());
		portfolioStatus.setCity(portfolioStatusDO.getCity());
		portfolioStatus.setCommissionable(portfolioStatusDO.getCommissionable());
		portfolioStatus.setCountry(portfolioStatusDO.getCountry());
		portfolioStatus.setFutureopening(portfolioStatusDO.getFutureopening());
		portfolioStatus.setHotelid(portfolioStatusDO.getHotelid());
		portfolioStatus.setHotelname(portfolioStatusDO.getHotelname());
		portfolioStatus.setHotelrfpid(portfolioStatusDO.getHotelrfpid());
		portfolioStatus.setLocked(portfolioStatusDO.getLocked());
		portfolioStatus.setMarshacode(portfolioStatusDO.getMarshacode());
		portfolioStatus.setMaxAcctRoomPool(portfolioStatusDO.getMaxAcctRoomPool());
		portfolioStatus.setNopricing(portfolioStatusDO.getNopricing());
		portfolioStatus.setProduct_offered(portfolioStatusDO.getProduct_offered());
		portfolioStatus.setRatetype_selected(portfolioStatusDO.getRatetype_selected());
		portfolioStatus.setReadonly(portfolioStatusDO.getReadonly());
		portfolioStatus.setRegionid(portfolioStatusDO.getRegionid());
		portfolioStatus.setSelected(portfolioStatusDO.getSelected());
		portfolioStatus.setSelectedload(portfolioStatusDO.getSelectedload());
		portfolioStatus.setSelectProp(portfolioStatusDO.getSelectProp());
		portfolioStatus.setState(portfolioStatusDO.getState());
		portfolioStatus.setSubsetname(portfolioStatusDO.getSubsetname());
		portfolioStatus.setVolunteered(portfolioStatusDO.getVolunteered());
		
		portfolioStatus.setRoomPoolData(hotelAccountSpecificRoomPoolDataList);
		
		return portfolioStatus;
		
	}

	public void updatePortfolioStatusList(List<PortfolioStatus> pslist, Long accountrecid, User user) {
		portfolioStatusMgr.updatePortfolioStatusList(pslist, accountrecid, user);
	}

	public void updateAcceptancePortfolioStatusList(String acceptReject, List<PortfolioStatus> pslist,
			Long accountrecid, User user, int rejectionReasonID) {
		portfolioStatusMgr.updateAcceptancePortfolioStatusList(acceptReject, pslist, accountrecid, user,
				rejectionReasonID);
	}

	public List<HotelListData> findPropertyList(PricingFilterSelections filterValues, User user) {
		if (filterValues != null)
			return propertyListMgr.findHotelFilteredList(filterValues, user);
		else
			return null;
	}

	public List<ThirdPartyRegion> getAccountThirdPartiesForAcctReg() {
		return accountThirdPartyMgr.getAccountThirdPartiesForAcctReg();
	}

	public void registerCentralAccount(AccountRegistration accountReg, User user) {
		accountRegisterMgr.registerCentralAccount(accountReg, user);
		if (accountReg.getEid() != null) {
			User u = userMgr.findUser(accountReg.getEid());
			if (u != null) {
				accountReg.setAccountLeadName(u.getFullName());
				// accountReg.setAccountLeadEmail(u.getEmail());
				if (u.getEmail() != null && u.getEmail().equals(accountReg.getAccountLeadEmail()))
					accountReg.setAccountLeadEmail(u.getEmail());
				else
					accountReg.setAccountLeadEmail(accountReg.getAccountLeadEmail());

				if (u.getPhone() != null && u.getPhone().equals(accountReg.getAccountLeadPhone()))
					accountReg.setAccountLeadPhone(u.getPhone());
				else
					accountReg.setAccountLeadPhone(accountReg.getAccountLeadPhone());
			}
		}
		if (accountReg.getAccountID() != -1) {
			accountReg.setAccountName(accountMgr.findLatestAccountName(accountReg.getAccountID()));
		}
		if (accountReg.getAccountType() != null) {
			accountReg.setAccountSegmentName(accountSegmentMgr.getAccountSegmentName(accountReg.getAccountType()));
		}

		if (accountReg.getSalesRegionID() != null) {
			accountReg.setSalesRegion(salesRegionMgr.getSalesRegion(accountReg.getSalesRegionID()));
		}

		if (accountReg.getUtilThirdParty() != null && accountReg.getUtilThirdParty().equals("Y")
				&& accountReg.getThirdPartyId() != null && accountReg.getThirdPartyId() != -1)
			accountReg.setThirdPartyName(accountThirdPartyMgr.getAccountThirdPartiesName(accountReg.getThirdPartyId()));
		else
			accountReg.setThirdPartyName(accountReg.getOtherthirdpartyname());

		if (accountReg.getPricingperiodid() != null) {
			PricingPeriod pp = periodMgr.findDueDate(accountReg.getPricingperiodid());
			accountReg.setPricingPeriodDueDate(pp.getDuedate());
		}
		generateCentralRegistrationEmail(accountReg);
	}

	private void generateCentralRegistrationEmail(AccountRegistration accountReg) {
		if (constantsMgr.getSendEmail().equals("Y")) {
			/*
			 * get the text to tell user if the email is not a production email
			 */
			String additionalText = constantsMgr.getAddEmailText();

			// String sendAddr = constantsMgr.getSendEmailFrom();
			String sendAddr = constantsMgr.getContactAcctRegEmail().getConstant_value();
			String subject = "New Central Registration - " + accountReg.getClientDueDateString() + " - "
					+ accountReg.getAccountName() + " - " + accountReg.getRegPeriod() + " - "
					+ accountReg.getPricingPeriodDueDateString();
			/*
			 * String htmlBody = getHtmlBodyPartCentralRegister(accountReg, additionalText);
			 * String textBody = getTextBodyPartCentralRegister(accountReg, additionalText);
			 */
			String htmlBody = getHtmlBodyPartCentralAccountRegister(accountReg, additionalText);
			String textBody = getTextBodyPartCentralAccountRegister(accountReg, additionalText);

			try {
				sendEmailMgr.sendEmail(new SendEmail(sendAddr, sendAddr, subject, textBody, htmlBody, false));
			} catch (Exception e) {
				log.error(e.getMessage(),e);
			}

			String autoEmailToSalesSubject = "MarRFP account registration has been received for "
					+ accountReg.getAccountName() + " - " + accountReg.getRegPeriod();
			String toSalesAddr = accountReg.getAccountLeadEmail();
			String autoEmailHTMLBody = getAutoEmailHtmlBodyPartCentralAccountRegister(accountReg, additionalText,
					sendAddr);
			String autoEmailTextBody = getAutoEmailTextBodyPartCentralAccountRegister(accountReg, additionalText,
					sendAddr);
			try {
				sendEmailMgr.sendEmail(new SendEmail(sendAddr, toSalesAddr, autoEmailToSalesSubject, autoEmailTextBody,
						autoEmailHTMLBody, false));
			} catch (Exception e) {
				log.error(e.getMessage(),e);
			}
		}
	}

	private String getAutoEmailHtmlBodyPartCentralAccountRegister(AccountRegistration m, String additionalText,
			String sendAddr) {
		String body = "<HTML><BODY><table style=\"font-family: Arial;font-size: 12px\" cellpadding=\"3\" cellspacing=\"3\" border=\"0\">";

		if (additionalText != null && !additionalText.trim().equals(""))
			body += "<tr><td colspan=\"2\"><H1>" + additionalText + "</H1></td></tr>";

		// 1. Account Lead Name
		body += "<tr><td><b>Thank you for registering your account to price via MarRFP! </b></td></tr>";
		body += "<tr><td>&nbsp;</td></tr>";

		body += "<tr><td><b>Your registration has been received and will be assigned to a PAS Manager.  Please allow 48 hours to receive a response from the PAS with further instructions and next steps. </b></td></tr>";
		body += "<tr><td>&nbsp;</td></tr>";

		body += "<tr><td><b>If you need immediate assistance or have additional questions, please email " + sendAddr
				+ ". </b></td></tr>";
		body += "<tr><td>&nbsp;</td></tr>";

		body += "</table></BODY></HTML>";

		return body;
	}

	private String getAutoEmailTextBodyPartCentralAccountRegister(AccountRegistration m, String additionalText,
			String sendAddr) {
		String body = "";
		if (additionalText != null && !additionalText.trim().equals(""))
			body += additionalText + "\n\n\n\n";

		body += "Thank you for registering your account to price via MarRFP! " + "\n\n";

		body += "Your registration has been received and will be assigned to a PAS Manager.  Please allow 48 hours to receive a response from the PAS with further instructions and next steps. "
				+ "\n\n";

		body += "If you need immediate assistance or have additional questions, please email " + sendAddr + "\n\n";

		return body;
	}

	private String getHtmlBodyPartCentralAccountRegister(AccountRegistration m, String additionalText) {
		String body = "<HTML><BODY><table style=\"font-family: Arial;font-size: 12px\" cellpadding=\"3\" cellspacing=\"3\" border=\"1\">";

		if (additionalText != null && !additionalText.trim().equals(""))
			body += "<tr><td colspan=\"2\"><H1>" + additionalText + "</H1></td></tr>";

		// 1. Account Lead Name
		body += "<tr><td><b>1. Account Lead Name </b></td><td>  " + m.getAccountLeadName() + "</td></tr>";

		// 2.Account Lead Phone Number
		body += "<tr><td><b>2. Account Lead Phone Number </b></td><td>  " + m.getAccountLeadPhone() + "</td></tr>";

		// 3.Account Lead Email Address
		body += "<tr><td><b>3. Account Lead Email Address </b></td><td>  " + m.getAccountLeadEmail() + "</td></tr>";

		// 4.Account Name
		body += "<tr><td><b>4. Account Name </b></td><td>  " + m.getAccountName() + "</td></tr>";

		// 5. What name will client be looking for when booking?
		body += "<tr><td><b>5. What name will client be looking for when booking? </b></td><td>  "
				+ m.getClientPreferredName() + "</td></tr>";

		// 6. Account Website
		body += "<tr><td><b>6. Account Website </b></td><td>  " + m.getAccountUrl() + "</td></tr>";

		// 7. Account Segment
		body += "<tr><td><b>7. Account Segment </b></td><td>  " + m.getAccountSegmentName() + "</td></tr>";

		// 8. Sales Region
		body += "<tr><td><b>8. Sales Region </b></td><td>  " + m.getSalesRegion() + "</td></tr>";

		// 9. Question on prior pricing Season
		body += "<tr><td><b>9. Did the account price on MarRFP in the prior pricing season? </b></td><td>  "
				+ ((m.getHaspriorprice() != null && m.getHaspriorprice().equals("Y")) ? "Yes" : "No") + "</td></tr>";

		// 10. Third Party Information
		body += "<tr><td><b>10. Is the account utilizing a third party RFP tool to upload/process its RFP's(e.g. Lanyon, ProLodgic, Sabre, etc.)? </b></td><td>  "
				+ ((m.getUtilThirdParty() != null && m.getUtilThirdParty().equals("Y")) ? "Yes" : "No") + "</td></tr>";
		if (m.getUtilThirdParty() != null && m.getUtilThirdParty().equals("Y"))
			body += "<tr><td><b>What is the name of the third party? </b></td><td>  " + m.getThirdPartyName()
					+ "</td></tr>";
		if (m.getThirdPartyId() != null
				&& (m.getThirdPartyId() == 7 || m.getThirdPartyId() == 18 || m.getThirdPartyId() == 19))
			body += "<tr><td><b>Have you received the login ID and password for this third party tool? </b></td><td>  "
					+ ((m.getLoginIdReceived() != null && m.getLoginIdReceived().equals("Y")) ? "Yes" : "No")
					+ "</td></tr>";

		// 11. Question on Solicit Pricing
		body += "<tr><td><b>11. Does the account expect to solicit pricing from more than 3 Marriott properties? </b></td><td>  "
				+ m.getSolicitPricing() + "</td></tr>";
		if (m.getSolicitPricing() != null && m.getSolicitPricing().equals("No")) {
			String reasons = ((m.getReasonToPrice() != null && m.getReasonToPrice().equals("G"))
					? "Group / BT production in my market for this account is of value"
					: "");
			reasons = reasons + ((m.getReasonToPrice() != null && m.getReasonToPrice().equals("L"))
					? "My leader instructed me to register the account"
					: "");
			reasons = reasons + ((m.getReasonToPrice() != null && m.getReasonToPrice().equals("P"))
					? "Pricing process is more efficient through MarRFP"
					: "");
			reasons = reasons.trim();
			reasons = reasons.startsWith(",") ? reasons.substring(1) : reasons;
			body += "<tr><td><b>Please select the reason why you feel it is of value to price this account on MarRFP. </b></td><td>  "
					+ reasons + "</td></tr>";
		}

		// 12. Question on 5k+ room nights
		body += "<tr><td><b>12. Does the account have 5,000 or more total BT room nights that span at least top 5 markets with a minimum of 300 <br> room nights in each market? </b></td><td>  "
				+ ((m.getBtRoomNightSpan() != null && m.getBtRoomNightSpan().equals("Y")) ? "Yes" : "No")
				+ "</td></tr>";

		// 13. Expected Room night
		body += "<tr><td><b>13. What is the expected room night production for the requested pricing year (across all chains - not just Marriott)? </b></td><td>  "
				+ m.getRoomNight() + "</td></tr>";

		// 14. Question on RateLoad Instructions
		body += "<tr><td><b>14. Has the client already provided account GDS rate loading instructions? </b></td><td>  "
				+ ((m.getRateLoadInstr() != null && m.getRateLoadInstr().equals("Y")) ? "Yes" : "No") + "</td></tr>";

		// 15. MarRFP Pricing due date
		body += "<tr><td><b>15. Select the desired MarRFP hotel pricing due date for the hotels to submit pricing in MarRFP. <br> Allow at least a week between the account being made viewable to hotels on MarRFP and the desired MarRFP <br> hotel pricing due date. </b></td><td>  "
				+ m.getPricingPeriodDueDateString() + "</td></tr>";

		// 16. Client Due Date
		body += "<tr><td><b>16. Enter client RFP due date (MM/DD/YYYY).If a due date has not been determined, enter \"TBD\". <br> Allow a minimum of three business days after the MarRFP hotel pricing due date to process the information before <br> data can be submitted to the client. </b></td><td>  "
				+ m.getClientDueDateString() + "</td></tr>";

		// 17. Special Pricing Circumstances
		String specialPricing = ((m.getTwoyearpricing() != null && m.getTwoyearpricing().equals("Y"))
				? "Two year pricing"
				: "");
		specialPricing = specialPricing + ((m.getOffcyclepricing() != null && m.getOffcyclepricing().equals("Y"))
				? " , Off-cycle (non-calendar year) pricing"
				: "");
		specialPricing = specialPricing
				+ ((m.getCommrates() != null && m.getCommrates().equals("Y")) ? " , Commissionable rates" : "");
		specialPricing = specialPricing
				+ ((m.getFlatrates() != null && m.getFlatrates().equals("Y")) ? " , Flat rates" : "");
		specialPricing = specialPricing.trim();
		specialPricing = specialPricing.startsWith(",") ? specialPricing.substring(1) : specialPricing;
		body += "<tr><td><b>17. Check any of these special pricing circumstances if they are being requested by the account. </b></td><td>  "
				+ specialPricing + "</td></tr>";

		body += "</table></BODY></HTML>";
		return body;
	}

	private String getTextBodyPartCentralAccountRegister(AccountRegistration m, String additionalText) {
		String body = "";
		if (additionalText != null && !additionalText.trim().equals(""))
			body += additionalText + "\n\n\n\n";

		// 1. Account Lead Name
		body += "1. Account Lead Name : " + m.getAccountLeadName() + "\n\n";

		// 2.Account Lead Phone Number
		body += "2. Account Lead Phone Number : " + m.getAccountLeadPhone() + "\n\n";

		// 3.Account Lead Email Address
		body += "3. Account Lead Email Address : " + m.getAccountLeadEmail() + "\n\n";

		// 4.Account Name
		body += "4. Account Name : " + m.getAccountName() + "\n\n";

		// 5. What name will client be looking for when booking?
		body += "5. What name will client be looking for when booking? : " + m.getClientPreferredName() + "\n\n";

		// 6. Account Website
		body += "6. Account Website : " + m.getAccountUrl() + "\n\n";

		// 7. Account Segment
		body += "7. Account Segment : " + m.getAccountSegmentName() + "\n\n";

		// 8. Sales Region
		body += "8. Sales Region : " + m.getSalesRegion() + "\n\n";

		// 9. Question on prior pricing Season
		body += "9. Did the account price on MarRFP in the prior pricing season? : "
				+ ((m.getHaspriorprice() != null && m.getHaspriorprice().equals("Y")) ? "Yes" : "No") + "\n\n";

		// 10. Third Party Information
		body += "10. Is the account utilizing a third party RFP tool to upload/process its RFP's(e.g. Lanyon, ProLodgic, Sabre, etc.)? : "
				+ ((m.getUtilThirdParty() != null && m.getUtilThirdParty().equals("Y")) ? "Yes" : "No") + "\n\n";
		if (m.getUtilThirdParty() != null && m.getUtilThirdParty().equals("Y"))
			body += "What is the name of the third party? : " + m.getThirdPartyName() + "\n\n";
		if (m.getThirdPartyId() != null
				&& (m.getThirdPartyId() == 7 || m.getThirdPartyId() == 18 || m.getThirdPartyId() == 19))
			body += "Have you received the login ID and password for this third party tool? : "
					+ ((m.getLoginIdReceived() != null && m.getLoginIdReceived().equals("Y")) ? "Yes" : "No") + "\n\n";

		// 11. Question on Solicit Pricing
		body += "11. Does the account expect to solicit pricing from more than 3 Marriott properties?: "
				+ m.getSolicitPricing() + "\n\n";
		if (m.getSolicitPricing() != null && m.getSolicitPricing().equals("No")) {
			String reasons = ((m.getReasonToPrice() != null && m.getReasonToPrice().equals("G"))
					? "Group / BT production in my market for this account is of value"
					: "");
			reasons = reasons + ((m.getReasonToPrice() != null && m.getReasonToPrice().equals("L"))
					? "My leader instructed me to register the account"
					: "");
			reasons = reasons + ((m.getReasonToPrice() != null && m.getReasonToPrice().equals("P"))
					? "Pricing process is more efficient through MarRFP"
					: "");
			reasons = reasons.trim();
			reasons = reasons.startsWith(",") ? reasons.substring(1) : reasons;
			body += "Please select the reason why you feel it is of value to price this account on MarRFP : " + reasons
					+ "\n\n";
		}

		// 12. Question on 5k+ room nights
		body += "12. Does the account have 5,000 or more total BT room nights that span at least top 5 markets with a minimum of 300 room nights in each market? : "
				+ ((m.getBtRoomNightSpan() != null && m.getBtRoomNightSpan().equals("Y")) ? "Yes" : "No") + "\n\n";

		// 13. Expected Room night
		body += "13. What is the expected room night production for the requested pricing year (across all chains - not just Marriott)? : "
				+ m.getRoomNight() + "\n\n";

		// 14. Question on RateLoad Instructions
		body += "14. Has the client already provided account GDS rate loading instructions? : "
				+ ((m.getRateLoadInstr() != null && m.getRateLoadInstr().equals("Y")) ? "Yes" : "No") + "\n\n";

		// 15. MarRFP Pricing due date
		body += "15. Select the desired MarRFP hotel pricing due date for the hotels to submit pricing in MarRFP. Allow at least a week between the account being made viewable to hotels on MarRFP and the desired MarRFP hotel pricing due date : "
				+ m.getPricingPeriodDueDateString() + "\n\n";

		// 16. Client Due Date
		body += "16. Enter client RFP due date (MM/DD/YYYY).If a due date has not been determined, enter \"TBD\". Allow a minimum of three business days after the MarRFP hotel pricing due date to process the information before data can be submitted to the client :  "
				+ m.getClientDueDateString() + "\n\n";

		// 17. Special Pricing Circumstances
		String specialPricing = ((m.getTwoyearpricing() != null && m.getTwoyearpricing().equals("Y"))
				? "Two year pricing"
				: "");
		specialPricing = specialPricing + ((m.getOffcyclepricing() != null && m.getOffcyclepricing().equals("Y"))
				? " , Off-cycle (non-calendar year) pricing"
				: "");
		specialPricing = specialPricing
				+ ((m.getCommrates() != null && m.getCommrates().equals("Y")) ? " , Commissionable rates" : "");
		specialPricing = specialPricing
				+ ((m.getFlatrates() != null && m.getFlatrates().equals("Y")) ? " , Flat rates" : "");
		specialPricing = specialPricing.trim();
		specialPricing = specialPricing.startsWith(",") ? specialPricing.substring(1) : specialPricing;
		body += "17. Check any of these special pricing circumstances if they are being requested by the account : "
				+ specialPricing + "\n\n";

		return body;
	}

	private String getHtmlBodyPartCentralRegister(AccountRegistration m, String additionalText) {
		String body = "<HTML><BODY><table style=\"font-family: Arial;font-size: 12px\" cellpadding=\"1\" cellspacing=\"1\" border=\"0\">";
		if (additionalText != null && !additionalText.trim().equals(""))
			body += "<tr><td><H1>" + additionalText + "</H1></td></tr>";
		body += "<tr><td>Create Date: " + DateUtility.formatShortDate(DateUtility.getToday()) + "</td></tr>";
		body += "<tr><td>Period: " + m.getRegPeriod() + "</td></tr>";
		body += "<tr><td>1. Account Lead Name: " + m.getAccountLeadName() + "</td></tr>";
		body += "<tr><td>  Account Lead Email: " + m.getAccountLeadEmail() + "</td></tr>";
		body += "<tr><td>2. Account Lead Phone: " + m.getAccountLeadPhone() + "</td></tr>";
		body += "<tr><td>3. Account Name: " + m.getAccountName() + "</td></tr>";
		body += "<tr><td>4. Account Segment: " + m.getAccountSegmentName() + "</td></tr>";
		body += "<tr><td>5. Account Website: " + m.getAccountUrl() + "</td></tr>";
		body += "<tr><td>6. Is the account utilizing a third party to process its RFP's?: "
				+ ((m.getUtilThirdParty() != null && m.getUtilThirdParty().equals("Y")) ? "Yes" : "No") + "</td></tr>";
		if (m.getUtilThirdParty() != null && m.getUtilThirdParty().equals("Y"))
			body += "<tr><td>What is the name of the third party?: " + m.getThirdPartyName() + "</td></tr>";
		if (m.getThirdPartyId() != null
				&& (m.getThirdPartyId() == 7 || m.getThirdPartyId() == 18 || m.getThirdPartyId() == 19))
			body += "<tr><td>Have you received the login ID and password for this third party tool?: "
					+ ((m.getLoginIdReceived() != null && m.getLoginIdReceived().equals("Y")) ? "Yes" : "No")
					+ "</td></tr>";
		body += "<tr><td>7. Does the account have 5,000 or more total BT room nights that span at least top 5 markets with a minimum of 300 room nights in each market?: "
				+ ((m.getBtRoomNightSpan() != null && m.getBtRoomNightSpan().equals("Y")) ? "Yes" : "No")
				+ "</td></tr>";
		body += "<tr><td>8. Expected room night production for the requested pricing year (across all chains - not just Marriott): "
				+ m.getRoomNight() + "</td></tr>";
		body += "<tr><td>9. Does the account expect to solicit pricing from more than 5 Marriott properties?: "
				+ m.getSolicitPricing() + "</td></tr>";
		if (m.getSolicitPricing() != null && m.getSolicitPricing().equals("No")) {
			String reasons = ((m.getReasonToPrice() != null && m.getReasonToPrice().equals("G"))
					? "Group / BT production in my market for this account is of value"
					: "");
			reasons = reasons + ((m.getReasonToPrice() != null && m.getReasonToPrice().equals("L"))
					? "My leader instructed me to register the account"
					: "");
			reasons = reasons + ((m.getReasonToPrice() != null && m.getReasonToPrice().equals("P"))
					? "Pricing process is more efficient through MarRFP"
					: "");
			reasons = reasons.trim();
			reasons = reasons.startsWith(",") ? reasons.substring(1) : reasons;
			body += "<tr><td>Please select the reason why you feel it is of value to price this account on MarRFP: "
					+ reasons + "</td></tr>";
		}
		body += "<tr><td>10. Enter client RFP due date (MM/DD/YYYY).If a due date has not been determined, select \"TBD\".  Allow a minimum of three business days after the MarRFP hotel pricing due date to process the information before data can be submitted to the client:  "
				+ m.getClientDueDateString() + "</td></tr>";
		body += "<tr><td>11. Select the desired MarRFP hotel pricing due date for the hotels to submit pricing in MarRFP.  Allow at least a week between the account being made viewable to hotels on MarRFP and the desired MarRFP hotel pricing due date. "
				+ m.getPricingPeriodDueDateString() + "</td></tr>";
		String specialPricing = ((m.getTwoyearpricing() != null && m.getTwoyearpricing().equals("Y"))
				? "Two year pricing"
				: "");
		specialPricing = specialPricing + ((m.getOffcyclepricing() != null && m.getOffcyclepricing().equals("Y"))
				? " , Off-cycle (non-calendar year) pricing"
				: "");
		specialPricing = specialPricing
				+ ((m.getCommrates() != null && m.getCommrates().equals("Y")) ? " , Commissionable rates" : "");
		specialPricing = specialPricing
				+ ((m.getFlatrates() != null && m.getFlatrates().equals("Y")) ? " , Flat rates" : "");
		specialPricing = specialPricing.trim();
		specialPricing = specialPricing.startsWith(",") ? specialPricing.substring(1) : specialPricing;
		body += "<tr><td>12. Are any of these special pricing circumstances being requested by the account?: "
				+ specialPricing + "</td></tr>";

		body += "</table></BODY></HTML>";
		return body;
	}

	private String getTextBodyPartCentralRegister(AccountRegistration m, String additionalText) {
		String body = "";
		if (additionalText != null && !additionalText.trim().equals(""))
			body += additionalText + "\n\n\n\n";
		body += "Create Date: " + DateUtility.formatShortDate(DateUtility.getToday()) + "\n\n";
		body += "Period: " + m.getRegPeriod() + "\n\n";
		body += "1. Account Lead Name: " + m.getAccountLeadName() + "\n\n";
		body += "  Account Lead Email: " + m.getAccountLeadEmail() + "\n\n";
		body += "2. Account Lead Phone: " + m.getAccountLeadPhone() + "\n\n";
		body += "3. Account Name: " + m.getAccountName() + "\n\n";
		body += "4. Account Segment: " + m.getAccountSegmentName() + "\n\n";
		body += "5. Account Website: " + m.getAccountUrl() + "\n\n";
		body += "6. Is the account utilizing a third party to process its RFP's?: "
				+ ((m.getUtilThirdParty() != null && m.getUtilThirdParty().equals("Y")) ? "Yes" : "No") + "\n\n";
		if (m.getUtilThirdParty() != null && m.getUtilThirdParty().equals("Y"))
			body += "What is the name of the third party?: " + m.getThirdPartyName() + "\n\n";
		if (m.getThirdPartyId() != null
				&& (m.getThirdPartyId() == 7 || m.getThirdPartyId() == 18 || m.getThirdPartyId() == 19))
			body += "Have you received the login ID and password for this third party tool?: "
					+ ((m.getLoginIdReceived() != null && m.getLoginIdReceived().equals("Y")) ? "Yes" : "No") + "\n\n";
		body += "7. Does the account have 5,000 or more total BT room nights that span at least top 5 markets with a minimum of 300 room nights in each market?: "
				+ ((m.getBtRoomNightSpan() != null && m.getBtRoomNightSpan().equals("Y")) ? "Yes" : "No") + "\n\n";
		body += "8. Expected room night production for the requested pricing year (across all chains - not just Marriott): "
				+ m.getRoomNight() + "\n\n";
		body += "9. Does the account expect to solicit pricing from more than 5 Marriott properties?: "
				+ m.getSolicitPricing() + "\n\n";
		if (m.getSolicitPricing() != null && m.getSolicitPricing().equals("No")) {
			String reasons = ((m.getReasonToPrice() != null && m.getReasonToPrice().equals("G"))
					? "Group / BT production in my market for this account is of value"
					: "");
			reasons = reasons + ((m.getReasonToPrice() != null && m.getReasonToPrice().equals("L"))
					? "My leader instructed me to register the account"
					: "");
			reasons = reasons + ((m.getReasonToPrice() != null && m.getReasonToPrice().equals("P"))
					? "Pricing process is more efficient through MarRFP"
					: "");
			reasons = reasons.trim();
			reasons = reasons.startsWith(",") ? reasons.substring(1) : reasons;
			body += "Please select the reason why you feel it is of value to price this account on MarRFP: " + reasons
					+ "\n\n";
		}
		body += "10. Enter client RFP due date (MM/DD/YYYY).If a due date has not been determined, select \"TBD\".  Allow a minimum of three business days after the MarRFP hotel pricing due date to process the information before data can be submitted to the client:  "
				+ m.getClientDueDateString() + "\n\n";
		body += "11. Select the desired MarRFP hotel pricing due date for the hotels to submit pricing in MarRFP.  Allow at least a week between the account being made viewable to hotels on MarRFP and the desired MarRFP hotel pricing due date. "
				+ m.getPricingPeriodDueDateString() + "\n\n";
		String specialPricing = ((m.getTwoyearpricing() != null && m.getTwoyearpricing().equals("Y"))
				? "Two year pricing"
				: "");
		specialPricing = specialPricing + ((m.getOffcyclepricing() != null && m.getOffcyclepricing().equals("Y"))
				? " , Off-cycle (non-calendar year) pricing"
				: "");
		specialPricing = specialPricing
				+ ((m.getCommrates() != null && m.getCommrates().equals("Y")) ? " , Commissionable rates" : "");
		specialPricing = specialPricing
				+ ((m.getFlatrates() != null && m.getFlatrates().equals("Y")) ? " , Flat rates" : "");
		specialPricing = specialPricing.trim();
		specialPricing = specialPricing.startsWith(",") ? specialPricing.substring(1) : specialPricing;
		body += "12. Are any of these special pricing circumstances being requested by the account?: " + specialPricing
				+ "\n\n";

		return body;
	}

	public void registerNonCentralAccount(AccountRegistration accountReg, User user) {
		accountRegisterMgr.registerNonCentralAccount(accountReg, user);
		if (accountReg.getEid() != null) {
			User u = userMgr.findUser(accountReg.getEid());
			if (u != null) {
				accountReg.setAccountLeadName(u.getFullName());
				accountReg.setAccountLeadEmail(u.getEmail());
				if (u.getPhone() != null && u.getPhone().equals(accountReg.getAccountLeadPhone()))
					accountReg.setAccountLeadPhone(u.getPhone());
				else
					accountReg.setAccountLeadPhone(accountReg.getAccountLeadPhone());
			}
		}
		if (accountReg.getAccountID() != -1) {
			accountReg.setAccountName(accountMgr.findLatestAccountName(accountReg.getAccountID()));
		}
		if (accountReg.getAccountType() != null) {
			accountReg.setAccountSegmentName(accountSegmentMgr.getAccountSegmentName(accountReg.getAccountType()));
		}

		if (accountReg.getUtilThirdParty() != null && accountReg.getUtilThirdParty().equals("Y")
				&& accountReg.getThirdPartyId() != null && accountReg.getThirdPartyId() != -1)
			accountReg.setThirdPartyName(accountThirdPartyMgr.getAccountThirdPartiesName(accountReg.getThirdPartyId()));
		else
			accountReg.setThirdPartyName(accountReg.getOtherthirdpartyname());

		if (accountReg.getPricingperiodid() != null) {
			PricingPeriod pp = periodMgr.findDueDate(accountReg.getPricingperiodid());
			accountReg.setPricingPeriodDueDate(pp.getDuedate());
		}
		generateNonCentralRegistrationEmail(accountReg);
	}

	private void generateNonCentralRegistrationEmail(AccountRegistration accountReg) {
		if (constantsMgr.getSendEmail().equals("Y")) {
			/*
			 * get the text to tell user if the email is not a production email
			 */
			String additionalText = constantsMgr.getAddEmailText();

			String sendAddr = constantsMgr.getSendEmailFrom();
			String subject = "New Non-Central Registration - " + accountReg.getPricingPeriodDueDateString() + " - "
					+ accountReg.getAccountName() + " - " + accountReg.getRegPeriod();
			String htmlBody = getHtmlBodyPartNonCentralRegister(accountReg, additionalText);
			String textBody = getTextBodyPartNonCentralRegister(accountReg, additionalText);
			try {
				sendEmailMgr.sendEmail(new SendEmail(sendAddr, sendAddr, subject, textBody, htmlBody, false));
			} catch (Exception e) {
				log.error(e.getMessage(),e);
			}
		}
	}

	private String getHtmlBodyPartNonCentralRegister(AccountRegistration m, String additionalText) {
		String body = "<HTML><BODY><table style=\"font-family: Arial;font-size: 12px\" cellpadding=\"1\" cellspacing=\"1\" border=\"0\">";
		if (additionalText != null && !additionalText.trim().equals(""))
			body += "<tr><td><H1>" + additionalText + "</H1></td></tr>";
		body += "<tr><td>Create Date: " + DateUtility.formatShortDate(DateUtility.getToday()) + "</td></tr>";
		body += "<tr><td>Period: " + m.getRegPeriod() + "</td></tr>";
		body += "<tr><td>1. Marriott Area Account Executive Name: " + m.getAccountLeadName() + "</td></tr>";
		body += "<tr><td>  Marriott Area Account Executive Email: " + m.getAccountLeadEmail() + "</td></tr>";
		body += "<tr><td>  Marriott Area Account Executive Phone: " + m.getAccountLeadPhone() + "</td></tr>";
		body += "<tr><td>2. Name of account to be registered: " + m.getAccountName() + "</td></tr>";
		body += "<tr><td>3. Account Segment: " + m.getAccountSegmentName() + "</td></tr>";
		body += "<tr><td>4. Account Website: " + m.getAccountUrl() + "</td></tr>";
		body += "<tr><td>5.  Account Pricing Due Date. If a due date has not been determined, please put a \"TBD\": "
				+ m.getPricingPeriodDueDateString() + "</td></tr>";
		body += "<tr><td>6. Have you received rate loading instructions from account?: "
				+ ((m.getRateLoadInstr() != null && m.getRateLoadInstr().equals("Y")) ? "Yes" : "No") + "</td></tr>";
		body += "<tr><td>7. Is the account utilizing a third party to process its RFP's?: "
				+ ((m.getUtilThirdParty() != null && m.getUtilThirdParty().equals("Y")) ? "Yes" : "No") + "</td></tr>";
		if (m.getUtilThirdParty() != null && m.getUtilThirdParty().equals("Y"))
			body += "<tr><td>What is the name of the third party?: " + m.getThirdPartyName() + "</td></tr>";
		body += "<tr><td>8. Is the account requesting 2 year rates, off-calendar pricing (Off-cycle), flat or commissionable rates?: "
				+ ((m.getReqRateCycle() != null && m.getReqRateCycle().equals("Y")) ? "Yes" : "No") + "</td></tr>";

		body += "</table></BODY></HTML>";
		return body;
	}

	private String getTextBodyPartNonCentralRegister(AccountRegistration m, String additionalText) {
		String body = "";
		if (additionalText != null && !additionalText.trim().equals(""))
			body += additionalText + "\n\n\n\n";
		body += "Create Date: " + DateUtility.formatShortDate(DateUtility.getToday()) + "\n\n";
		body += "Period: " + m.getRegPeriod() + "\n\n";
		body += "1. Marriott Area Account Executive Name: " + m.getAccountLeadName() + "\n\n";
		body += "  Marriott Area Account Executive Email: " + m.getAccountLeadEmail() + "\n\n";
		body += "  Marriott Area Account Executive Phone: " + m.getAccountLeadPhone() + "\n\n";
		body += "2. Name of account to be registered: " + m.getAccountName() + "\n\n";
		body += "3. Account Segment: " + m.getAccountSegmentName() + "\n\n";
		body += "4. Account Website: " + m.getAccountUrl() + "\n\n";
		body += "5.  Account Pricing Due Date. If a due date has not been determined, please put a \"TBD\": "
				+ m.getPricingPeriodDueDateString() + "\n\n";
		body += "6. Have you received rate loading instructions from account?: "
				+ ((m.getRateLoadInstr() != null && m.getRateLoadInstr().equals("Y")) ? "Yes" : "No") + "\n\n";
		body += "7. Is the account utilizing a third party to process its RFP's?: "
				+ ((m.getUtilThirdParty() != null && m.getUtilThirdParty().equals("Y")) ? "Yes" : "No") + "\n\n";
		if (m.getUtilThirdParty() != null && m.getUtilThirdParty().equals("Y"))
			body += "What is the name of the third party?: " + m.getThirdPartyName() + "\n\n";
		body += "8. Is the account requesting 2 year rates, off-calendar pricing (Off-cycle), flat or commissionable rates?: "
				+ ((m.getReqRateCycle() != null && m.getReqRateCycle().equals("Y")) ? "Yes" : "No") + "\n\n";

		return body;
	}

	public List<Contacttype> getEmailContactOptions(String addemailtext_screentype) {
		return hotelSolicitMgr.getEmailContactOptions(addemailtext_screentype);
	}

	public Contacttype getEmailContactOption(Long accountrecid, String addemailtext_screentype) {
		Contacttype cc = hotelSolicitMgr.getEmailContactOption(accountrecid, addemailtext_screentype);
		if (cc == null) {
			List<Contacttype> cclist = hotelSolicitMgr.getEmailContactOptions(addemailtext_screentype);
			if (cclist != null && cclist.size() > 0)
				cc = cclist.get(0);
		}
		return cc;
	}

	public List<CBCRequestAvail> findAvailCBCRequest(PricingFilterSelections filterValues, User user) {
		if (filterValues != null && filterValues.getAccountFilter() != null
				&& filterValues.getAccountFilter().getAccountrecid() != null
				&& filterValues.getAccountFilter().getAccountrecid() != 0)
			return cbcRequestMgr.findAvailCBCRequest(filterValues, user);
		else
			return null;
	}

	public List<CBCRequestSelected> findSelectedCBCRequest(PricingFilterSelections filterValues, User user) {
		if (filterValues != null && filterValues.getAccountFilter() != null
				&& filterValues.getAccountFilter().getAccountrecid() != null
				&& filterValues.getAccountFilter().getAccountrecid() != 0)
			return cbcRequestMgr.findSelectedCBCRequest(filterValues, user);
		else
			return null;
	}

	public String updateAccountCBCSelect(long accountrecid, List<CBCSelect> cbcSelect, User user) {
		return cbcRequestMgr.updateAccountCBCSelect(accountrecid, cbcSelect, user);
	}

	public void updateAccountCBCAvail(long accountrecid, List<Long> cbcAvail, User user) {
		cbcRequestMgr.updateAccountCBCAvail(accountrecid, cbcAvail, user);
	}

	public List<CBCStatus> findSelectedCBCStatus(PricingFilterSelections filterValues, User user) {
		if (filterValues != null && filterValues.getAccountFilter() != null
				&& filterValues.getAccountFilter().getAccountrecid() != null
				&& filterValues.getAccountFilter().getAccountrecid() != 0)
			return cbcRequestMgr.findSelectedCBCStatus(filterValues, user);
		else
			return null;
	}

	public void updateAcceptanceCBCStatusList(List<CBCStatus> pslist, Long accountrecid, User user) {
		cbcRequestMgr.updateAcceptanceCBCStatusList(pslist, accountrecid, user);
	}
	
	public void updateCBCListByProperty(String status, List<CBCStatus> pslist, Long accountrecid, User user) {
		cbcRequestMgr.updateCBCListByProperty(status, pslist, accountrecid, user);
	}

	public void updateAllAcceptanceCBCStatusList(String status, List<CBCStatus> pslist, Long accountrecid, User user) {
		cbcRequestMgr.updateAllAcceptanceCBCStatusList(status, pslist, accountrecid, user);
	}

	public List<RejectionReason> findCBCRejectionReasons() {
		return cbcRequestMgr.findRejectionReasons();
	}

	public List<PortfolioRebid> findPortfolioRebid(PricingFilterSelections filterValues, User user) {
		if (filterValues != null && filterValues.getAccountFilter() != null
				&& filterValues.getAccountFilter().getAccountrecid() != null
				&& filterValues.getAccountFilter().getAccountrecid() != 0)
			return portfolioRebidMgr.findPortfolioRebid(filterValues, user);
		else
			return null;
	}

	public void updatePortfolioRebidList(List<PortfolioRebid> pslist, Long accountrecid, User user) {
		portfolioRebidMgr.updatePortfolioRebidList(pslist, accountrecid, user);
	}

}

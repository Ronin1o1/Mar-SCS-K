package com.marriott.rfp.dataaccess.userregistration.impl;

import java.io.FileNotFoundException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jms.Destination;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.naming.NamingException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.xml.bind.JAXBException;
import javax.xml.stream.XMLStreamException;

import org.apache.openjpa.persistence.OpenJPAEntityManager;
import org.apache.openjpa.persistence.OpenJPAPersistence;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.userregistration.api.UserRegistrationManager;
import com.marriott.rfp.object.registeringuser.RegisteringUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;

@Service
public class UserRegistrationManagerImpl implements UserRegistrationManager {
	private static final Logger logger = Logger.getLogger(UserRegistrationManagerImpl.class.getName());
	//protected static Log log = LogFactory.getLog(UserRegistrationManagerImpl.class.getName());

	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;
	
	@Autowired
	private JmsTemplate jmsTemplate;
	@Autowired
	private Destination requestCenterInboundQ;
	
    private static final String XML_HEADER = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    private static final String HEADER = "<batchResponse xmlns=\"urn:oasis:names:tc:DSML:2:0:core\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">";
    private static final String FOOTER = "</modifyResponse></batchResponse>";

	String jmsReqId = null;
	private static final String BRAND = "Brand";
	private static final String REGION = "Region";
	private static final String PROPERTY = "Property";
	private static final String FRANCHISE = "Company";

	/**
	 * Default constructor.
	 */
	public UserRegistrationManagerImpl() {

	}

	@Override
	public void processUserRegistrationMessage(String xmlMessageAsString) {

		String returnMessage = null;
		boolean isSuccess = true;
		
		// requestCenterResponseUtil = new RequestCenterResponseUtil();
		
		try {
			List<RegisteringUser> registeringUsers = getRegisteringUsersFromJMSMessage(xmlMessageAsString);
			updateDBUsers(registeringUsers);
		} catch (SecurityException se) {
			returnMessage = se.getMessage();
			isSuccess = false;
			logger.log(Level.SEVERE, "Request Center - - SecurityException");
			//log.error("Request Center - - SecurityException");
		} catch (Exception e) {
			returnMessage = "Error while processing XML request";
			isSuccess = false;
			logger.log(Level.SEVERE,e.getMessage());
			logger.log(Level.SEVERE, "Request Center - - Exception: " + returnMessage);
			//log.error("Request Center - - Exception: " + returnMessage);
		} finally {
			try {
				sendRCResponse(jmsReqId, isSuccess, returnMessage);
				logger.log(Level.INFO, "Request Center -Sent message");

				//log.error("Request Center -Sent message");
			} catch (Exception e) {
				throw new RuntimeException("Request Center - Exception while sending response " + e.getLocalizedMessage());
			}
		}
	}
	
	 public void sendRCResponse(String reqId, boolean status, String errorMessage) throws NamingException, JMSException, JAXBException {

			String responseXML = "";
			try {
			    responseXML = constructXML(reqId, status, errorMessage);
			} catch (Exception e) {
			    throw new RuntimeException("Request Center - Exception while Constructing Request Center response" + e.getLocalizedMessage());
			}
			logger.info("Request Center - Response: " + responseXML);

			// Submit to Request center.
			try {
				
					logger.info("jmsTemplate: " + jmsTemplate); //logger.log(Level.INFO, "jmsTemplate: " + jmsTemplate);
					jmsTemplate.send(requestCenterInboundQ ,new MessageCreator() {
					public Message createMessage(Session session) throws JMSException {
						logger.info("Session : " + session);
						TextMessage message = session.createTextMessage(constructXML(reqId, status, errorMessage));
						logger.info(message.toString());
						return message;
					}
				});

				logger.info("Request Center - Response sent: " + responseXML);
			} catch (Exception e) {
				logger.info("Request Center - Response exception ");
			    throw new RuntimeException("Request Center - Exception while sending jms message" + e.getLocalizedMessage());
			}
		    }

	private static String constructXML(String reqId, boolean success, String errorMessage) {
			String MODIFY_RESPONSE = "<modifyResponse matchedDN=\"cn=appro109,ou=people,dc=marriott,dc=com\" requestID=\"" + reqId + "\">";
			String RESULT_CODE = "";
			if (success) {
			    RESULT_CODE = RESULT_CODE + "<resultCode code=\"0\" descr=\"success\"/>";
			} else {
			    RESULT_CODE = RESULT_CODE + "<resultCode code=\"99\" descr=\"failed\"/>";
			    RESULT_CODE = RESULT_CODE + "<errorMessage>" + errorMessage + "</errorMessage>";
			}
			String finalString = XML_HEADER + HEADER + MODIFY_RESPONSE + RESULT_CODE + FOOTER;

			return finalString;
		    }

	public List<RegisteringUser> getRegisteringUsersFromJMSMessage(String xmlMessageAsString) {
		List<RegisteringUser> registeringUsers = null;
		try {
			registeringUsers = RequestCenterMessageUtil.processRequestCenterMessage(xmlMessageAsString);
		} catch (FileNotFoundException fne) {
			throw new RuntimeException("***File Not Found Exception***" + fne.getLocalizedMessage());
		} catch (XMLStreamException streamException) {
			throw new RuntimeException("***Streaming Exception***" + streamException.getLocalizedMessage());
		} catch (Exception e) {
			throw new RuntimeException("***Exception***" + e.getLocalizedMessage());
		}
		return registeringUsers;
	}

	private void updateDBUsers(List<RegisteringUser> registeringUsers) {

		for (RegisteringUser registeringUser : registeringUsers) {
			jmsReqId = registeringUser.getJmsReqId();
			String role = registeringUser.getRole();

			if (role == null) {
				deleteUser(registeringUser, role); // make user inactive if
				// EDSROLE not present.
			} else {
				addUpdateGroup(role);
				addUpdateUser(registeringUser, role); // update user

				if (registeringUser.getDeleteType() != null) {
					deleteList(registeringUser, role);
				}
				if (registeringUser.getAddType() != null) {
					updateList(registeringUser, role);
				}
			}
		}// for
	}

	private void addUpdateGroup(String groupName) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			if (con != null) {
				try {
					CallableStatement cstmt = con.prepareCall("begin mfpproc.sp_ds_incl_addupdategroups(?);end;");
					try {
						cstmt.setString(1, groupName);
						cstmt.execute();

					} finally {
						cstmt.close();
					}
				} finally {
					con.close();
				}
			}// ifcon!=null

		} catch (SQLException e) {
			logger.log(Level.SEVERE,e.getMessage());
		}
	}

	private void addUpdateUser(RegisteringUser dbUserObj, String groupName) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			if (con != null) {
				try {
					CallableStatement cstmt = con.prepareCall("begin mfpproc.sp_ds_incl_addupdateuser(?,?,?,?,?,?,?,?,?,?,?,?);end;");
					try {

						cstmt.setString(1, dbUserObj.getLastName());
						cstmt.setString(2, dbUserObj.getLastName());
						cstmt.setString(3, dbUserObj.getFirstName());
						cstmt.setString(4, dbUserObj.getEmail());
						cstmt.setString(5, dbUserObj.getPhone());
						cstmt.setString(6, dbUserObj.getCity());
						cstmt.setString(7, dbUserObj.getState());
						cstmt.setString(8, dbUserObj.getCountry());
						cstmt.setString(9, dbUserObj.getEid());
						cstmt.setString(10, ""); // company
						cstmt.setString(11, groupName);
						cstmt.setString(12, "");
						cstmt.execute();

					} finally {
						cstmt.close();
					}
				} finally {
					con.close();
				}
			}// ifcon!=null

		} catch (SQLException e) {
			logger.log(Level.SEVERE,e.getMessage());
		}

	}

	private void updateList(RegisteringUser registeringUser, String groupName) {
		String addType = registeringUser.getAddType();
		List<String> addList = registeringUser.getAddList();
		int userId = getUserId(registeringUser.getEid());

		if (addType.equals(BRAND)) {
			try {
				OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
				Connection con = (Connection) kem.getConnection();
				if (con != null) {
					try {
						for (String brandId : addList) {
							CallableStatement cstmt = con.prepareCall("begin mfpproc.SP_DS_INCL_ADDUSERBRAND(?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, brandId); // Integer.toString(brandId)
								cstmt.execute();

							} finally {
								cstmt.close();
							}
						}// for
					} finally {
						con.close();
					}
				}// ifcon!=null

			} catch (SQLException e) {
				logger.log(Level.SEVERE,e.getMessage());
			}
			delAllPropertiesFromDS_PropUser(Integer.toString(userId));
			addDeleteProperties(BRAND, Integer.toString(userId));

		} else if (addType.equals(PROPERTY)) {
			try {
				OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
				Connection con = (Connection) kem.getConnection();
				if (con != null) {
					try {
						for (String marshacode : addList) {
							CallableStatement cstmt = con.prepareCall("begin mfpproc.SP_DS_INCL_ADDPROPUSERS(?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, marshacode);
								cstmt.execute();

							} finally {
								cstmt.close();
							}
						}// for
					} finally {
						con.close();
					}

				}// ifcon!=null
			} catch (SQLException e) {
				logger.log(Level.SEVERE,e.getMessage());
			}
		} else if (addType.equals(REGION)) {
			try {
				OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
				Connection con = (Connection) kem.getConnection();
				if (con != null) {
					try {
						for (String region_id : addList) {
							CallableStatement cstmt = con.prepareCall("begin mfpproc.SP_DS_INCL_ADDUSERREGION(?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, region_id);
								cstmt.execute();

							} finally {
								cstmt.close();
							}
						}// for
					} finally {
						con.close();
					}
				}// ifcon!=null

			} catch (SQLException e) {
				logger.log(Level.SEVERE,e.getMessage());
			}

			delAllPropertiesFromDS_PropUser(Integer.toString(userId));
			addDeleteProperties(REGION, Integer.toString(userId));
		} else if (addType.equals(FRANCHISE)) {
			try {
				OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
				Connection con = (Connection) kem.getConnection();
				if (con != null) {
					try {
						for (String franchCode : addList) {
							CallableStatement cstmt = con.prepareCall("begin mfpproc.SP_DS_INCL_ADDUSERFRANCH(?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, franchCode);
								cstmt.execute();

							} finally {
								cstmt.close();
							}
						}// for
					} finally {
						con.close();
					}
				}// ifcon!=null

			} catch (SQLException e) {
				logger.log(Level.SEVERE,e.getMessage());

			}

			delAllPropertiesFromDS_PropUser(Integer.toString(userId));
			addDeleteProperties(FRANCHISE, Integer.toString(userId));
		}

	}

	private void deleteList(RegisteringUser registeringUser, String groupName) {

		String deleteType = registeringUser.getDeleteType();
		List<String> deleteList = registeringUser.getDeleteList();
		int userId = getUserId(registeringUser.getEid());

		if (deleteType.equals(BRAND)) {
			try {
				OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
				Connection con = (Connection) kem.getConnection();
				if (con != null) {
					try {
						for (String brandId : deleteList) {
							CallableStatement cstmt = con.prepareCall("begin mfpproc.SP_DS_INCL_DELETEUSERBRAND(?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, brandId);
								cstmt.execute();

							} finally {
								cstmt.close();
							}
						}// for
					} finally {
						con.close();
					}
				}// ifcon!=null

			} catch (SQLException e) {
				logger.log(Level.SEVERE,e.getMessage());
			}

		} else if (deleteType.equals(PROPERTY)) {
			try {
				OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
				Connection con = (Connection) kem.getConnection();
				if (con != null) {
					try {
						for (String marshacode : deleteList) {
							CallableStatement cstmt = con.prepareCall("begin mfpproc.sp_ds_incl_deletepropusers(?,?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, marshacode);
								cstmt.setString(3, registeringUser.getRole());
								cstmt.execute();
							} finally {
								cstmt.close();
							}
						}// for
					} finally {
						con.close();
					}

				}// ifcon!=null
			} catch (SQLException e) {
				logger.log(Level.SEVERE,e.getMessage());

			}
		} else if (deleteType.equals(REGION)) {
			try {
				OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
				Connection con = (Connection) kem.getConnection();
				if (con != null) {
					try {
						for (String region_id : deleteList) {
							CallableStatement cstmt = con.prepareCall("begin mfpproc.SP_DS_INCL_DELETEUSERREGION(?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, region_id);
								cstmt.execute();

							} finally {
								cstmt.close();
							}
						}// for
					} finally {
						con.close();
					}
				}// ifcon!=null

			} catch (SQLException e) {
				logger.log(Level.SEVERE,e.getMessage());

			}

		} else if (deleteType.equals(FRANCHISE)) {
			try {
				OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
				Connection con = (Connection) kem.getConnection();
				if (con != null) {
					try {
						for (String franchCode : deleteList) {
							CallableStatement cstmt = con.prepareCall("begin mfpproc.SP_DS_INCL_DELETEUSERFRANCH(?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, franchCode);
								cstmt.execute();

							} finally {
								cstmt.close();
							}
						}// for
					} finally {
						con.close();
					}
				}// ifcon!=null

			} catch (SQLException e) {
				logger.log(Level.SEVERE,e.getMessage());

			}
		}
	}

	private int getUserId(String eid) {
		String queryString = "select cn_userid from mfpdbo.ds_user where eid='" + eid + "'";
		Query q = em.createNativeQuery(queryString, Integer.class);
		return (Integer) q.getSingleResult();
	}

	private void deleteUser(RegisteringUser dbUserObj, String groupName) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			if (con != null) {
				try {
					CallableStatement cstmt = con.prepareCall("begin mfpproc.SP_DS_INCL_DELETEUSER(?,?);end;");
					try {

						cstmt.setString(1, dbUserObj.getEid());
						cstmt.setString(2, "");
						cstmt.execute();

					} finally {
						cstmt.close();
					}
				} finally {
					con.close();
				}
			}// ifcon!=null

		} catch (SQLException e) {
			logger.log(Level.SEVERE,e.getMessage());

		}

	}

	private void delAllPropertiesFromDS_PropUser(String userId) {
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			if (con != null) {
				try {
					CallableStatement cstmt = con.prepareCall("begin mfpproc.SP_DS_INCL_UPDATEUSERALLHOTEL(?,?);end;");
					try {

						cstmt.setString(1, userId);
						cstmt.setString(2, "N");
						cstmt.execute();

					} finally {
						cstmt.close();
					}
				} finally {
					con.close();
				}
			}// ifcon!=null

		} catch (SQLException e) {
			logger.log(Level.SEVERE,e.getMessage());

		}

	}

	private void addDeleteProperties(String receivedStr, String userId) {
		CallableStatement cstmt = null;
		try {
			OpenJPAEntityManager kem = OpenJPAPersistence.cast(em);
			Connection con = (Connection) kem.getConnection();
			if (con != null) {
				try {
					if (receivedStr.equals(BRAND))
						cstmt = con.prepareCall("begin mfpproc.sp_ds_incl_updateuserbrand(?);end;");
					else if (receivedStr.equals(REGION))
						cstmt = con.prepareCall("begin mfpproc.sp_ds_incl_updateuserregion(?);end;");
					else if (receivedStr.equals(FRANCHISE))
						cstmt = con.prepareCall("begin mfpproc.sp_ds_incl_updateuserfranch(?);end;");
					try {

						cstmt.setString(1, userId);
						cstmt.execute();

					} finally {
						cstmt.close();
					}
				} finally {
					con.close();
				}
			}// ifcon!=null

		} catch (SQLException e) {
			logger.log(Level.SEVERE,e.getMessage());

		}
	}


}

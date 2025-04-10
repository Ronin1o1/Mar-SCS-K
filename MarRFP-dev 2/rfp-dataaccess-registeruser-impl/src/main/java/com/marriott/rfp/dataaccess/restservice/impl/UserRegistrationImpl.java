package com.marriott.rfp.dataaccess.restservice.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.orm.jpa.EntityManagerFactoryInfo;
import org.springframework.stereotype.Service;

@Service
public class UserRegistrationImpl {
	private static final Logger logger = LoggerFactory.getLogger(UserRegistrationImpl.class);

	@PersistenceContext
	private EntityManager em;

	private static final String BRAND = "Brand";
	private static final String REGION = "Region";
	private static final String PROPERTY = "Property";
	private static final String FRANCHISE = "Franchise";
	private static final String FAILED = "failed";
	private static final String SUCCESS = "success";
	private static final String CODE_0 = "0";
	private static final String CODE_99 = "99";

	public String userRegistration(AddRequest request) throws UserDefinedException {
		String response = null;
		try {
			String AccessType = request.getAccessType();
			logger.info(" JSON REQUEST " + request);
			if (request != null && AccessType != null) {
				if (AccessType.equals("Update")) {
					response = update(request);
				} else if (AccessType.equals("RemoveAll")) {
					response = removeAll(request);
				} else if (AccessType.equals("Delete")) {
					response = delete(request);
				} else {
					throw new UserDefinedException("Invalid Accesstype");
				}
			} else {
				throw new UserDefinedException("Error while processing request");
			}
		} catch (UserDefinedException ue) {
			String comments = ue.getMessage();
			response = RequestCenterJSONResponse.generateResponse(createResponse(request, CODE_99, FAILED, comments));
			logger.error(comments);
		} catch (Exception e) {
			String comments = "Error while processing request";
			response = RequestCenterJSONResponse.generateResponse(createResponse(request, CODE_99, FAILED, comments));
		}
		return response;
	}

	private Connection connection() throws Exception {
		EntityManagerFactoryInfo info = (EntityManagerFactoryInfo) em.getEntityManagerFactory();
		Connection con = info.getDataSource().getConnection();
		return con;
	}

	private int getUserId(String eid) throws UserDefinedException {
		try {
			String query = "select cn_userid from mfpdbo.ds_user where eid='" + eid + "'";
			Query q = em.createNativeQuery(query, Integer.class);
			return (Integer) q.getSingleResult();
		} catch (Exception e) {
			throw new UserDefinedException("Error while processing request");
		}

	}

	private String getBrandId(String brandName) throws UserDefinedException {
		String query = "select affiliationid from mfpdbo.hotelaffiliation where affiliationname ='" + brandName + "'";
		Query q = em.createNativeQuery(query, Long.class);
		Long brand_Id = (Long) q.getSingleResult();
		String brandId = Long.toString(brand_Id);
		return brandId;
	}

	private String getPropertycode(String addList) {
		String query = "select marshacode from mfpdbo.hotel where marshacode ='" + addList
				+ "' and PARTITION_IDX in('M')";
		Query q = em.createNativeQuery(query, String.class);
		String propertycode = (String) q.getSingleResult();
		return propertycode;
	}

	private String getRegionId(String regionName) throws UserDefinedException {
		String query = "select regionid from mfpdbo.region_ref where regionname ='" + regionName + "'";
		Query q = em.createNativeQuery(query, Long.class);
		Long region_id = (Long) q.getSingleResult();
		String regionId = Long.toString(region_id);
		return regionId;
	}

	private String getFranchId(String franchName) throws UserDefinedException {
		String query = "select franchcode from mfpdbo.franchise where franchname ='" + franchName + "'";
		Query q = em.createNativeQuery(query, String.class);
		String franchCode = (String) q.getSingleResult();
		return franchCode;
	}

	private String update(AddRequest request) throws UserDefinedException {
		String response = null;
		String Eid = request.getEid();
		if (StringUtils.isNotEmpty(Eid)) {
			String role = request.getRole();
			if (StringUtils.isEmpty(role)) {
				deleteDBUser(request); // make user inactive if EDSROLE not present.
				throw new UserDefinedException("EDS Role cannot be null, user made inactive");
			} else if (role.equalsIgnoreCase("MFPUSER")) {
				addUpdateGroup(role); // update role
				addUpdateUser(request, role); // update user
				if (request.getDeleteType() != null && request.getDeleteList() != null) {
					deleteList(request, role);
				}
				if (request.getAddType() != null && request.getAddList() != null) {
					updateList(request, role);
				}
				String comments = "Updated access";
				response = RequestCenterJSONResponse
						.generateResponse(createResponse(request, CODE_0, SUCCESS, comments));
			} else {
				throw new UserDefinedException("Error while processing request");
			}

		} else {
			throw new UserDefinedException("CUSTOMEREID cannot be null");
		}

		return response;
	}

	private void deleteDBUser(AddRequest request) throws UserDefinedException {
		try {
			Connection con = connection();
			if (con != null) {
				try {
					CallableStatement cstmt = con.prepareCall("begin mfpproc.SP_DS_INCL_DELETEUSER(?,?);end;");
					try {

						cstmt.setString(1, request.getEid());
						cstmt.setString(2, "");
						cstmt.execute();

					} finally {
						cstmt.close();
					}
				} finally {
					con.close();
				}
			} // ifcon!=null

		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new UserDefinedException("Error while processing request");
		}
	}

	private void addUpdateGroup(String groupname) throws UserDefinedException {
		try {
			Connection con = connection();
			if (con != null) {
				try {
					CallableStatement cstmt = con.prepareCall("begin mfpproc.sp_ds_incl_addupdategroups(?);end;");
					try {
						cstmt.setString(1, groupname);
						cstmt.execute();

					} finally {
						cstmt.close();
					}
				} finally {
					con.close();
				}
			}

		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new UserDefinedException("Error while processing request");
		}

	}

	private void addUpdateUser(AddRequest modifyRequest, String groupname) throws UserDefinedException {
		try {
			Connection con = connection();
			if (con != null) {
				try {
					CallableStatement cstmt = con
							.prepareCall("begin mfpproc.sp_ds_incl_addupdateuser(?,?,?,?,?,?,?,?,?,?,?,?);end;");
					try {

						cstmt.setString(1, modifyRequest.getEid());
						cstmt.setString(2, modifyRequest.getLastName());
						cstmt.setString(3, modifyRequest.getFirstName());
						cstmt.setString(4, modifyRequest.getEmail());
						cstmt.setString(5, modifyRequest.getPhone());
						cstmt.setString(6, modifyRequest.getCity());
						cstmt.setString(7, modifyRequest.getState());
						cstmt.setString(8, modifyRequest.getCountry());
						cstmt.setString(9, modifyRequest.getEid());
						cstmt.setString(10, ""); // company
						cstmt.setString(11, groupname);
						cstmt.setString(12, "");
						cstmt.execute();

					} finally {
						cstmt.close();
					}
				} finally {
					con.close();
				}
			} // ifcon!=null

		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new UserDefinedException("Error while processing request");
		}
	}

	private void updateList(AddRequest req, String role) throws UserDefinedException {
		String addType = req.getAddType();
		List<String> addList = req.getAddList();
		int userId = getUserId(req.getEid());
		List<String> newaddList = new ArrayList<String>();

		if (addType.equals(BRAND)) {
			try {
				for(String brandName : addList) {
					String brand_code=getBrandId(brandName);
					newaddList.add(brand_code);	
					
				}
				Connection con = connection();
				if (con != null) {
					try {
						for (String brandId : newaddList) {
							
							CallableStatement cstmt = con
									.prepareCall("begin mfpproc.SP_DS_INCL_ADDUSERBRAND(?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, brandId); // Integer.toString(brandId)
								cstmt.execute();

							} finally {
								cstmt.close();
							}
						} // for
					} finally {
						con.close();
					}
				} // ifcon!=null

			} catch (Exception e) {
				logger.error(e.getMessage());
				throw new UserDefinedException("Error while processing request");
			}
			deleteAllPropertiesFromDS_PropUser(Integer.toString(userId));
			addDelProperties(BRAND, Integer.toString(userId));

		} else if (addType.equals(PROPERTY)) {
			try {
				for(String marshacode : addList)
				{
					String propertycode = getPropertycode(marshacode);
					newaddList.add(propertycode);
				}
				Connection con = connection();
				if (con != null) {
					try {
						for (String property_code : newaddList) {
							
							CallableStatement cstmt = con
									.prepareCall("begin mfpproc.SP_DS_INCL_ADDPROPUSERS(?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, property_code);
								cstmt.execute();

							} finally {
								cstmt.close();
							}
						} // for
					} finally {
						con.close();
					}

				} // ifcon!=null
			} catch (Exception e) {
				logger.error(e.getMessage());
				throw new UserDefinedException("Error while processing request");
			}
		} else if (addType.equals(REGION)) {
			try {
				for(String regionName : addList) {
					String region_code = getRegionId(regionName);
					newaddList.add(region_code);
				}
				Connection con = connection();
				if (con != null) {
					try {
						for (String regionId : newaddList) {
							
							CallableStatement cstmt = con
									.prepareCall("begin mfpproc.SP_DS_INCL_ADDUSERREGION(?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, regionId);
								cstmt.execute();

							} finally {
								cstmt.close();
							}
						} // for
					} finally {
						con.close();
					}
				} // ifcon!=null

			} catch (Exception e) {
				logger.error(e.getMessage());
				throw new UserDefinedException("Error while processing request");
			}

			deleteAllPropertiesFromDS_PropUser(Integer.toString(userId));
			addDelProperties(REGION, Integer.toString(userId));
		} else if (addType.equals(FRANCHISE)) {
			try {
				for (String franchName : addList) {
					String franch_code = getFranchId(franchName);
					newaddList.add(franch_code);
				}
				Connection con = connection();
				if (con != null) {
					try {
						for (String franchId : newaddList) {
							
							CallableStatement cstmt = con
									.prepareCall("begin mfpproc.SP_DS_INCL_ADDUSERFRANCH(?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, franchId);
								cstmt.execute();

							} finally {
								cstmt.close();
							}
						} // for
					} finally {
						con.close();
					}
				} // ifcon!=null

			} catch (Exception e) {
				logger.error(e.getMessage());
				throw new UserDefinedException("Error while processing request");
			}

			deleteAllPropertiesFromDS_PropUser(Integer.toString(userId));
			addDelProperties(FRANCHISE, Integer.toString(userId));
		} else {
			throw new UserDefinedException("Invalid Addtype");
		}

	}

	private void deleteList(AddRequest req, String role) throws UserDefinedException {
		String deleteType = req.getDeleteType();
		List<String> deleteList = req.getDeleteList();
		List<String> newdeleteList= new ArrayList<String>();
		int userId = getUserId(req.getEid());

		if (deleteType.equals(BRAND)) {
			try {
				for (String brandName : deleteList) {
					String brand_code = getBrandId(brandName);
					newdeleteList.add(brand_code);
				}
				Connection con = connection();
				if (con != null) {
					try {
						for (String brandId : newdeleteList) {
							
							CallableStatement cstmt = con
									.prepareCall("begin mfpproc.SP_DS_INCL_DELETEUSERBRAND(?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, brandId);
								cstmt.execute();

							} finally {
								cstmt.close();
							}
						} // for
					} finally {
						con.close();
					}
				} // ifcon!=null

			} catch (Exception e) {
				logger.error(e.getMessage());
				throw new UserDefinedException("Error while processing request");
			}

		} else if (deleteType.equals(PROPERTY)) {
			try {
				for (String marshacode : deleteList) {
					String propertycode = getPropertycode(marshacode);
					newdeleteList.add(propertycode);
				}
				Connection con = connection();
				if (con != null) {
					try {
						for (String property_code : newdeleteList) {
							
							CallableStatement cstmt = con
									.prepareCall("begin mfpproc.sp_ds_incl_deletepropusers(?,?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, property_code);
								cstmt.setString(3, req.getRole());
								cstmt.execute();
							} finally {
								cstmt.close();
							}
						} // for
					} finally {
						con.close();
					}

				} // ifcon!=null
			} catch (Exception e) {
				logger.error(e.getMessage());
				throw new UserDefinedException("Error while processing request");
			}
		} else if (deleteType.equals(REGION)) {
			try {
				for (String regionName : deleteList) {
					String region_code = getRegionId(regionName);
					newdeleteList.add(region_code);
				}
				Connection con = connection();
				if (con != null) {
					try {
						for (String regionId : newdeleteList) {
							
							CallableStatement cstmt = con
									.prepareCall("begin mfpproc.SP_DS_INCL_DELETEUSERREGION(?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, regionId);
								cstmt.execute();

							} finally {
								cstmt.close();
							}
						} // for
					} finally {
						con.close();
					}
				} // ifcon!=null

			} catch (Exception e) {
				logger.error(e.getMessage());
				throw new UserDefinedException("Error while processing request");
			}

		} else if (deleteType.equals(FRANCHISE)) {
			try {
				for(String franchName : deleteList) {
					String franch_code = getFranchId(franchName);
					newdeleteList.add(franch_code);
				}
				Connection con = connection();
				if (con != null) {
					try {
						for (String franchId : newdeleteList) {
							
							CallableStatement cstmt = con
									.prepareCall("begin mfpproc.SP_DS_INCL_DELETEUSERFRANCH(?,?);end;");
							try {
								cstmt.setString(1, Integer.toString(userId));
								cstmt.setString(2, franchId);
								cstmt.execute();

							} finally {
								cstmt.close();
							}
						} // for
					} finally {
						con.close();
					}
				} // ifcon!=null

			} catch (Exception e) {
				logger.error(e.getMessage());
				throw new UserDefinedException("Error while processing request");
			}
		} else {
			throw new UserDefinedException("Invalid Deletetype");
		}

	}

	private void addDelProperties(String req, String userId) throws UserDefinedException {
		CallableStatement cstmt = null;
		try {
			Connection con = connection();
			if (con != null) {
				try {
					if (req.equals(BRAND))
						cstmt = con.prepareCall("begin mfpproc.sp_ds_incl_updateuserbrand(?);end;");
					else if (req.equals(REGION))
						cstmt = con.prepareCall("begin mfpproc.sp_ds_incl_updateuserregion(?);end;");
					else if (req.equals(FRANCHISE))
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
			} // ifcon!=null

		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new UserDefinedException("Error while processing request");
		}

	}

	private void deleteAllPropertiesFromDS_PropUser(String userId) throws UserDefinedException {
		try {
			Connection con = connection();
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
			} // ifcon!=null

		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new UserDefinedException("Error while processing request");

		}
	}

	private String removeAll(AddRequest request) throws UserDefinedException {
		String response = null;
		String Eid = request.getEid();
		if (StringUtils.isNotEmpty(Eid)) {
			try {
				int userId = getUserId(request.getEid());
				Connection con = connection();
				if (con != null) {
					try {
						deleteAllPropertiesFromDS_PropUser(Integer.toString(userId));
						String a = "DELETE from mfpdbo.ds_affiluser WHERE cn_userid ='" + userId + "'";
						Statement stmt = con.createStatement();
						stmt.executeQuery(a);
						stmt.close();
						String r = "DELETE from mfpdbo.ds_regionuser WHERE cn_userid ='" + userId + "'";
						Statement Stmt = con.createStatement();
						Stmt.executeQuery(r);
						Stmt.close();
						String f = "DELETE from mfpdbo.ds_franchuser WHERE cn_userid ='" + userId + "'";
						Statement Stmt1 = con.createStatement();
						Stmt1.executeQuery(f);
						Stmt1.close();
						deleteDBUser(request);
						String comments = "Removed all access";
						response = RequestCenterJSONResponse
								.generateResponse(createResponse(request, CODE_0, SUCCESS, comments));

					} finally {
						con.close();
					}
				} // ifcon!=null
			} catch (Exception e) {
				logger.error(e.getMessage());
				throw new UserDefinedException("Error while processing request");
			}
		} else {
			throw new UserDefinedException("CUSTOMEREID cannot be null");
		}
		return response;
	}

	private String delete(AddRequest request) throws UserDefinedException {
		String response = null;
		String Eid = request.getEid();
		if (StringUtils.isNotEmpty(Eid)) {
			int userId = getUserId(Eid);
			int refresh = getRefresh(Eid);
			if (refresh == -1) {
				try {
					Connection con = connection();
					String Q = "DELETE from mfpdbo.ds_user WHERE cn_refresh = -1 and cn_userid ='" + userId + "'";
					Statement Stmt = con.createStatement();
					Stmt.executeQuery(Q);
					Stmt.close();
					con.close();
					String comments = "User Deleted";
					response = RequestCenterJSONResponse
							.generateResponse(createResponse(request, CODE_0, SUCCESS, comments));

				} catch (Exception e) {
					logger.error(e.getMessage());
					throw new UserDefinedException("Error while processing request");
				}

			}
			if (refresh == 5) {
				throw new UserDefinedException("Active user cannot be deleted");
			}

		} else {
			throw new UserDefinedException("CUSTOMEREID cannot be null");
		}
		return response;
	}

	private int getRefresh(String eid) throws UserDefinedException {
		try {
			String queryString = "select cn_refresh from mfpdbo.ds_user where eid='" + eid + "'";
			Query q = em.createNativeQuery(queryString, Integer.class);
			return (Integer) q.getSingleResult();
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw new UserDefinedException("Error while processing request");
		}
	}

	private SecurityResponse createResponse(AddRequest request, String code, String description, String comments) {
		SecurityResponse response = new SecurityResponse();
		if (request.getrequestID() != null) {
			ModifyResponse modifyResponse = new ModifyResponse();
			modifyResponse.setRequestID(request.getrequestID().toString());
			modifyResponse.setCode(code);
			modifyResponse.setDescription(description);
			modifyResponse.setComments(comments);
			response.setModifyResponse(modifyResponse);
		} else {
			throw new RuntimeException();
		}
		return response;
	}

}
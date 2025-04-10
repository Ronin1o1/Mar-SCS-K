package com.marriott.rfp.dataacess.pricing.accountmcad.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Vector;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.marriott.rfp.dataacess.pricing.accountmcad.api.NetezzaMCADManager;
import com.marriott.rfp.object.pricing.account.MCADData;
import com.marriott.rfp.object.pricing.account.MCADDetail;

/**
 * Session Bean implementation class NetezzaMCADManager
 */
@Service
public class NetezzaMCADManagerImpl implements NetezzaMCADManager {

	private static final Logger log = LoggerFactory.getLogger(NetezzaMCADManagerImpl.class);
	private static final String NETEZZA_DRIVER_NAME = "org.netezza.Driver";

	private Connection getConnection(String url, String netezzaUserId, String netezzaPassword) {

		Connection connection = null;

		try {

			Class.forName(NETEZZA_DRIVER_NAME).newInstance();
			connection = DriverManager.getConnection(url, netezzaUserId, netezzaPassword);

		} catch (ClassNotFoundException cnfe) {
			throw new IllegalArgumentException("Unable to Instantiate the class: " + NETEZZA_DRIVER_NAME);
		} catch (InstantiationException e) {
			throw new IllegalArgumentException("Unable to Instantiate the class: " + NETEZZA_DRIVER_NAME);
		} catch (IllegalAccessException e) {
			throw new IllegalArgumentException("Unable to Instantiate the class: " + NETEZZA_DRIVER_NAME);
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			throw new IllegalArgumentException("Unable to Instantiate the class: " + NETEZZA_DRIVER_NAME);
		}

		return connection;
	}

	public List<MCADData> getNetezzaMcadSummaryByName(String businessName, String businessLevel, String countryCode, long maxResults, String url,
			String netezzaUserId, String netezzaPassword) throws SQLException {

		List<MCADData> list = new Vector<MCADData>();

		Connection connection = getConnection(url, netezzaUserId, netezzaPassword);
		try {
			String queryString = "SELECT t0.global_business_id,     t0.ultimate_business_id,       t0.ultimate_business_name,"
					+ "       t0.parent_business_id,  t0.parent_business_name, t0.business_id,  t0.business_name,"
					+ "       t0.street_address,  t0.city_name,   t0.state_abbrev,  t0.state, t0.zip_code,"
					+ "       t0.country_code,  t0.primary_sic_description,  t0.account_nat_key,  count(t1.business_id) as child_count "
					+ "  FROM admin.edw_dim_account_facts_mfpuser_v t0 LEFT OUTER JOIN admin.edw_dim_account_facts_mfpuser_v t1 ";

			if (businessLevel.equals("P")) {
				queryString += "    ON (t0.parent_business_id = t1.parent_business_id   AND t1.business_id != t1.parent_business_id "
						+ "   AND t1.business_id != t1.ultimate_business_id  AND t1.business_id != t1.global_business_id)"
						+ " WHERE t0.business_id = t0.parent_business_id    AND UPPER(t0.parent_business_name) LIKE UPPER(?) ";
			} else if (businessLevel.equals("U")) {
				queryString += "    ON (t0.ultimate_business_id = t1.ultimate_business_id   AND t1.business_id = t1.parent_business_id) "
						+ " WHERE t0.business_id = t0.ultimate_business_id  AND UPPER(t0.ultimate_business_name) LIKE UPPER(?) ";
			} else if (businessLevel.equals("G")) {
				queryString += "    ON (t0.global_business_id = t1.global_business_id   AND t1.business_id != t1.ultimate_business_id) "
						+ " WHERE t0.business_id = t0.global_business_id   AND UPPER(t0.business_name) LIKE UPPER(?) ";
			}

			if ((countryCode != null) && (countryCode.length() > 0)) {
				queryString += "   AND t0.country_code LIKE ?";
			}

			queryString += " GROUP BY t0.global_business_id,    t0.ultimate_business_id,     t0.ultimate_business_name, "
					+ "       t0.parent_business_id,     t0.parent_business_name,   t0.business_id,    t0.business_name,"
					+ "       t0.street_address,     t0.city_name,   t0.state_abbrev,    t0.state,    t0.zip_code,"
					+ "       t0.country_code,     t0.primary_sic_description,   t0.account_nat_key ORDER BY child_count desc, t0.business_name";

			if (maxResults > 0) {
				queryString += " LIMIT " + maxResults;
			}
			PreparedStatement ps = connection.prepareStatement(queryString);

			if (businessName != null) {
				ps.setString(1, '%' + businessName + '%');
			}

			if (countryCode != null) {
				ps.setString(2, countryCode);
			}

			ResultSet rs = ps.executeQuery();

			try {

				while (rs.next()) {

					MCADData model = new MCADData();

					model.setAccount_nat_key(rs.getLong("account_nat_key"));
					model.setBusinessid(rs.getLong("business_id"));
					model.setBusinessname(rs.getString("business_name"));
					model.setParentbusinessid(rs.getLong("parent_business_id"));
					model.setUltimatebusinessid(rs.getLong("ultimate_business_id"));
					model.setGlobalbusinessid(rs.getLong("global_business_id"));
					model.setCityname(rs.getString("city_name"));
					model.setStateabbrev(rs.getString("state_abbrev"));
					model.setCountrycode(rs.getString("country_code"));
					model.setSiccode1desc(rs.getString("primary_sic_description"));
					model.setChild_count(rs.getLong("child_count"));

					list.add(model);
				}
			} finally {
				rs.close();
				ps.close();
			}
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		} finally {
			connection.close();
		}

		return list;
	}

	public List<MCADData> getNetezzaMcadSummaryById(Long businessId, String businessLevel, long maxResults, String url, String netezzaUserId,
			String netezzaPassword) throws SQLException {

		List<MCADData> list = new Vector<MCADData>();

		Connection connection = getConnection(url, netezzaUserId, netezzaPassword);
		try {
			String queryString = "SELECT t0.global_business_id,     t0.ultimate_business_id,       t0.ultimate_business_name,"
					+ "       t0.parent_business_id,  t0.parent_business_name, t0.business_id,  t0.business_name,"
					+ "       t0.street_address,  t0.city_name,   t0.state_abbrev,  t0.state, t0.zip_code,"
					+ "       t0.country_code,  t0.primary_sic_description,  t0.account_nat_key,       count(t1.business_id) as child_count "
					+ "  FROM admin.edw_dim_account_facts_mfpuser_v t0 LEFT OUTER JOIN admin.edw_dim_account_facts_mfpuser_v t1 ";

			if (businessLevel.equals("P")) {
				queryString += "    ON (t0.parent_business_id = t1.parent_business_id  AND t1.business_id != t1.parent_business_id "
						+ "   AND t1.business_id != t1.ultimate_business_id   AND t1.business_id != t1.global_business_id)"
						+ " WHERE t0.business_id = t0.parent_business_id  AND t0.parent_business_id = ? ";
			} else if (businessLevel.equals("U")) {
				queryString += "    ON (t0.ultimate_business_id = t1.ultimate_business_id   AND t1.business_id = t1.parent_business_id) "
						+ " WHERE t0.business_id = t0.ultimate_business_id   AND t0.ultimate_business_id = ? ";
			} else if (businessLevel.equals("G")) {
				queryString += "    ON (t0.global_business_id = t1.global_business_id    AND t1.business_id != t1.ultimate_business_id) "
						+ " WHERE t0.business_id = t0.global_business_id   AND t0.global_business_id = ? ";
			}

			queryString += " GROUP BY t0.global_business_id,    t0.ultimate_business_id,     t0.ultimate_business_name, "
					+ "       t0.parent_business_id,     t0.parent_business_name,   t0.business_id,    t0.business_name,"
					+ "       t0.street_address,     t0.city_name,   t0.state_abbrev,    t0.state,    t0.zip_code,"
					+ "       t0.country_code,     t0.primary_sic_description,   t0.account_nat_key ORDER BY child_count desc, t0.business_name";

			if (maxResults > 0) {
				queryString += " LIMIT " + maxResults;
			}
			PreparedStatement ps = connection.prepareStatement(queryString);

			if (businessId != null) {
				ps.setLong(1, businessId.longValue());
			}

			ResultSet rs = ps.executeQuery();

			try {

				while (rs.next()) {

					MCADData model = new MCADData();

					model.setAccount_nat_key(rs.getLong("account_nat_key"));
					model.setBusinessid(rs.getLong("business_id"));
					model.setBusinessname(rs.getString("business_name"));
					model.setParentbusinessid(rs.getLong("parent_business_id"));
					model.setUltimatebusinessid(rs.getLong("ultimate_business_id"));
					model.setGlobalbusinessid(rs.getLong("global_business_id"));
					model.setCityname(rs.getString("city_name"));
					model.setStateabbrev(rs.getString("state_abbrev"));
					model.setCountrycode(rs.getString("country_code"));
					model.setSiccode1desc(rs.getString("primary_sic_description"));
					model.setChild_count(rs.getLong("child_count"));

					list.add(model);
				}
			} finally {
				rs.close();
				ps.close();
			}
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		} finally {
			connection.close();
		}

		return list;
	}

	public List<MCADData> getNetezzaMcadSummaryByChild(Long businessId, String parentbusinessLevel, String childBusinessLevel, long maxResults,
			String url, String netezzaUserId, String netezzaPassword) throws SQLException {

		List<MCADData> list = new Vector<MCADData>();

		Connection connection = getConnection(url, netezzaUserId, netezzaPassword);
		try {
			String queryString = "SELECT t0.global_business_id,     t0.ultimate_business_id,       t0.ultimate_business_name,"
					+ "       t0.parent_business_id,  t0.parent_business_name, t0.business_id,  t0.business_name,"
					+ "       t0.street_address,  t0.city_name,   t0.state_abbrev,  t0.state, t0.zip_code,"
					+ "       t0.country_code,  t0.primary_sic_description,  t0.account_nat_key, ";
			if (parentbusinessLevel.equals("P")) {
				queryString += "        -1" + "   FROM admin.edw_dim_account_facts_mfpuser_v t0   WHERE t0.parent_business_id =   " + businessId
						+ "    AND t0.business_id != t0.ultimate_business_id  AND t0.parent_business_id != t0.business_id "
						+ "    AND t0.ultimate_business_id != t0.business_id    AND t0.global_business_id != t0.business_id "
						+ "ORDER BY t0.ultimate_business_name";

			} else {
				queryString += "      count(t1.business_id) as child_count "
						+ "  FROM admin.edw_dim_account_facts_mfpuser_v t0 LEFT OUTER JOIN admin.edw_dim_account_facts_mfpuser_v t1 ";
				if (parentbusinessLevel.equals("U")) {
					queryString += "    ON (t0.parent_business_id = t1.parent_business_id   AND t1.business_id != t1.parent_business_id "
							+ "   AND t1.business_id != t1.ultimate_business_id   AND t1.business_id != t1.global_business_id) "
							+ " WHERE t0.parent_business_id = t0.business_id    AND t0.ultimate_business_id = " + businessId;
				} else if (parentbusinessLevel.equals("G")) {
					queryString += "    ON (t0.ultimate_business_id = t1.ultimate_business_id   AND t1.business_id = t1.parent_business_id) "
							+ " WHERE t0.ultimate_business_id = t0.business_id   AND t0.global_business_id = " + businessId;
				}

				queryString += " GROUP BY t0.global_business_id,    t0.ultimate_business_id,     t0.ultimate_business_name, "
						+ "       t0.parent_business_id,     t0.parent_business_name,   t0.business_id,    t0.business_name,"
						+ "       t0.street_address,     t0.city_name,   t0.state_abbrev,    t0.state,    t0.zip_code,"
						+ "       t0.country_code,     t0.primary_sic_description,   t0.account_nat_key ORDER BY child_count desc, t0.business_name";
			}
			if (maxResults > 0) {
				queryString += " LIMIT " + maxResults;
			}
			PreparedStatement ps = connection.prepareStatement(queryString);


			ResultSet rs = ps.executeQuery();

			try {

				while (rs.next()) {

					MCADData model = new MCADData();

					model.setAccount_nat_key(rs.getLong("account_nat_key"));
					model.setBusinessid(rs.getLong("business_id"));
					model.setBusinessname(rs.getString("business_name"));
					model.setParentbusinessid(rs.getLong("parent_business_id"));
					model.setUltimatebusinessid(rs.getLong("ultimate_business_id"));
					model.setGlobalbusinessid(rs.getLong("global_business_id"));
					model.setCityname(rs.getString("city_name"));
					model.setStateabbrev(rs.getString("state_abbrev"));
					model.setCountrycode(rs.getString("country_code"));
					model.setSiccode1desc(rs.getString("primary_sic_description"));
					model.setChild_count(rs.getLong("child_count"));
					model.setBusinesslevelcode((childBusinessLevel != null) ? childBusinessLevel : parentbusinessLevel);

					list.add(model);
				}
			} finally {
				rs.close();
				ps.close();
			}
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		} finally {
			connection.close();
		}

		return list;
	}

	public MCADDetail findNetezzaMCADDetail(Long businessId, String url, String netezzaUserId, String netezzaPassword) throws SQLException {

		MCADDetail model = new MCADDetail();

		Connection connection = getConnection(url, netezzaUserId, netezzaPassword);
		try {
			String queryString = "SELECT *  FROM edw_dim_account_facts_mfpuser_v where business_id in ( " + businessId + ")";

			PreparedStatement ps = connection.prepareStatement(queryString);

			ResultSet rs = ps.executeQuery();

			try {

				if (rs.next()) {
					model.setAccount_nat_key(rs.getLong("account_nat_key"));
					model.setBusinessid(rs.getLong("business_id"));
					model.setBusinessname(rs.getString("business_name"));
					model.setParentbusinessid(rs.getLong("parent_business_id"));
					model.setUltimatebusinessid(rs.getLong("ultimate_business_id"));
					model.setGlobalbusinessid(rs.getLong("global_business_id"));
					model.setCityname(rs.getString("city_name"));
					model.setState(rs.getString("state_abbrev"));
					model.setCountrycode(rs.getString("country_code"));
					model.setSiccode1desc(rs.getString("primary_sic_description"));
					model.setStreetaddress(rs.getString("street_address"));
					model.setZipcode(rs.getString("zip_code"));
					model.setZipfourcode(rs.getString("zip_last_four_code"));
					model.setLatitude(rs.getDouble("latitude"));
					model.setLongitude(rs.getDouble("longitude"));
					model.setSuite(rs.getString("suite"));
					model.setAreacode(rs.getString("telephone_area_code"));
					model.setPhonenumber(rs.getString("phone_number"));
					model.setEmpalllocations(rs.getLong("emp_all_locations"));
					model.setSiteemployeenumber(rs.getLong("emp_this_location"));
					model.setSiccode1(rs.getLong("primary_sic_code"));
					model.setSiccode1desc(rs.getString("primary_sic_description"));
					model.setPrimarynaicscode(rs.getLong("primary_naics_code"));
					model.setPrimarynaicsdesc(rs.getString("primary_naics_description"));
					model.setFortune100flag(rs.getString("fortune_1000_flag"));
					model.setLocationcode(rs.getString("location_code"));
					model.setLocationdesc(rs.getString("location_desc"));
					model.setCompanytypecode(rs.getString("company_type_code"));
					model.setCompanytypedesc(rs.getString("company_type_desc"));
					model.setCbsacodeid(rs.getLong("cbsa_code_id"));
					model.setCbsacodedesc(rs.getString("cbsa_code_desc"));
					model.setLastupdated(rs.getDate("last_updated_date"));

				}
			} finally {
				rs.close();
				ps.close();
			}
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		} finally {
			connection.close();
		}

		return model;
	}
}

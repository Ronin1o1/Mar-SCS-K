package com.marriott.rfp.dataaccess.region.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Service;

import com.marriott.rfp.dataaccess.region.api.RegionManager;
import com.marriott.rfp.object.region.RegionRef;
import com.marriott.rfp.object.region.ReportingRegion;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;

/**
 * Session Bean implementation class CurrencyManagerImpl
 */
@Service
public class RegionManagerImpl implements RegionManager {
	@PersistenceContext(name = "rfp-object-common-jpa", unitName = "rfp-object-common-jpa")
	EntityManager em;
	private static final CacheManager cacheManager = CacheManager.create(RegionManagerImpl.class.getResource("/ehcache_da_common.xml"));

	/**
	 * Default constructor.
	 */
	public RegionManagerImpl() {

	}

	@SuppressWarnings("unchecked")
	public List<ReportingRegion> getReportingRegions() {
		List<ReportingRegion> regionList;
		String cacheKey = "reportingRegion";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			String queryString = "SELECT  AREAID , AREANAME FROM   MFPDBO.AREA WHERE (TYPEID =74) and areaid not in (1,2)  ORDER BY AREAname ASC";

			Query q = em.createNativeQuery(queryString, ReportingRegion.class);

			regionList = q.getResultList();
			if (regionList != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, regionList));
			}
		} else
			regionList = (List<ReportingRegion>) elem.getValue();
		return regionList;

	}

	public ReportingRegion getReportingRegion(Long regionid) {
		String queryString = "SELECT  AREAID , AREANAME FROM   MFPDBO.AREA WHERE (TYPEID =74) and areaid =?1";

		Query q = em.createNativeQuery(queryString, ReportingRegion.class);

		q.setParameter(1, regionid);
		ReportingRegion region = (ReportingRegion) q.getSingleResult();
		return region;

	}

	@SuppressWarnings("unchecked")
	public List<ReportingRegion> getAllReportingRegions() {
		List<ReportingRegion> regionList;
		String cacheKey = "allreportingRegion";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			String queryString = "SELECT  AREAID , AREANAME FROM   MFPDBO.AREA WHERE (TYPEID =74)   ORDER BY decode(areaid, 1,1,2,2,3) asc, AREAname ASC";

			Query q = em.createNativeQuery(queryString, ReportingRegion.class);
			regionList = q.getResultList();
			if (regionList != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, regionList));
			}
		} else
			regionList = (List<ReportingRegion>) elem.getValue();
		return regionList;

	}

	@SuppressWarnings("unchecked")
	public List<RegionRef> getOperatingRegions() {
		List<RegionRef> regionList;
		String cacheKey = "operatingRegion";
		Ehcache thecache = getCache();
		Element elem = null;
		if (thecache != null)
			elem = thecache.get(cacheKey);
		if (elem == null) {
			String queryString = "SELECT a.regionid, a.regionname FROM mfpdbo.region_ref a WHERE a.regionstatus = 'Y' AND a.regionid NOT IN (1, 2) ORDER BY a.regionname";

			Query q = em.createNativeQuery(queryString, RegionRef.class);

			regionList = q.getResultList();
			if (regionList != null && thecache != null) {
				thecache.put(elem = new Element(cacheKey, regionList));
			}
		} else
			regionList = (List<RegionRef>) elem.getValue();
		return regionList;
	}

	private Ehcache getCache() {
		return cacheManager.getCache("rfp_da_common");
	}

}
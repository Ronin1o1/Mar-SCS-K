package com.marriott.rfp.utility;

import java.util.ResourceBundle;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ConfigurationUtility {
	private static final Logger logger = Logger.getLogger(ConfigurationUtility.class.getName());

	/**
	 * 
	 * @param beforeHPP
	 */
	public static void delay(boolean beforeHPP) {
		try {
			String envVar = "";
			envVar = System.getProperty("env");
			ResourceBundle props = ResourceBundle.getBundle("RFPServer-" + envVar); 
			String delay = (beforeHPP ? props.getString("delayBeforeHPP") : props.getString("delayBeforeQueue"));
			long sleep = (delay != null && !delay.isEmpty()) ? Long.parseLong(delay) : 0;
			logger.log(Level.INFO, "Applying delay beforeHPP:" + beforeHPP);
			logger.log(Level.INFO, "Applying delay for milliseconds:" + sleep);
			TimeUnit.MILLISECONDS.sleep(sleep);
		} catch (InterruptedException e) {
			logger.log(Level.INFO, "PGOOS batch delay interrupted: " + e);
		} catch (Exception e) {
			logger.log(Level.INFO, "PGOOS batch delay exception: " + e);
			logger.log(Level.INFO, "Not applying any delay");
		}
	}
}

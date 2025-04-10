package com.marriott.rfp.common.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

public class ConfigurationUtil extends PropertyPlaceholderConfigurer {

	private static Properties configurationMap;

	@Override
	protected void loadProperties(Properties props) throws IOException {
		InputStream fis = null;
		String envVar = "";
		try {
			ClassLoader classLoader = getClass().getClassLoader();
			envVar = System.getProperty("env");
			fis = classLoader.getResourceAsStream("/RFPServer-" + envVar + ".properties");
		} catch (Exception e) {
			e.printStackTrace();
		}
		props = new Properties();
		try {
			props.load(fis);
		} finally {
			if (fis != null)
				fis.close();
		}
		super.loadProperties(props);
		configurationMap = props;

	}

	public static String getProperty(String name) {
		return (String) configurationMap.get(name);
	}
}

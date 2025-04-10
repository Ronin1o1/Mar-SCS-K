package com.marriott.marrfp.batch;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.marriott.marrfp.batch.core.TaskManager;

public class RunBatch {

	public static void main(String[] args) throws Throwable {

		ClassPathXmlApplicationContext classPathXmlApplicationContext = new ClassPathXmlApplicationContext("marrfp_hpp_batch_context.xml");
		classPathXmlApplicationContext.start();

		TaskManager<?> manager = classPathXmlApplicationContext.getBean("taskManager", TaskManager.class);

		manager.processTasks();
	}

}

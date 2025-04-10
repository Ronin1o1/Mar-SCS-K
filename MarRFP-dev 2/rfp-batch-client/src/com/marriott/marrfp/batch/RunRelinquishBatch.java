package com.marriott.marrfp.batch;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.marriott.marrfp.batch.core.TaskManager;

public class RunRelinquishBatch {

	public static void main(String[] args) throws Throwable {

		ClassPathXmlApplicationContext classPathXmlApplicationContext = new ClassPathXmlApplicationContext("marrfp_hpp_rel_batch_context.xml");
		classPathXmlApplicationContext.start();

		TaskManager<?> manager = classPathXmlApplicationContext.getBean("taskManager", TaskManager.class);

		manager.processTasks();
	}

}

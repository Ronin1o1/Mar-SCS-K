package com.marriott.marrfp.batch;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.marriott.marrfp.batch.core.TaskManager;

public class RunUserCleanupBatch {

	public static void main(String[] args) throws Throwable {

		ClassPathXmlApplicationContext classPathXmlApplicationContext = new ClassPathXmlApplicationContext("usercleanup_batch_context.xml");
		classPathXmlApplicationContext.start();

		TaskManager<?> manager = classPathXmlApplicationContext.getBean("taskManager", TaskManager.class);

		manager.processTasks();
	}

}

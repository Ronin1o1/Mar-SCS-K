package com.marriott.marrfp.batch.core;

import java.util.List;

public class TaskManager<T extends BaseTask> {

	private List<T> tasks;

	private Context batchContext;

	public List<T> getTasks() {
		return tasks;
	}

	public void setTasks(List<T> tasks) {
		this.tasks = tasks;
	}

	public Context getBatchContext() {
		return batchContext;
	}

	public void setBatchContext(Context batchContext) {
		this.batchContext = batchContext;
	}

	public void processTasks() throws Exception {

		if (tasks != null) {
			for (BaseTask task : tasks) {
				task.executeTask(batchContext);
			}
		}
	}
}

package com.marriott.rfp.mq.data.client.common;

public class MQConnectionBean
{
  private String strHost;
  private Integer port;
  private String queueManager;
  private String strChannel;
  
  public String getStrHost()
  {
    return this.strHost;
  }
  
  public void setStrHost(String strHost)
  {
    this.strHost = strHost;
  }
  
  public Integer getPort()
  {
    return this.port;
  }
  
  public void setPort(Integer port)
  {
    this.port = port;
  }
  
  public String getQueueManager()
  {
    return this.queueManager;
  }
  
  public void setQueueManager(String queueManager)
  {
    this.queueManager = queueManager;
  }
  
  public String getStrChannel()
  {
    return this.strChannel;
  }
  
  public void setStrChannel(String strChannel)
  {
    this.strChannel = strChannel;
  }
}

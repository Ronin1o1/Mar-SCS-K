A) Files to configure prior to do doing a build.
   - In marrfp-hpp-batch.properties setup DB URL, EID and PSWD
   - In log4j.properties specify logfile name (see log4j.appender.chainsaw.File=./logs/marrfp_hpp_batch.log)

B) How to create client JARs?
1. Copy PGOOS.wsdl and/or Product.wsdl into rfp-batch-client/resources/wsdl
2. Generate java artifacts
   - Right click on rfp-batch-client/build.xml and select Debug As -> 2 Ant build ...
   - select "generate-client-stubs" followed by Debug
   - refresh your project (F5)
3. Build you project
4. Create rfp-batch-client.jar
   - Right click on rfp-batch-client/build.xml and select Debug As -> 2 Ant build ...
   - select create-client-jar followed by Debug
   - refresh the project.  The jar should be created in rfp-batch-client/dist dir
   
   ===========================
   
   select BATCHID, STATUS, LOADTYPE, to_char(loadstart, 'mm-dd-yyyy hh:mi') loadstart, to_char(loadend, 'mm-dd-yyyy hh:mi') loadend,LOADCREATEUSER,LOADENDUSER  from mfpdbo.pgoos_load
where loadcreateuser='MARRFP_HPP_BATCH' order by BATCHID;
   

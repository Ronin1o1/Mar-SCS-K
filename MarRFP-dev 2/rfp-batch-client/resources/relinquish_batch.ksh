#!/bin/ksh

set -x
# Declare variables
RUN_DATE=`date +'%m-%d-%Y_%T'`
LOG_DIR=./logs
LOG_FILE=$LOG_DIR/marrfp_relinquish_batch_$RUN_DATE.log
HOSTNAME2=`cat /home/ssaha307/hpp_pgoos/hostname.txt`

#
# Set up Oracle Environment
#

export ORACLE_SID=$HOSTNAME2

. /home/oracle/"$ORACLE_SID"_env

function mailstart { 
	for i in `cat /home/ssaha307/hpp_pgoos/ksh/email.txt` 
	do 
		mail -s "Batch Relinquish job started: `date`" $i < /dev/null 
	done
}

function mailend {
	for i in `cat /home/ssaha307/hpp_pgoos/ksh/email.txt`
	do
		mailx -s "Batch Relinquish job ended: `date`" $i < $LOG_FILE
	done
}

#
# Setup the database parameters
#

oracle_acct=$(/home/oracle/bin/oracle_id mfpdbo)

set u
PATH=$PATH:.
. java_env

CLASSPATH=.:rfp-webservice-client.jar:aopalliance-1.0.jar:commons-logging-1.1.1.jar:log4j-1.2.16.jar:ojdbc6-11.2.0.jar:rfp-batch-client.jar:spring-aop-3.1.0.RELEASE.jar:spring-asm-3.1.0.RELEASE.jar:spring-beans-3.1.0.RELEASE.jar:spring-context-3.1.0.RELEASE.jar:spring-context-support-3.1.0.RELEASE.jar:spring-core-3.1.0.RELEASE.jar:spring-expression-3.1.0.RELEASE.jar:spring-jdbc-3.1.0.RELEASE.jar:spring-tx-3.1.0.RELEASE.jar:spring-web-3.1.0.RELEASE.jar:rfp-sample.jar
export PATH=/usr/lib/jvm/java-1.6.0-sun-1.6.0.45.x86_64/jre/bin/:$PATH
mailstart 
/usr/lib/jvm/java-1.6.0-sun-1.6.0.141.x86_64/jre/bin/java com.marriott.marrfp.batch.RunRelinquishBatch > $LOG_FILE
mailend
exit 0

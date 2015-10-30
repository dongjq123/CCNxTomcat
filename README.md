# CCNxTomcat
The first practical CCN-enabled web server based on open source Apache Tomcat and the CCNx library to natively support CCN-based web applications


Overview of CCNxTomcat
-----------------------------------------------------
CCNxTomcat is written in Java code based on the CCNx 0.8.0 library and Apache Tomcat 6.0.37. It can operate on content centric networks(CCN) as well as TCP/IP networks. Users can deploy applications on CCN networks directly served by CCNxTomcat.  

The environment requirement for CCNxTomcat
-----------------------------------------------------
Ubuntu 12.04 operation system or an updated version.
CCNx 0.8.0 library <http://www.ccnx.org/releases/ccnx-0.8.0.tar.gz> or an updated version. ( Note that the CCNx library should be complied by OpenJDK as the release notes required )
Oracle JDK 1.7.0 or an updated version. ( Since Apache Tomcat is developed by Oracle JDK, OpenJDK should be replaced by Oracle JDK after installing the CCNx library )

The deployment references of CCNxTomcat
-----------------------------------------------------
1. Unzip the ccnTomcat.zip package into a directory.
2. Modify the configuraion file "/etc/profile" to set environment variables 

		export CATALINA_HOME=/yourpath/ccntomcat
		export TOMCAT_HOME=/yourpath/ccntomcat
		export CLASSPATH=.:$JAVA_HOME/lib:$CATALINA_HOME/lib
		export PATH=$PATH:$CATALINA_HOME/bin.

3. Copy the jar package file "bcprov-jdk16-143.jar" into the directory "JAVA_HOME/jre/lib/ext", then add two lines below in the configuration file "JAVA_HOME/jre/lib/security/java.security", where x is the incremental index of the "security.provider"

		security.provider.x=org.bouncycastle.jce.provider.BouncyCastleProvider
		security.provider.x=org.bouncycastle.asn1.DEREncodable

4. Start the CCNx repository by the CCNx daemon program ccnr.
5. Start CCNxTomcat by the script file "/yourpath/ccntomcat/bin/startup.sh" (Note that if the JRE_PATH is wrong, you can revise its value in the script file "/yourpath/ccntomcat/bin/setclasspath.sh".
6. Set servlet mapping relationships in the script file "/yourpath/ccntomcat/web.xml".
7. Deploy an application under the directory "/yourpath/ccntomcat/webapps/root".
8. Shut down CCNxTomat by the script file "/yourpath/ccntomcat/bin/shutdown.sh".

The experimental references of CCNxTomcat
-----------------------------------------------------
CCNxTomcat can process three types of requests as described below. In references we simplify experimental processes for these three scenarios, and users can conduct experiments by the ccncat tool from the CCNx library. 

1.Static type requests
Supposing the application contains a static type file with the name "image.gif" at the directory "/application_dir/bupt". Users can fetch this file by the command:
	#ccncat ccnx:/bupt/image.gif

2.Dynamic type requests
Supposing the application contains a Servlet with the name "servlet_test" at the directory "/application_dir/servlet". Note that the Servlet mapping relationship should be set beforehand in the script "/yourpath/ccntomcat/web.xml". Then, users can get responses by this Servlet with the command:
	#ccncat ccnx:/servlet/servlet_test

3 Push type requests
Supposing an user intends to upload a static file named "index.html" from the client to CCNxTomcat, the user can execute the following command at the client side
        #ccncat ccnx:/post_notification/index.html

To simplify the push type request scenario, the static file to be uploaded was written to a local CCN repository at the client side beforehand, with the common prefix name "ccnx:/index.html" regardless of its version information and segment numbers. In this case, CCNxTomcat can send the interest packets to the client to fetch the content packets, implementing the data transfer from the client to the server. The file "index.html" will be saved in the directory "/yourpath/ccntomcat/webapps/root/recieve/" at the server side. The prefix names of the interest packets generated by CCNxTomcat are the character string "ccnx:/index.html" with the version number and the incremental segment numbers.

Furthermore, users can access CCNxTomcat by a web browser on a TCP/IP network with the URLs like "http://hostname:8080/bupt/image.gif" and "http://hostname:8080/servlet/servlet_test".

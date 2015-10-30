/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


package org.apache.catalina.startup;


import org.apache.catalina.Engine;
import org.apache.catalina.Lifecycle;
import org.apache.catalina.LifecycleEvent;
import org.apache.catalina.LifecycleListener;
import org.apache.catalina.util.StringManager;


/**
 * Startup event listener for a <b>Engine</b> that configures the properties
 * of that Engine, and the associated defined contexts.
 *
 * @author Craig R. McClanahan
 * @version $Id: EngineConfig.java 939353 2010-04-29 15:50:43Z kkolinko $
 */

public class EngineConfig
    implements LifecycleListener {


    protected static org.apache.juli.logging.Log log=
        org.apache.juli.logging.LogFactory.getLog( EngineConfig.class );

    // ----------------------------------------------------- Instance Variables


    /**
     * The Engine we are associated with.
     */
    protected Engine engine = null;


    /**
     * The string resources for this package.
     */
    protected static final StringManager sm =
        StringManager.getManager(Constants.Package);


    // --------------------------------------------------------- Public Methods


    /**
     * Process the START event for an associated Engine.
     *
     * @param event The lifecycle event that has occurred
     */
    public void lifecycleEvent(LifecycleEvent event) {

        // Identify the engine we are associated with
        try {
            engine = (Engine) event.getLifecycle();
        } catch (ClassCastException e) {
            log.error(sm.getString("engineConfig.cce", event.getLifecycle()), e);
            return;
        }

        // Process the event that has occurred
        if (event.getType().equals(Lifecycle.START_EVENT))
            start();
        else if (event.getType().equals(Lifecycle.STOP_EVENT))
            stop();

    }


    // -------------------------------------------------------- Protected Methods


    /**
     * Process a "start" event for this Engine.
     */
    protected void start() {

        if (engine.getLogger().isDebugEnabled())
            engine.getLogger().debug(sm.getString("engineConfig.start"));

    }


    /**
     * Process a "stop" event for this Engine.
     */
    protected void stop() {

        if (engine.getLogger().isDebugEnabled())
            engine.getLogger().debug(sm.getString("engineConfig.stop"));

    }


}
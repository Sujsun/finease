package com.sujsun.finease.mode;

import java.util.logging.Logger;

import com.google.appengine.api.utils.SystemProperty;

public class ApplicationMode {
	
	private static final Logger log = Logger.getLogger( ApplicationMode.class.getName() );
	
	public enum AppMode {
		LIVE, STAGING, DEV;
	}
	
	private static final String applicationId =	SystemProperty.applicationId.get();
	private static AppMode appMode = null;
	
	public static AppMode get() {
		if( appMode == null ) {
			appMode = findApplicationMode();
		}
		return appMode;
	}
	
	private static AppMode findApplicationMode() {
		String applicationIdInLowerCase = applicationId.toLowerCase();
		AppMode appMode = AppMode.LIVE;
		if( applicationIdInLowerCase.contains( "live" ) || applicationIdInLowerCase.contains( "try" ) ) {
			log.info( "Application.appMode :: " + "live" );
			appMode = AppMode.LIVE;
		} else if( applicationIdInLowerCase.contains( "staging" ) ) {
			log.info( "Application.appMode :: " + "staging" );
			appMode = AppMode.STAGING;
		} else if( applicationIdInLowerCase.contains( "dev" ) ) {
			log.info( "Application.appMode :: " + "dev" );
			appMode = AppMode.DEV;
		} else {
			log.info( "Application.appMode :: " + "dev" );
			appMode = AppMode.DEV;
		}
		return appMode;
	}
	
}

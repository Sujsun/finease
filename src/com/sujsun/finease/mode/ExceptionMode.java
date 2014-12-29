package com.sujsun.finease.mode;

import java.util.ResourceBundle;
import java.util.logging.Logger;

public class ExceptionMode {

	private static final Logger log = Logger.getLogger( ExceptionMode.class.getName() );
	
	private static ApplicationMode.AppMode appMode = ApplicationMode.get();
	
	public static boolean getShowDebugInformationInView() {
		boolean showDebugInformationInView = false;
		if( appMode == ApplicationMode.AppMode.LIVE ) {
			showDebugInformationInView = false;
		} else if( appMode == ApplicationMode.AppMode.STAGING ) {
			showDebugInformationInView = true;
		} else if( appMode == ApplicationMode.AppMode.DEV ) {
			showDebugInformationInView = true;
		} else {
			showDebugInformationInView = false;
		}
		return showDebugInformationInView;
	}
	
}

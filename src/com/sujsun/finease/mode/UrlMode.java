package com.sujsun.finease.mode;

import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;
import java.util.logging.Logger;

public class UrlMode {
	
	private static final Logger log = Logger.getLogger( UrlMode.class.getName() );
	
	private static ApplicationMode.AppMode appMode = ApplicationMode.get();
	
	public static String getCMSUrl() {
		String cmsUrl = null;
		if( appMode == ApplicationMode.AppMode.LIVE ) {
			cmsUrl = ResourceBundle.getBundle("ApplicationResources").getString( "live.sujsun-cms.url.baseUrl" );
		} else if( appMode == ApplicationMode.AppMode.STAGING ) {
			cmsUrl = ResourceBundle.getBundle("ApplicationResources").getString( "staging.sujsun-cms.url.baseUrl" );
		} else if( appMode == ApplicationMode.AppMode.DEV ) {
			cmsUrl = ResourceBundle.getBundle("ApplicationResources").getString( "staging.sujsun-cms.url.baseUrl" );
		} else {
			cmsUrl = ResourceBundle.getBundle("ApplicationResources").getString( "live.sujsun-cms.url.baseUrl" );
		}
		return cmsUrl;
	}
	
	public static String getCMSServiceUrl() {
		String cmsUrl = getCMSUrl();
		String cmsServicePath = "", cmsServiceUrl = "";
		if( appMode == ApplicationMode.AppMode.LIVE ) {
			cmsServicePath = ResourceBundle.getBundle("ApplicationResources").getString( "live.sujsun-cms.url.service.path" ) + ResourceBundle.getBundle("ApplicationResources").getString( "live.sujsun-cms.url.service.version" );
		} else if( appMode == ApplicationMode.AppMode.STAGING ) {
			cmsServicePath = ResourceBundle.getBundle("ApplicationResources").getString( "staging.sujsun-cms.url.service.path" ) + ResourceBundle.getBundle("ApplicationResources").getString( "staging.sujsun-cms.url.service.version" );
		} else if( appMode == ApplicationMode.AppMode.DEV ) {
			cmsServicePath = ResourceBundle.getBundle("ApplicationResources").getString( "staging.sujsun-cms.url.service.path" ) + ResourceBundle.getBundle("ApplicationResources").getString( "staging.sujsun-cms.url.service.version" );
		} else {
			cmsServicePath = ResourceBundle.getBundle("ApplicationResources").getString( "live.sujsun-cms.url.service.path" ) + ResourceBundle.getBundle("ApplicationResources").getString( "live.sujsun-cms.url.service.version" );
		}
		cmsServiceUrl = cmsUrl + cmsServicePath;
		return cmsServiceUrl;
	}
	
	public static String getCMSContactUrl() {
		String cmsServiceUrl = getCMSServiceUrl();
		String cmsContactUrl = ""; 
		String cmsContactPath = ResourceBundle.getBundle("ApplicationResources").getString( "sujsun-cms.url.service.contact.path" );
		cmsContactUrl = cmsServiceUrl + cmsContactPath;
		return cmsContactUrl;
	}
	
	public static String getCMSAuthenticateUrl() {
		String cmsServiceUrl = getCMSServiceUrl();
		String cmsAuthenticateUrl = ""; 
		String cmsContactPath = ResourceBundle.getBundle("ApplicationResources").getString( "sujsun-cms.url.service.authenticate.path" );
		cmsAuthenticateUrl = cmsServiceUrl + cmsContactPath;
		return cmsAuthenticateUrl;
	}
	
	public static List<String> getDomainName() {
		String domainName = null;
		List<String> domainNames = new ArrayList<String>();
		if( appMode == ApplicationMode.AppMode.LIVE ) {
			domainNames.add( getOnlyDomainName( ResourceBundle.getBundle("ApplicationResources").getString( "live.finease.url.baseUrl" ) ) );
			domainNames.add( getOnlyDomainName( ResourceBundle.getBundle("ApplicationResources").getString( "live.finease.customDomain.url.baseUrl" ) ) );
		} else if( appMode == ApplicationMode.AppMode.STAGING ) {
			domainNames.add( getOnlyDomainName( ResourceBundle.getBundle("ApplicationResources").getString( "staging.finease.url.baseUrl" ) ) );
		} else if( appMode == ApplicationMode.AppMode.DEV ) {
			domainNames.add( getOnlyDomainName( ResourceBundle.getBundle("ApplicationResources").getString( "dev.finease.url.baseUrl" ) ) );
		} else {
			domainNames.add( getOnlyDomainName( ResourceBundle.getBundle("ApplicationResources").getString( "dev.finease.url.baseUrl" ) ) );
		}
		return domainNames;
	}
	
	public static String getOnlyDomainName( String domainName ) {
		domainName = domainName.replace( ".appspot.com", "" );
		domainName = domainName.replace( "http://", "" );
		domainName = domainName.replace( "https://", "" );
		domainName = domainName.replace( ".com", "" );
		domainName = domainName.replace( ".in", "" );
		return domainName;
	}
	
}

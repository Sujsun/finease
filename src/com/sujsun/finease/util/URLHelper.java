package com.sujsun.finease.util;

import java.net.URL;
import java.util.List;
import java.util.logging.Logger;
import java.util.regex.Pattern;

import com.sujsun.finease.mode.UrlMode;

public class URLHelper {
	
	private static final Logger log = Logger.getLogger( URLHelper.class.getName() );
	private List<String> listOfDomain = UrlMode.getDomainName();
	
	public String getSubDomain( URL url ) {
		return getSubDomainCore( url, listOfDomain );
	}
	
	private String getSubDomainCore( URL url, List<String> possibleDomainNameArray ) {
	    Pattern p = Pattern.compile( "[.]" );  
	    String domainParts[] = p.split( url.getAuthority() );
	    String subDomain = domainParts[ 0 ];
	    if( subDomain.equalsIgnoreCase( "www" ) ) {
	    	subDomain = domainParts[ 1 ];
	    }
	    if( subDomain.contains( "localhost" ) ) {
	    	subDomain = null;
	    } else {
	    	subDomain = matchSubDomainWithPossibleDomain( subDomain, possibleDomainNameArray );
	    }
	    log.info( "SubDomain :: " + subDomain );
	    return subDomain;
    }
	
	public String matchSubDomainWithPossibleDomain( String subDomain, List<String> possibleDomainNameArray ) {
		boolean matched = false;
		for( String domainName : possibleDomainNameArray ) {
			// log.info( "Matching with : " + domainName );
	    	if( subDomain.equalsIgnoreCase( domainName ) ) {
		    	subDomain = null;
		    	matched = true;
		    	break;
		    }
	    }
		return subDomain;
	}
	
}

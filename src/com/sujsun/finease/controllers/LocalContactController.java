package com.sujsun.finease.controllers;

import java.util.List;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sujsun.finease.factories.LocalContactFactory;
import com.sujsun.finease.jdo.LocalContact;
import com.sujsun.finease.services.AuthenticationService;
import com.sujsun.finease.services.ContactService;
import com.sujsun.finease.services.LocalContactService;

@Controller
@RequestMapping( value="localContact" )
public class LocalContactController {
	
private static final Logger log = Logger.getLogger( LocalContactController.class.getName() );
	
	@RequestMapping( method=RequestMethod.GET )
	public @ResponseBody Object get( @RequestParam( value="id", required=false ) String id, @RequestParam( value="subAccountId", required=false ) String subAccountId, HttpServletRequest request, HttpServletResponse response ) {
		Object returnObject = null;
		if( id != null ) {
			returnObject = new LocalContactService().get( request, response, id ); 
		} else if( subAccountId != null ) {
			returnObject = new LocalContactService().getBySubAccountId( request, response, subAccountId );
		}
		return returnObject;
	}
	
	@RequestMapping( method=RequestMethod.POST )
	public @ResponseBody LocalContact post( @RequestBody LocalContact localContact, HttpServletRequest request, HttpServletResponse response ) {
		return new LocalContactService().create( request, response, localContact );
	}
	
	@RequestMapping( method=RequestMethod.PUT )
	public @ResponseBody LocalContact put( @RequestBody LocalContact localContact, HttpServletRequest request, HttpServletResponse response ) {
		return new LocalContactService().create( request, response, localContact );
	}
	
	@RequestMapping( method=RequestMethod.DELETE )
	public @ResponseBody LocalContact delete( @RequestBody LocalContact localContact, HttpServletRequest request, HttpServletResponse response ) {
		return new LocalContactService().delete( request, response, localContact );
	}

}

package com.sujsun.finease.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sujsun.finease.jdo.Loan;
import com.sujsun.finease.services.LoanService;

@Controller
@RequestMapping( value="loan" )
public class LoanController {
	
	@RequestMapping( method=RequestMethod.GET )
	public @ResponseBody Object get( @RequestParam( value="id", required=false ) String id, @RequestParam( value="subAccountId", required=false ) String subAccountId, HttpServletRequest request, HttpServletResponse response ) {
		Object returnObject = null;
		if( id != null ) {
			returnObject = new LoanService().get( request, response, id ); 
		} else if( subAccountId != null ) {
			returnObject = new LoanService().getBySubAccountId( request, response, subAccountId );
		}
		return returnObject;
	}
	
	@RequestMapping( method=RequestMethod.POST )
	public @ResponseBody Loan post( @RequestBody Loan localContact, HttpServletRequest request, HttpServletResponse response ) {
		return new LoanService().create( request, response, localContact );
	}
	
	@RequestMapping( method=RequestMethod.PUT )
	public @ResponseBody Loan put( @RequestBody Loan localContact, HttpServletRequest request, HttpServletResponse response ) {
		return new LoanService().create( request, response, localContact );
	}
	
	@RequestMapping( method=RequestMethod.DELETE )
	public @ResponseBody Loan delete( @RequestBody Loan localContact, HttpServletRequest request, HttpServletResponse response ) {
		return new LoanService().delete( request, response, localContact );
	}
	
}
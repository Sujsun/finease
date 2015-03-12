package com.sujsun.finease.services;

import java.util.List;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sujsun.finease.factories.LoanFactory;
import com.sujsun.finease.factories.LocalContactFactory;
import com.sujsun.finease.jdo.Loan;
import com.sujsun.finease.jdo.LocalContact;

public class LoanService {
	private static final Logger log = Logger.getLogger( LoanService.class.getName() );

	// Methods for creating contact - Starts
	public Loan create( HttpServletRequest request, HttpServletResponse response, Loan loan ) {
		boolean isSuccess = false;
		Loan returnLoan = null;
		try {
			LoanFactory loanFactory = new LoanFactory();
			returnLoan = loanFactory.create(loan);
			isSuccess = true;
		} catch( Exception exception ) {
			log.severe( "Exception while creating Loan. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnLoan;
	}
	
	public Loan create( Loan laon ) {
		Loan returnLoan = null;
		try {
			returnLoan = new LoanFactory().create( laon );
		} catch( Exception exception ) {
			log.severe( "Exception while creating Loan. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnLoan;
	}
	// Methods for creating contact - Ends
	
	public List<Loan> getBySubAccountId( HttpServletRequest request, HttpServletResponse response, String subAccountId ) {
		return new LoanFactory().getBySubAccountId( subAccountId );
	}
	
	public Loan get( HttpServletRequest request, HttpServletResponse response, String id ) {
		boolean isSuccess = false;
		Loan returnLoan = null;
		try {
			returnLoan = new LoanFactory().get( id );
		} catch( Exception exception ) {
			log.severe( "Exception while getting Loan by ID. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return returnLoan;
	}
	
	public Loan delete( HttpServletRequest request, HttpServletResponse response, Loan loan ) {
		boolean isSuccess = false;
		Loan returnLoan = null;
		try {
			isSuccess = new LoanFactory().delete( loan );
		} catch( Exception exception ) {
			log.severe( "Exception while deleting Loan. Exception Message : " + exception.getMessage() );
			exception.printStackTrace();
		}
		return loan;
	}

}
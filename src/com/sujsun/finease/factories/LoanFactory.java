package com.sujsun.finease.factories;

import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;

import com.sujsun.finease.finalObjects.PMF;
import com.sujsun.finease.jdo.*;

public class LoanFactory {
	
	private static final Logger log = Logger.getLogger( LoanFactory.class.getName() );
	
	public Loan create( Loan loanToPersist ) {
		boolean isSuccess = false;
		Loan returnLoan = null;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			persistenceManager.currentTransaction().begin();
			returnLoan = persistenceManager.makePersistent( loanToPersist );
			persistenceManager.currentTransaction().commit();
			isSuccess = true;
		} catch( Exception exception ) {
			persistenceManager.currentTransaction().rollback();
			log.log( Level.SEVERE, "Error while writing Loan to datastore." );
			exception.printStackTrace();
		} finally {
			persistenceManager.close();
		}
		return returnLoan;
	}
	
	public Loan get( String id ) {
		boolean isSuccess = false;
		Loan returnLoan = null;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			persistenceManager.currentTransaction().begin();
			returnLoan = persistenceManager.getObjectById( Loan.class, id );
			persistenceManager.currentTransaction().commit();
			isSuccess = true;
		} catch( JDOObjectNotFoundException jdoObjectNotFoundException ) {
			log.log( Level.SEVERE, "Warning :: Loan not found with the given id. Given id : " + id );
			persistenceManager.currentTransaction().rollback();
			// jdoObjectNotFoundException.printStackTrace();
		} catch( Exception exception ) {
			persistenceManager.currentTransaction().rollback();
			log.log( Level.SEVERE, "Error while getting Loan from datastore." );
			exception.printStackTrace();
		} finally {
			persistenceManager.close();
		}
		return returnLoan;
	}
	
	public boolean delete( Loan loanToDelete ) {
		boolean isSuccess = false;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			persistenceManager.currentTransaction().begin();
			persistenceManager.deletePersistent( loanToDelete );
			persistenceManager.currentTransaction().commit();
			isSuccess = true;
		} catch( Exception exception ) {
			persistenceManager.currentTransaction().rollback();
			log.log( Level.SEVERE, "Error while updating Loan in datastore." );
			exception.printStackTrace();
		} finally {
			persistenceManager.close();
		}
		return isSuccess;
	}
	
}

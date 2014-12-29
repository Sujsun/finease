package com.sujsun.finease.factories;

import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;

import com.sujsun.finease.finalObjects.PMF;
import com.sujsun.finease.jdo.*;

public class TransactionFactory {
	
	private static final Logger log = Logger.getLogger( TransactionFactory.class.getName() );
	
	public Transaction create( Transaction transactionToPersist ) {
		boolean isSuccess = false;
		Transaction returnTransaction = null;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			persistenceManager.currentTransaction().begin();
			returnTransaction = persistenceManager.makePersistent( transactionToPersist );
			persistenceManager.currentTransaction().commit();
			isSuccess = true;
		} catch( Exception exception ) {
			persistenceManager.currentTransaction().rollback();
			log.log( Level.SEVERE, "Error while writing Transaction to datastore." );
			exception.printStackTrace();
		} finally {
			persistenceManager.close();
		}
		return returnTransaction;
	}
	
	public Transaction get( String id ) {
		boolean isSuccess = false;
		Transaction returnTransaction = null;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			persistenceManager.currentTransaction().begin();
			returnTransaction = persistenceManager.getObjectById( Transaction.class, id );
			persistenceManager.currentTransaction().commit();
			isSuccess = true;
		} catch( JDOObjectNotFoundException jdoObjectNotFoundException ) {
			log.log( Level.SEVERE, "Warning :: Transaction not found with the given id. Given id : " + id );
			persistenceManager.currentTransaction().rollback();
			// jdoObjectNotFoundException.printStackTrace();
		} catch( Exception exception ) {
			persistenceManager.currentTransaction().rollback();
			log.log( Level.SEVERE, "Error while getting Transaction from datastore." );
			exception.printStackTrace();
		} finally {
			persistenceManager.close();
		}
		return returnTransaction;
	}
	
	public boolean delete( Loan transactionToDelete ) {
		boolean isSuccess = false;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			persistenceManager.currentTransaction().begin();
			persistenceManager.deletePersistent( transactionToDelete );
			persistenceManager.currentTransaction().commit();
			isSuccess = true;
		} catch( Exception exception ) {
			persistenceManager.currentTransaction().rollback();
			log.log( Level.SEVERE, "Error while updating Transaction in datastore." );
			exception.printStackTrace();
		} finally {
			persistenceManager.close();
		}
		return isSuccess;
	}
	
}

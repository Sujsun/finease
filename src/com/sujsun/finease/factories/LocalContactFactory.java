package com.sujsun.finease.factories;

import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;

import com.sujsun.finease.finalObjects.PMF;
import com.sujsun.finease.jdo.*;

public class LocalContactFactory {
	
	private static final Logger log = Logger.getLogger( LocalContactFactory.class.getName() );
	
	public LocalContact create( LocalContact localContactToPersist ) {
		boolean isSuccess = false;
		LocalContact returnLocalContact = null;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			persistenceManager.currentTransaction().begin();
			returnLocalContact = persistenceManager.makePersistent( localContactToPersist );
			persistenceManager.currentTransaction().commit();
			isSuccess = true;
		} catch( Exception exception ) {
			persistenceManager.currentTransaction().rollback();
			log.log( Level.SEVERE, "Error while writing LocalContact to datastore." );
			exception.printStackTrace();
		} finally {
			persistenceManager.close();
		}
		return returnLocalContact;
	}
	
	public LocalContact get( String id ) {
		boolean isSuccess = false;
		LocalContact returnAccount = null;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			persistenceManager.currentTransaction().begin();
			returnAccount = persistenceManager.getObjectById( LocalContact.class, id );
			persistenceManager.currentTransaction().commit();
			isSuccess = true;
		} catch( JDOObjectNotFoundException jdoObjectNotFoundException ) {
			log.log( Level.SEVERE, "Warning :: LocalContact not found with the given id. Given id : " + id );
			persistenceManager.currentTransaction().rollback();
			// jdoObjectNotFoundException.printStackTrace();
		} catch( Exception exception ) {
			persistenceManager.currentTransaction().rollback();
			log.log( Level.SEVERE, "Error while getting LocalContact from datastore." );
			exception.printStackTrace();
		} finally {
			persistenceManager.close();
		}
		return returnAccount;
	}
	
	public boolean delete( LocalContact localContactToDelete ) {
		boolean isSuccess = false;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			persistenceManager.currentTransaction().begin();
			persistenceManager.deletePersistent( localContactToDelete );
			persistenceManager.currentTransaction().commit();
			isSuccess = true;
		} catch( Exception exception ) {
			persistenceManager.currentTransaction().rollback();
			log.log( Level.SEVERE, "Error while updating LocalContact in datastore." );
			exception.printStackTrace();
		} finally {
			persistenceManager.close();
		}
		return isSuccess;
	}
	
}

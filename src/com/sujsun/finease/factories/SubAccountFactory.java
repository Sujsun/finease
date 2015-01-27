package com.sujsun.finease.factories;

import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;

import com.sujsun.finease.finalObjects.PMF;
import com.sujsun.finease.jdo.*;
import com.sujsun.finease.util.RandomUtil;

public class SubAccountFactory {
	
	private static final Logger log = Logger.getLogger( SubAccountFactory.class.getName() );
	
	public SubAccount create( SubAccount subAccountToPersist ) {
		boolean isSuccess = false;
		SubAccount returnSubAccount = null;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			if( subAccountToPersist.getId() == null ) {
				subAccountToPersist.setId( RandomUtil.alphaNumberic() );
			}
			persistenceManager.currentTransaction().begin();
			returnSubAccount = persistenceManager.makePersistent( subAccountToPersist );
			persistenceManager.currentTransaction().commit();
			isSuccess = true;
		} catch( Exception exception ) {
			persistenceManager.currentTransaction().rollback();
			log.log( Level.SEVERE, "Error while writing SubAccount to datastore." );
			exception.printStackTrace();
		} finally {
			persistenceManager.close();
		}
		return returnSubAccount;
	}
	
	public SubAccount get( String id ) {
		boolean isSuccess = false;
		SubAccount returnSubAccount = null;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			persistenceManager.currentTransaction().begin();
			returnSubAccount = persistenceManager.getObjectById( SubAccount.class, id );
			persistenceManager.currentTransaction().commit();
			isSuccess = true;
		} catch( JDOObjectNotFoundException jdoObjectNotFoundException ) {
			log.log( Level.SEVERE, "Warning :: SubAccount not found with the given id. Given id : " + id );
			persistenceManager.currentTransaction().rollback();
			// jdoObjectNotFoundException.printStackTrace();
		} catch( Exception exception ) {
			persistenceManager.currentTransaction().rollback();
			log.log( Level.SEVERE, "Error while getting SubAccount from datastore." );
			exception.printStackTrace();
		} finally {
			persistenceManager.close();
		}
		return returnSubAccount;
	}
	
	public boolean delete( Contact subAccountToDelete ) {
		boolean isSuccess = false;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			persistenceManager.currentTransaction().begin();
			persistenceManager.deletePersistent( subAccountToDelete );
			persistenceManager.currentTransaction().commit();
			isSuccess = true;
		} catch( Exception exception ) {
			persistenceManager.currentTransaction().rollback();
			log.log( Level.SEVERE, "Error while updating SubAccount in datastore." );
			exception.printStackTrace();
		} finally {
			persistenceManager.close();
		}
		return isSuccess;
	}
	
}

package com.sujsun.finease.factories;

import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.JDOObjectNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.sujsun.finease.finalObjects.PMF;
import com.sujsun.finease.jdo.*;
import com.sujsun.finease.util.RandomUtil;

public class LocalContactFactory {
	
	private static final Logger log = Logger.getLogger( LocalContactFactory.class.getName() );
	
	public LocalContact create( LocalContact localContactToPersist ) {
		boolean isSuccess = false;
		LocalContact returnLocalContact = null;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			Date currentDate = new Date();
			if( localContactToPersist.getId() == null ) {
				localContactToPersist.setId( RandomUtil.alphaNumberic() );
			}
			if( localContactToPersist.getCreatedDate() == null ) {
				localContactToPersist.setCreatedDate( currentDate );
			}
			localContactToPersist.setLastUpdateDate( currentDate );
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
	
	public List<LocalContact> getBySubAccountId( String subAccountId ) {
		boolean isSuccess = false;
		List<LocalContact> returnLocalContactList = null;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		Query query = persistenceManager.newQuery( LocalContact.class );
		query.setFilter( "subAccountId == subAccountIdParam" );
		query.declareParameters("String subAccountIdParam");
		query.setOrdering("createdDate des");
		try {
			returnLocalContactList = (List<LocalContact>) query.execute( subAccountId );
			isSuccess = true;
		} catch( JDOObjectNotFoundException jdoObjectNotFoundException ) {
			log.log( Level.SEVERE, "Warning :: Contact not found with the given subAccountId. Given subAccountId : " + subAccountId + "." );
			jdoObjectNotFoundException.printStackTrace();
		} catch( Exception exception ) {
			log.log( Level.SEVERE, "Error while getting Comment from datastore." );
			exception.printStackTrace();
		} finally {
			query.closeAll();
		}
		return returnLocalContactList;
	}
	
	public LocalContact get( String id ) {
		boolean isSuccess = false;
		LocalContact returnLocalContact = null;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			persistenceManager.currentTransaction().begin();
			returnLocalContact = persistenceManager.getObjectById( LocalContact.class, id );
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
		return returnLocalContact;
	}
	
	public LocalContact delete( LocalContact localContactToDelete ) {
		boolean isSuccess = false;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			if( localContactToDelete != null && localContactToDelete.getId() != null ) {
				localContactToDelete = get( localContactToDelete.getId() );
				persistenceManager.currentTransaction().begin();
				persistenceManager.deletePersistent( localContactToDelete );
				persistenceManager.currentTransaction().commit();
				isSuccess = true;
			}
		} catch( Exception exception ) {
			persistenceManager.currentTransaction().rollback();
			log.log( Level.SEVERE, "Error while updating LocalContact in datastore." );
			exception.printStackTrace();
		} finally {
			persistenceManager.close();
		}
		return localContactToDelete;
	}
	
}

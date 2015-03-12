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

public class LoanFactory {
	
	private static final Logger log = Logger.getLogger( LoanFactory.class.getName() );
	
	public Loan create( Loan loanToPersist ) {
		boolean isSuccess = false;
		Loan returnLoan = null;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		try {
			Date currentDate = new Date();
			if( loanToPersist.getId() == null ) {
				loanToPersist.setId( RandomUtil.alphaNumberic() );
			}
			if( loanToPersist.getCreatedDate() == null ) {
				loanToPersist.setCreatedDate( currentDate );
			}
			loanToPersist.setLastUpdateDate( currentDate );
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
	
	public List<Loan> getBySubAccountId( String subAccountId ) {
		boolean isSuccess = false;
		List<Loan> returnLoanList = null;
		PersistenceManager persistenceManager = PMF.get().getPersistenceManager();
		Query query = persistenceManager.newQuery( Loan.class );
		query.setFilter( "subAccountId == subAccountIdParam" );
		query.declareParameters("String subAccountIdParam");
		query.setOrdering("createdDate des");
		try {
			returnLoanList = (List<Loan>) query.execute( subAccountId );
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
		return returnLoanList;
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

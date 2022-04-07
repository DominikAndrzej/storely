package com.example.storelyServer.configuration;

import com.example.storelyServer.user.User;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.massindexing.MassIndexer;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Service
public class IndexingService {

    private final EntityManager em;

    @Autowired
    public IndexingService(EntityManager em) {
        this.em = em;
    }

    @Transactional
    public void initiateIndexing() throws InterruptedException {
        SearchSession searchSession = Search.session( em );

        MassIndexer indexer = searchSession.massIndexer();

        //.threadsToLoadObjects( 7 );

        indexer.startAndWait();
    }
}

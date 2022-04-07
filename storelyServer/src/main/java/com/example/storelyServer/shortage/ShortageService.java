package com.example.storelyServer.shortage;

import com.example.storelyServer.item.ItemSortBy;
import com.example.storelyServer.itemView.ItemView;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;

@Service
public class ShortageService {
    private final ShortageRepository shortageRepository;
    private final EntityManager entityManager;

    @Autowired
    public ShortageService(ShortageRepository shortageRepository, EntityManager entityManager) {
        this.shortageRepository = shortageRepository;
        this.entityManager = entityManager;
    }

    public List<Shortage> getShortages(String word, Integer offset, ShortageSort sort) {
        SearchSession searchSession = Search.session(entityManager);
        if(word.length()>0) {
            SearchResult<Shortage> result = searchSession.search(Shortage.class)
                    .where(f -> f.match()
                            .fields("category.name", "model", "name",
                                    "groups.name")
                            .matching(word)
                            .fuzzy(2))
                    .sort( f -> f.field( sort.getValue() ).order(sort.getOrder())
                            .then().field( "name_sort" ).asc() )
                    .fetch(offset, 10);

            return result.hits();
        }
        else{
            SearchResult<Shortage> result = searchSession.search(Shortage.class)
                    .where(f->f.matchAll())
                    .sort( f -> f.field( sort.getValue() ).order(sort.getOrder())
                            .then().field( "name_sort" ).asc() )
                    .fetch(offset, 10);

            return result.hits();
        }
    }
}

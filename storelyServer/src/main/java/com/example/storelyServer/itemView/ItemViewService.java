package com.example.storelyServer.itemView;

import com.example.storelyServer.item.Item;
import com.example.storelyServer.item.ItemRepository;
import com.example.storelyServer.item.ItemSortBy;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import java.util.List;


@Service
public class ItemViewService {
    private final ItemViewRepository itemViewRepository;
    private final EntityManager entityManager;

    @Autowired
    public ItemViewService(ItemViewRepository itemViewRepository, EntityManager entityManager) {
        this.itemViewRepository = itemViewRepository;
        this.entityManager = entityManager;
    }

    public List<ItemView> getItems(String word, Integer offset, ItemSortBy sort) {//TODO porzadne sortowanie i wyszukiwanie
        SearchSession searchSession = Search.session(entityManager);
        if(word.length()>0) {
            SearchResult<ItemView> result = searchSession.search(ItemView.class)
                    .where(f -> f.match()
                            .fields("category.name", "model","name",
                                    "groups.name")
                            .matching(word)
                            .fuzzy(2))
                    .sort( f -> f.field( sort.getValue() ).order(sort.getOrder())
                        .then().field( "name_sort" ).asc() )
                    .fetch(offset, 10);

            return result.hits();
        }
        else{
            SearchResult<ItemView> result = searchSession.search(ItemView.class)
                    .where(f->f.matchAll())
                    .sort( f -> f.field( sort.getValue() ).order(sort.getOrder())
                            .then().field( "name_sort" ).asc() )
                    .fetch(offset, 10);

            return result.hits();
        }
    }

    public ItemView getItemById(Long id){
        return itemViewRepository.findById(id)
                .orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Przedmiot nie istnieje"));
    }
}

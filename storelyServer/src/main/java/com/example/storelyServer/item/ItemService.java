package com.example.storelyServer.item;

import com.example.storelyServer.rental.Rental;
import com.example.storelyServer.rental.RentalSort;
import com.example.storelyServer.user.User;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.engine.search.sort.dsl.SortOrder;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;


/**
 * Obsługa logiki zapytan zwiazanych z przedmiotami (jednostkami przedmiotow, nie templateami)
 */
@Service
public class ItemService  {

    private final ItemRepository itemRepository;
    private final EntityManager entityManager;

    @Autowired
    public ItemService(ItemRepository itemRepository, EntityManager entityManager) {
        this.itemRepository = itemRepository;
        this.entityManager = entityManager;
    }


    //TODO porzadne sortowanie i wyszukiwanie
    /**
     * wyszukuje i sortuje przedmioty
     * @param word fraza, po ktorej wyszukuje
     * @param offset przesuniecie
     * @param sort sortowanie (enum <code>ItemSortBy</code>)
     * @return <code>List<Item></code> lista przedmiotow, od dlugosci <= 10
     */
    public List<Item> getItems(String word, Integer offset, ItemSortBy sort) {
        SearchSession searchSession = Search.session(entityManager);
        if(word.length()>0) {
            SearchResult<Item> result = searchSession.search(Item.class)
                    .where(f -> f.match()
                            .fields("itemTemplate.name", "itemTemplate.model","itemTemplate.category.name",
                                    "itemTemplate.groups.name")
                            .matching(word)
                            .fuzzy(2))
                    .sort( f -> f.field( sort.getValue() ).order(sort.getOrder())
                            .then().field( "itemTemplate.name_sort" ).asc() )
                    .fetch(offset, 10);

            List<Item> hits = result.hits();

            return hits;
        }
        else{
            SearchResult<Item> result = searchSession.search(Item.class)
                    .where(f->f.matchAll())
                    .sort( f -> f.field( sort.getValue() ).order(sort.getOrder())
                            .then().field( "itemTemplate.name_sort" ).asc() )
                    .fetch(offset, 10);

            List<Item> hits = result.hits();

            return hits;
        }
        //return itemRepository.findAll();
    }

    public List<Rental> getItemRentalsById(Long id, String word, Integer offset, RentalSort sort) {

        SearchSession searchSession = Search.session(entityManager);

        if(word.length()>0) {
            SearchResult<Rental> result = searchSession.search(Rental.class)
                    .where(f -> f.bool()
                            .must( f.match().fields("item.itemTemplate.id").matching(id))
                            .must( f.match().fields("item.itemTemplate.name",
                                            "item.itemTemplate.category.name", "item.itemTemplate.groups.name",
                                            "user.name", "user.surname", "user.email")
                                    .matching(word).fuzzy(2)))
                    .sort( f -> f.field( sort.getValue() ).order(sort.getOrder())
                            .then().field( "item.itemTemplate.name_sort" ).asc() )
                    .fetch(offset, 10);

            List<Rental> hits = result.hits();

            return hits;
        }
        else{
            SearchResult<Rental> result = searchSession.search(Rental.class)
                    .where(f -> f.match().field("item.itemTemplate.id").matching(id))
                    .sort( f -> f.field( sort.getValue() ).order(sort.getOrder())
                            .then().field( "item.itemTemplate.name_sort" ).asc() )
                    .fetch(offset, 10);

            List<Rental> hits = result.hits();

            return hits;
        }
        //return itemRepository.findAll();
    }

    /**
     * zwraca przedmiot po numerze kodu kreskowego/qr
     * @param code kod kreskowy
     * @return <code>Item</code> przedmiot
     */
    public Item getItemByCode(Long code){
        return itemRepository.findItemByCode(code)
                .orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Przedmiot nie istnieje"));
    }

    /**
     * zwraca przedmiot po numerze kodu kreskowego/qr
     * @param id kod kreskowy
     * @return <code>Item</code> przedmiot
     */
    public Item getItemById(Long id){
        return itemRepository.findById(id)
                .orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Przedmiot nie istnieje"));
    }

    public List<Item> getItemsByTemplateId(Long id){
        return itemRepository.findItemsByItemTemplateId(id);
    }

    /**
     * dodaje nowy przedmiot
     * @param item przedmiot
     * @return zwraca id przedmiotu
     */
    public Long addNewItem(Item item){
        if(item.getId()!=null) {
            Optional<Item> itemById = itemRepository
                    .findById(item.getId());
            if (itemById.isPresent()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Ten przedmiot już istnieje");
            }
        }
        return itemRepository.save(item).getId();
    }


}

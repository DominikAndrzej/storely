package com.example.storelyServer.rental;

import com.example.storelyServer.item.Item;
import com.example.storelyServer.user.User;
import org.hibernate.search.engine.backend.types.Sortable;
import org.hibernate.search.mapper.pojo.automaticindexing.ReindexOnUpdate;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.*;
import org.springframework.security.core.parameters.P;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Indexed
@Table
public class Rental {

    @Id
    @SequenceGenerator(
            name = "rental_sequence",
            sequenceName = "rental_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "rental_sequence"
    )
    private Long id;

    @GenericField(sortable = Sortable.YES)
    private LocalDateTime rentDate = LocalDateTime.now();

    private LocalDateTime returnDate;

    @GenericField(sortable = Sortable.YES)
    private Integer quantity;

    @IndexedEmbedded
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User user;

    @IndexedEmbedded
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "itemId", referencedColumnName = "id")
    private Item item;

    /**
     * zwraca czas do konca wypozyczenia
     * @return czas do konca lub 0 jesli minal
     */
    @Transient
    @IndexingDependency(derivedFrom =
        {
            @ObjectPath(
                @PropertyValue(propertyName = "rentDate")
            ),
            @ObjectPath(
                    @PropertyValue(propertyName = "item")
            )
        }
    )
    @GenericField(sortable = Sortable.YES, name = "remainingTime")
    public Long getRemainingTime(){

        if(!item.getItemTemplate().isReturnable()){
            return 0L;
        }

        final LocalDateTime now = LocalDateTime.now();
        final LocalDateTime expectedReturnDate = this.rentDate.plusHours(this.item.getItemTemplate().getTimeLimit());

        if(this.returnDate==null) {
            return Duration.between(now, expectedReturnDate).toHours();
        }
        else{
            return 0L;
        }

    }

    public Rental(User user, Item item, Integer quantity) {
        this.quantity = quantity;
        this.user = user;
        this.item = item;
    }

    public Rental(Long id, LocalDateTime rentDate, LocalDateTime returnDate,  Integer quantity, User user, Item item) {
        this.id = id;
        this.rentDate = rentDate;
        this.returnDate = returnDate;
        this.quantity = quantity;
        this.user = user;
        this.item = item;
    }

    public Rental() {
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getRentDate() {
        return rentDate;
    }

    public LocalDateTime getReturnDate() {
        return returnDate;
    }


    public boolean isReturnable() {
        return item.getItemTemplate().isReturnable();
    }

    public Integer getQuantity() {
        return quantity;
    }

    public User getUser() {
        return user;
    }

    public Item getItem() {
        return item;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRentDate(LocalDateTime rentDate) {
        this.rentDate = rentDate;
    }

    public void setReturnDate(LocalDateTime returnDate) {
        this.returnDate = returnDate;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public LocalDate getRentLocalDate(){
        return this.rentDate.toLocalDate();
    }

}

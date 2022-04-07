package com.example.storelyServer.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    public Optional<Item> findItemByCode(Long code);

    @Query("SELECT count(e) FROM #{#entityName} e WHERE e.added > ?1")
    public Integer countAllAfterDate(LocalDateTime date);

    public List<Item> findItemsByItemTemplateId(Long code);



}

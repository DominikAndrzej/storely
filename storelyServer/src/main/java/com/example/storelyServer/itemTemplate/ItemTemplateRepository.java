package com.example.storelyServer.itemTemplate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemTemplateRepository extends JpaRepository<ItemTemplate, Long> {
}

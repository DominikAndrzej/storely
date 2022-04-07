package com.example.storelyServer.itemView;

import com.example.storelyServer.itemTemplate.ItemTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemViewRepository extends JpaRepository<ItemView, Long> {
}

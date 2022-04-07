package com.example.storelyServer.itemView;


import com.example.storelyServer.item.Item;
import com.example.storelyServer.item.ItemSortBy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/itemview")
public class itemViewController {

    private final ItemViewService itemViewService;

    @Autowired
    public itemViewController(ItemViewService itemViewService) {
        this.itemViewService = itemViewService;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EMPLOYEE','ROLE_WAREHOUSEMAN')")
    @GetMapping
    public List<ItemView> show(@RequestParam(required = false, defaultValue = "") String search,
                           @RequestParam(required = false, defaultValue = "0") Integer offset,
                           @RequestParam(required = false, defaultValue = "ADDED") ItemSortBy sort){
        return itemViewService.getItems(search, offset, sort);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(path = "{itemId}")
    public ItemView getItem(@PathVariable Long itemId){
        return itemViewService.getItemById(itemId);
    }
}

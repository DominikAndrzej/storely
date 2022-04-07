package com.example.storelyServer.itemTemplate;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/itemTemplate")
public class ItemTemplateController {
//    private final ItemTemplateService itemTemplateService;
//
//    @Autowired
//    public ItemTemplateController(ItemTemplateService itemTemplateService) {
//        this.itemTemplateService = itemTemplateService;
//    }

//    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EMPLOYEE','ROLE_WAREHOUSEMAN')")
//    @GetMapping
//    public List<ItemTemplate> show(){
//        return itemTemplateService.getItemsTemplates();
//    }
//
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EMPLOYEE','ROLE_WAREHOUSEMAN')")
//    @GetMapping(path = "{itemId}")
//    public ItemTemplate getTemplate(@PathVariable Long itemId){
//        return itemTemplateService.getItemTemplate(itemId);
//    }
//
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EMPLOYEE','ROLE_WAREHOUSEMAN')")
//    @PostMapping
//    public void registerNewUser(@RequestBody ItemTemplate itemTemplate){
//        itemTemplateService.addNewItemTemplate(itemTemplate);
//    }
}

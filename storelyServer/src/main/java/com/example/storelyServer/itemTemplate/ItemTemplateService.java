package com.example.storelyServer.itemTemplate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ItemTemplateService {
    private final ItemTemplateRepository itemTemplateRepository;

    @Autowired
    public ItemTemplateService(ItemTemplateRepository itemTemplateRepository) {
        this.itemTemplateRepository = itemTemplateRepository;
    }

    public List<ItemTemplate> getItemsTemplates() {
        return itemTemplateRepository.findAll();
    }

    public ItemTemplate getItemTemplate(Long itemTemplateId) {
        return itemTemplateRepository.findById(itemTemplateId)
                .orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Przedmiot nie istnieje"));
    }

    public void addNewItemTemplate(ItemTemplate itemTemplate){
        if(itemTemplate.getId()!=null) {
            Optional<ItemTemplate> itemTemplateById = itemTemplateRepository
                    .findById(itemTemplate.getId());
            if (itemTemplateById.isPresent()) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Ten przedmiot już istnieje");
            }
        }
        itemTemplateRepository.save(itemTemplate);
    }
}

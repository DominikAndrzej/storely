package com.example.storelyServer.shortage;

import com.example.storelyServer.item.ItemSortBy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="/shortage")
public class ShortageController {
    private final ShortageService shortageService;

    @Autowired
    public ShortageController(ShortageService shortageService) {
        this.shortageService = shortageService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public List<Shortage> getShortagesList(@RequestParam(required = false, defaultValue = "") String search,
                                           @RequestParam(required = false, defaultValue = "0") Integer offset,
                                           @RequestParam(required = false, defaultValue = "COVER") ShortageSort sort){

        return shortageService.getShortages(search, offset, sort);
    }
}

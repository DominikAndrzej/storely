package com.example.storelyServer.rental;

import com.example.storelyServer.shortage.ShortageSort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="/rental")
public class RentalController {

    private final RentalService rentalService;

    @Autowired
    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public List<Rental> listRentals(@RequestParam(required = false, defaultValue = "") String search,
                                    @RequestParam(required = false, defaultValue = "0") Integer offset,
                                    @RequestParam(required = false, defaultValue = "DATE") RentalSort sort,
                                    @RequestParam(required = false, defaultValue = "ALL") RentalFilter returnable){
        return rentalService.getRentals(search, offset, sort, returnable);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("{rentalId}")
    public Rental listRentals(@RequestParam Long rentalId){
        return rentalService.getRentalsById(rentalId);
    }


}

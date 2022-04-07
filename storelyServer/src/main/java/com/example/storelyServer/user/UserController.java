package com.example.storelyServer.user;

import com.example.storelyServer.item.Item;
import com.example.storelyServer.item.ItemService;
import com.example.storelyServer.rental.Rental;
import com.example.storelyServer.rental.RentalListPostDto;
import com.example.storelyServer.rental.RentalService;
import com.example.storelyServer.templates.ResponseCode;
import com.example.storelyServer.templates.ResponseId;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(path="/user")
public class UserController {

    private final UserService userService;
    private final RentalService rentalService;
    private final ItemService itemService;

    @Autowired
    public UserController(UserService userService, RentalService rentalService, ItemService itemService) {
        super();
        this.userService = userService;
        this.rentalService = rentalService;
        this.itemService = itemService;
    }



    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public List<User> listUsers(
            @RequestParam(required = false, defaultValue = "") String search,
            @RequestParam(required = false, defaultValue = "0") Integer offset,
            @RequestParam(required = false, defaultValue = "NAME") UserSort sort){

        return userService.getUserSearch(search, offset, sort);
        //return userService.getUsers(page, search);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(path = "{userId}")
    public User getUser(@PathVariable Long userId){
        return userService.getUser(userId);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void registerNewUser(@RequestBody User user){
        userService.addNewUser(user);
    }

    @PutMapping
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EMPLOYEE','ROLE_WAREHOUSEMAN')")
    public void editUserInfo(@RequestBody UserPutDto user){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        userService.updateUserByEmail(authentication.getName(), user);
    }


    @PutMapping(path = "{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void editUser(@PathVariable Long userId, @RequestBody User user){
        userService.updateUserById(userId, user);
    }

    @DeleteMapping(path = "{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
    }

    @PostMapping("rental")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EMPLOYEE','ROLE_WAREHOUSEMAN')")
    public ResponseId addNewUserRental(@RequestBody ObjectNode objectNode){

        if(!objectNode.has("code")){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        Long code = objectNode.path("code").asLong();
        Integer quantity = objectNode.path("quantity").asInt(1);



        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return new ResponseId(rentalService.addNewRental(authentication.getName(), code, quantity));


//
//        if(list.isEmpty()){
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
//        }
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        return rentalService.addNewRentalGroup(authentication.getName(), list);

    }

    @GetMapping("rental")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EMPLOYEE','ROLE_WAREHOUSEMAN')")
    public List<Rental> getUserRentals(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return rentalService.getRentalsByUserEmail(authentication.getName());
    }
//    @PostMapping("rental")
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EMPLOYEE','ROLE_WAREHOUSEMAN')")
//    public void returnRentalGroup(@RequestBody List<ResponseId<Long>> list){
//
//        if(list.isEmpty()){
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
//        }
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//         rentalService.returnRentalGroup(authentication.getName(), list);
//
//    }

    @DeleteMapping("rental/{rentalId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EMPLOYEE','ROLE_WAREHOUSEMAN')")
    public void getUserRentals(@PathVariable Long rentalId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        rentalService.closeRental(rentalId);
    }

}

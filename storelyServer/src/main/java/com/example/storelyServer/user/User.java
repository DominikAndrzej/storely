package com.example.storelyServer.user;

import com.example.storelyServer.group.Group;
import com.example.storelyServer.rental.Rental;
import com.example.storelyServer.security.ApplicationUserRole;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.search.engine.backend.types.Sortable;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Indexed
@Table(name="AppUser")
public class User implements UserDetails {

    @Id
    @SequenceGenerator(name = "user_sequence", sequenceName = "user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_sequence")
    @Column(unique = true, nullable = false, updatable = false)
    @GenericField
    private Long id;

    @FullTextField
    @KeywordField(sortable = Sortable.YES, name = "name_sort")
    private String name;

    private String password;

    @FullTextField
    @KeywordField(sortable = Sortable.YES, name = "surname_sort")
    private String surname;

    @Column(unique = true, nullable = false)
    @FullTextField
    private String email;

    @Column(nullable = false, updatable = false)
    @GenericField(sortable = Sortable.YES)
    private LocalDateTime registered = LocalDateTime.now();

    @GenericField
    private ApplicationUserRole role = ApplicationUserRole.EMPLOYEE;

    private boolean isEnabled = true;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Rental> rentals = new HashSet<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="groupId", referencedColumnName = "id")
    @IndexedEmbedded
    private Group group;

    public User(String name,
                String surname,
                String email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    public User(String name, String surname, String email, ApplicationUserRole role, String password) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.password=password;
    }

    public User(String name,
                String password,
                String surname,
                String email,
                ApplicationUserRole role,
                Set<Rental> rentals,
                Group group) {
        this.name = name;
        this.password = password;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.rentals = rentals;
        this.group = group;
        this.isEnabled=true;
        this.registered=LocalDateTime.now();
    }

    public User(String name,
                String surname,
                String email,
                Set<Rental> rentals,
                Group group) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.rentals = rentals;
        this.group = group;
        this.registered=LocalDateTime.now();
        //this.password= PasswordConfig.alphaNumericString(8);TODO:password generating
    }

    public User(Long id,
                String name,
                String password,
                String surname,
                String email,
                LocalDateTime registered,
                ApplicationUserRole role,
                Set<Rental> rentals,
                Group group) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.surname = surname;
        this.email = email;
        this.registered = registered;
        this.role = role;
        this.isEnabled = true;
        this.rentals = rentals;
        this.group = group;
    }

    public User(String name, String password, String surname, String email) {
        this.name = name;
        this.password = password;
        this.surname = surname;
        this.email = email;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getEmail() {
        return email;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();

        list.add(new SimpleGrantedAuthority("ROLE_" + role.name()));

        return list;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return email;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getRegistered() {
        return registered;
    }

    public void setRegistered(LocalDateTime registered) {
        this.registered = registered;
    }

    public ApplicationUserRole getRole() {
        return role;
    }

    public void setRole(ApplicationUserRole role) {
        this.role = role;
    }

    public void setIsEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public Set<Rental> getRentals() {
        return rentals;
    }

    public void setRentals(Set<Rental> rentals) {
        this.rentals = rentals;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }
}

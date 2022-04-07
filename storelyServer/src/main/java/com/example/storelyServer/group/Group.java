package com.example.storelyServer.group;


import com.example.storelyServer.itemTemplate.ItemTemplate;
import com.example.storelyServer.itemView.ItemView;
import com.example.storelyServer.shortage.Shortage;
import com.example.storelyServer.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.IndexedEmbedded;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="appGroup")
@Indexed
public class Group {
    @Id
    @SequenceGenerator(
            name = "group_sequence",
            sequenceName = "group_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "group_sequence"
    )

    private Long id;
    @FullTextField
    private String name;

    @JsonIgnore
    @ManyToMany(
            mappedBy = "groups",
            cascade = CascadeType.DETACH
    )
    private Set<ItemTemplate> items = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "groups")
    private Set<ItemView> itemViews = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "groups")
    private Set<Shortage> shortages = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "group")
    private Set<User> users = new HashSet<>();

    public Group(Long id, String name, Set<ItemTemplate> items, Set<User> users) {
        this.id = id;
        this.name = name;
        this.items = items;
        this.users = users;
    }

    public Group(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Group() {
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Set<ItemTemplate> getItems() {
        return items;
    }
}

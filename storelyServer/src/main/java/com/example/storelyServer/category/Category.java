package com.example.storelyServer.category;

import com.example.storelyServer.itemTemplate.ItemTemplate;
import com.example.storelyServer.itemView.ItemView;
import com.example.storelyServer.shortage.Shortage;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Table
@Entity
@Indexed
public class Category {
    @Id
    @SequenceGenerator(
            name = "category_sequence",
            sequenceName = "category_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "category_sequence"
    )
    private Long id;
    @FullTextField
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private Set<ItemTemplate> itemTemplates = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private Set<ItemView> itemViews = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private Set<Shortage> shortages = new HashSet<>();

    public Category(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Set<ItemTemplate> getItemTemplates() {
        return itemTemplates;
    }

    public Category() {
    }
}

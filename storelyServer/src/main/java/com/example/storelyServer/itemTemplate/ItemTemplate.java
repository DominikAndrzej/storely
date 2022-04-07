package com.example.storelyServer.itemTemplate;

import com.example.storelyServer.category.Category;
import com.example.storelyServer.utilities.BooleanAsStringBinder;
import com.example.storelyServer.group.Group;
import com.example.storelyServer.item.Item;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.search.engine.backend.types.Sortable;
import org.hibernate.search.mapper.pojo.bridge.mapping.annotation.ValueBinderRef;
import org.hibernate.search.mapper.pojo.common.annotation.Param;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Table
@Entity
@Indexed
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ItemTemplate {

    @Id
    @SequenceGenerator(
            name = "item_template_sequence",
            sequenceName = "item_template_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "item_template_sequence"
    )
    @GenericField
    private Long id;

    @KeywordField(name="name_sort",sortable = Sortable.YES)
    @FullTextField
    private String name;

    @FullTextField
    private String model;

    @FullTextField
    private String description; //TODO: as varchar 5000 signs

    @GenericField(valueBinder = @ValueBinderRef(type = BooleanAsStringBinder.class,
            params = {
                    @Param(name = "trueAsString", value = "true"),
                    @Param(name = "falseAsString", value = "false")
            }))
    private boolean isReturnable = true;

    private Integer timeLimit = 48;

    private Integer criticalQuantity = 0;


    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "categoryId", referencedColumnName = "id")
    @IndexedEmbedded
    private Category category;


    @JoinTable(
            name = "itemGroup",
            joinColumns = @JoinColumn(name = "groupId"),
            inverseJoinColumns = @JoinColumn(name = "itemId")
    )
    @ManyToMany
    @IndexedEmbedded
    private Set<Group> groups = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "itemTemplate", cascade = CascadeType.DETACH)
    private Set<Item> items = new HashSet<>();

    public ItemTemplate(Long id, String name,
                        String description, boolean isReturnable,
                        Integer timeLimit, Integer criticalQuantity,
                        Category category, Set<Group> groups, Set<Item> items,
                        String model) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isReturnable = isReturnable;
        this.timeLimit = timeLimit;
        this.criticalQuantity = criticalQuantity;
        this.category = category;
        this.groups = groups;
        this.items = items;
        this.model = model;
    }

    public ItemTemplate() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isReturnable() {
        return isReturnable;
    }

    public void setReturnable(boolean returnable) {
        isReturnable = returnable;
    }

    public Integer getTimeLimit() {
        return timeLimit;
    }

    public void setTimeLimit(Integer timeLimit) {
        this.timeLimit = timeLimit;
    }

    public Integer getCriticalQuantity() {
        return criticalQuantity;
    }

    public void setCriticalQuantity(Integer criticalQuantity) {
        this.criticalQuantity = criticalQuantity;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Group> getGroups() {
        return groups;
    }

    public void setGroups(Set<Group> groups) {
        this.groups = groups;
    }

    public Set<Item> getItems() {
        return items;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}
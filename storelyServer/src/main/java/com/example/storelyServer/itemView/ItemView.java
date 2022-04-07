package com.example.storelyServer.itemView;


import com.example.storelyServer.category.Category;
import com.example.storelyServer.group.Group;
import org.hibernate.search.engine.backend.types.Sortable;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


@Table
@Entity
@Indexed
public class ItemView {

    @Id
    private Long id;

    @IndexedEmbedded
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "categoryId", referencedColumnName = "id")
    private Category category;

    private Integer criticalQuantity;

    private Boolean isReturnable;

    @FullTextField
    private String model;

    @FullTextField
    @KeywordField(sortable = Sortable.YES, name="name_sort")
    private String name;

    private Integer timeLimit;

    private String description;


    @GenericField(sortable = Sortable.YES)
    private Integer quantity;

    @GenericField(sortable = Sortable.YES)
    private LocalDateTime added;

    @JoinTable(
            name = "itemGroup",
            joinColumns = @JoinColumn(name = "groupId"),
            inverseJoinColumns = @JoinColumn(name = "itemId")
    )
    @ManyToMany
    @IndexedEmbedded
    private Set<Group> groups = new HashSet<>();


    public ItemView() {
    }

    public ItemView(Long id, Category category,
                    Integer criticalQuantity, Boolean isReturnable,
                    String model, String name,
                    Integer timeLimit, Integer quantity,
                    LocalDateTime added, Set<Group> groups) {
        this.id = id;
        this.category = category;
        this.criticalQuantity = criticalQuantity;
        this.isReturnable = isReturnable;
        this.model = model;
        this.name = name;
        this.timeLimit = timeLimit;
        this.quantity = quantity;
        this.added = added;
        this.groups = groups;
    }

    public LocalDateTime getAdded() {
        return added;
    }

    public Set<Group> getGroups() {
        return groups;
    }

    public Long getId() {
        return id;
    }

    public Category getCategory() {
        return category;
    }

    public Integer getCriticalQuantity() {
        return criticalQuantity;
    }

    public Boolean getReturnable() {
        return isReturnable;
    }

    public String getModel() {
        return model;
    }

    public String getName() {
        return name;
    }

    public Integer getTimeLimit() {
        return timeLimit;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getDescription() {
        return description;
    }
}



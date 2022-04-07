package com.example.storelyServer.shortage;

import com.example.storelyServer.category.Category;
import com.example.storelyServer.group.Group;
import org.hibernate.search.engine.backend.types.Sortable;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Indexed
@Table
public class Shortage {

    @Id
    private Long id;
    @GenericField(sortable = Sortable.YES)
    private Integer quantity;
    @KeywordField(sortable = Sortable.YES, name = "name_sort")
    @FullTextField
    private String name;
    @FullTextField
    private String model;
    @GenericField(sortable = Sortable.YES)
    private Integer criticalQuantity;
    @GenericField(sortable = Sortable.YES)
    private Integer averageRentals;
    @GenericField(sortable = Sortable.YES)
    private LocalDateTime added;
    @GenericField(sortable = Sortable.YES)
    private Float cover;

    @JoinTable(
            name = "itemGroup",
            joinColumns = @JoinColumn(name = "groupId"),
            inverseJoinColumns = @JoinColumn(name = "itemId")
    )
    @ManyToMany
    @IndexedEmbedded
    private Set<Group> groups;

    @IndexedEmbedded
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "categoryId", referencedColumnName = "id")
    private Category category;

    public Shortage(Long id, Integer quantity, String name,
                    Integer criticalQuantity, Integer avg, LocalDateTime added,
                    Float cover, Set<Group> groups, Category category) {
        this.id = id;
        this.quantity = quantity;
        this.name = name;
        this.criticalQuantity = criticalQuantity;
        this.averageRentals = avg;
        this.added = added;
        this.cover = cover;
        this.groups = groups;
        this.category = category;
    }

    public Shortage() {
    }

    public Long getId() {
        return id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getName() {
        return name;
    }

    public Integer getCriticalQuantity() {
        return criticalQuantity;
    }

    public Integer getAverageRentals() {
        return averageRentals;

}

    public Set<Group> getGroups() {
        return groups;
    }

    public Category getCategory() {
        return category;
    }

    public LocalDateTime getAdded() {
        return added;
    }

    public Float getCover() {
        return cover;
    }

    public String getModel() {
        return model;
    }
}

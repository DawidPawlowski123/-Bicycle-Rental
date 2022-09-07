package com.example.accessingdatamysql.models;

import javax.persistence.*;
import java.util.Set;

@Entity // This tells Hibernate to make a table out of this class

public class ElementKit {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long  id;

    @OneToMany
    @JoinColumn(name = "ElementKit_id") // we need to duplicate the physical information
    private Set<Equipment> equipment;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "kit_id", nullable=false)
    private Kit kit;

    public Long  getId() {
        return id;
    }

    public void setId(Long  id) {this.id = id; }

    public Kit  getKit() {return kit; }

    public void setKit(Kit  kit) {this.kit = kit; }

}

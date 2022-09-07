package com.example.accessingdatamysql.models;

import javax.persistence.*;
import java.util.Set;

@Entity // This tells Hibernate to make a table out of this class

public class Kit {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long  id;

    @OneToMany
    @JoinColumn(name = "kit_id") // we need to duplicate the physical information
    private Set<ElementKit> elementKits;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rental_id", referencedColumnName = "id")
    private Rental rental;

    @Column(length = 20)
    private String kitStatus;

    public Long  getId() {
        return id;
    }

    public void setId(Long  id) {this.id = id; }


    public String  getKitStatus() {
        return kitStatus;
    }

    public void setKitStatus(String  kitStatus) {this.kitStatus = kitStatus; }

}

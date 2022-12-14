package com.kader.springjwt.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Election {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private Date datedeb;

    private Date datefin;

    private String status;
    private double nombreVotants;





    //Relation avec Candidat
    @OneToMany(mappedBy = "election")
    private List<Candidat> candidats;


}

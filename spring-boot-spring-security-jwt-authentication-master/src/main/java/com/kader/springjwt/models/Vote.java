package com.kader.springjwt.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Relation avec Candidat
    @ManyToOne
    @JoinColumn(name="candidat_id", insertable = false, updatable = false)
    Candidat candidat;

    //Relation avec Bulletin
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="bulletinId",referencedColumnName = "id" , insertable = false, updatable = false)
    private BulletinVote bulletinVote;

}

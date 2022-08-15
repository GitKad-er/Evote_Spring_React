package com.bezkoder.springjwt.models;

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
    @ManyToOne
    @JoinColumn(name="bulletin_id", insertable = false, updatable = false, nullable = false)
    BulletinVote bulletinVote;
}

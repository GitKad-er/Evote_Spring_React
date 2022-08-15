package com.bezkoder.springjwt.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Candidat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String firstname;

    @NotBlank
    private String lastname;
    private String Presentation;
    private String photo;
    private Double nombreVotes;

    //Relation avec vote
    @OneToMany(mappedBy = "candidat")
    List<Vote> voteList;

    //Relation avec Election
    @ManyToOne
    @JoinColumn(name="election_id", insertable = false, updatable = false, nullable = false)
    private Election election;

}

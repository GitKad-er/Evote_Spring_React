package com.kader.springjwt.events;

import com.kader.springjwt.models.Election;
import com.kader.springjwt.security.services.ElectionService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

public class DateControl {
    @Autowired
    private ElectionService electionService;

    private List<Election> elections = electionService.getAllComingElection();

    public void dateDebTimeControl(Date date){
        for (Election election: elections
             ) {
            if(election.getDatedeb()==date){

                electionService.activateElection(election);
            }

        }
    }
}

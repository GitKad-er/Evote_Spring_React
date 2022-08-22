package com.kader.springjwt.events;

import com.kader.springjwt.controllers.ElectionController;
import com.kader.springjwt.models.Election;
import com.kader.springjwt.security.services.ElectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class CurrentTimeSchedule {

    @Autowired
    private ElectionService electionService;
    @Autowired
    private ApplicationEventPublisher eventPublisher;

    List<Election> elections = electionService.getAllComingElection();



    @Scheduled( initialDelay = 1 * 1000, fixedDelay = 1 * 1000)
    public void CurrentTime() {

        Date now = new Date();
        dateDebTimeControl(now);

    }
    public void dateDebTimeControl(Date date){
        for (Election election: elections
        ) {
            if(election.getDatedeb().equals(date)){

                electionService.activateElection(election);
                eventPublisher.publishEvent(new OnTimeUpEvent(election));
            }

        }
    }

    public void dateFinTimeControl(Date date){
        for (Election election: elections
        ) {
            if(election.getDatedeb().equals(date)){

                electionService.closeElection(election);
            }

        }
    }
}

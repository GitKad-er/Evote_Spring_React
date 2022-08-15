package com.bezkoder.springjwt.events;

import com.bezkoder.springjwt.models.Election;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class onElectionSaveEvent extends ApplicationEvent {

    private Election election;
    public onElectionSaveEvent(final Election election) {
        super(election);
        this.election = election;
    }
}

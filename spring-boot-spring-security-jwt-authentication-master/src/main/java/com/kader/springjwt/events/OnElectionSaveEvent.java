package com.kader.springjwt.events;

import com.kader.springjwt.models.Election;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class OnElectionSaveEvent extends ApplicationEvent {

    private final Election election;
    public OnElectionSaveEvent(final Election election) {
        super(election);
        this.election = election;
    }
}

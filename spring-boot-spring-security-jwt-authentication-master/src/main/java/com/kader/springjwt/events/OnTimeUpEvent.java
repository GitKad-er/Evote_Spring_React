package com.kader.springjwt.events;

import com.kader.springjwt.models.Election;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class OnTimeUpEvent extends ApplicationEvent {

    private final Election election;
    public OnTimeUpEvent(final Election election) {
        super(election);
        this.election = election;
    }
}
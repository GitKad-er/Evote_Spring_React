package com.kader.springjwt.events;

import com.kader.springjwt.models.UserDetail;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class OnUserRegistrationCompleteEvent extends ApplicationEvent {
    private UserDetail user;

    public OnUserRegistrationCompleteEvent(final UserDetail user) {
        super(user);
        this.user = user;
    }
}

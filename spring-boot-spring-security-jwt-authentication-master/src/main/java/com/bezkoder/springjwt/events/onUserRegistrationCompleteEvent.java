package com.bezkoder.springjwt.events;

import com.bezkoder.springjwt.models.UserDetail;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class onUserRegistrationCompleteEvent extends ApplicationEvent {
    private UserDetail user;

    public onUserRegistrationCompleteEvent(final UserDetail user) {
        super(user);
        this.user = user;
    }
}

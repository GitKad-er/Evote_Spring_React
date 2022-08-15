package com.bezkoder.springjwt.events.listener;

import com.bezkoder.springjwt.events.onElectionSaveEvent;
import com.bezkoder.springjwt.exceptions.ResourceNotFoundException;
import com.bezkoder.springjwt.models.BulletinVote;
import com.bezkoder.springjwt.models.Election;
import com.bezkoder.springjwt.models.UserDetail;
import com.bezkoder.springjwt.security.services.BulletinVoteService;
import com.bezkoder.springjwt.security.services.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.List;

import static com.bezkoder.springjwt.events.AlphaNumericStringGenerator.genererString;

@Component
public class savedElectionListener implements ApplicationListener<onElectionSaveEvent> {

    @Autowired
    private BulletinVoteService bulletinService;
    @Autowired
    private UserDetailService userDetailsService;

    @Override
    public void onApplicationEvent(onElectionSaveEvent event) {

    }
    private void bulletinCreateOnElection(final onElectionSaveEvent event){
        final Election election = event.getElection();
        List<UserDetail> users = userDetailsService.findAllUserDetail();
        List<BulletinVote> bulletins = bulletinService.findAllBulletinVote();
        if(users == null){
            throw new RuntimeException("Demander à des utilisateurs de s'inscire");
        } else {
            for (UserDetail user: users
            ) {
                BulletinVote bulletinVote = new BulletinVote();
                bulletinVote.setLibelle("Bulletin de vote pour l'élection "+election.getDescription());
                bulletinVote.setUser_id(user.getId());
                bulletinVote.setCodeVote(genererString(6));
                bulletinService.save(bulletinVote);
            }
        }

    }
}

package com.kader.springjwt.events.listener;

import com.kader.springjwt.events.OnElectionSaveEvent;
import com.kader.springjwt.models.BulletinVote;
import com.kader.springjwt.models.Election;
import com.kader.springjwt.models.UserDetail;
import com.kader.springjwt.security.services.BulletinVoteService;
import com.kader.springjwt.security.services.UserDetailService;
import com.kader.springjwt.events.AlphaNumericStringGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SavedElectionListener implements ApplicationListener<OnElectionSaveEvent> {

    @Autowired
    private BulletinVoteService bulletinService;
    @Autowired
    private UserDetailService userDetailsService;

    @Override
    public void onApplicationEvent(final OnElectionSaveEvent event) {
        this.bulletinCreateOnElection(event);
    }
    private void bulletinCreateOnElection(final OnElectionSaveEvent event){
        final Election election = event.getElection();
        final List<UserDetail> users = userDetailsService.findAllUserDetail();
        final List<BulletinVote> bulletins = bulletinService.findAllBulletinVote();
        if(users == null){
            throw new RuntimeException("Demander à des utilisateurs de s'inscire");
        } else {
            for (UserDetail user: users
            ) {

                final BulletinVote bulletinVote = new BulletinVote();
                bulletinVote.setLibelle("Bulletin de vote pour l'élection "+election.getDescription()+ " "+election.getId());
                bulletinVote.setUserDetail(userDetailsService.getUser(user.getId()));
                bulletinVote.setCodeVote(AlphaNumericStringGenerator.genererString(6));
                bulletinService.save(bulletinVote);
            }
        }

    }
}

package com.kader.springjwt.events.listener;

import com.kader.springjwt.events.OnUserRegistrationCompleteEvent;
import com.kader.springjwt.models.BulletinVote;
import com.kader.springjwt.models.Election;
import com.kader.springjwt.models.UserDetail;
import com.kader.springjwt.security.services.BulletinVoteService;
import com.kader.springjwt.security.services.UserDetailService;
import com.kader.springjwt.security.services.ElectionService;
import com.kader.springjwt.events.AlphaNumericStringGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;

import java.util.List;

public class RegistrationCompleteListener implements ApplicationListener<OnUserRegistrationCompleteEvent> {
    @Autowired
    private BulletinVoteService bulletinService;
    @Autowired
    private UserDetailService userDetailsService;
    @Autowired
    private ElectionService electionService;

    @Override
    public void onApplicationEvent(OnUserRegistrationCompleteEvent event) {
        this.bulletinCreateOnElection(event);
    }
    private void bulletinCreateOnElection(final OnUserRegistrationCompleteEvent event){
        final UserDetail user = event.getUser();
        List<Election>elections = electionService.getAllComingElection();
        if (elections == null){
            throw new RuntimeException("Pas d'elections à venir");
        } else{
            for (Election election: elections
                 ) {

                BulletinVote bulletinVote = new BulletinVote();
                bulletinVote.setLibelle("Bulletin de vote pour l'élection "+election.getDescription()+ " "+election.getId());
                bulletinVote.setUserDetail(userDetailsService.getUser(user.getId()));
                bulletinVote.setCodeVote(AlphaNumericStringGenerator.genererString(6));
                bulletinService.save(bulletinVote);
            }

        }
    }

}

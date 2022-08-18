package com.bezkoder.springjwt.events.listener;

import com.bezkoder.springjwt.events.onElectionSaveEvent;
import com.bezkoder.springjwt.events.onUserRegistrationCompleteEvent;
import com.bezkoder.springjwt.models.BulletinVote;
import com.bezkoder.springjwt.models.Election;
import com.bezkoder.springjwt.models.UserDetail;
import com.bezkoder.springjwt.security.services.BulletinVoteService;
import com.bezkoder.springjwt.security.services.UserDetailService;
import com.bezkoder.springjwt.security.services.ElectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;

import java.util.List;

import static com.bezkoder.springjwt.events.AlphaNumericStringGenerator.genererString;

public class RegistrationCompleteListener implements ApplicationListener<onUserRegistrationCompleteEvent> {
    @Autowired
    private BulletinVoteService bulletinService;
    @Autowired
    private UserDetailService userDetailsService;
    @Autowired
    private ElectionService electionService;

    @Override
    public void onApplicationEvent(onUserRegistrationCompleteEvent event) {

    }
    private void bulletinCreateOnElection(final onUserRegistrationCompleteEvent event){
        final UserDetail user = event.getUser();
        List<Election>elections = electionService.getAllComingElection();
        if (elections == null){
            throw new RuntimeException("Pas d'elections à venir");
        } else{
            for (Election election: elections
                 ) {

                BulletinVote bulletinVote = new BulletinVote();
                bulletinVote.setLibelle("Bulletin de vote pour l'élection "+election.getDescription());
                //bulletinVote.setUser_id(user.getId());
                bulletinVote.setCodeVote(genererString(6));
                bulletinService.save(bulletinVote);
            }

        }
    }

}

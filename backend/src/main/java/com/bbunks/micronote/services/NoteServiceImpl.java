package com.bbunks.micronote.services;

import com.bbunks.micronote.dao.NoteContentRepository;
import com.bbunks.micronote.dao.NoteRepository;
import com.bbunks.micronote.dao.UserRepository;
import com.bbunks.micronote.dto.api.NoteResponse;
import com.bbunks.micronote.entities.Note;
import com.bbunks.micronote.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.security.sasl.AuthenticationException;
import java.util.Collections;
import java.util.List;

@Service
public class NoteServiceImpl implements NoteService{
    @Autowired
    UserRepository userRepository;

    @Autowired
    NoteRepository noteRepository;

    @Autowired
    NoteContentRepository contentRepository;


    @Override
    public List<Note> getNotes() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication.getPrincipal());

        if (authentication.getPrincipal() instanceof UserDetails userDetails) {
            User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
            return noteRepository.findByUserId(user.getId());
        }

        return Collections.emptyList();
    }
}

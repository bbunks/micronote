package com.bbunks.micronote.services;

import com.bbunks.micronote.dao.TagRepository;
import com.bbunks.micronote.dao.UserRepository;
import com.bbunks.micronote.entities.Note;
import com.bbunks.micronote.entities.Tag;
import com.bbunks.micronote.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    TagRepository tagRepository;

    @Autowired
    UserRepository userRepository;


    @Override
    public List<Tag> getTags() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof UserDetails userDetails) {
            User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();

            return tagRepository.findByUserId(user.getId());
        }

        return Collections.emptyList();
    }
}

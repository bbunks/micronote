package com.bbunks.micronote.services;

import com.bbunks.micronote.dao.NoteRepository;
import com.bbunks.micronote.dao.UserRepository;
import com.bbunks.micronote.entities.Note;
import com.bbunks.micronote.entities.NoteContent;
import com.bbunks.micronote.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Service
public class NoteServiceImpl implements NoteService{
    @Autowired
    UserRepository userRepository;

    @Autowired
    NoteRepository noteRepository;

    @Override
    public List<Note> getNotes() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof UserDetails userDetails) {
            User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
            return noteRepository.findByUserId(user.getId(), Sort.by(Sort.Direction.DESC, "createdDate"));
        }

        return Collections.emptyList();
    }

    @Override
    public void createNote(Note note) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof UserDetails userDetails) {
            User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
            note.setUser(user);
            for (NoteContent nc: note.getContents()) {
                nc.setNote(note);
            }
            noteRepository.save(note);
        }
    }

    @Override
    public void deleteNoteById(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof UserDetails userDetails) {
            User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
            Note note = noteRepository.findById(id).orElseThrow();

            if(Objects.equals(user.getId(), note.getUser().getId()))
                noteRepository.deleteById(id);
        }
    }
}

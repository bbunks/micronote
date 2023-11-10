package com.bbunks.micronote.services;

import com.bbunks.micronote.dao.NoteRepository;
import com.bbunks.micronote.dao.TagRepository;
import com.bbunks.micronote.dao.UserRepository;
import com.bbunks.micronote.entities.Note;
import com.bbunks.micronote.entities.NoteContent;
import com.bbunks.micronote.entities.Tag;
import com.bbunks.micronote.entities.User;
import jakarta.transaction.Transactional;
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

    @Autowired
    TagRepository tagRepository;

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

            for (Tag tag: note.getTags()) {
                if (tag.getId() == null) {
                    // If the tag doesn't have an ID, create a new tag
                    Tag newTag = new Tag();
                    newTag.setLabel(tag.getLabel());
                    newTag.setColor(tag.getColor());
                    newTag.setUser(user);

                    // Save the newly created tag to the repository
                    newTag = tagRepository.save(newTag);

                    note.getTags().remove(tag);
                    note.getTags().add(newTag);
                } else {
                    Tag existingTag = tagRepository.findById(tag.getId()).orElse(null);

                    if (existingTag != null) {
                        // Associate 'existingTag' with your 'note'
                        note.getTags().remove(tag);
                        note.getTags().add(existingTag);
                    } else {
                        // If the tag doesn't have an ID, create a new tag
                        Tag newTag = new Tag();
                        newTag.setLabel(tag.getLabel());
                        newTag.setColor(tag.getColor());
                        newTag.setUser(user);

                        // Save the newly created tag to the repository
                        newTag = tagRepository.save(newTag);

                        note.getTags().remove(tag);
                        note.getTags().add(newTag);
                    }
                }
            }

        }
        noteRepository.save(note);
    }

    @Override
    @Transactional
    public void deleteNoteById(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof UserDetails userDetails) {
            User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
            Note note = noteRepository.findById(id).orElseThrow();

            for (Tag tag: note.getTags()) {
                Long count = tag.getNotes().stream().count();
                System.out.println(tag.getId());
                if (count == 1) tagRepository.delete(tag);
            }

            if(Objects.equals(user.getId(), note.getUser().getId()))
                noteRepository.deleteById(id);
        }
    }
}

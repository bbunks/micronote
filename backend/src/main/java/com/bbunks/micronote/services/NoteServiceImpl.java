package com.bbunks.micronote.services;

import com.bbunks.micronote.dao.NoteRepository;
import com.bbunks.micronote.dao.TagRepository;
import com.bbunks.micronote.dao.UserRepository;
import com.bbunks.micronote.dto.api.FilterRequest;
import com.bbunks.micronote.entities.Note;
import com.bbunks.micronote.entities.NoteContent;
import com.bbunks.micronote.entities.Tag;
import com.bbunks.micronote.entities.User;
import com.bbunks.micronote.enums.ContentType;
import jakarta.transaction.Transactional;
import org.apache.catalina.filters.RequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NoteServiceImpl implements NoteService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    NoteRepository noteRepository;

    @Autowired
    TagRepository tagRepository;

    @Override
    public List<Note> getNotes(FilterRequest filters) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof UserDetails userDetails) {
            User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();

            List<Long> tagIds = filters.getTags();
            int tagsLength = (tagIds != null) ? tagIds.size() : 0;
            List<ContentType> contentTypes = filters.getContentTypes();
            int contentsLength = (contentTypes != null) ? contentTypes.size() : 0;

            return noteRepository.findNotesByUserAndTagsAndContentTypes(user.getId(), tagIds, contentTypes, tagsLength, contentsLength);
        }

        return Collections.emptyList();
    }

    @Override
    public Note createNote(Note note) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof UserDetails userDetails) {
            User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();

            note.setUser(user);
            for (NoteContent nc : note.getContents()) {
                nc.setNote(note);
            }

            if (note.getTags() != null) {
                Set<Tag> newTags = new HashSet<>();
                for (Tag tag : note.getTags()) {
                    if (tag.getId() == null) {
                        // If the tag doesn't have an ID, create a new tag
                        Tag newTag = new Tag();
                        newTag.setLabel(tag.getLabel());
                        newTag.setColor(tag.getColor());
                        newTag.setUser(user);

                        // Save the tag to the repository
                        newTag = tagRepository.save(newTag);

                        newTags.add(newTag);
                    } else {
                        Tag existingTag = tagRepository
                                .findByIdAndUserId(tag.getId(), user.getId())
                                .orElseThrow(() -> new RuntimeException("Tag with that id does not exist"));

                        newTags.add(existingTag);
                    }
                }

                note.setTags(newTags);
            }

            return noteRepository.save(note);
        }

        throw new RuntimeException("User is not authorized");
    }

    @Override
    public Note updateNote(Note note) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof UserDetails userDetails) {
            User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();

            Note currentNote = noteRepository.findById(note.getId()).orElseThrow(() -> new RuntimeException("Note does not exist"));
            if (!currentNote.getUser().equals(user))
                throw new RuntimeException("Authenticated user does not own this note.");

            note.setUser(user);

            for (int i = 0; i < note.getContents().size(); i++) {
                NoteContent nc = note.getContents().get(i);
                if (nc.getId() != null) {
                    NoteContent existingNoteContent = currentNote.getContents().stream()
                            .filter(noteContent -> nc.getId().equals(noteContent.getId()))
                            .findAny()
                            .orElseThrow(() -> new RuntimeException("Content to edit does not exist"));

                    existingNoteContent.setType(nc.getType());
                    existingNoteContent.setValue(nc.getValue());

                    note.getContents().set(i, existingNoteContent);
                } else {
                    nc.setNote(note);
                    nc.setUser(user);
                }
            }

            Set<Tag> newTags = new HashSet<>();

            for (Tag tag : note.getTags()) {
                if (tag.getId() == null) {
                    // If the tag doesn't have an ID, create a new tag
                    Tag newTag = new Tag();
                    newTag.setLabel(tag.getLabel());
                    newTag.setColor(tag.getColor());
                    newTag.setUser(user);

                    // Save the tag to the repository
                    newTag = tagRepository.saveAndFlush(newTag);

                    newTags.add(newTag);
                } else {

                    // This could result in many extra db calls
                    // Could do a single call to get all the potential tags and iterate locally

                    Tag existingTag = tagRepository
                            .findByIdAndUserId(tag.getId(), user.getId())
                            .orElseThrow(() -> new RuntimeException("Tag with that id does not exist"));

                    newTags.add(existingTag);
                }
            }

            currentNote.setTags(newTags);
            return noteRepository.save(currentNote);
        }

        throw new RuntimeException("User is not authorized");
    }

    @Override
    @Transactional
    public void deleteNoteById(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() instanceof UserDetails userDetails) {
            User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
            Note note = noteRepository.findById(id).orElseThrow();

            for (Tag tag : note.getTags()) {
                Long count = tag.getNotes().stream().count();
                System.out.println(tag.getId());
                if (count == 1) tagRepository.delete(tag);
            }

            if (Objects.equals(user.getId(), note.getUser().getId()))
                noteRepository.deleteById(id);
        }
    }
}

package com.bbunks.micronote.services;

import com.bbunks.micronote.dto.api.FilterRequest;
import com.bbunks.micronote.entities.Note;
import org.apache.catalina.filters.RequestFilter;

import java.util.List;

public interface NoteService {
    List<Note> getNotes(FilterRequest filters);

    void createNote(Note note);

    void updateNote(Note note);

    void deleteNoteById(Long id);
}

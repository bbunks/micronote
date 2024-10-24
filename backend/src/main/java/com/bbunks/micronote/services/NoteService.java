package com.bbunks.micronote.services;

import java.util.List;

import com.bbunks.micronote.dto.api.FilterRequest;
import com.bbunks.micronote.entities.Note;

public interface NoteService {

    List<Note> getNotes(FilterRequest filters);

    Note createNote(Note note);

    Note updateNote(Note note);

    void deleteNoteById(Long id);
}

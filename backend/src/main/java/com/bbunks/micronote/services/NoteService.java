package com.bbunks.micronote.services;

import com.bbunks.micronote.entities.Note;

import java.util.List;

public interface NoteService {
    List<Note> getNotes();
}

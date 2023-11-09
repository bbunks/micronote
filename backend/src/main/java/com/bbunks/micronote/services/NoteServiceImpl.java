package com.bbunks.micronote.services;

import com.bbunks.micronote.dao.NoteContentRepository;
import com.bbunks.micronote.dao.NoteRepository;
import com.bbunks.micronote.entities.Note;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class NoteServiceImpl implements NoteService{
    @Autowired
    NoteRepository noteRepository;

    @Autowired
    NoteContentRepository contentRepository;


    @Override
    public List<Note> getNotes() {
        return noteRepository.findAll();
    }
}

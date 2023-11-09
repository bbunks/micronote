package com.bbunks.micronote.services;

import com.bbunks.micronote.dto.api.NoteResponse;
import com.bbunks.micronote.entities.Note;
import org.springframework.stereotype.Service;

import javax.security.sasl.AuthenticationException;
import java.util.List;

public interface NoteService {
    List<Note> getNotes();
}

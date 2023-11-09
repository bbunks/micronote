package com.bbunks.micronote.controllers;

import com.bbunks.micronote.dto.api.NoteResponse;
import com.bbunks.micronote.entities.Note;
import com.bbunks.micronote.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/note")
public class NoteController {
    @Autowired
    NoteService noteService;

    @GetMapping({"", "/"})
    public ResponseEntity<List<Note>> getAllNotes() {
        return new ResponseEntity<>(noteService.getNotes(), HttpStatus.OK);
    }
}

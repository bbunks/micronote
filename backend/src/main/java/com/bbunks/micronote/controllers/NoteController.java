package com.bbunks.micronote.controllers;

import com.bbunks.micronote.dto.api.FilterRequest;
import com.bbunks.micronote.dto.api.NoteResponse;
import com.bbunks.micronote.dto.auth.AuthRequest;
import com.bbunks.micronote.entities.Note;
import com.bbunks.micronote.enums.ContentType;
import com.bbunks.micronote.enums.FilterType;
import com.bbunks.micronote.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/note")
public class NoteController {
    @Autowired
    NoteService noteService;

    @GetMapping({"", "/"})
    public ResponseEntity<List<Note>> getAllNotes(@RequestParam Map<String, String> params) {
        FilterRequest filters = new FilterRequest();
        filters.setTags(new ArrayList<>());
        filters.setContentTypes(new ArrayList<>());

        FilterType type = null;

        for (Map.Entry<String, String> entry : params.entrySet()) {
            String key = entry.getKey();
            String[] parts = key.split("\\[|\\]");
            String value = entry.getValue();

            if (parts[1].equals("type")) {
                type = FilterType.valueOf(value.toUpperCase()); }
            else {
                switch (type) {
                    case TAG -> {
                        filters.getTags().add(Long.parseLong(value));
                    }
                    case CONTENT -> {
                        filters.getContentTypes().add(ContentType.valueOf(value));
                    }
                }
            }
        }

        return new ResponseEntity<>(noteService.getNotes(filters), HttpStatus.OK);
    }

    @PostMapping({"", "/"})
    public ResponseEntity<String> addNote(@RequestBody Note note) {
        noteService.createNote(note);
        return new ResponseEntity<>("Note successfully created.", HttpStatus.OK);
    }

    @PutMapping({"", "/"})
    public ResponseEntity<String> updateNote(@RequestBody Note note) {
        noteService.updateNote(note);
        return new ResponseEntity<>("Note successfully created.", HttpStatus.OK);
    }

    @DeleteMapping({"/{id}/", "/{id}"})
    public ResponseEntity<String> deleteNoteById(@PathVariable Long id) {
        noteService.deleteNoteById(id);
        return new ResponseEntity<>("Note deleted successfully", HttpStatus.OK);
    }
}

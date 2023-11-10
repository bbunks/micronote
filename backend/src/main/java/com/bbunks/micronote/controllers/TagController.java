package com.bbunks.micronote.controllers;

import com.bbunks.micronote.entities.Tag;
import com.bbunks.micronote.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tag")
public class TagController {

    @Autowired
    TagService tagService;

    @GetMapping({"", "/"})
    public ResponseEntity<List<Tag>> getAllNotes() {
        return new ResponseEntity<>(tagService.getTags(), HttpStatus.OK);
    }
}

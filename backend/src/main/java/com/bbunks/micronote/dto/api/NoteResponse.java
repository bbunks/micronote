package com.bbunks.micronote.dto.api;

import com.bbunks.micronote.entities.NoteContent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteResponse {
    Long id;
    String title;
    Date createdDAte;
    List<NoteContent> content;
}

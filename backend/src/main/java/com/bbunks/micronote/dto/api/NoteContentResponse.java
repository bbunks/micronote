package com.bbunks.micronote.dto.api;

import com.bbunks.micronote.enums.ContentType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoteContentResponse {
    ContentType type;
    String value;
}

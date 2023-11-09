package com.bbunks.micronote.entities;

import com.bbunks.micronote.enums.ContentType;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class NoteContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ContentType type;
    private String value;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "note_id")
    private Note note;
}

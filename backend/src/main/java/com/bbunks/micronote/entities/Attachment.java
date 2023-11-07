package com.bbunks.micronote.entities;

import com.bbunks.micronote.enums.AttachmentType;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Attachment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private AttachmentType attachmentType;
    private String path;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "note_id")
    private Note note;
}

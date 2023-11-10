package com.bbunks.micronote.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.Cascade;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "note", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<NoteContent> contents;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "note_tag",
            joinColumns = @JoinColumn(name = "note_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    @Cascade(value = org.hibernate.annotations.CascadeType.PERSIST)
    private Set<Tag> tags;

    @CreatedDate
    private Date createdDate;
    
    @LastModifiedDate

    private Date lastUpdate;

    public void setUser(User user) {
        for (NoteContent nc: contents) {
            nc.setUser(user);
        }
        this.user = user;
    }
}

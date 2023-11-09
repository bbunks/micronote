package com.bbunks.micronote.dao;

import com.bbunks.micronote.entities.NoteContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteContentRepository extends JpaRepository<NoteContent, Long> {
}


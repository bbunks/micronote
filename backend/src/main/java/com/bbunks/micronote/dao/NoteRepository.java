package com.bbunks.micronote.dao;

import com.bbunks.micronote.entities.Note;
import com.bbunks.micronote.entities.User;
import com.bbunks.micronote.enums.ContentType;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUserId(Long userId);
    List<Note> findByUserId(Long userId, Sort sort);
    @Query("SELECT n FROM Note n " +
                "LEFT JOIN n.tags t " +
                "LEFT JOIN n.contents nc " +
            "WHERE n.user.id = :userId " +
                "AND (:tagCount = 0 OR :tagIds IS NULL OR t.id IN :tagIds) " +
                "AND (:contentCount = 0 OR :contentTypes IS NULL OR nc.type IN :contentTypes) " +
            "GROUP BY n " +
            "HAVING (:tagCount = 0 OR COUNT(DISTINCT t.id) = :tagCount) "+
                "AND (:contentCount = 0 OR COUNT(DISTINCT nc.type) = :contentCount) " +
            "ORDER BY n.createdDate DESC")
    List<Note> findNotesByUserAndTagsAndContentTypes(
            @Param("userId") Long userId,
            @Param("tagIds") List<Long> tagIds,
            @Param("contentTypes") List<ContentType> contentTypes,
            @Param("tagCount") int tagCount,
            @Param("contentCount") int contentCount
    );
}


package com.bbunks.micronote.dao;

import com.bbunks.micronote.entities.Tag;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByUserId(Long userId);
    List<Tag> findByUserId(Long userId, Sort sort);
}

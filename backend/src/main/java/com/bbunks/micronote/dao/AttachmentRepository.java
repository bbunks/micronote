package com.bbunks.micronote.dao;

import com.bbunks.micronote.entities.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
}

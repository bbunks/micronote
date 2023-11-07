package com.bbunks.micronote.config;

import com.bbunks.micronote.entities.Attachment;
import com.bbunks.micronote.entities.Note;
import com.bbunks.micronote.entities.Tag;
import com.bbunks.micronote.entities.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class RestDataConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(Attachment.class);
        config.exposeIdsFor(Note.class);
        config.exposeIdsFor(Tag.class);
        config.exposeIdsFor(User.class);
        config.setDefaultPageSize(Integer.MAX_VALUE);
        config.setMaxPageSize(Integer.MAX_VALUE);
    }
}


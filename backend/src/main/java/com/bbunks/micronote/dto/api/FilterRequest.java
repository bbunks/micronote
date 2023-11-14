package com.bbunks.micronote.dto.api;

import com.bbunks.micronote.enums.ContentType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilterRequest {
    List<Long> tags;
    List<ContentType> contentTypes;
}

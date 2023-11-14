package com.bbunks.micronote.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {
    String firstName;
    String lastName;
    String email;
    String password;
}

package com.bbunks.micronote.controllers;

import com.bbunks.micronote.dao.UserRepository;
import com.bbunks.micronote.dto.auth.UserInfo;
import com.bbunks.micronote.entities.Note;
import com.bbunks.micronote.entities.NoteContent;
import com.bbunks.micronote.entities.User;
import com.bbunks.micronote.enums.ContentType;
import com.bbunks.micronote.services.NoteService;
import com.bbunks.micronote.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class NoteControllerTests {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private NoteService noteService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    private final String baseUrl = "/api/note";

    private Note testNote;
    private Authentication authentication;
    User user;

    @BeforeAll
    public void setup() {
        userRepository.deleteAll();

        UserInfo testUser = new UserInfo();

        testUser.setEmail("test@test.com");
        testUser.setPassword("testpassword");
        testUser.setFirstName("John");
        testUser.setLastName("Doe");

        user = userService.addUser(testUser);

        Note note = new Note();
        List<NoteContent> ncs = new ArrayList<>();

        note.setTitle("TestTitle");

        NoteContent nc = new NoteContent();
        nc.setType(ContentType.TEXT);
        nc.setValue("TestContent");

        ncs.add(nc);

        note.setContents(ncs);

        note.setUser(user);

        testNote = noteService.createNote(note);
    }

    @AfterAll
    public void cleanUp() {
        userRepository.deleteAll();
    }

    @Test
    @WithMockUser("test@test.com")
    void getAllNotes_AuthenticatedUser_ReturnsNotes() throws Exception {

        // Mock service response
        when(noteService.getNotes(any())).thenReturn(Collections.singletonList(testNote));

        // Perform GET request
        mockMvc.perform(get(baseUrl)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getAllNotes_UnauthenticatedUser_ReturnsUnauthorized() throws Exception {
        // Perform GET request
        mockMvc.perform(get(baseUrl)
                        .param("tags[type]", "TAG")
                        .param("tags[0]", "1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser("test@test.com")
    void addNote_AuthenticatedUser_NoteAddedSuccessfully() throws Exception {
        // Mock service response
        doReturn(null).when(noteService).createNote(any());

        Note note = new Note();
        List<NoteContent> ncs = new ArrayList<>();

        note.setTitle("TestTitle");

        NoteContent nc = new NoteContent();
        nc.setType(ContentType.TEXT);
        nc.setValue("TestContent");

        ncs.add(nc);

        note.setContents(ncs);

        note.setUser(user);

        // Perform POST request
        mockMvc.perform(post(baseUrl)
                        .content(objectMapper.writeValueAsString(note))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Note successfully created."));
    }

    @Test
    void addNote_UnauthenticatedUser_ReturnsUnauthorized() throws Exception {
        // Perform POST request
        mockMvc.perform(post(baseUrl)
                        .content(objectMapper.writeValueAsString(testNote))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser("test@test.com")
    void deleteNoteById_AuthenticatedUser_NoteDeletedSuccessfully() throws Exception {
        // Mock service response
        doNothing().when(noteService).deleteNoteById(any());

        // Perform DELETE request
        mockMvc.perform(delete(baseUrl + "/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Note deleted successfully"));
    }

    @Test
    void deleteNoteById_UnauthenticatedUser_ReturnsUnauthorized() throws Exception {
        // Perform DELETE request
        mockMvc.perform(delete(baseUrl + "/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());
    }
}


package com.bbunks.micronote.services;

import com.bbunks.micronote.dao.NoteContentRepository;
import com.bbunks.micronote.dao.NoteRepository;
import com.bbunks.micronote.dao.TagRepository;
import com.bbunks.micronote.dao.UserRepository;
import com.bbunks.micronote.dto.api.FilterRequest;
import com.bbunks.micronote.dto.auth.UserInfo;
import com.bbunks.micronote.entities.Note;
import com.bbunks.micronote.entities.NoteContent;
import com.bbunks.micronote.entities.User;
import com.bbunks.micronote.enums.ContentType;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class NoteServiceImplTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private NoteContentRepository noteContentRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private NoteService noteService;

    @Autowired
    private UserService userService;

    User user, otherUser;
    FilterRequest filters;
    Note note;

    @BeforeAll
    public void setup() {
        noteContentRepository.deleteAll();
        noteRepository.deleteAll();
        userRepository.deleteAll();

        UserInfo testUser = new UserInfo();

        testUser.setEmail("other@test.com");
        testUser.setPassword("testpassword");
        testUser.setFirstName("Jane");
        testUser.setLastName("Doe");

        otherUser = userService.addUser(testUser);

        testUser = new UserInfo();

        testUser.setEmail("test@test.com");
        testUser.setPassword("testpassword");
        testUser.setFirstName("John");
        testUser.setLastName("Doe");

        user = userService.addUser(testUser);
    }

    @AfterAll
    public void cleanUp() {
        userRepository.deleteAll();
    }

    @BeforeEach
    public void beforeEach() {
        filters = new FilterRequest();
        filters.setTags(new ArrayList<>());
        filters.setContentTypes(new ArrayList<>());

        note = new Note();
        List<NoteContent> ncs = new ArrayList<>();

        note.setTitle("TestTitle");

        NoteContent nc = new NoteContent();
        nc.setType(ContentType.TEXT);
        nc.setValue("TestContent");

        ncs.add(nc);

        note.setContents(ncs);

        note.setUser(user);

        note = noteRepository.save(note);
    }

    @AfterEach
    public void afterEach() {
        noteContentRepository.deleteAll();
        noteRepository.deleteAll();
    }

    @Test
    @WithMockUser(username = "test@test.com")
    void testNoteCreation() {
        noteRepository.deleteAll();

        Note note = new Note();
        List<NoteContent> ncs = new ArrayList<>();

        note.setTitle("TestTitle1");

        NoteContent nc = new NoteContent();
        nc.setType(ContentType.TEXT);
        nc.setValue("TestContent1");

        ncs.add(nc);

        note.setContents(ncs);

        note = noteService.createNote(note);

        Note result = noteRepository.findById(note.getId()).orElseThrow();

        // Assertions
        assertEquals(note.getId(), result.getId());
        assertEquals(user.getId(), result.getUser().getId());
    }

    @Test
    @WithMockUser(username = "test@test.com")
    void testGetNotes() {
        List<Note> result = noteService.getNotes(filters);

        // Assertions
        assertEquals(note.getId(), result.get(0).getId());
    }


    @Test
    @WithMockUser(username = "other@test.com")
    void ensureUserOnlySeesOwnNotes() {
        List<Note> result = noteService.getNotes(filters);

        // Assertions
        assertTrue(result.isEmpty());
    }
}

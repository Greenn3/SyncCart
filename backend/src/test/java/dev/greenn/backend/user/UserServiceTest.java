package dev.greenn.backend.user;

import dev.greenn.backend.GoogleTokenVerifier;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private GoogleTokenVerifier googleTokenVerifier;

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(userRepository, googleTokenVerifier);
    }

    @Test
    void shouldReturnExistingUserWhenPresent() {
        User existing = new User("id-1", "Existing User");
        when(userRepository.findById("id-1")).thenReturn(Mono.just(existing));

        StepVerifier.create(userService.findOrCreate("id-1", "Any Name"))
                .expectNext(existing)
                .verifyComplete();
    }

    @Test
    void shouldCreateUserWhenNotPresent() {
        User created = new User("id-2", "Created User");
        when(userRepository.findById("id-2")).thenReturn(Mono.empty());
        when(userRepository.save(any(User.class))).thenReturn(Mono.just(created));

        StepVerifier.create(userService.findOrCreate("id-2", "Created User"))
                .expectNext(created)
                .verifyComplete();

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        assertThat(captor.getValue().getId()).isEqualTo("id-2");
        assertThat(captor.getValue().getUsername()).isEqualTo("Created User");
    }

    @Test
    void shouldDelegateExistsCheckToRepository() {
        when(userRepository.existsById("id-3")).thenReturn(Mono.just(true));

        StepVerifier.create(userService.userExistsById("id-3"))
                .expectNext(true)
                .verifyComplete();
    }
}

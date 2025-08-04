package dev.greenn.backend.shopping_list;

import dev.greenn.backend.exception.NotFoundException;
import dev.greenn.backend.item.ItemService;
import dev.greenn.backend.user.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ShoppingListServiceTest {

    @Mock
    private ShoppingListRepository shoppingListRepository;
    @Mock private ItemService itemService;
    @Mock private UserService userService;

    private ShoppingListService underTest;

    @BeforeEach
    void setUp() {
        underTest = new ShoppingListService(shoppingListRepository, itemService, userService);
    }


    @Test
    void shouldThrowWhenUserDoesNotExist() {
        when(userService.userExistsById("u1")).thenReturn(Mono.just(false));

        StepVerifier.create(underTest.addUserToList("l1", "u1"))
                .expectErrorMatches(ex -> ex instanceof NotFoundException &&
                        ex.getMessage().contains("User with id: u1 not found"))
                .verify();

    }

    @Test
    void shouldThrowWhenListDoesNotExist() {
        when(userService.userExistsById("u1")).thenReturn(Mono.just(true));
        when(shoppingListRepository.findById("l1")).thenReturn(Mono.empty());

        StepVerifier.create(underTest.addUserToList("l1", "u1"))
                .expectErrorMatches(ex -> ex instanceof NotFoundException &&
                        ex.getMessage().contains("List with id: l1 not found"))
                .verify();
    }

    @Test
    void shouldAddUserToList() {
        ShoppingList list = new ShoppingList();
        list.setAllowedUsers(new ArrayList<>());

        when(userService.userExistsById("u1")).thenReturn(Mono.just(true));
        when(shoppingListRepository.findById("l1")).thenReturn(Mono.just(list));
        when(shoppingListRepository.save(any())).thenReturn(Mono.just(list));

        StepVerifier.create(underTest.addUserToList("l1", "u1"))
                .expectComplete()
                .verify();

        Assertions.assertTrue(list.getAllowedUsers().contains("u1"));
    }

}
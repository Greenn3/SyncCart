package dev.greenn.backend.shopping_list;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers.mockJwt;

@WebFluxTest(controllers = ShoppingListController.class)
class ShoppingListControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @MockBean
    private ShoppingListService shoppingListService;

    @Test
    void shouldReturnListsForAuthenticatedUser() {
        ShoppingList list = new ShoppingList("list-1", "Groceries", new ArrayList<>(List.of("user-1")));
        given(shoppingListService.getListsWithUserId("user-1")).willReturn(Flux.just(list));

        webTestClient
                .mutateWith(mockJwt().jwt(jwt -> jwt.subject("user-1")))
                .get()
                .uri("/api/lists")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$[0].id").isEqualTo("list-1")
                .jsonPath("$[0].name").isEqualTo("Groceries");

        verify(shoppingListService).getListsWithUserId("user-1");
    }

    @Test
    void shouldAddAuthenticatedUserToCreatedList() {
        ShoppingList created = new ShoppingList("list-2", "Party", new ArrayList<>(List.of("user-5")));
        given(shoppingListService.createList(any(ShoppingList.class))).willReturn(Mono.just(created));

        webTestClient
                .mutateWith(mockJwt().jwt(jwt -> jwt.subject("user-5")))
                .post()
                .uri("/api/lists")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue("{\"name\":\"Party\"}")
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.id").isEqualTo("list-2")
                .jsonPath("$.name").isEqualTo("Party");

        ArgumentCaptor<ShoppingList> captor = ArgumentCaptor.forClass(ShoppingList.class);
        verify(shoppingListService).createList(captor.capture());
        assertThat(captor.getValue().getAllowedUsers()).contains("user-5");
    }
}

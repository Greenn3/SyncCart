package dev.greenn.backend.item;

import dev.greenn.backend.exception.NotFoundException;
import dev.greenn.backend.shopping_list.ShoppingListService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ItemServiceTest {


    @Mock private ItemRepository itemRepository;

    private ItemService underTest;


    @BeforeEach
    void setUp() {
        underTest = new ItemService(itemRepository);
    }

    @Test
    public void shouldThrowWhenListIdDoesNotExist(){
        when(itemRepository.findAllByListId("123")).thenReturn(Flux.empty());

        StepVerifier.create(underTest.findAllByListId("123"))
                .expectErrorMatches(ex -> ex instanceof NotFoundException &&
                        ex.getMessage().contains("Items with list id 123 do not exist"))
                .verify();
    }

    @Test
    public void shouldThrowWhenItemDoesNotExist(){
        when(itemRepository.findById("123")).thenReturn(Mono.empty());

        StepVerifier.create(underTest.deleteItem("123"))
                .expectErrorMatches(ex -> ex instanceof NotFoundException &&
                        ex.getMessage().contains("Item with id 123 not found"))
                .verify();
    }
}
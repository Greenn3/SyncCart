package dev.greenn.backend.shopping_list;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ShoppingListService {

    private final ShoppingListRepository shoppingListRepository;

    public ShoppingListService(ShoppingListRepository shoppingListRepository) {
        this.shoppingListRepository = shoppingListRepository;
    }

    public Flux<ShoppingList> getAllLists() {
        return  shoppingListRepository.findAll();
    }

    public Mono<ShoppingList> createList(ShoppingList shoppingList) {
        return shoppingListRepository.save(shoppingList);
    }

    public Flux<ShoppingList> getListsWithUserId(String id) {
        return shoppingListRepository.findByAllowedUsersContaining(id);
    }
}

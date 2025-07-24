package dev.greenn.backend.shopping_list;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface ShoppingListRepository extends ReactiveMongoRepository<ShoppingList, String> {
    Flux<ShoppingList> findByAllowedUsersContaining(String id);
}

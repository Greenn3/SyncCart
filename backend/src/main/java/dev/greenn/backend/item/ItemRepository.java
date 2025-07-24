package dev.greenn.backend.item;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface ItemRepository extends ReactiveMongoRepository<Item, String> {
    Flux<Item> findAllByListId(String listId);
}

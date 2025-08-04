package dev.greenn.backend.item;

import dev.greenn.backend.exception.NotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Flux<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Mono<Item> createItem(Item item) {
        return itemRepository.save(item);
    }

    public Flux<Item> findAllByListId(String id) {
        return itemRepository.findAllByListId(id)
                .switchIfEmpty(Mono.error(new NotFoundException("Items with list id " + id + " do not exist")));
    }

    public Mono<Void> deleteItem(String id) {

        return itemRepository.findById(id)
                .switchIfEmpty(Mono.error(new NotFoundException("Item with id " + id + " not found")))
                .flatMap(item -> itemRepository.deleteById(id));
    }
}

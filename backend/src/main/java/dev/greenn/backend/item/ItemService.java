package dev.greenn.backend.item;

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
}

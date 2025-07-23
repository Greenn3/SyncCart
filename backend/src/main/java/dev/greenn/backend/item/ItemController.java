package dev.greenn.backend.item;

import dev.greenn.backend.item.Item;
import dev.greenn.backend.item.ItemService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/items")
public class ItemController {
private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public Flux<Item> getAllItems(){
        return itemService.getAllItems();
    }
    @PostMapping
    public Mono<Item> createItem(@RequestBody Item item){
        return itemService.createItem(item);
    }
}

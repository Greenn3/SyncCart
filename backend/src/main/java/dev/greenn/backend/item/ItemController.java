package dev.greenn.backend.item;

import dev.greenn.backend.item.Item;
import dev.greenn.backend.item.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
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
    public Mono<Item> createItem(@RequestBody Item item, @AuthenticationPrincipal Jwt jwt){
        item.setCreatorId(jwt.getSubject());
        return itemService.createItem(item);
    }


    @GetMapping("/{id}")
    public Flux<Item> getItemsByListId(@PathVariable String id){

        return itemService.findAllByListId((id));
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteItem(@PathVariable String id){
        return itemService.deleteItem(id)
                .thenReturn(ResponseEntity.noContent().build());
    }

}

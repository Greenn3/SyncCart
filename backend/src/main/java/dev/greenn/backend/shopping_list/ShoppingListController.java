package dev.greenn.backend.shopping_list;

import org.springframework.data.mongodb.core.MongoAction;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/lists")
public class ShoppingListController {


    private final ShoppingListService shoppingListService;

    public ShoppingListController(ShoppingListService shoppingListService) {
        this.shoppingListService = shoppingListService;

    }
    @GetMapping
    public Flux<ShoppingList> getAllLists(@AuthenticationPrincipal Jwt jwt){
        String id = jwt.getSubject();
        return shoppingListService.getListsWithUserId(id);
    }
    @PostMapping
    public Mono<ShoppingList> createList(@RequestBody ShoppingList shoppingList, @AuthenticationPrincipal Jwt jwt){
        shoppingList.getAllowedUsers().add(jwt.getSubject());
        return shoppingListService.createList(shoppingList);
    }
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteList(@PathVariable String id){
        return shoppingListService.deleteListWithItems(id)
                .thenReturn(ResponseEntity.noContent().build());
    }
}

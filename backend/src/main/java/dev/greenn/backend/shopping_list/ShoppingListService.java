package dev.greenn.backend.shopping_list;

import dev.greenn.backend.exception.NotFoundException;
import dev.greenn.backend.item.Item;
import dev.greenn.backend.item.ItemService;
import dev.greenn.backend.user.UserService;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class ShoppingListService {

    private final ShoppingListRepository shoppingListRepository;
    private final ItemService itemService;
    private final UserService userService;

    public ShoppingListService(ShoppingListRepository shoppingListRepository, ItemService itemService, UserService userService) {
        this.shoppingListRepository = shoppingListRepository;
        this.itemService = itemService;
        this.userService = userService;
    }

    public Flux<ShoppingList> getAllLists() {
        return  shoppingListRepository.findAll();
    }

    public Mono<ShoppingList> createList(ShoppingList shoppingList) {
        return shoppingListRepository.save(shoppingList);
    }

    public Flux<ShoppingList> getListsWithUserId(String id) {
        return shoppingListRepository.findByAllowedUsersContaining(id)
                .switchIfEmpty(Mono.error(new NotFoundException("Lists with id: " + id + " not found")));

    }

    public Mono<Void> deleteListWithItems(String id) {
        return itemService.findAllByListId(id)
                .collectList()
                .flatMap(items -> {
                    if (items.isEmpty()) {
                        return Mono.error(new NotFoundException("List with id: " + id + " not found"));
                    }
                    return Flux.fromIterable(items)
                            .flatMap(item -> itemService.deleteItem(item.getId()))
                            .then(shoppingListRepository.deleteById(id));
                });
    }


    public Mono<Void> addUserToList(String listId, String userId) {
        return userService.userExistsById(userId)
                .flatMap(exists -> {
                    if (!exists) {
                        return Mono.error(new NotFoundException("User with id: "+  userId + " not found"));
                    }

                    return shoppingListRepository.findById(listId)
                            .switchIfEmpty(Mono.error(new NotFoundException("List with id: " + listId + " not found")))
                            .flatMap(list -> {
                                list.getAllowedUsers().add(userId);
                                return shoppingListRepository.save(list);
                            })
                            .then();
                });
    }
}

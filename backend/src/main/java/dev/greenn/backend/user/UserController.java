package dev.greenn.backend.user;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/users")
public class UserController {

private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
@PostMapping("/login")
public Mono<User> login(@AuthenticationPrincipal Jwt jwt) {
    String id = jwt.getSubject();                  // Google ID
    String name = jwt.getClaim("name");           // Nazwa użytkownika
    return userService.findOrCreate(id, name);
}
}

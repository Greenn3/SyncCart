package dev.greenn.backend.user;


import dev.greenn.backend.GoogleTokenVerifier;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class UserService {
    private final UserRepository userRepository;
private  final GoogleTokenVerifier googleVerifier;
    public UserService(UserRepository userRepository, GoogleTokenVerifier googleVerifier) {
        this.userRepository = userRepository;
        this.googleVerifier = googleVerifier;
    }


//    public Mono<User> login(String authHeader) {
//        String idToken = authHeader.replace("Bearer ", "");
//        return googleVerifier.verify(idToken)
//                .flatMap(payload -> {
//                    String id = payload.getSubject();
//                    String name = payload.get("name").toString();
//
//                    return userRepository.findById(id)
//                            .switchIfEmpty(
//                                    userRepository.save(new User(id, name))
//                            );
//                });
//    }

    public Mono<User> findOrCreate(String id, String name) {
        return userRepository.findById(id)
                .switchIfEmpty(userRepository.save(new User(id, name)));
    }

    public Mono<Boolean> userExistsById(String id) {
        return userRepository.existsById(id);
    }
}

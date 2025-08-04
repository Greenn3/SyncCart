package dev.greenn.backend.shopping_list;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class ShoppingList {
    @Id
    String id;
    @NotBlank(message = "Name cannot be blank")
    String name;
    List<String> allowedUsers = new ArrayList<>();
}

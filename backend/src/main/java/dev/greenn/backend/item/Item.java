package dev.greenn.backend.item;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.*;

@Getter
@Setter
@Document
@AllArgsConstructor
@NoArgsConstructor
public class Item {
@Id
    String id;
@NotBlank(message = "Name cannot be blank")
    String name;
    String listId;
    String creatorId;
    String quantity;
    String price;
    String store;
    boolean completed = false;
}

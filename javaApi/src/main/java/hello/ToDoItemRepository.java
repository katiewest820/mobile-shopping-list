package hello;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ToDoItemRepository extends MongoRepository<ToDoItem, String> {
    public List<ToDoItem> findByItem(String item);
}
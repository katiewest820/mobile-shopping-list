package hello;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface ToDoListRepository extends MongoRepository<ToDoList, String> {
    List<ToDoList> findByName(String name);

}

package hello;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface GroceryListRepository extends MongoRepository<GroceryList, String> {
    List<GroceryList> findByName(String item);

}

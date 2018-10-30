package hello;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ItemRepository extends MongoRepository<Item, String> {

    public List<Item> findByItem(String item);
    public List<Item> deleteByItem(String item);
    public List<Item> findByGroceryListId(String groceryListId);





    //public List<Item> findByItemId(String id);

}
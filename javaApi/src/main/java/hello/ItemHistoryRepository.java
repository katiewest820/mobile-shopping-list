package hello;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface ItemHistoryRepository extends MongoRepository<ItemHistory, String> {
     List<ItemHistory> findByItem(String item);

}
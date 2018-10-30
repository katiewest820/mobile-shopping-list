package hello;

import java.time.LocalDate;


public class ItemHistory {

    public String item;
    public LocalDate addedDate = LocalDate.now();
    public String id;

    public String getItem() {
        return item;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public LocalDate getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(LocalDate addedDate) {
        this.addedDate = addedDate;
    }

}

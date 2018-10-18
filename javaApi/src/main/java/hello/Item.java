package hello;

public class Item {

    public String id;
    public String item;
    public int quantity;
    public boolean active;
    public boolean starred;
    public String groceryListId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isStarred() {
        return starred;
    }

    public void setStarred(boolean starred) {
        this.starred = starred;
    }

    public String getGroceryListId() {
        return groceryListId;
    }

    public void setGroceryListId(String groceryListId) {
        this.groceryListId = groceryListId;
    }
}


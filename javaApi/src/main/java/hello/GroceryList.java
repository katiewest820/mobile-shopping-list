package hello;

public class GroceryList {

    public String id;
    public String name;
    public boolean active;
    public long itemCount;

    public String getName() {
        return name;
    }

    public boolean isActive() {
        return active;
    }

    public long getItemCount() {
        return itemCount;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public void setItemCount(long itemCount) {
        this.itemCount = itemCount;
    }
}

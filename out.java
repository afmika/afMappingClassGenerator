public class Client {
	public int id = 0;
	public int ref = 0;
	public String name = null;
	public Timestamp birth = null;

	public Client () {}
	public Client (int id, int ref, String name, Timestamp birth) {
		setId (id);
		setRef (ref);
		setName (name);
		setBirth (birth);
	}

	public int setId (int id) {
		this.id = id;
	}
	public int setRef (int ref) {
		this.ref = ref;
	}
	public String setName (String name) {
		this.name = name;
	}
	public Timestamp setBirth (Timestamp birth) {
		this.birth = birth;
	}

	public int getId () {
		return this.id;
	}
	public int getRef () {
		return this.ref;
	}
	public String getName () {
		return this.name;
	}
	public Timestamp getBirth () {
		return this.birth;
	}

}
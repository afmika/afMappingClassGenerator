public class Customer {
	int idcustomer = 0;
	Timestamp birth_date = null;

	public Customer () {}
	public Customer (int idcustomer, Timestamp birth_date) {
		setIdcustomer (idcustomer);
		setBirth_date (birth_date);
	}

	public int setIdcustomer (int idcustomer) {
		this.idcustomer = idcustomer;
	}
	public Timestamp setBirth_date (Timestamp birth_date) {
		this.birth_date = birth_date;
	}

	public int getIdcustomer () {
		return this.idcustomer;
	}
	public Timestamp getBirth_date () {
		return this.birth_date;
	}

	
	@Override
	public String toString () {
		return "[ idcustomer = " + idcustomer + " birth_date = " + birth_date + " ]";
	}
}
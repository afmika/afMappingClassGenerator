public class Transac {
	int idcustomer = 0;
	int customer = 0;
	String description = null;
	Timestamp tr_time = null;

	public Transac () {}
	public Transac (int idcustomer, int customer, String description, Timestamp tr_time) {
		setIdcustomer (idcustomer);
		setCustomer (customer);
		setDescription (description);
		setTr_time (tr_time);
	}

	public int setIdcustomer (int idcustomer) {
		this.idcustomer = idcustomer;
	}
	public int setCustomer (int customer) {
		this.customer = customer;
	}
	public String setDescription (String description) {
		this.description = description;
	}
	public Timestamp setTr_time (Timestamp tr_time) {
		this.tr_time = tr_time;
	}

	public int getIdcustomer () {
		return this.idcustomer;
	}
	public int getCustomer () {
		return this.customer;
	}
	public String getDescription () {
		return this.description;
	}
	public Timestamp getTr_time () {
		return this.tr_time;
	}

	
	@Override
	public String toString () {
		return "[ idcustomer = " + idcustomer + " customer = " + customer + " description = " + description + " tr_time = " + tr_time + " ]";
	}
}
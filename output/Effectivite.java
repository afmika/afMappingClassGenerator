public class Effectivite {
	String ideffectivite = null;
	Timestamp date_arrivee = null;
	Timestamp date_depart = null;
	String idprevision = null;

	public Effectivite () {}
	public Effectivite (String ideffectivite, Timestamp date_arrivee, Timestamp date_depart, String idprevision) {
		setIdeffectivite (ideffectivite);
		setDate_arrivee (date_arrivee);
		setDate_depart (date_depart);
		setIdprevision (idprevision);
	}

	public String setIdeffectivite (String ideffectivite) {
		this.ideffectivite = ideffectivite;
	}
	public Timestamp setDate_arrivee (Timestamp date_arrivee) {
		this.date_arrivee = date_arrivee;
	}
	public Timestamp setDate_depart (Timestamp date_depart) {
		this.date_depart = date_depart;
	}
	public String setIdprevision (String idprevision) {
		this.idprevision = idprevision;
	}

	public String getIdeffectivite () {
		return this.ideffectivite;
	}
	public Timestamp getDate_arrivee () {
		return this.date_arrivee;
	}
	public Timestamp getDate_depart () {
		return this.date_depart;
	}
	public String getIdprevision () {
		return this.idprevision;
	}

	
	@Override
	public String toString () {
		return " ideffectivite = " + ideffectivite + " date_arrivee = " + date_arrivee + " date_depart = " + date_depart + " idprevision = " + idprevision + "";
	}
}
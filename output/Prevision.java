public class Prevision {
	String idprevision = null;
	Timestamp date_saisie = null;
	Timestamp date_arrivee = null;
	float duree = 0;
	String nom_bateau = null;
	String idquai = null;

	public Prevision () {}
	public Prevision (String idprevision, Timestamp date_saisie, Timestamp date_arrivee, float duree, String nom_bateau, String idquai) {
		setIdprevision (idprevision);
		setDate_saisie (date_saisie);
		setDate_arrivee (date_arrivee);
		setDuree (duree);
		setNom_bateau (nom_bateau);
		setIdquai (idquai);
	}

	public String setIdprevision (String idprevision) {
		this.idprevision = idprevision;
	}
	public Timestamp setDate_saisie (Timestamp date_saisie) {
		this.date_saisie = date_saisie;
	}
	public Timestamp setDate_arrivee (Timestamp date_arrivee) {
		this.date_arrivee = date_arrivee;
	}
	public float setDuree (float duree) {
		this.duree = duree;
	}
	public String setNom_bateau (String nom_bateau) {
		this.nom_bateau = nom_bateau;
	}
	public String setIdquai (String idquai) {
		this.idquai = idquai;
	}

	public String getIdprevision () {
		return this.idprevision;
	}
	public Timestamp getDate_saisie () {
		return this.date_saisie;
	}
	public Timestamp getDate_arrivee () {
		return this.date_arrivee;
	}
	public float getDuree () {
		return this.duree;
	}
	public String getNom_bateau () {
		return this.nom_bateau;
	}
	public String getIdquai () {
		return this.idquai;
	}

	
	@Override
	public String toString () {
		return " idprevision = " + idprevision + " date_saisie = " + date_saisie + " date_arrivee = " + date_arrivee + " duree = " + duree + " nom_bateau = " + nom_bateau + " idquai = " + idquai + "";
	}
}
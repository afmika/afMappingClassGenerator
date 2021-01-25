public class Bateau {
	public String nom = null;
	public float capacite = 0;

	public Bateau () {}
	public Bateau (String nom, float capacite) {
		setNom (nom);
		setCapacite (capacite);
	}

	public String setNom (String nom) {
		this.nom = nom;
	}
	public float setCapacite (float capacite) {
		this.capacite = capacite;
	}

	public String getNom () {
		return this.nom;
	}
	public float getCapacite () {
		return this.capacite;
	}

	
	@Override
	public String toString () {
		return " nom = " + nom + " capacite = " + capacite + "";
	}
}
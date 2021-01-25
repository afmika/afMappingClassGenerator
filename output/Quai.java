public class Quai {
	public String idquai = null;
	public int nombre_bateau = 0;

	public Quai () {}
	public Quai (String idquai, int nombre_bateau) {
		setIdquai (idquai);
		setNombre_bateau (nombre_bateau);
	}

	public String setIdquai (String idquai) {
		this.idquai = idquai;
	}
	public int setNombre_bateau (int nombre_bateau) {
		this.nombre_bateau = nombre_bateau;
	}

	public String getIdquai () {
		return this.idquai;
	}
	public int getNombre_bateau () {
		return this.nombre_bateau;
	}

	
	@Override
	public String toString () {
		return " idquai = " + idquai + " nombre_bateau = " + nombre_bateau + "";
	}
}
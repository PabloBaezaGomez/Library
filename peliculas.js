//Creo la clase película, al igual que con anime, el id se genera automáticamente 
//al crear un nuevo objeto. Los ids de películas borradas se quedarán vacíos.
class Pelicula {
  constructor(titulo, genero, year, fav, puntuacion, duracion) {
    let id = Number(localStorage.getItem("id")) || 1;
    this.id = id;
    this.titulo = titulo;
    this.genero = genero;
    this.year = year;
    this.fav = fav;
    this.puntuacion = puntuacion;
    this.duracion = duracion;
    localStorage.setItem("id", id + 1);
  }
}

class Anime {
  constructor(titulo, genero, year, fav, puntuacion, capitulos) {
    let id = Number(localStorage.getItem("id")) || 1;
    this.id = id;
    this.titulo = titulo;
    this.genero = genero;
    this.year = year;
    this.fav = fav;
    this.puntuacion = puntuacion;
    this.capitulos = capitulos;
    localStorage.setItem("id", id + 1);
  }
}

class Biblioteca {
  constructor() {
    this.peliculas = [];
    this.animes = [];
    this.cargarLocalStorage();
  }

  //Recibe un objeto película y lo añade al final del array películas de la clase biblioteca
  agregarPelicula(pelicula) {
    this.peliculas.push(pelicula);
    this.peliculas = this.clasificarPorPuntuacion("pelicula");
    this.guardarLocalStorage();
  }

  //Recibe un objeto anime y lo añade al final del array animes de la clase biblioteca
  agregarAnime(anime) {
    this.animes.push(anime);
    this.animes = this.clasificarPorPuntuacion("anime");
    this.guardarLocalStorage();
  }

  //Filtra el array películas, dejando las que tengan un nombre diferente al escrito por pantalla
  eliminarPelicula(name) {
    this.peliculas = this.peliculas.filter((peli) => peli.titulo.toLowerCase() != name.toLowerCase());
    this.guardarLocalStorage();
  }

  //Filtra el array animes, dejando los que tengan un nombre diferente al escrito por pantalla
  eliminarAnime(name) {
    this.animes = this.animes.filter((ani) => ani.titulo.toLowerCase() != name.toLowerCase());
    this.guardarLocalStorage();
  }

  //Usando la función filter, devuelve un array nuevo con los que compartan género con el escrito por pantalla
  filtrarPorGenero(genre, type) {
    let arrayFiltered = [];
    if (type == "anime") {
      arrayFiltered = this.animes.filter(
        (anime) => anime.genero.toLowerCase() === genre.toLowerCase()
      );
    } else {
      arrayFiltered = this.peliculas.filter(
        (pelicula) => pelicula.genero.toLowerCase() === genre.toLowerCase()
      );
    }
    return arrayFiltered;
  }

  //Ordena todo el array por puntuación
  clasificarPorPuntuacion(type) {
    let arrayOrdered = [];
    if (type == "anime") {
      arrayOrdered = this.animes.toSorted(
        (a, b) => b.puntuacion - a.puntuacion
      );
    } else {
      arrayOrdered = this.peliculas.toSorted(
        (a, b) => b.puntuacion - a.puntuacion
      );
    }
    return arrayOrdered;
  }

  //Guarda ambos array en localStorage
  guardarLocalStorage() {
    localStorage.setItem("peliculas", JSON.stringify(this.peliculas));
    localStorage.setItem("animes", JSON.stringify(this.animes));
  }

  //Carga dos arrays desde localStorage y los convierte en objetos
  cargarLocalStorage() {
    const peliculasData = JSON.parse(localStorage.getItem("peliculas")) || [];
    const animeData = JSON.parse(localStorage.getItem("animes")) || [];

    this.peliculas = peliculasData.map(
      (p) =>
        new Pelicula(
          p.id,
          p.titulo,
          p.genero,
          p.year,
          p.fav,
          p.puntuacion,
          p.duracion
        )
    );

    this.animes = animeData.map(
      (a) =>
        new Anime(
          a.id,
          a.titulo,
          a.genero,
          a.year,
          a.fav,
          a.puntuacion,
          a.capitulos
        )
    );
  }
}

const biblioteca = new Biblioteca();

function mostrarFormulario(opcion) {
  // Oculta ambos formularios
  document.getElementById("formularioPeliculas").style.display = "none";
  document.getElementById("formularioAnime").style.display = "none";

  // Muestra el formulario seleccionado
  if (opcion === "peliculas") {
    document.getElementById("formularioPeliculas").style.display = "block";
  } else if (opcion === "anime") {
    document.getElementById("formularioAnime").style.display = "block";
  }
}

//Coge los datos de teclado, crea el objeto y vacía el formulario
function newAnime() {
  let titulo = document.getElementById("tituloAnime").value;
  let genero = document.getElementById("generoAnime").value;
  let year = Number(document.getElementById("yearAnime").value);
  let episodios = Number(document.getElementById("episodios").value);
  let favorita = false;
  if (document.getElementById("favAnime").checked) {
    favorita = true;
  } else {
    favorita = false;
  }
  if (!titulo || !genero || !year || !episodios) {
    alert("Faltan datos")
  } else {
    let puntuacion = Number(document.getElementById("puntuacionAnime").value);
    let ani = new Anime(
      titulo,
      genero,
      year,
      favorita,
      puntuacion,
      episodios
    );
    biblioteca.agregarAnime(ani);
    console.log(ani);
    document.getElementById("tituloAnime").value = "";
    document.getElementById("generoAnime").value = "";
    document.getElementById("yearAnime").value = "";
    document.getElementById("episodios").value = "";
    document.getElementById("favAnime").checked = false;
    document.getElementById("puntuacionAnime").value = "";
    document.getElementById("formularioAnime").style.display = "none";
  }
}

//Coge los datos de teclado, crea el objeto y vacía el formulario
function newFilm() {
  let titulo = document.getElementById("tituloPelicula").value;
  let genero = document.getElementById("generoPelicula").value;
  let year = Number(document.getElementById("yearPelicula").value);
  let duracion = Number(document.getElementById("duracion").value);
  let favorita = false;
  if (document.getElementById("favPelicula").checked) {
    favorita = true;
  } else {
    favorita = false;
  }
  if (!titulo || !genero || !year || !duracion) {
    alert("Faltan datos")
  } else {
    let puntuacion = Number(document.getElementById("puntuacionPelicula").value);
    let peli = new Pelicula(titulo, genero, year, favorita, puntuacion, duracion);
    biblioteca.agregarPelicula(peli);
    console.log(peli);
    document.getElementById("tituloPelicula").value = "";
    document.getElementById("generoPelicula").value = "";
    document.getElementById("yearPelicula").value = "";
    document.getElementById("duracion").value = "";
    document.getElementById("favPelicula").checked = false;
    document.getElementById("puntuacionPelicula").value = "";
    document.getElementById("formularioPeliculas").style.display = "none";
  }
}

//la función mejores imprime ordenado por puntuación solo cinco o menos, dependiendo del tamaño del array
function mejores() {
  let tablas = document.getElementById("tablas");
  let arrayAnimeOrdenado = biblioteca.clasificarPorPuntuacion("anime") || [];
  //Crea una tabla con un bucle for
  let table =
    "<table id='animes'><thead><tr><td>Nombre</td><td>Genero</td><td>Año</td><td>Episodios</td><td>Favorito</td><td>Puntuacion</td></tr></thead><tbody>";
  for (i = 0; i < 5 && i < arrayAnimeOrdenado.length; i++) {
    table +=
      "<tr><td>" +
      arrayAnimeOrdenado[i].titulo +
      "</td><td>" +
      arrayAnimeOrdenado[i].genero +
      "</td><td>" +
      arrayAnimeOrdenado[i].year +
      "</td><td>" +
      arrayAnimeOrdenado[i].capitulos +
      "</td><td><input type='checkbox' " + (arrayAnimeOrdenado[i].fav ? "checked" : "") +
      " onclick='cambiarFavorito(" + arrayAnimeOrdenado[i].id + ", \"anime\")'></td><td>" +
      arrayAnimeOrdenado[i].puntuacion +
      "</td></tr>";
  }

  table += "</tbody></table>";
  let arrayPeliculaOrdenado = biblioteca.clasificarPorPuntuacion("pelicula");
  table +=
    "<table id='peliculas'><thead><tr><td>Nombre</td><td>Genero</td><td>Año</td><td>Duracion</td><td>Favorito</td><td>Puntuacion</td></tr></thead><tbody>";
  for (i = 0; i < 5 && i < arrayPeliculaOrdenado.length; i++) {
    table +=
      "<tr><td>" +
      arrayPeliculaOrdenado[i].titulo +
      "</td><td>" +
      arrayPeliculaOrdenado[i].genero +
      "</td><td>" +
      arrayPeliculaOrdenado[i].year +
      "</td><td>" +
      arrayPeliculaOrdenado[i].duracion +
      "</td><td><input type='checkbox' " + (arrayPeliculaOrdenado[i].fav ? "checked" : "") +
      " onclick='cambiarFavorito(" + arrayPeliculaOrdenado[i].id + ", \"pelicula\")'></td><td>" +
      arrayPeliculaOrdenado[i].puntuacion +
      "</td></tr>";
  }
  table += "</tbody></table>";
  tablas.innerHTML = table;
}

//Crea e imprime las tablas con todos los animes y películas
function mostrarListado() {
  let tablas = document.getElementById("tablas");
  let table =
    "<table id='animes'><thead><tr><td>ID</td><td>Nombre</td><td>Genero</td><td>Año</td><td>Episodios</td><td>Favorito</td><td>Puntuacion</td><td>Acciones</td></tr></thead><tbody>";

  biblioteca.animes.forEach((anime) => {
    table +=
      "<tr><td>" +
      anime.id +
      "</td><td>" +
      anime.titulo +
      "</td><td>" +
      anime.genero +
      "</td><td>" +
      anime.year +
      "</td><td>" +
      anime.capitulos +
      "</td><td><input type='checkbox' " + (anime.fav ? "checked" : "") +
      " onclick='cambiarFavorito(" + anime.id + ", \"anime\")'></td><td>" +
      anime.puntuacion +
      "</td><td><button onclick='eliminarElemento(\"" + anime.titulo + "\", \"anime\")'>Eliminar</button></td></tr>";
  });

  table += "</tbody></table>";
  table +=
    "<table id='peliculas'><thead><tr><td>ID</td><td>Nombre</td><td>Genero</td><td>Año</td><td>Duracion</td><td>Favorito</td><td>Puntuacion</td><td>Acciones</td></tr></thead><tbody>";

  biblioteca.peliculas.forEach((pelicula) => {
    table +=
      "<tr><td>" +
      pelicula.id +
      "</td><td>" +
      pelicula.titulo +
      "</td><td>" +
      pelicula.genero +
      "</td><td>" +
      pelicula.year +
      "</td><td>" +
      pelicula.duracion +
      "</td><td><input type='checkbox' " + (pelicula.fav ? "checked" : "") +
      " onclick='cambiarFavorito(" + pelicula.id + ", \"pelicula\")'></td><td>" +
      pelicula.puntuacion +
      '</td><td><button onclick="eliminarElemento(\'' + pelicula.titulo + '\', \'pelicula\')">Eliminar</button></td></tr>';
  });

  table += "</tbody></table>";
  tablas.innerHTML = table;
}


function cambiarFavorito(id, type) {
  if (type === "anime") {
    const anime = biblioteca.animes.find((a) => a.id === id);
    if (anime) {
      anime.fav = !anime.fav; // Cambiar el estado de favorito
      biblioteca.guardarLocalStorage(); // Guardar los cambios en localStorage
    }
  } else if (type === "pelicula") {
    const pelicula = biblioteca.peliculas.find((p) => p.id === id);
    if (pelicula) {
      pelicula.fav = !pelicula.fav; // Cambiar el estado de favorito
      biblioteca.guardarLocalStorage(); // Guardar los cambios en localStorage
    }
  }
}

function eliminarElemento(title, type) {
  if (type === "anime") {
    biblioteca.eliminarAnime(title);
  } else if (type === "pelicula") {
    biblioteca.eliminarPelicula(title);
  }
  mostrarListado(); // Volver a mostrar el listado actualizado
}

//Obtiene el género por teclado y usa la función de biblioteca de filtrado, luego crea e imprime la tabla
function filtrarGenero() {
  let genre = document.getElementById("genre").value;
  let arrayAnimeFiltrado = biblioteca.filtrarPorGenero(genre, "anime");
  let arrayPeliculaFiltrado = biblioteca.filtrarPorGenero(genre, "pelicula");
  let tablas = document.getElementById("tablas");
  let table =
    "<table id='animes'><thead><tr><td>Nombre</td><td>Genero</td><td>Año</td><td>Episodios</td><td>Favorito</td><td>Puntuacion</td></tr></thead><tbody>";
  arrayAnimeFiltrado.forEach((anime) => {
    table +=
      "<tr><td>" +
      anime.titulo +
      "</td><td>" +
      anime.genero +
      "</td><td>" +
      anime.year +
      "</td><td>" +
      anime.capitulos +
      "</td><td><input type='checkbox' " + (anime.fav ? "checked" : "") +
      " onclick='cambiarFavorito(" + anime.id + ", \"anime\")'></td><td>" +
      anime.puntuacion +
      "</td></tr>";
  });
  table += "</tbody></table>";
  table +=
    "<table id='peliculas'><thead><tr><td>Nombre</td><td>Genero</td><td>Año</td><td>Duracion</td><td>Favorito</td><td>Puntuacion</td></tr></thead><tbody>";
  arrayPeliculaFiltrado.forEach((pelicula) => {
    table +=
      "<tr><td>" +
      pelicula.titulo +
      "</td><td>" +
      pelicula.genero +
      "</td><td>" +
      pelicula.year +
      "</td><td>" +
      pelicula.duracion +
      "</td><td><input type='checkbox' " + (pelicula.fav ? "checked" : "") +
      " onclick='cambiarFavorito(" + pelicula.id + ", \"pelicula\")'></td><td>" +
      pelicula.puntuacion +
      "</td></tr>";
  });
  table += "</tbody></table>";
  tablas.innerHTML = table;
  document.getElementById("genre").value = "";
}

//Borra película desde teclado
function borrar(type) {
  let title = document.getElementById("titulo").value;
  if (type === "anime") {
    biblioteca.eliminarAnime(title);
  } else {
    biblioteca.eliminarPelicula(title);
  }
  document.getElementById("titulo").value = "";
}

//Crea unas películas y animes de ejemplo
function ejemplo() {
  biblioteca.animes = [];
  biblioteca.peliculas = [];
  localStorage.clear();

  let pelicula1 = new Pelicula(
    "The Dark Knight",
    "Acción",
    2008,
    true,
    9.0,
    152
  );
  let pelicula2 = new Pelicula(
    "Inception",
    "Ciencia Ficción",
    2010,
    true,
    8.8,
    148
  );
  let pelicula3 = new Pelicula("Forrest Gump", "Drama", 1994, false, 8.8, 142);
  let pelicula4 = new Pelicula(
    "The Matrix",
    "Ciencia Ficción",
    1999,
    true,
    8.7,
    136
  );
  let pelicula5 = new Pelicula("Gladiator", "Acción", 2000, false, 8.5, 155);

  biblioteca.agregarPelicula(pelicula1);
  biblioteca.agregarPelicula(pelicula2);
  biblioteca.agregarPelicula(pelicula3);
  biblioteca.agregarPelicula(pelicula4);
  biblioteca.agregarPelicula(pelicula5);

  let anime1 = new Anime("Naruto", "Acción", 2002, true, 8.3, 220);
  let anime2 = new Anime("Attack on Titan", "Acción", 2013, true, 8.8, 88);
  let anime3 = new Anime("Death Note", "Psicológico", 2006, false, 9.0, 37);
  let anime4 = new Anime("My Hero Academia", "Acción", 2016, true, 8.0, 113);
  let anime5 = new Anime("One Punch Man", "Acción", 2015, false, 8.8, 24);

  biblioteca.agregarAnime(anime1);
  biblioteca.agregarAnime(anime2);
  biblioteca.agregarAnime(anime3);
  biblioteca.agregarAnime(anime4);
  biblioteca.agregarAnime(anime5);
}

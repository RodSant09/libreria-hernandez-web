document.addEventListener('DOMContentLoaded', () => {
  const btnArriba = document.querySelector('.btn-arriba');

  if (btnArriba) {
    const mostrarBoton = () => {
      if (window.scrollY > 250) {
        btnArriba.classList.add('visible');
      } else {
        btnArriba.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', mostrarBoton);

    btnArriba.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    mostrarBoton();
  }

  const carruseles = document.querySelectorAll('.carrusel-servicio');

  carruseles.forEach((carrusel) => {
    const imagenes = carrusel.querySelectorAll('.carrusel-pista img');
    const btnPrev = carrusel.querySelector('.prev');
    const btnNext = carrusel.querySelector('.next');
    const contenedorIndicadores = carrusel.querySelector('.carrusel-indicadores');
    let indiceActual = 0;
    let intervalo = null;

    if (!imagenes.length) return;

    const mostrarImagen = (indice) => {
      imagenes.forEach((img, i) => {
        img.classList.toggle('activa', i === indice);
      });

      Array.from(contenedorIndicadores.children).forEach((punto, i) => {
        punto.classList.toggle('activo', i === indice);
      });

      indiceActual = indice;
    };

    imagenes.forEach((_, index) => {
      const punto = document.createElement('button');
      punto.setAttribute('aria-label', `Ir a la imagen ${index + 1}`);
      punto.addEventListener('click', () => {
        mostrarImagen(index);
        reiniciarAutoplay();
      });
      contenedorIndicadores.appendChild(punto);
    });

    const siguienteImagen = () => {
      mostrarImagen((indiceActual + 1) % imagenes.length);
    };

    const anteriorImagen = () => {
      mostrarImagen((indiceActual - 1 + imagenes.length) % imagenes.length);
    };

    const iniciarAutoplay = () => {
      if (carrusel.dataset.autoplay !== 'true' || imagenes.length < 2) return;
      intervalo = setInterval(siguienteImagen, 3500);
    };

    const detenerAutoplay = () => {
      if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
      }
    };

    const reiniciarAutoplay = () => {
      detenerAutoplay();
      iniciarAutoplay();
    };

    btnNext?.addEventListener('click', () => {
      siguienteImagen();
      reiniciarAutoplay();
    });

    btnPrev?.addEventListener('click', () => {
      anteriorImagen();
      reiniciarAutoplay();
    });

    carrusel.addEventListener('mouseenter', detenerAutoplay);
    carrusel.addEventListener('mouseleave', iniciarAutoplay);

    mostrarImagen(0);
    iniciarAutoplay();
  });
});

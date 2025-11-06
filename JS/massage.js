const audio = document.getElementById("audio");
const video = document.getElementById("background-video");
const lyricsContainer = document.getElementById("lyrics-container");
const progressBar = document.querySelector(".progress-bar input[type='range']");
const currentTimeDisplay = document.querySelector(".current-time"); 
const remainingTimeDisplay = document.querySelector(".remaining-time"); 

const lyrics = [
    { time: 0.34, text: "- Y que reciban de mí siempre, paz, mucha paz -" },
    { time: 3.84, text: "- Pero sobre todo mucho, mucho, mucho, mucho -" },
    { time: 8.14, text: "- ANTES DE QUE SE ACABE -" },
    { time: 20.49, text: "- Un día bien, al otro mal -" },
    { time: 23.89, text: "- Así es la vida y eso no va a cambiar -" },
    { time: 26.95, text: "- A veces para sonreír hay que llorar -" },
    { time: 30.54, text: "- Cierra los ojos y aprende a volar (ah) -" },
    { time: 34.71, text: "- Y antes que se acabe todo esto -" },
    { time: 37.23, text: "- Voy a vivir mi vida, así me muero 'e contento -" },
    { time: 40.56, text: "- Y hoy quiero alcohol y sexo en exceso -" },
    { time: 44.35, text: "- Pa darte problemas mejor te doy un beso -" },
    { time: 48.45, text: "- Y antes que se acabe todo esto -" },
    { time: 50.90, text: "- Voy a vivir mi vida, así me muero 'e contento -" },
    { time: 54.36, text: "- Y hoy quiero alcohol y sexo en exceso -" },
    { time: 58.00, text: "- Pa darte problemas mejor te doy un beso -" },
    { time: 63.27, text: "- ---- -" },
    { time: 71.79, text: "- (Pa darte problemas mejor te doy un beso) -" },
    { time: 75.57, text: "- Antes que se acabe -" },
    { time: 79.28, text: "- Antes que se acabe (dale) -" },
    { time: 82.87, text: "- Antes que se acabe todo -" },
    { time: 86.02, text: "- Voy a vivir, voy a llorar, voy a vivir -" },
    { time: 89.82, text: "- Un shot de amor por la casa que yo invito -" },
    { time: 93.17, text: "- Pa celebrar que respiramos, eso es un hito -" },
    { time: 96.56, text: "- Llorar nunca ha sido delito -" },
    { time: 99.04, text: "- Y los días lluviosos a veces son los más bonitos -" },
    { time: 103.56, text: "- Pero hoy salió el sol -" },
    { time: 107.51, text: "- Y me siento mejor, eh-eh, eh -" },
    { time: 110.96, text: "- Lo malo pasó, el tiempo es mi doctor -" },
    { time: 114.18, text: "- La vida es una movie, soy mi propio director -" },
    { time: 117.76, text: "- Prendan, prendan y tráiganme alcohol -" },
    { time: 121.85, text: "- Que no tengo tiempo pa guardar rencor -" },
    { time: 124.63, text: "- Yo no cojo lucha y menos si son hardcore -" },
    { time: 128.15, text: "- Abraza a tu hermano y no mires el color -" },
    { time: 131.20, text: "- Que aquí todos somos iguales (eh) -" },
    { time: 135.18, text: "- Cuánto tú ames, eso es lo que vales -" },
    { time: 138.65, text: "- Hoy voy a hacer un truco en la long board -" },
    { time: 141.89, text: "- Pero si no me sale (pero si no me sale) -" },
    { time: 145.93, text: "- Y antes que se acabe todo esto -" },
    { time: 148.48, text: "- Voy a vivir mi vida, así me muero 'e contento -" },
    { time: 152.01, text: "- Y hoy quiero alcohol y sexo en exceso -" },
    { time: 155.56, text: "- Pa darte problemas mejor te doy un beso -" },
    { time: 159.75, text: "- Y antes que se acabe todo esto -" },
    { time: 162.46, text: "- Voy a vivir mi vida, así me muero 'e contento -" },
    { time: 165.62, text: "- Y hoy quiero alcohol y sexo en exceso -" },
    { time: 169.25, text: "- Pa darte problemas mejor te doy un beso -" },
    { time: 174.48, text: "- ---- -" },
    { time: 187.43, text: "- Antes que se acabe -" },
    { time: 190.62, text: "- Antes que se acabe -" },
    { time: 194.24, text: "- Antes que se acabe todo -" },
    { time: 197.60, text: "- Voy a vivir pa llorar, voy a vivir -" },
    { time: 201.62, text: "- ---- -" },
    { time: 215.80, text: "- Amor -" },
    { time: 217.51, text: "- ---- -" }
];


let currentLineElement = null;

// Función para formatear el tiempo en minutos y segundos
function formatTime(time) {
    if (isNaN(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

// Función para actualizar las letras manualmente (para seek inmediato)
function updateLyrics(currentTime) {
    const currentLyric = lyrics.find(
        (line, index) =>
            line.time <= currentTime && (!lyrics[index + 1] || lyrics[index + 1].time > currentTime)
    );
    if (currentLyric && currentLineElement?.textContent !== currentLyric.text) {
        showLine(currentLyric.text);
    } else if (!currentLyric && currentLineElement) {
        currentLineElement.remove();
        currentLineElement = null;
    }
}

// Actualizar la barra de progreso, el tiempo actual y las letras
audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const remainingTime = duration - currentTime;

    if (duration > 0) {
        progressBar.value = (currentTime / duration) * 100; 
    }

    currentTimeDisplay.textContent = formatTime(currentTime);
    remainingTimeDisplay.textContent = `-${formatTime(remainingTime)}`;

    updateLyrics(currentTime);
});

// Establecer la duración total al cargar los metadatos
audio.addEventListener("loadedmetadata", () => {
    remainingTimeDisplay.textContent = `-${formatTime(audio.duration)}`;
    updateLyrics(0);
});

// Evento para el botón de play/pause
document.getElementById("playButton").addEventListener("click", () => {
    if (audio.paused) {
        audio.play().catch(error => console.log("Error al reproducir el audio:", error));
        video.style.display = 'block'; // Mostrar video al reproducir
        video.play().catch(error => console.log("Error al reproducir el video:", error));
        document.getElementById("playButton").textContent = "⏸";
    } else {
        audio.pause();
        video.pause();
        video.style.display = 'none'; // Ocultar video al pausar para volver a negro
        document.getElementById("playButton").textContent = "⏯";
    }
});

// Permitir al usuario saltar arrastrando la barra
progressBar.addEventListener("input", () => {
    const duration = audio.duration;
    if (duration > 0) {
        audio.currentTime = (progressBar.value / 100) * duration;
        updateLyrics(audio.currentTime);
    }
});

// Función para mostrar las letras
function showLine(text) {
    if (currentLineElement) {
        currentLineElement.remove();
    }
    currentLineElement = document.createElement("div");
    currentLineElement.classList.add("line");
    currentLineElement.textContent = text;
    lyricsContainer.appendChild(currentLineElement);
}

// Evento 'ended' para resetear al final
audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    video.pause();
    video.style.display = 'none'; // Ocultar video al final
    document.getElementById("playButton").textContent = "⏯";
    updateLyrics(0);
});
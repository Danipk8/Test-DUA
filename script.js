
//Esto conecta JS con HTML:

//Insertar nombre usuario
const usernameInput = document.getElementById("username");


//Pantalla decorativa de cargando respuestas
const loadingScreen = document.getElementById("loading-screen");

const loadingText = document.getElementById("loading-text");







//Boton de inicio que direcciona a panttalla de inicio y pantalla de quiz
const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const questionTitle = document.getElementById("question-title");
const optionsContainer = document.getElementById("options-container");
const questionObjective = document.getElementById("question-objective");
const questionCategory = document.getElementById("question-category");




//Boton para ir a siguiente
const nextBtn = document.getElementById("nextBtn");

//resultados pantalla
const resultScreen = document.getElementById("result-screen");
const results = document.getElementById("results");



//barra de prgreso 
const progressBar = document.getElementById("progress-bar");








//Creamos banco de preguntas
const questions = [
    {
        question: "1. Cuando aprendes algo nuevo, ¿qué recursos te ayudan más?",
        category: "representacion",
        objective:"Medir canal de acceso a la información",
        options: [
            "Imágenes, diagramas o esquemas",
            "Explicaciones habladas o audios",
            "Texto organizado paso a paso",
            "Ejemplos prácticos"
        ]
        
    },



    {
        question: "2. ¿Que prefieres para comprender mejor un tema?",
        category: "representacion",
        objective:"Medir forma preferida de clarificación",
        options: [
            "Ver un ejemplo visual",
            "Escuchar que lo expliquen nuevamente",
            "Leer instrucciones claras",
            "Relacionarlo con una situación real"
        ]
        
    },


        {
        question: "3. ¿Qué facilita más tu concentración al aprender?",
        category: "representacion",
        objective:"Medir condiciones para procesar información",
        options: [
            "Videos o animaciones",
            "Explicaciones breves",
            "Instrucciones concretas",
            "Actividades guiadas"
        ]
        
    },




    {
        question: "4. ¿Cómo prefieres demostrar lo que aprendiste?",
        category: "accion",
        objective:"Medir forma de expresión",
        options: [
            "Escribiendo",
            "Explicándolo verbalmente",
            "Dibujando o haciendo esquemas",
            "Resolviendo una actividad práctica"
        ]
    },




    {
        question: "5. Cuando una actividad te parece difícil ¿Qué prefieres?",
        category: "accion",
        objective:"Medir estrategias de resolución",
        options: [
            "Recibir una pista",
            "Ver un ejemplo resuelto",
            "Intentarlo varias veces",
            "Pedir orientación"
        ]
    },


   {
        question: "6. ¿Qué herramienta te ayuda más a organizar tus ideas?",
        category: "accion",
        objective:"Medir planificación y organización",
        options: [
            "Listas o pasos escritos",
            "Mapas conceptuales",
            "Conversarlo con alguien",
            "Probar y corregir"
        ]
    },




    {
        question: "7. ¿Qué te anima más a aprender?",
        category: "compromiso",
        objective:"Medir activadores motivacionales",
        options: [
            "Juegos o dinámicas interactivas",
            "Superar retos",
            "Entender para qué sirve",
            "Elegir cómo hacerlo"
        ]
    },


    {
        question: "8. Cuando aprendes algo nuevo, ¿Que prefieres?",
        category: "compromiso",
        objective:"Medir autonomía y exploración",
        options: [
            "Seguir una ruta guiada",
            "Explorar libremente",
            "Elegir entre varias opciones",
            "Experimentar por tu cuenta"
        ]
    },

    {
        question: "9. ¿Cuándo participas más?",
        category: "compromiso",
        objective:"Medir implicación emocional",
        options: [
            "Cuando la actividad es dinámica",
            "Cuando puedes tomar decisiones",
            "Cuando ves avances o logros",
            "Cuando se relaciona contigo"
        ]
    }



];



//variable global para guardar nombre de usuario
let username = "";




//variables del sistema (categorias que se llenan)

let currentQuestion = 0;
let responses = {
    representacion: [],
    accion: [],
    compromiso: []
};










//funcion para mostrar preguntas

function loadQuestion() {

    const current = questions[currentQuestion];

    const categoryNames = {
        representacion: "REPRESENTACIÓN",
        accion: "ACCIÓN Y EXPRESIÓN",
        compromiso: "COMPROMISO"
    };

    questionCategory.textContent = categoryNames[current.category];

    questionTitle.textContent = current.question;

    questionObjective.textContent =
        `Objetivo del análisis: ${current.objective}`;

    optionsContainer.innerHTML = "";

    current.options.forEach(option => {
        const label = document.createElement("label");
        label.classList.add("option");

        label.innerHTML = `
            <input type="checkbox" value="${option}">
            ${option}
        `;

        optionsContainer.appendChild(label);
    });

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}







//Funcion para mostrar resultados y analizarlos
function showResults() {

//cambiar pantallas
    quizScreen.classList.add("hidden");
    loadingScreen.classList.remove("hidden");

    //setTimeout dice  "espera 2.5 segundos" antes de mostrar resultados
    setTimeout(() => {

        loadingScreen.classList.add("hidden");
        resultScreen.classList.remove("hidden");

//cuenta respuestas de cada categoria
        const rep = responses.representacion.length;
        const acc = responses.accion.length;
        const com = responses.compromiso.length;

    //generar barras de medicion
        results.innerHTML = `
            <h3>Perfil de aprendizaje identificado: ${username}</h3>
            


            <h4>Según tus respuestas:</h4>

<div class="result-card">
    <h4>REPRESENTACIÓN</h4>
    <p><strong>Recibes mejor la información mediante:</strong></p>
    <div class="response-list">
        ${responses.representacion.map(r => `<div class="response-item">${r}</div>`).join("")}
    </div>
</div>

<div class="result-card">
    <h4>ACCIÓN Y EXPRESIÓN</h4>
    <p><strong>Expresas mejor lo aprendido cuando:</strong></p>
    <div class="response-list">
        ${responses.accion.map(r => `<div class="response-item">${r}</div>`).join("")}
    </div>
</div>

<div class="result-card">
    <h4>COMPROMISO</h4>
    <p><strong>Te motivas más cuando:</strong></p>
    <div class="response-list">
        ${responses.compromiso.map(r => `<div class="response-item">${r}</div>`).join("")}
    </div>
</div>



            <hr>


            <div class="metric">

                <span>REPRESENTACIÓN</span>
                <div class="metric-bar">
                    <div class="fill" style="width:${(rep / 12) * 100}%"></div>
                </div>       

                <span>${Math.round((rep / 12) * 100)}%</span>


                
            </div>
            
            
            <div class="metric">

                <span>ACCIÓN Y EXPRESIÓN</span>
                <div class="metric-bar">
                    <div class="fill" style="width:${(acc / 12) * 100}%"></div>
                </div>             
               <span>${Math.round((acc / 12) * 100)}%</span>


                
            </div>
            

            <div class="metric">

                <span>MOTIVACIÓN/COMPROMISO</span>
                <div class="metric-bar">
                    <div class="fill" style="width:${(com / 12) * 100}%"></div>
                </div>             
               <span>${Math.round((com / 12) * 100)}%</span>


                
            </div>
            


        `;

    }, 2500);


loadingText.textContent = `Analizando patrones cognitivos de ${username}...`;

}










startBtn.addEventListener("click", () => {

    if (usernameInput.value.trim() === "") {
        alert("Ingresa tu nombre para iniciar.");
        return;
    }

    username = usernameInput.value.trim();

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    loadQuestion();
});



nextBtn.addEventListener("click", () => {

    const checked = document.querySelectorAll("input[type='checkbox']:checked");


  
//Validar que seleccione al menos una opción
    if (checked.length === 0) {
        alert("Selecciona al menos una opción.");
        return;
    }



    const category = questions[currentQuestion].category;
   

    checked.forEach(box => {
        responses[category].push(box.value);
    });

    currentQuestion++;


//Alerta final "Test finalizado"

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {

        showResults();

    }
});





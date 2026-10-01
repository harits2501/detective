/* =================================
   MUFI DETECTIVE
================================= */


/* =================================
   GAME DATA
   TOTAL PETUNJUK = 5
================================= */

const evidenceData = {

    /* =============================
       RUANG PAMER
    ============================= */

    gallery: {

        painting: {
            found: false,
            title: "Lukisan Museum",
            text: "Tidak ada sesuatu yang mencurigakan di balik lukisan."
        },

        lamp: {
            found: false,
            title: "Lampu Ruangan",
            text: "Lampu masih berfungsi normal. Tidak ada petunjuk."
        },

        camera: {
            found: false,
            title: "Rekaman Kamera",
            text: "Kamera menunjukkan adanya gangguan selama beberapa menit. Seseorang sengaja mematikan sistem keamanan.",
            points: 15
        },

        diamond: {
            found: false,
            title: "Kotak Berlian",
            text: "Kotak masih terkunci. Tidak ada kerusakan pada sistem kunci.",
            points: 10
        },

        chair: {
            found: false,
            title: "Kursi",
            text: "Hanya sebuah kursi biasa. Tidak ada petunjuk."
        },

        table: {
            found: false,
            title: "Meja Museum",
            text: "Meja hanya berisi beberapa brosur pengunjung."
        },

        door: {
            found: false,
            title: "Pintu Museum",
            text: "Pintu tidak rusak. Pelaku kemungkinan masuk menggunakan akses resmi."
        },

        plant: {
            found: false,
            title: "Tanaman",
            text: "Tidak ada sesuatu yang aneh di sini."
        }

    },


    /* =============================
       RUANG KEAMANAN
    ============================= */

    security: {

        painting: {
            found: false,
            title: "Monitor Lama",
            text: "Monitor lama tidak menyimpan rekaman tambahan."
        },

        lamp: {
            found: false,
            title: "Lampu Keamanan",
            text: "Lampu keamanan menyala normal."
        },

        camera: {
            found: false,
            title: "Panel CCTV",
            text: "Terdapat catatan bahwa sistem CCTV dimatikan secara manual pada pukul 19:50.",
            points: 20
        },

        diamond: {
            found: false,
            title: "Loker Petugas",
            text: "Loker kosong dan tidak menunjukkan sesuatu yang mencurigakan."
        },

        chair: {
            found: false,
            title: "Kursi Penjaga",
            text: "Kursi penjaga tidak memiliki petunjuk."
        },

        table: {
            found: false,
            title: "Meja Keamanan",
            text: "Ada daftar petugas yang bertugas malam itu.",
            points: 10
        },

        door: {
            found: false,
            title: "Pintu Belakang",
            text: "Pintu belakang menggunakan sistem kartu akses."
        },

        plant: {
            found: false,
            title: "Tanaman",
            text: "Tidak ada petunjuk di sini."
        }

    },


    /* =============================
       RUANG KONTROL
       HANYA PANEL LISTRIK = PETUNJUK
    ============================= */

    control: {

        painting: {
            found: false,
            title: "Panel Listrik",
            text: "Panel listrik sempat dimatikan. Sistem dapat diakses oleh teknisi museum.",
            points: 20
        },

        lamp: {
            found: false,
            title: "Lampu Kontrol",
            text: "Lampu masih berfungsi normal."
        },

        camera: {
            found: false,
            title: "Monitor Kontrol",
            text: "Monitor hanya menampilkan kondisi sistem secara normal."
        },

        diamond: {
            found: false,
            title: "Lemari Peralatan",
            text: "Ada beberapa peralatan teknisi di dalam lemari."
        },

        chair: {
            found: false,
            title: "Kursi Teknisi",
            text: "Tidak ada sesuatu yang mencurigakan."
        },

        table: {
            found: false,
            title: "Meja Teknisi",
            text: "Ditemukan sarung tangan kerja yang biasa digunakan teknisi."
        },

        door: {
            found: false,
            title: "Pintu Ruang Kontrol",
            text: "Pintu menggunakan kartu akses khusus teknisi."
        },

        plant: {
            found: false,
            title: "Tanaman",
            text: "Tidak ada petunjuk."
        }

    }

};


/* =================================
   KONFIGURASI OBJEK PER RUANGAN
================================= */

const roomObjects = {

    gallery: {

        painting: {
            icon: "🖼️",
            label: "Lukisan Museum"
        },

        lamp: {
            icon: "💡",
            label: "Lampu Ruangan"
        },

        camera: {
            icon: "📹",
            label: "Rekaman Kamera"
        },

        diamond: {
            icon: "💎",
            label: "Kotak Berlian"
        }

    },


    security: {

        camera: {
            icon: "📹",
            label: "Panel CCTV"
        },

        table: {
            icon: "🗃️",
            label: "Meja Keamanan"
        },

        chair: {
            icon: "🪑",
            label: "Kursi Penjaga"
        },

        door: {
            icon: "🚪",
            label: "Pintu Belakang"
        }

    },


    control: {

        painting: {
            icon: "⚡",
            label: "Panel Listrik"
        },

        camera: {
            icon: "🖥️",
            label: "Monitor Kontrol"
        },

        table: {
            icon: "🧰",
            label: "Meja Teknisi"
        },

        door: {
            icon: "🚪",
            label: "Pintu Ruang Kontrol"
        }

    }

};


/* =================================
   VARIABLES
================================= */

let currentLocation = null;

let score = 0;

let cluesFound = 0;

let timeLeft = 300;

let timer;

let gameStarted = false;

let interviewed = [];


/* =================================
   START GAME
================================= */

function startGame() {

    document
        .getElementById("startScreen")
        .classList.add("hidden");

    document
        .getElementById("game")
        .classList.remove("hidden");

    gameStarted = true;

    updateScore();

    updateClueCount();

    updateTimer();

    hideAllObjects();

    startTimer();

}


/* =================================
   TIMER
================================= */

function startTimer() {

    timer = setInterval(function () {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {

            clearInterval(timer);

            finishGame(
                false,
                "Waktu investigasi habis. Kamu belum berhasil memecahkan kasus."
            );

        }

    }, 1000);

}


function updateTimer() {

    let minutes =
        Math.floor(timeLeft / 60);

    let seconds =
        timeLeft % 60;

    const timerElement =
        document.getElementById("timer");

    if (timerElement) {

        timerElement.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    }

}


/* =================================
   SEMBUNYIKAN SEMUA OBJEK
================================= */

function hideAllObjects() {

    const objects =
        document.querySelectorAll(".object");

    objects.forEach(function (object) {

        object.style.display = "none";

        object.style.borderColor = "#414b5b";

    });

}


/* =================================
   ATUR TAMPILAN OBJEK
================================= */

function configureObject(
    objectClass,
    icon,
    label
) {

    const object =
        document.querySelector(
            `.object.${objectClass}`
        );

    if (!object) {
        return;
    }

    object.style.display = "";

    object.style.borderColor = "#414b5b";

    object.innerHTML =
        `${icon}<small>${label}</small>`;

}


/* =================================
   TAMPILKAN OBJEK SESUAI RUANGAN
================================= */

function showRoomObjects(location) {

    hideAllObjects();

    const objects =
        roomObjects[location];

    if (!objects) {
        return;
    }

    Object.keys(objects).forEach(function (objectClass) {

        const data =
            objects[objectClass];

        configureObject(
            objectClass,
            data.icon,
            data.label
        );

    });

}


/* =================================
   GANTI RUANGAN
================================= */

function changeLocation(location) {

    if (!gameStarted) {
        return;
    }

    currentLocation = location;

    let name = "";

    if (location === "gallery") {

        name = "Ruang Pamer";

    }

    if (location === "security") {

        name = "Ruang Keamanan";

    }

    if (location === "control") {

        name = "Ruang Kontrol";

    }


    document
        .getElementById("locationName")
        .textContent = name;


    showRoomObjects(location);

}


/* =================================
   INSPEKSI OBJEK
================================= */

function inspectObject(objectName) {

    if (!gameStarted) {
        return;
    }

    if (!currentLocation) {
        return;
    }


    const room =
        evidenceData[currentLocation];

    if (!room) {
        return;
    }


    const object =
        room[objectName];

    if (!object) {
        return;
    }


    /* =============================
       JIKA SUDAH PERNAH DICEK
    ============================= */

    if (object.found) {

        showModal(
            "🔎",
            object.title,
            object.text
        );

        return;

    }


    /* =============================
       TANDAI SUDAH DICEK
    ============================= */

    object.found = true;


    /* =============================
       BENDA BIASA
    ============================= */

    if (!object.points) {

        showModal(
            "❌",
            object.title,
            object.text
        );

        return;

    }


    /* =============================
       PETUNJUK DITEMUKAN
    ============================= */

    cluesFound++;

    score += object.points;


    updateScore();

    updateClueCount();


    addEvidence(
        object.title,
        object.text
    );


    showModal(
        "🔎",
        "PETUNJUK DITEMUKAN!",
        object.text
    );

}


/* =================================
   TAMBAHKAN KE CATATAN INVESTIGASI
================================= */

function addEvidence(title, text) {

    const list =
        document.getElementById("evidenceList");


    if (!list) {
        return;
    }


    const empty =
        list.querySelector(".empty");


    if (empty) {

        empty.remove();

    }


    const evidence =
        document.createElement("div");


    evidence.className =
        "evidence";


    evidence.innerHTML = `
        <h3>🔎 ${title}</h3>

        <p>
            ${text}
        </p>
    `;


    list.appendChild(evidence);


    const notebookCount =
        document.getElementById("notebookCount");


    if (notebookCount) {

        notebookCount.textContent =
            `${cluesFound} petunjuk`;

    }

}


/* =================================
   UPDATE SCORE
================================= */

function updateScore() {

    const scoreElement =
        document.getElementById("score");

    if (scoreElement) {

        scoreElement.textContent =
            score;

    }

}


/* =================================
   UPDATE JUMLAH PETUNJUK
================================= */

function updateClueCount() {

    const clueElement =
        document.getElementById("clueFound");

    if (clueElement) {

        clueElement.textContent =
            cluesFound;

    }


    const notebookCount =
        document.getElementById("notebookCount");

    if (notebookCount) {

        notebookCount.textContent =
            `${cluesFound} petunjuk`;

    }

}


/* =================================
   INTERVIEW
================================= */

function interview(name) {

    let title = "";

    let text = "";


    if (name === "Adrian") {

        title = "Adrian — Kurator";

        text =
            "Saya sedang menyelesaikan laporan inventaris di kantor. Saya tidak pergi ke ruang kontrol malam itu.";

    }


    if (name === "Clara") {

        title = "Clara — Keamanan";

        text =
            "Saya melihat seseorang masuk ke ruang kontrol sekitar pukul 19:50. Orang itu memakai pakaian teknisi.";

    }


    if (name === "Raka") {

        title = "Raka — Teknisi";

        text =
            "Saya memang masuk ke ruang kontrol untuk memeriksa listrik. Tapi saya tidak mengambil berlian.";

    }


    if (name === "Nadia") {

        title = "Nadia — Pemandu";

        text =
            "Saya sudah meninggalkan museum sebelum pukul 19:30. Setelah itu saya tidak kembali.";

    }


    if (!interviewed.includes(name)) {

        interviewed.push(name);

        score += 5;

        updateScore();

    }


    showModal(
        "👤",
        title,
        text
    );

}


/* =================================
   ACCUSE
================================= */

function accuse(name) {

    if (!gameStarted) {
        return;
    }


    if (cluesFound < 3) {

        showModal(
            "⚠️",
            "Petunjuk Belum Cukup",
            "Kamu harus menemukan minimal 3 petunjuk sebelum menentukan pelaku."
        );

        return;

    }


    clearInterval(timer);


    /* =============================
       PELAKU BENAR
    ============================= */

    if (name === "Raka") {

        score += 50;


        /* BONUS WAKTU */

        if (timeLeft > 180) {

            score += 20;

        }


        updateScore();


        finishGame(
            true,
            "Raka adalah pelakunya. Petunjuk menunjukkan bahwa ia memiliki akses ke ruang kontrol dan berada di museum saat sistem CCTV mengalami gangguan."
        );

        return;

    }


    /* =============================
       SALAH
    ============================= */

    score -= 30;


    if (score < 0) {

        score = 0;

    }


    updateScore();


    finishGame(
        false,
        `${name} bukan pelakunya. Masih ada petunjuk yang mengarah kepada orang yang memiliki akses ke ruang kontrol.`
    );

}


/* =================================
   FINISH GAME
================================= */

function finishGame(correct, message) {

    clearInterval(timer);

    gameStarted = false;


    document
        .getElementById("result")
        .classList.remove("hidden");


    document
        .getElementById("finalScore")
        .textContent = score;


    if (correct) {

        document
            .getElementById("resultIcon")
            .textContent = "🏆";


        document
            .getElementById("resultTitle")
            .textContent =
            "KASUS TERPECAHKAN!";


        document
            .getElementById("resultText")
            .textContent =
            message;

    } else {

        document
            .getElementById("resultIcon")
            .textContent = "🔍";


        document
            .getElementById("resultTitle")
            .textContent =
            "INVESTIGASI GAGAL";


        document
            .getElementById("resultText")
            .textContent =
            message;

    }

}


/* =================================
   MODAL
================================= */

function showModal(icon, title, text) {

    document
        .getElementById("modalIcon")
        .textContent = icon;


    document
        .getElementById("modalTitle")
        .textContent = title;


    document
        .getElementById("modalText")
        .textContent = text;


    document
        .getElementById("modal")
        .classList.remove("hidden");

}


/* =================================
   CLOSE MODAL
================================= */

function closeModal() {

    document
        .getElementById("modal")
        .classList.add("hidden");

}


/* =================================
   ESC UNTUK CLOSE MODAL
================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);
// ==========================================
// 1. AUTENTIFIKATSIYA (Ixtiyoriy login va parol bilan kirish)
// ==========================================
function handleLogin(event) {
    event.preventDefault(); // Sahifa avtomatik yangilanishining oldini oladi

    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();

    // Agar login yoki parol katakchalari bo'sh bo'lsa, ogohlantirish beramiz
    if (usernameInput === "" || passwordInput === "") {
        alert("Iltimos, login va parolni kiriting!");
        return false;
    }

    // Ixtiyoriy kiritilgan login va parolni qabul qilib, asosiy sahifaga o'tkazamiz
    alert(`Xush kelibsiz, ${usernameInput}! Tizimga muvaffaqiyatli kirdingiz.`);
    window.location.href = "index.html";
}


// ==========================================
// 2. E'LONLAR BAZASI (Qidiruv uchun)
// ==========================================
const announcementsDB = [
    { 
        title: "Ochiq eshiklar kuni", 
        keywords: ["ochiq", "eshik", "kun", "abituriyent"], 
        url: "elon1.html" 
    },
    { 
        title: "Xalqaro hamkorlik va almashinuv", 
        keywords: ["xalqaro", "hamkorlik", "almashinuv", "dastur"], 
        url: "elon2.html" 
    },
    { 
        title: "Raqamli O'zbekiston ilmiy anjumani", 
        keywords: ["raqamli", "ozbekiston", "anjuman", "ilmiy", "talaba"], 
        url: "elon3.html" 
    },
    { 
        title: "Sport musobaqalari va universitet kubogi", 
        keywords: ["sport", "musobaqa", "kubok", "futbol", "shaxmat"], 
        url: "elon4.html" 
    }
];


// ==========================================
// 3. XAVFSIZ VA AVTO-OTISH QIDIRUV FUNKSIYASI
// ==========================================
function handleSearch(event) {
    event.preventDefault(); // Sahifa yangilanishining oldini oladi

    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.trim().toLowerCase();

    // 1-shart: Agar maydon bo'sh bo'lsa
    if (searchValue === "") {
        alert("Diqqat! Qidirish uchun maydonni bo'sh qoldirish mumkin emas. Iltimos, so'z kiriting!");
        searchInput.focus();
        return false;
    }

    // 2-shart: Bazadan mos keladigan e'lonni qidiramiz
    const foundAnnouncement = announcementsDB.find(item => 
        item.title.toLowerCase().includes(searchValue) || 
        item.keywords.some(keyword => searchValue.includes(keyword))
    );

    // 3-natija: Agar e'lon topilsa, o'sha sahifaga o'tkazish
    if (foundAnnouncement) {
        alert(`Topildi: "${foundAnnouncement.title}". Batafsil sahifaga o'tilmoqda...`);
        window.location.href = foundAnnouncement.url;
    } else {
        // Agar topilmasa
        alert(`Kechirasiz, "${searchValue}" bo'yicha hech qanday e'lon topilmadi.`);
        searchInput.value = "";
    }
}
// Yangi e'lon qo'shish funksiyasi
function addNewAnnouncement(event) {
    event.preventDefault();

    const title = document.getElementById('announcementTitle').value.trim();
    const date = document.getElementById('announcementDate').value.trim();
    const desc = document.getElementById('announcementDesc').value.trim();

    if (title === "" || date === "" || desc === "") {
        alert("Iltimos, barcha maydonlarni to'ldiring!");
        return;
    }

    // Bazaga yangi obyekt sifatida qo'shamiz
    announcementsDB.push({
        title: title,
        keywords: title.toLowerCase().split(" "),
        url: "index.html" // Hozircha asosiy sahifaga yo'naltiriladi
    });

    alert(`Muvaffaqiyatli! "${title"}" e'loni qo'shildi.`);
    
    // Formani tozalash va oynani yopish
    document.getElementById('addAnnouncementForm').reset();
    
    // Bootstrap modalini yopish buyrug'i
    const modalElement = document.getElementById('addAnnouncementModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}
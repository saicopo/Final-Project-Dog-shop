

Progetto: DogShop
Introduzione
un'applicazione web pensata per mettere in contatto allevatori e acquirenti dei cani, usando le molteplici competenze acquisite durante il corso e implementate in questo progetto finale

Obiettivi

Informazioni Complete: Fornire schede dettagliate sui cuccioli e sugli allevatori, con foto, descrizioni e contatti.
Gestione del Profilo: Permettere agli allevatori di gestire il proprio profilo, aggiungere cuccioli e aggiornare le informazioni.
Esperienza Utente: Creare un'interfaccia intuitiva e piacevole da usare, sia su desktop che su dispositivi mobili con annessa responsivita.
Funzionalità
Visualizzazione Cuccioli: Gli utenti possono sfogliare un catalogo di cuccioli disponibili,
Dettagli Allevatore: Ogni cucciolo è associato a un allevatore, con una pagina dedicata che mostra informazioni di contatto e altri cuccioli disponibili.
Gestione Profilo Allevatore: Gli allevatori possono:
Creare e modificare il proprio profilo.
Aggiungere, modificare e rimuovere cuccioli.
Gestire le proprie informazioni di contatto.
Autenticazione: Gli allevatori possono registrarsi e accedere al proprio account per gestire il profilo.
Eliminazione profilo: Possibilità di eliminare il profilo da parte del proprietario.
Sicurezza: Implementazione di autenticazione tramite JWT per proteggere le informazioni degli allevatori.
Tecnologie Utilizzate
Frontend: React, React Bootstrap, CSS.
Backend: Node.js, Express.js, MongoDB.
Autenticazione: JWT (JSON Web Tokens).
Gestione immagini: Multer.
Gestione variabili di ambiente: Dotenv.

START PROJECT
Clona il repository: git clone https://github.com/saicopo/Final-Project-Dog-shop
Installa le dipendenze:
cd frontend && npm install
cd ../backend && npm install
Configura le variabili d'ambiente: Crea un file .env nella directory backend con le variabili necessarie (ad esempio, la stringa di connessione a MongoDB e la chiave segreta JWT).
Avvia il backend: cd backend && npm start
Avvia il frontend: cd ../frontend cd dogshop && npm start
Apri il browser e visita http://localhost:3000 (o la porta specificata).
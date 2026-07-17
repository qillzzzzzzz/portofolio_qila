const express = require('express');

const path = require('path');
const app = express();
const PORT = 3001;

const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the 'public' directory (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// Express routing for every page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/home', (req, res) => {
    res.redirect('/');
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'projects.html'));
});

app.get('/business', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'business.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Handle page not found (custom cute redirect to index)
app.use((req, res) => {
    res.status(404).redirect('/');
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'emailkamu@gmail.com',
                pass: 'APP_PASSWORD' // bukan password biasa!
            }
        });

        await transporter.sendMail({
            from: email,
            to: 'emailkamu@gmail.com',
            subject: `Pesan dari ${name}`,
            text: message
        });

        res.send("Pesan berhasil dikirim 💖");
    } catch (err) {
        console.error(err);
        res.send("Gagal kirim 😢");
    }
});


app.listen(PORT, () => {
    console.log("Server jalan cuy 🚀");
    console.log(`http://localhost:${PORT}`);
});

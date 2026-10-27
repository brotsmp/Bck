const express = require('express');
const cors = require('cors');
const { Rcon } = require('rcon-client');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/rcon', async (req, res) => {
    const { command } = req.body;
    if (!command) return res.status(400).json({ error: 'Kein Befehl angegeben' });

    try {
        // Verbindet sich mit deinem Minekeep Server
        const rcon = await Rcon.connect({
            host: "brotsmp1.minekeep.gg",
            port: 25575, // Falls Minekeep einen anderen RCON-Port hat, hier anpassen
            password: "1944096b2fbc940d796a1f77"
        });

        const response = await rcon.send(command);
        await rcon.end();

        res.json({ response });
    } catch (err) {
        res.status(500).json({ error: 'RCON Fehler: ' + err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy läuft auf Port ${PORT}`));

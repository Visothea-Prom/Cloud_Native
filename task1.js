// Import Server
const e1 = require('express');

// Start The Express Server. 3000 is the port Number
const app =e1();
app.use(e1.json());
app.use(e1.urlencoded({ extended: true }));

let users = [];
//Register API
app.post('/register', (req, res) => {
    const body = req.body || {};
    const { username, password } = body;

    if (!username || !password) {
        return res.status(400).json({ error: 'username and password are required' });
    }

    users.push({
        id: users.length + 1,
        username,
        password
    });

    res.json({
        message: "User registered successfully",
        users
    });
});

//Login API
app.post("/login", (req, res) => {
    const body = req.body || {};
    const { username, password } = body;

    if (!username || !password) {
        return res.status(400).json({ error: 'username and password are required' });
    }

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        res.json({
            message: "Login successful"
        });
    } else {
        res.status(401).json({
            message: "Invalid username or password"
        });
    }
});

// Search API
// Search API
app.get("/search/:username", (req, res) => {

    const username = req.params.username;

    const result = users.find(
        u => u.username === username
    );

    if (result) {
        res.json({
            message: "User found",
            user: {
                id: result.id,
                username: result.username
            }
        });
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
});

// Update API
app.put("/update/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.username = req.body.username || user.username;
    user.password = req.body.password || user.password;

    res.json({
        message: "Profile updated",
        user
    });
});

// Delete API
app.delete("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);

    users = users.filter(u => u.id !== id);

    res.json({
        message: "User deleted successfully"
    });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  next(err);
});

app.listen(3000, () => console.log('EXPRESS Server Started at Port No: 3000'));
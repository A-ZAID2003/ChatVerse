// backend/socket.js
const { Server } = require('socket.io');

const setUpSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('🟢 New User Connected:', socket.id);

        socket.on('userMessage', (message) => {
            console.log(`💬 User (${socket.id}) says:`, message);

            // Send the message to all clients (optional)
            socket.emit('userMessage', { sender: 'user', text: message });

            // Generate and send bot reply
            const botReply = generateBotReply(message);
                console.log(`Bot says: ${botReply}`);
            socket.emit('botReply', botReply);
        });

        socket.on('disconnect', () => {
            console.log('🔴 User disconnected:', socket.id);
        });
    });

    function generateBotReply(userMessage) {
        if (!userMessage || typeof userMessage !== 'string') return "I didn't get that.";
        const msg = userMessage.toLowerCase();

        if (msg.includes('hi') || msg.includes('hello')) return 'Hello! How can I help you?';
        if (msg.includes('help')) return 'Sure! Please tell me what you need help with.';
        if (msg.includes('bye')) return 'Goodbye! Have a great day!';
        
        return "Hmm... I'm not sure how to respond to that.";
    }
};

module.exports = setUpSocket;

// Session management
let sessionId = localStorage.getItem("portfolio-session");
if (!sessionId) {
    sessionId = "portfolio-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("portfolio-session", sessionId);
}

// PWA functionality
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installButton = document.getElementById('installButton');
const installPromptClose = document.getElementById('installPromptClose');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show the install prompt
    installPrompt.classList.add('show');
    
    // Log event for analytics
    console.log('PWA installation available');
});

installButton.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again
    deferredPrompt = null;
    
    // Hide the install prompt
    installPrompt.classList.remove('show');
});

installPromptClose.addEventListener('click', () => {
    installPrompt.classList.remove('show');
});

window.addEventListener('appinstalled', () => {
    // Hide the app-provided install promotion
    installPrompt.classList.remove('show');
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log('PWA was installed');
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
            console.log('SW registered: ', registration);
        }).catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize object detection
    initObjectDetection();
    
    // Initialize project filtering
    initProjectFiltering();
    
    // Initialize puzzle game
    initPuzzleGame();
    
    // Initialize queens game
    initQueensGame();
    
    // Initialize Tic Tac Toe game
    initTicTacToeGame();
    
    // Initialize Memory game
    initMemoryGame();
    
    // Initialize CLI mode
    initCLIMode();
    
    // Initialize game modal
    initGameModal();
    
    // Initialize skill animations
    initSkillAnimations();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // AI Chat functionality
    const chatContainer = document.getElementById('chatContainer');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        try {
            // Check if it's a roast request
            if (message.toLowerCase().includes('roast me') || message.toLowerCase().includes('roast')) {
                // Call RAG endpoint for roast
                const response = await fetch('https://p01--ragkss--qw5xhkblp8hy.code.run/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `Generate a funny roast based on: ${message}`,
                        session_id: sessionId + '-roast'
                    })
                });
                
                const data = await response.json();
                addMessage(data.response, 'bot');
            } else {
                // Regular chat with unique session ID
                const response = await fetch('https://p01--ragkss--qw5xhkblp8hy.code.run/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: message,
                        session_id: sessionId
                    })
                });
                
                const data = await response.json();
                addMessage(data.response, 'bot');
            }
        } catch (error) {
            addMessage("Sorry, I'm having trouble connecting to the AI service. Please try again later.", 'bot');
        }
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.textContent = text;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // New Chat Button
    const newChatBtn = document.createElement('button');
    newChatBtn.textContent = 'New Chat Session';
    newChatBtn.className = 'btn secondary';
    newChatBtn.style.marginTop = '1rem';
    newChatBtn.addEventListener('click', () => {
        // Generate a new session ID
        sessionId = "portfolio-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
        localStorage.setItem("portfolio-session", sessionId);
        
        // Clear chat
        chatContainer.innerHTML = '<div class="chat-message bot-message">🤖 Hello! I\'m an AI assistant powered by Kosisochukwu\'s RAG system. How can I help you today?</div>';
        
        showToast('New chat session started!');
    });
    
    // Add the new chat button to the AI assistant section
    document.querySelector('.chat-input-group').after(newChatBtn);
    
    // Form submission with RAG integration
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Submit to Formspree
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);
            
            try {
                // Send to Formspree
                await fetch('https://formspree.io/f/xqapzbnb', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                // Also send to RAG for personalized response with unique session ID
                const response = await fetch('https://p01--ragkss--qw5xhkblp8hy.code.run/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `You are working in the contact-me part of Kosi's personal website. Generate a personalized response for someone named ${name} who sent this message: ${message}.`,
                        session_id: sessionId + '-contact'
                    })
                });
                
                const data = await response.json();
                
                // Show toast notification with RAG response
                showToast(data.response);
                
                // Reset form
                contactForm.reset();
            } catch (error) {
                showToast("Message sent successfully! I'll get back to you soon.");
                contactForm.reset();
            }
        });
    }
    
    // Show toast notification
    function showToast(message, type = 'default', duration = 5000) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast'; // Reset classes
        
        // Add type class if specified
        if (type !== 'default') {
            toast.classList.add(type);
        }
        
        toast.classList.add('show');
        
        // Hide after duration
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
        
        // Also hide on click
        toast.addEventListener('click', () => {
            toast.classList.remove('show');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animation on scroll
    const fadeElems = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    }, { threshold: 0.1 });
    
    fadeElems.forEach(elem => {
        elem.style.opacity = 0;
        elem.style.transition = 'opacity 0.5s ease-in-out';
        observer.observe(elem);
    });
    
    // Mobile menu functionality
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        // const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                navLinks.classList.toggle('active');
                mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
                    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });
            
            // Close menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        }
    }
    
    // Project filtering
    function initProjectFiltering() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const projectCards = document.querySelectorAll('.project-card');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const category = button.getAttribute('data-category');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Initialize skill animations
    function initSkillAnimations() {
        const skillProgresses = document.querySelectorAll('.skill-progress');
        
        skillProgresses.forEach(progress => {
            const level = progress.getAttribute('data-level');
            progress.style.width = `${level}%`;
        });
    }
    
    // Game Modal
    function initGameModal() {
        const playGameBtn = document.getElementById('playGameBtn');
        const gameModal = document.getElementById('gameModal');
        const closeModal = document.querySelector('.close');
        const gameOptions = document.querySelectorAll('.game-option');
        
        playGameBtn.addEventListener('click', () => {
            gameModal.style.display = 'block';
        });
        
        closeModal.addEventListener('click', () => {
            gameModal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === gameModal) {
                gameModal.style.display = 'none';
            }
        });
        
        gameOptions.forEach(option => {
            option.addEventListener('click', () => {
                const gameType = option.getAttribute('data-game');
                gameModal.style.display = 'none';
                
                // Hide all game sections
                document.querySelectorAll('.game-section').forEach(section => {
                    section.classList.add('hidden');
                });
                
                // Show selected game
                if (gameType === 'puzzle') {
                    document.getElementById('puzzleGameSection').classList.remove('hidden');
                    document.getElementById('puzzleGameSection').scrollIntoView({ behavior: 'smooth' });
                } else if (gameType === 'queens') {
                    document.getElementById('queensGameSection').classList.remove('hidden');
                    document.getElementById('queensGameSection').scrollIntoView({ behavior: 'smooth' });
                } else if (gameType === 'tictactoe') {
                    document.getElementById('tictactoeGameSection').classList.remove('hidden');
                    document.getElementById('tictactoeGameSection').scrollIntoView({ behavior: 'smooth' });
                } else if (gameType === 'memory') {
                    document.getElementById('memoryGameSection').classList.remove('hidden');
                    document.getElementById('memoryGameSection').scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // Object Detection Code
    function initObjectDetection() {
        let net;
        let isDetecting = false;
        let frameCount = 0;
        let lastUpdate = Date.now();
        
        async function loadObjectDetection() {
            try {
                net = await cocoSsd.load();
                console.log('AI Model loaded successfully');
            } catch (error) {
                console.error('Error loading model:', error);
                showToast('Error loading AI model. Please try refreshing the page.');
            }
        }
        
        function updateFPS() {
            const now = Date.now();
            const fps = (frameCount * 1000) / (now - lastUpdate);
            document.getElementById('fpsCounter').textContent = `${fps.toFixed(1)} FPS`;
            frameCount = 0;
            lastUpdate = now;
        }
        
        async function detectFrame(video, canvas) {
            if (!isDetecting) return;
            
            try {
                frameCount++;
                const predictions = await net.detect(video);
                const ctx = canvas.getContext('2d');
                const minConfidence = parseFloat(document.getElementById('confidenceSlider').value);
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
                ctx.restore();
                
                predictions.forEach(prediction => {
                    if (prediction.score < minConfidence) return;
                    
                    const allowedClasses = Array.from(document.querySelectorAll('.class-filter:checked'))
                        .map(checkbox => checkbox.value);
                    if (!allowedClasses.includes(prediction.class)) return;
                    
                    const mirroredX = canvas.width - prediction.bbox[0] - prediction.bbox[2];
                    const y = prediction.bbox[1];
                    const width = prediction.bbox[2];
                    const height = prediction.bbox[3];
                    
                    // Draw bounding box
                    ctx.strokeStyle = '#39FF14';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(mirroredX, y, width, height);
                    
                    // Draw label
                    ctx.fillStyle = '#1A1A1A';
                    ctx.fillRect(mirroredX, y - 20, ctx.measureText(prediction.class).width + 10, 20);
                    ctx.fillStyle = '#39FF14';
                    ctx.font = '16px monospace';
                    ctx.fillText(
                        `${prediction.class} ${(prediction.score * 100).toFixed(1)}%`,
                        mirroredX + 5,
                        y - 5
                    );
                });
                
                if (Date.now() - lastUpdate > 1000) updateFPS();
                requestAnimationFrame(() => detectFrame(video, canvas));
            } catch (error) {
                console.error('Detection error:', error);
                stopDetection();
            }
        }
        
        async function startDetection() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: "environment" } 
                });
                const video = document.getElementById('webcam');
                const canvas = document.getElementById('output');
                
                video.srcObject = stream;
                
                video.onloadedmetadata = () => {
                    video.play();
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    isDetecting = true;
                    detectFrame(video, canvas);
                    document.getElementById('startButton').style.display = 'none';
                    document.getElementById('stopButton').style.display = 'inline-block';
                };
            } catch (error) {
                console.error('Webcam error:', error);
                showToast('Error accessing webcam. Please enable camera permissions.');
            }
        }
        
        function stopDetection() {
            isDetecting = false;
            const stream = document.getElementById('webcam').srcObject;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            document.getElementById('startButton').style.display = 'inline-block';
            document.getElementById('stopButton').style.display = 'none';
        }
        
        // Initialize object detection
        loadObjectDetection();
        
        // Event listeners
        document.getElementById('startButton').addEventListener('click', startDetection);
        document.getElementById('stopButton').addEventListener('click', stopDetection);
        
        document.getElementById('confidenceSlider').addEventListener('input', (e) => {
            document.getElementById('confidenceValue').textContent = 
                `${Math.round(e.target.value * 100)}%`;
        });
    }
    
    // Puzzle Game
    function initPuzzleGame() {
        const puzzleBoard = document.getElementById('puzzleBoard');
        const moveCounter = document.getElementById('moveCounter');
        const timer = document.getElementById('timer');
        const newGameBtn = document.getElementById('newGameBtn');
        const undoMoveBtn = document.getElementById('undoMoveBtn');
        const checkSolutionBtn = document.getElementById('checkSolutionBtn');
        const solvePuzzleBtn = document.getElementById('solvePuzzleBtn');
        
        let moves = 0;
        let time = 0;
        let timerInterval;
        let tiles = [];
        let emptyIndex = 15;
        let moveHistory = [];
        
        // Initialize the puzzle
        function initPuzzle() {
            // Clear the board
            puzzleBoard.innerHTML = '';
            moves = 0;
            time = 0;
            moveCounter.textContent = 'Moves: 0';
            timer.textContent = 'Time: 00:00';
            moveHistory = [];
            
            // Clear any existing timer
            if (timerInterval) clearInterval(timerInterval);
            
            // Create tiles
            tiles = Array.from({length: 15}, (_, i) => i + 1);
            tiles.push(null); // Empty space
            
            // Shuffle tiles
            shuffleTiles();
            
            // Render tiles
            renderTiles();
        }
        
        // Shuffle tiles
        function shuffleTiles() {
            for (let i = tiles.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
            }
            
            // Find the empty index
            emptyIndex = tiles.indexOf(null);
        }
        
        // Render tiles on the board
        function renderTiles() {
            tiles.forEach((tile, index) => {
                const cell = document.createElement('div');
                cell.className = 'game-cell';
                if (tile === null) {
                    cell.classList.add('empty');
                } else {
                    cell.textContent = tile;
                    cell.addEventListener('click', () => moveTile(index));
                }
                puzzleBoard.appendChild(cell);
            });
        }
        
        // Move a tile
        function moveTile(index) {
            // Check if the tile can move (adjacent to empty space)
            const adjacentIndexes = [
                emptyIndex - 1, // left
                emptyIndex + 1, // right
                emptyIndex - 4, // up
                emptyIndex + 4  // down
            ];
            
            if (adjacentIndexes.includes(index)) {
                // Save current state for undo
                moveHistory.push([...tiles]);
                
                // Swap tiles
                [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
                emptyIndex = index;
                
                // Update moves
                moves++;
                moveCounter.textContent = `Moves: ${moves}`;
                
                // Start timer on first move
                if (moves === 1) {
                    startTimer();
                }
                
                // Re-render board
                puzzleBoard.innerHTML = '';
                renderTiles();
                
                // Check if puzzle is solved
                if (isPuzzleSolved()) {
                    clearInterval(timerInterval);
                    showToast('Congratulations! You solved the puzzle! Send a screenshot to claim your reward.');
                }
            }
        }
        
        // Undo last move
        function undoMove() {
            if (moveHistory.length > 0) {
                tiles = moveHistory.pop();
                emptyIndex = tiles.indexOf(null);
                moves--;
                moveCounter.textContent = `Moves: ${moves}`;
                
                // Re-render board
                puzzleBoard.innerHTML = '';
                renderTiles();
            }
        }
        
        // Check solution
        function checkSolution() {
            if (isPuzzleSolved()) {
                showToast('Congratulations! The puzzle is solved correctly!');
            } else {
                showToast('Not quite right yet. Keep trying!');
            }
        }
        
        // Start timer
        function startTimer() {
            timerInterval = setInterval(() => {
                time++;
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                timer.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }
        
        // Check if puzzle is solved
        function isPuzzleSolved() {
            for (let i = 0; i < tiles.length - 1; i++) {
                if (tiles[i] !== i + 1) return false;
            }
            return true;
        }
        
        // Solve the puzzle (for demonstration)
        function solvePuzzle() {
            clearInterval(timerInterval);
            tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];
            emptyIndex = 15;
            puzzleBoard.innerHTML = '';
            renderTiles();
            moves = 0;
            moveCounter.textContent = 'Moves: 0';
            time = 0;
            timer.textContent = 'Time: 00:00';
            moveHistory = [];
            showToast('Puzzle solved! Try to solve it yourself next time!');
        }
        
        // Event listeners
        newGameBtn.addEventListener('click', initPuzzle);
        undoMoveBtn.addEventListener('click', undoMove);
        checkSolutionBtn.addEventListener('click', checkSolution);
        solvePuzzleBtn.addEventListener('click', solvePuzzle);
        
        // Initialize the puzzle
        initPuzzle();
    }
    
    // Queens Game
    function initQueensGame() {
        const queensBoard = document.getElementById('queensBoard');
        const queensCounter = document.getElementById('queensCounter');
        const newQueensGameBtn = document.getElementById('newQueensGameBtn');
        const checkQueensSolutionBtn = document.getElementById('checkQueensSolutionBtn');
        const solveQueensBtn = document.getElementById('solveQueensBtn');
        const boardSizeSelect = document.getElementById('boardSize');
        
        let boardSize = 8;
        let queens = [];
        let board = [];
        
        // Initialize the queens game
        function initQueensGame() {
            boardSize = parseInt(boardSizeSelect.value);
            queens = [];
            board = Array(boardSize).fill().map(() => Array(boardSize).fill(false));
            
            // Update counter
            queensCounter.textContent = `Queens placed: 0/${boardSize}`;
            
            // Render board
            renderQueensBoard();
        }
        
        // Render queens board
        function renderQueensBoard() {
            queensBoard.innerHTML = '';
            queensBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
            
            for (let row = 0; row < boardSize; row++) {
                for (let col = 0; col < boardSize; col++) {
                    const cell = document.createElement('div');
                    cell.className = `queens-cell ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                    cell.dataset.row = row;
                    cell.dataset.col = col;
                    
                    // Add queen if present
                    if (board[row][col]) {
                        cell.classList.add('has-queen');
                    }
                    
                    // Check if cell is threatened
                    if (isThreatened(row, col) && !board[row][col]) {
                        cell.classList.add('threatened');
                    }
                    
                    // Show valid placement indicator
                    if (!board[row][col] && !isThreatened(row, col) && queens.length < boardSize) {
                        cell.classList.add('valid');
                    }
                    
                    cell.addEventListener('click', () => toggleQueen(row, col));
                    queensBoard.appendChild(cell);
                }
            }
        }
        
        // Toggle queen placement
        function toggleQueen(row, col) {
            if (board[row][col]) {
                // Remove queen
                board[row][col] = false;
                queens = queens.filter(q => !(q.row === row && q.col === col));
            } else {
                // Check if placement is valid
                if (isThreatened(row, col)) {
                    showToast('Cannot place queen in a threatened position!');
                    return;
                }
                
                // Add queen
                board[row][col] = true;
                queens.push({ row, col });
            }
            
            // Update counter
            queensCounter.textContent = `Queens placed: ${queens.length}/${boardSize}`;
            
            // Re-render board
            renderQueensBoard();
        }
        
        // Check if a cell is threatened
        function isThreatened(row, col) {
            for (const queen of queens) {
                // Same row
                if (queen.row === row && queen.col !== col) return true;
                
                // Same column
                if (queen.col === col && queen.row !== row) return true;
                
                // Same diagonal
                if (Math.abs(queen.row - row) === Math.abs(queen.col - col)) return true;
            }
            
            return false;
        }
        
        // Check solution
        function checkQueensSolution() {
            if (queens.length !== boardSize) {
                showToast(`You need to place ${boardSize} queens on the board.`);
                return;
            }
            
            for (const queen of queens) {
                if (isThreatened(queen.row, queen.col)) {
                    showToast('The queens are attacking each other! Try again.');
                    return;
                }
            }
            
            showToast('Congratulations! You solved the N-Queens problem!');
        }
        
        // Solve the queens problem (simple backtracking algorithm)
        function solveQueens() {
            // Clear current board
            queens = [];
            board = Array(boardSize).fill().map(() => Array(boardSize).fill(false));
            
            // Solve using backtracking
            solveQueensRecursive(0);
            
            // Update counter
            queensCounter.textContent = `Queens placed: ${queens.length}/${boardSize}`;
            
            // Re-render board
            renderQueensBoard();
            
            showToast('Puzzle solved! The queens are placed without attacking each other.');
        }
        
        function solveQueensRecursive(col) {
            if (col >= boardSize) return true;
            
            for (let row = 0; row < boardSize; row++) {
                if (isSafe(row, col)) {
                    board[row][col] = true;
                    queens.push({ row, col });
                    
                    if (solveQueensRecursive(col + 1)) return true;
                    
                    board[row][col] = false;
                    queens.pop();
                }
            }
            
            return false;
        }
        
        function isSafe(row, col) {
            // Check row
            for (let i = 0; i < col; i++) {
                if (board[row][i]) return false;
            }
            
            // Check upper diagonal
            for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
                if (board[i][j]) return false;
            }
            
            // Check lower diagonal
            for (let i = row, j = col; i < boardSize && j >= 0; i++, j--) {
                if (board[i][j]) return false;
            }
            
            return true;
        }
        
        // Event listeners
        newQueensGameBtn.addEventListener('click', initQueensGame);
        checkQueensSolutionBtn.addEventListener('click', checkQueensSolution);
        solveQueensBtn.addEventListener('click', solveQueens);
        boardSizeSelect.addEventListener('change', initQueensGame);
        
        // Initialize the queens game
        initQueensGame();
    }
    
    // Tic Tac Toe Game
    // Unbeatable Tic-Tac-Toe AI using Minimax algorithm
    function initTicTacToeGame() {
        const tictactoeBoard = document.getElementById('tictactoeBoard');
        const gameStatus = document.getElementById('gameStatus');
        const newTicTacToeGameBtn = document.getElementById('newTicTacToeGameBtn');
        
        let currentPlayer = 'X';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;
        const humanPlayer = 'X';
        const aiPlayer = 'O';
        
        // Winning combinations
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        // Initialize the Tic Tac Toe game
        function initTicTacToe() {
            currentPlayer = 'X';
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            gameStatus.textContent = 'Your turn (X)';
            
            // Render board
            renderTicTacToeBoard();
        }
        
        // Render Tic Tac Toe board
        function renderTicTacToeBoard() {
            tictactoeBoard.innerHTML = '';
            
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.className = 'ttt-cell';
                cell.dataset.index = i;
                
                if (gameBoard[i] === 'X') {
                    cell.textContent = 'X';
                    cell.classList.add('x');
                } else if (gameBoard[i] === 'O') {
                    cell.textContent = 'O';
                    cell.classList.add('o');
                }
                
                cell.addEventListener('click', () => handleCellClick(i));
                tictactoeBoard.appendChild(cell);
            }
        }
        
        // Handle cell click
        function handleCellClick(index) {
            if (gameBoard[index] !== '' || !gameActive || currentPlayer !== humanPlayer) return;
            
            // Player's move
            makeMove(index, humanPlayer);
            
            // Check for win or draw
            if (checkWin(humanPlayer)) {
                gameStatus.textContent = 'You win!';
                gameActive = false;
                highlightWinningCells(humanPlayer);
                showToast('Congratulations! You won!');
                return;
            }
            
            if (checkDraw()) {
                gameStatus.textContent = 'Game ended in a draw!';
                gameActive = false;
                showToast('The game ended in a draw!');
                return;
            }
            
            // Switch to AI's turn
            currentPlayer = aiPlayer;
            gameStatus.textContent = "Computer's turn (O)";
            
            // AI's move (after a short delay)
            setTimeout(makeAiMove, 500);
        }
        
        // Make a move
        function makeMove(index, player) {
            gameBoard[index] = player;
            renderTicTacToeBoard();
        }
        
        // AI move using minimax algorithm
        function makeAiMove() {
            if (!gameActive) return;
            
            const bestMove = getBestMove();
            makeMove(bestMove, aiPlayer);
            
            // Check for win or draw
            if (checkWin(aiPlayer)) {
                gameStatus.textContent = 'Computer wins!';
                gameActive = false;
                highlightWinningCells(aiPlayer);
                showToast('Computer wins! Better luck next time!');
                return;
            }
            
            if (checkDraw()) {
                gameStatus.textContent = 'Game ended in a draw!';
                gameActive = false;
                showToast('The game ended in a draw!');
                return;
            }
            
            // Switch back to player's turn
            currentPlayer = humanPlayer;
            gameStatus.textContent = 'Your turn (X)';
        }
        
        // Get the best move using minimax algorithm
        function getBestMove() {
            // Easy mode - just pick a random move
            // return getRandomMove();
            
            // Unbeatable mode - use minimax algorithm
            let bestScore = -Infinity;
            let bestMove;
            
            for (let i = 0; i < 9; i++) {
                if (gameBoard[i] === '') {
                    gameBoard[i] = aiPlayer;
                    let score = minimax(gameBoard, 0, false);
                    gameBoard[i] = '';
                    
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = i;
                    }
                }
            }
            
            return bestMove;
        }
        
        // Minimax algorithm
        function minimax(board, depth, isMaximizing) {
            // Check for terminal states
            if (checkWin(aiPlayer)) return 10 - depth;
            if (checkWin(humanPlayer)) return depth - 10;
            if (checkDraw()) return 0;
            
            if (isMaximizing) {
                let bestScore = -Infinity;
                
                for (let i = 0; i < 9; i++) {
                    if (board[i] === '') {
                        board[i] = aiPlayer;
                        let score = minimax(board, depth + 1, false);
                        board[i] = '';
                        bestScore = Math.max(score, bestScore);
                    }
                }
                
                return bestScore;
            } else {
                let bestScore = Infinity;
                
                for (let i = 0; i < 9; i++) {
                    if (board[i] === '') {
                        board[i] = humanPlayer;
                        let score = minimax(board, depth + 1, true);
                        board[i] = '';
                        bestScore = Math.min(score, bestScore);
                    }
                }
                
                return bestScore;
            }
        }
        
        // Get a random move (for easy mode)
        function getRandomMove() {
            let availableSpots = [];
            for (let i = 0; i < 9; i++) {
                if (gameBoard[i] === '') {
                    availableSpots.push(i);
                }
            }
            
            return availableSpots[Math.floor(Math.random() * availableSpots.length)];
        }
        
        // Check for win
        function checkWin(player) {
            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
                    return true;
                }
            }
            
            return false;
        }
        
        // Check for draw
        function checkDraw() {
            return !gameBoard.includes('');
        }
        
        // Highlight winning cells
        function highlightWinningCells(player) {
            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
                    document.querySelector(`.ttt-cell[data-index="${a}"]`).classList.add('winning-cell');
                    document.querySelector(`.ttt-cell[data-index="${b}"]`).classList.add('winning-cell');
                    document.querySelector(`.ttt-cell[data-index="${c}"]`).classList.add('winning-cell');
                    break;
                }
            }
        }
        
        // Event listeners
        newTicTacToeGameBtn.addEventListener('click', initTicTacToe);
        
        // Initialize the Tic Tac Toe game
        initTicTacToe();
    }
    
    // Memory Game
    function initMemoryGame() {
        const memoryBoard = document.getElementById('memoryBoard');
        const movesCounter = document.getElementById('movesCounter');
        const pairsCounter = document.getElementById('pairsCounter');
        const newMemoryGameBtn = document.getElementById('newMemoryGameBtn');
        
        let cards = [];
        let flippedCards = [];
        let matchedPairs = 0;
        let moves = 0;
        let lockBoard = false;
        
        // Initialize the Memory game
        function initMemoryGame() {
            cards = [];
            flippedCards = [];
            matchedPairs = 0;
            moves = 0;
            lockBoard = false;
            
            movesCounter.textContent = 'Moves: 0';
            pairsCounter.textContent = 'Pairs found: 0/8';
            
            // Create cards with pairs
            const symbols = ['🍕', '🍔', '🍎', '🍉', '🍇', '🍓', '🍦', '🍩'];
            cards = [...symbols, ...symbols];
            
            // Shuffle cards
            shuffleCards();
            
            // Render board
            renderMemoryBoard();
        }
        
        // Shuffle cards
        function shuffleCards() {
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
            }
        }
        
        // Render Memory board
        function renderMemoryBoard() {
            memoryBoard.innerHTML = '';
            
            cards.forEach((symbol, index) => {
                const card = document.createElement('div');
                card.className = 'memory-card';
                card.dataset.index = index;
                
                const cardInner = document.createElement('div');
                cardInner.className = 'memory-card-inner';
                
                const cardFront = document.createElement('div');
                cardFront.className = 'memory-card-front';
                
                const cardBack = document.createElement('div');
                cardBack.className = 'memory-card-back';
                cardBack.textContent = symbol;
                
                cardInner.appendChild(cardFront);
                cardInner.appendChild(cardBack);
                card.appendChild(cardInner);
                
                card.addEventListener('click', () => flipCard(card, index));
                memoryBoard.appendChild(card);
            });
        }
        
        // Flip card
        function flipCard(card, index) {
            if (lockBoard || card.classList.contains('flipped') || flippedCards.length === 2) return;
            
            card.classList.add('flipped');
            flippedCards.push({ card, index });
            
            if (flippedCards.length === 2) {
                lockBoard = true;
                moves++;
                movesCounter.textContent = `Moves: ${moves}`;
                
                checkForMatch();
            }
        }
        
        // Check for match
        function checkForMatch() {
            const [firstCard, secondCard] = flippedCards;
            
            if (cards[firstCard.index] === cards[secondCard.index]) {
                // Match found
                matchedPairs++;
                pairsCounter.textContent = `Pairs found: ${matchedPairs}/8`;
                
                flippedCards = [];
                lockBoard = false;
                
                // Check if game is complete
                if (matchedPairs === 8) {
                    showToast(`Congratulations! You completed the game in ${moves} moves!`);
                }
            } else {
                // No match
                setTimeout(() => {
                    firstCard.card.classList.remove('flipped');
                    secondCard.card.classList.remove('flipped');
                    flippedCards = [];
                    lockBoard = false;
                }, 1000);
            }
        }
        
        // Event listeners
        newMemoryGameBtn.addEventListener('click', initMemoryGame);
        
        // Initialize the Memory game
        initMemoryGame();
    }
    
    // CLI Mode
    function initCLIMode() {
        const modeToggle = document.getElementById('modeToggle');
        const cliMode = document.getElementById('cliMode');
        const cliInput = document.getElementById('cliInput');
        const cliContent = document.getElementById('cliContent');
        
        // Toggle CLI mode
        modeToggle.addEventListener('click', () => {
            if (cliMode.style.display === 'block') {
                cliMode.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else {
                cliMode.style.display = 'block';
                document.body.style.overflow = 'hidden';
                cliInput.focus();
            }
        });
        
        // CLI commands
        const commands = {
            help: () => {
                addCLIOutput('Available commands:');
                addCLIOutput('  help - Show this help message');
                addCLIOutput('  about - Learn about Kosisochukwu');
                addCLIOutput('  projects - List all projects');
                addCLIOutput('  skills - View technical skills');
                addCLIOutput('  contact - Get contact information');
                addCLIOutput('  game - Play the puzzle game');
                addCLIOutput('  clear - Clear the terminal');
                addCLIOutput('  exit - Exit CLI mode');
            },
            about: () => {
                addCLIOutput('Kosisochukwu Okafor - AI/ML Engineer & Software Developer');
                addCLIOutput('4th year Software Engineering student at Federal University of Technology Owerri');
                addCLIOutput('Passionate about AI, RAG systems, and building innovative solutions');
            },
            projects: () => {
                addCLIOutput('Projects:');
                addCLIOutput('  • Real-Time Object Detection - AI/ML, Web');
                addCLIOutput('  • MYRAGAGENT - AI, RAG, Python');
                addCLIOutput('  • AI Copilot Agent - AI, FastAPI, Python');
                addCLIOutput('  • Vybe Analytics Telegram Bot - Telegram, API, Python');
                addCLIOutput('  • FPS Gamers Event Website - Web, API, JavaScript');
                addCLIOutput('  • And many more... (type "projects --all" for full list)');
            },
            skills: () => {
                addCLIOutput('Skills:');
                addCLIOutput('  • AI/ML: RAG Systems, Neural Networks, NLP, TensorFlow, PyTorch');
                addCLIOutput('  • Development: Python, JavaScript, FastAPI, Flask, React, Vue.js');
                addCLIOutput('  • DevOps & Cloud: AWS, Docker, CI/CD, Render, Git');
            },
            contact: () => {
                addCLIOutput('Contact Information:');
                addCLIOutput('  • Email: kookafor893@gmail.com');
                addCLIOutput('  • Phone: +234 901 954 9473');
                addCLIOutput('  • GitHub: github.com/Ksschkw');
                addCLIOutput('  • WhatsApp: wa.me/2349019549473');
            },
            game: () => {
                addCLIOutput('Opening game modal...');
                setTimeout(() => {
                    document.getElementById('playGameBtn').click();
                }, 500);
            },
            clear: () => {
                cliContent.innerHTML = '';
            },
            exit: () => {
                cliMode.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        };
        
        // Handle CLI input
        cliInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = cliInput.value.trim().toLowerCase();
                cliInput.value = '';
                
                addCLIOutput(`> ${command}`, 'command');
                
                if (commands[command]) {
                    commands[command]();
                } else if (command) {
                    addCLIOutput(`Command not found: ${command}. Type 'help' for available commands.`);
                }
                
                cliContent.scrollTop = cliContent.scrollHeight;
            }
        });
        
        // Add output to CLI
        function addCLIOutput(text, type = 'output') {
            const outputDiv = document.createElement('div');
            outputDiv.className = `cli-${type}`;
            outputDiv.textContent = text;
            cliContent.appendChild(outputDiv);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const playGameBtn = document.getElementById('playGameBtn');
    const gameModal = document.getElementById('gameModal');
    const closeModal = document.querySelector('.close');
    const gameOptions = document.querySelectorAll('.game-option');
    
    // Open modal when button is clicked
    playGameBtn.addEventListener('click', () => {
        gameModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', () => {
        gameModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === gameModal) {
            gameModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle game selection
    gameOptions.forEach(option => {
        option.addEventListener('click', () => {
            const gameType = option.getAttribute('data-game');
            gameModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Here you would handle the game selection
            showToast(`You selected ${gameType} game!`);
        });
    });
    
    // Add keyboard escape functionality
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gameModal.style.display === 'block') {
            gameModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// AI Assistant Icon
const aiAssistantIcon = document.getElementById('ai-assistant-icon');
if (aiAssistantIcon) {
  aiAssistantIcon.addEventListener('click', () => {
    document.getElementById('ai-assistant').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });
}
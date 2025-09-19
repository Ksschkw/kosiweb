// Session management
let sessionId = localStorage.getItem("portfolio-session");
if (!sessionId) {
    sessionId = "portfolio-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("portfolio-session", sessionId);
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
    
    // Initialize CLI mode
    initCLIMode();
    
    // Initialize game modal
    initGameModal();
    
    // Initialize skill animations
    initSkillAnimations();
    
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
    
    // New Chat Button (if you want to add one)
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
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
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
                    cell.className = 'queens-cell';
                    cell.dataset.row = row;
                    cell.dataset.col = col;
                    
                    // Alternate cell colors
                    if ((row + col) % 2 === 0) {
                        cell.style.backgroundColor = 'var(--terminal-bg)';
                    }
                    
                    // Add queen if present
                    if (board[row][col]) {
                        cell.classList.add('has-queen');
                    }
                    
                    // Check if cell is threatened
                    if (isThreatened(row, col) && !board[row][col]) {
                        cell.classList.add('threatened');
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
let score = 0;
function displayScore() {
    const context = canvas.getContext('2d');
    context.font = '20px Arial';
    context.fillStyle = 'black';
    context.fillText('Score: ' + score, 10, 30);
}
Matter.Events.on(engine, 'collisionStart', function(event) {
    const pairs = event.pairs;
    pairs.forEach(pair => {
        if (pair.bodyA === bird || pair.bodyB === bird) {
            score += 10; // Increase score by 10 for each hit
        }
    });
});
const birdImage = new Image();
birdImage.src = "C:\Users\admi\OneDrive\Pictures\Angry bird.png"; // Replace with your image path

const obstacleImage = new Image();
obstacleImage.src = "C:\Users\admi\OneDrive\Desktop\box.png"; // Replace with your image path
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    Render.world(render);
    
    // Draw the bird
    context.drawImage(birdImage, bird.position.x - 20, bird.position.y - 20, 40, 40); // Adjust size and position as needed

    // Draw obstacles
    obstacles.forEach(obstacle => {
        context.drawImage(obstacleImage, obstacle.position.x - 25, obstacle.position.y - 25, 50, 50); // Adjust size and position
    });

    displayScore(); // Call to display the score
}
const { Engine, Render, World, Bodies, Mouse, MouseConstraint } = Matter;

// Create engine and renderer
const engine = Engine.create();
const canvas = document.getElementById('gameCanvas');
const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false
    }
});

// Create ground
const ground = Bodies.rectangle(400, 590, 810, 60, { isStatic: true });
World.add(engine.world, ground);

// Create a bird
const bird = Bodies.circle(150, 450, 20, { restitution: 0.5 });
World.add(engine.world, bird);

// Create obstacles
const obstacle1 = Bodies.rectangle(600, 550, 50, 50);
const obstacle2 = Bodies.rectangle(650, 500, 50, 50);
World.add(engine.world, [obstacle1, obstacle2]);

// Mouse control
const mouse = Mouse.create(canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});
World.add(engine.world, mouseConstraint);

// Launching Mechanism
let isDragging = false;

canvas.addEventListener('mousedown', (event) => {
    isDragging = true;
});

canvas.addEventListener('mouseup', (event) => {
    isDragging = false;
    // Add logic to launch the bird
    const force = { x: 0.05 * (canvas.width - event.clientX), y: -0.05 * (canvas.height - event.clientY) };
    Matter.Body.applyForce(bird, bird.position, force);
});

// ... (Your existing code from Step 3)

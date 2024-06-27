<h1>TicTacToe Multiplayer</h1>

<ul>
    <li>A scalable TicTacToe game that allows multiple users to play simultaneously.</li>
    <li><strong>Front-End Technologies:</strong> HTML, CSS</li>
    <li><strong>Back-End Technologies:</strong> JavaScript, React.js, Node.js</li>
    <li>Utilizes the Socket.io module for real-time, two-way communication between the client and server.</li>
    <li>The front end includes a button to start the game, which triggers a pop-up form for entering your name, and a user-friendly interface for gameplay.</li>
    <li>HTML is used to structure the application.</li>
    <li>CSS is used for styling the application.</li>
    <li>Client-side JavaScript is employed to interact with DOM elements during the game.</li>
    <li>All DOM elements are stored in respective JavaScript variables.</li>
    <li>Whenever a new user tries to join, the server checks for any available players online. If an available player is found, the server connects them; otherwise, it displays "Waiting for an opponent."</li>
    <li>Server-side JavaScript handles Socket.io connections.</li>
</ul>

# Process to run the app
<ol>
  <li> Navigate to the TicTacToe-Client directory.</li>
  <li> Run the command: <b>npm run dev</b></li>
  <li> Copy the localhost link that appears in the terminal and paste it into your browser. </li>
  <li> Return to the main directory, <b>TicTacToe-Multiplayer</b>.</li>
  <li> Navigate to the <b>TicTacToe-Server</b> directory.</li>
  <li> Run the command: <b>nodemon server.js.</b></li>
  <li> You can now play the game.</li>
</ol>

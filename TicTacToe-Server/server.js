// import { createServer } from "http";
// import { Server } from "socket.io";


// const { log } = require("console");
// const { createServer } = require("http");
// const { disconnect } = require("process");
// const { Server } = require("socket.io");

// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: "http://localhost:5174/",
// });

// const allUsers = {};

// io.on("connection", (socket) => {
//   allUsers[socket.id] = {
//     socket: socket,
//     online: true,
//   };

//   // allUsers.push();

//   socket.on("request_to_play", (data) => {
//     const currentUser = allUsers[socket.id];
//     currentUser.PlayerName = data.PlayerName;

//     let opponentPlayer;

//     for (const key in allUsers) {
//       const user = allUsers[key];
//       if (user.online && !user.playing && socket.id !== key) {
//         opponentPlayer = user;
//         break;
//       }
//     }

//     console.log(opponentPlayer);

//     if (opponentPlayer) {
//       opponentPlayer.socket.emit("Opponent Found", {
//         opponentName: currentUser.PlayerName,
//       });

//       currentUser.socket.emit("Opponent Found", {
//         opponentName: opponentPlayer.PlayerName,
//       });
//     } else {
//       currentUser.socket.emit("Opponent Not Found");
//     }
//   });

//   socket.on("disconnect", function () {
//     const currentUser = allUsers[socket.id];
//     currentUser.online = false; 
//   });
// });

// httpServer.listen(3000);


const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: "http://localhost:5174/",
});

const allUsers = {};
const allRooms = [];

io.on("connection", (socket) => {
  allUsers[socket.id] = {
    socket: socket,
    online: true,
  };

  socket.on("request_to_play", (data) => {
    const currentUser = allUsers[socket.id];
    currentUser.playerName = data.playerName;

    let opponentPlayer;

    for (const key in allUsers) {
      const user = allUsers[key];
      if (user.online && !user.playing && socket.id !== key) {
        opponentPlayer = user;
        break;
      }
    }

    if (opponentPlayer) {
      allRooms.push({
        player1: opponentPlayer,
        player2: currentUser,
      });

      currentUser.socket.emit("OpponentFound", {
        opponentName: opponentPlayer.playerName,
        playingAs: "circle",
      });

      opponentPlayer.socket.emit("OpponentFound", {
        opponentName: currentUser.playerName,
        playingAs: "cross",
      });

      currentUser.socket.on("playerMoveFromClient", (data) => {
        opponentPlayer.socket.emit("playerMoveFromServer", {
          ...data,
        });
      });

      opponentPlayer.socket.on("playerMoveFromClient", (data) => {
        currentUser.socket.emit("playerMoveFromServer", {
          ...data,
        });
      });
    } else {
      currentUser.socket.emit("OpponentNotFound");
    }
  });

  socket.on("disconnect", function () {
    const currentUser = allUsers[socket.id];
    currentUser.online = false;
    currentUser.playing = false;

    for (let index = 0; index < allRooms.length; index++) {
      const { player1, player2 } = allRooms[index];

      if (player1.socket.id === socket.id) {
        player2.socket.emit("opponentLeftMatch");
        break;
      }

      if (player2.socket.id === socket.id) {
        player1.socket.emit("opponentLeftMatch");
        break;
      }
    }
  });
});

httpServer.listen(3000);
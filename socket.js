// in mysocket.js
module.exports = (io) => {
   // console.log('IO: ', io);
    io.on('connect', socket => {
      socket.on('news', (message,userInfo) => {
                 console.log(userInfo);
                 console.log(message);
         
               io.emit('message', {type:'new-message', text: message});   
             });
    });

    // put any other code that wants to use the io variable
    // in here


};
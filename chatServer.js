var message = require('./models/messages');

module.exports = function(io) {
    io.on('connection', function(socket){
        socket.on('join-room', function (data) {
            if (-1 < data.indexOf('_')) {
                var found = false;
                for (var Socket in io.sockets.sockets) {
                    if (io.sockets.sockets[Socket].rooms[data]) {
                        socket.join(data);
                        found = true;
                    }
                }
                if (false === found) {
                    socket.join(data.split('_')[1] + '_' + data.split('_')[0]);
                }
            } else {
                socket.join(data);
            }
        });
        socket.on('group-message', function (data) {
            var newMessage = new message(
                {
                    room: data.room,
                    payload: data.payload,
                    sender: data.sender,
                    likes: [],
                    unlkes: [],
                    date: new Date()
                }
            )
            newMessage.save().then(
                function (NewMessage) {
                    io.to(data.room).emit('group-message', NewMessage.toObject());
                }
            );
        });

        socket.on('private-message', function (data) {
            for (var room in socket.rooms) {
                var currentChatRoom = socket.rooms[room];
                if (data.sender + '_' + data.with === currentChatRoom || data.with + '_' + data.sender === currentChatRoom) {
                    var newMessage = new message(
                        {
                            room: currentChatRoom,
                            payload: data.payload,
                            sender: data.sender,
                            likes: [],
                            unlkes: [],
                            date: new Date()
                        }
                    )
                    newMessage.save().then(
                        function (NewMessage) {
                            io.to(NewMessage.room).emit('private-message', {sender: data.sender, payload: data.payload});
                        }
                    );
                }
            }
        });

        socket.on('whats-my-private-room', function (data) {
            for (var room in socket.rooms) {
                var currentChatRoom = socket.rooms[room];
                if (data.sender + '_' + data.with === currentChatRoom || data.with + '_' + data.sender === currentChatRoom) {
                    socket.emit('your-room-is', currentChatRoom);
                }
            }
        });

        socket.on('like', function (data) {
            message.findOne({_id: data.messageId}).then(
                function (CurrentMessage) {
                    if (-1 < CurrentMessage.unlikes.indexOf(data.initiator)) {
                        CurrentMessage.unlikes = CurrentMessage.unlikes.filter(function (UnlikeInitiator) {
                            return UnlikeInitiator !== data.initiator;
                        });
                    }
                    CurrentMessage.likes.push(data.initiator);
                    CurrentMessage.save().then(
                        function (UpdatedMessage) {
                            io.to(data.room).emit('like', {initiator: data.initiator, messageId: data.messageId});
                        }
                    );
                }
            );
        });

        socket.on('unlike', function (data) {
            message.findOne({_id: data.messageId}).then(
                function (CurrentMessage) {
                    if (-1 < CurrentMessage.likes.indexOf(data.initiator)) {
                        CurrentMessage.likes = CurrentMessage.likes.filter(function (LikeInitiator) {
                            return LikeInitiator !== data.initiator;
                        });
                    }
                    CurrentMessage.unlikes.push(data.initiator);
                    CurrentMessage.save().then(
                        function (UpdatedMessage) {
                            io.to(data.room).emit('unlike', {initiator: data.initiator, messageId: data.messageId});
                        }
                    )
                }
            );
        });
    });



    return io;
}

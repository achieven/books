var message = require('./models/messages');

module.exports = function(io) {
    io.on('connection', function(socket){
        socket.on('join-room', function (data) {
            socket.join(data);
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

        socket.on('private-message', function (data) {
            for (var room in socket.rooms) {
                var currentChatRoom = socket.rooms[room];
                if (data.sender + '_' + data.with === currentChatRoom || data.with + '_' + data.sender === currentChatRoom) {
                    io.to(currentChatRoom).emit('private-message', {sender: data.sender, payload: data.payload});
                }
            }
        });

        socket.on('private_message', function (data) {
            return helper.AddPrivateMessage(data.sender, data.recepient, data.payload).then(
                () => {
                    allSockets.forEach(function (Socket) {
                        if (Socket.Username === data.recepient){
                            Socket.emit('private_message', {
                                payload: data.payload,
                                sender: data.sender
                            });
                        }
                    });
                }
            )

            // client.publish('messages/'+data.room,data.payload, {qos:1})
        });

        socket.on('group_message', function (data) {
            return helper.AddGroupMessage(data.sender, data.group, data.payload).then(
                () => {
                    return helper.GetUserNamesByBookId(data.group).then(
                        (Usernames) => {
                            allSockets.forEach((Socket) => {
                                Usernames.forEach((Username) => {
                                    if (Socket.Username === Username) {
                                        Socket.emit('group_message', {
                                            payload: data.payload,
                                            sender: data.sender,
                                            group: data.group
                                        });
                                    }
                                })
                            });
                        }
                    );
                }
            );

            // client.publish('messages/'+data.room,data.payload, {qos:1})
        });
    });



    return io;
}

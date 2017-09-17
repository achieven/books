app.controller("groupsCtrl", function($scope,$http, $window, $location, $q) {
    if (!$window.sessionStorage.user) {
        alert('עליך להתחבר כדי לראות את העמוד');

        return;
    }

    $scope.PrivateChat = null;
    $scope.Username = $window.sessionStorage.user;
    $scope._id = $window.sessionStorage._id;
    $scope.GroupMessageContent = '';
    $scope.ShouldShowAllMessages = false;
    $scope.GroupMessageSearch = '';
    $scope.GroupMessages = [];
    $scope.FromDate = '1970-1-1';
    var endDate = new Date();
    $scope.ToDate = endDate.getUTCFullYear() + '-' + (endDate.getUTCMonth() +  1) + '-' + endDate.getUTCDate();

    $scope.AddGroupForm = false;
    $scope.NewGroupName = '';
    
    var socket = io.connect('http://localhost:8002', {reconnection: true});
    socket.on('connect', function(){});
    socket.on('disconnect', function () {
        alert('socket disconnected');
    })
    
    $http.get('/groups/getGroups').then(
        function (response) {
            $scope.Groups = response.data;
            $scope.Groups.forEach(function (Group) {
                socket.emit('join-room', Group._id);
            });
            $scope.SetCurrentChat($scope.Groups[0]._id);
        }
    );

    $http.get('/usersjson').then(
        function (response) {
            $scope.Users = response.data;
            $scope.Users.forEach(function (User) {
                socket.emit('join-room', $scope.Username + '_' + User.username);
            });
        }
    );

    $scope.SetCurrentChat = function (RoomId) {
        $scope.CurrentGroupId = RoomId;
        $http.get('/messages/' + RoomId).then(
            function (response) {
                $scope.GroupMessages = [];
                response.data.forEach(function (Message) {
                    $scope.GroupMessages.push(Message);
                });
                $scope.GroupMessageSearch = '';
                $scope.PrivateChat = null;
            }
        );
    };

    $scope.CreateGroupForm = function () {
        $scope.AddGroupForm = true;
    };
    
    $scope.DontAddGroup = function () {
        $scope.NewGroupName = '';
        $scope.AddGroupForm = false;
    };

    $scope.DoAddGroup = function (NewGroupName) {
        $http.post('groups/addNewGroup/' + NewGroupName).then(
            function (response) {
                $scope.AddGroupForm = false;
                $scope.NewGroupName = '';
                $scope.Groups.push(response.data);
            }
        );
    };
    
    $scope.LikeMessage = function (Message) {
        if (false === $scope.HasLiked(Message, $scope._id)) {
            socket.emit('like', {
                initiator: $scope._id,
                messageId: Message._id,
                room: $scope.CurrentGroupId
            });
        }
    };

    $scope.UnlikeMessage = function (Message) {
        if (false === $scope.HasUnliked(Message, $scope._id)) {
            socket.emit('unlike', {
                initiator: $scope._id,
                messageId: Message._id,
                room: $scope.CurrentGroupId
            });
        }
    };

    socket.on('like', function (data) {
        $scope.GroupMessages.forEach(function (CurrentMessage) {
            if (CurrentMessage._id === data.messageId) {
                if (-1 < CurrentMessage.unlikes.indexOf(data.initiator)) {
                    CurrentMessage.unlikes = CurrentMessage.unlikes.filter(function (UnlikeInitiator) {
                        return UnlikeInitiator !== data.initiator;
                    });
                }
                CurrentMessage.likes.push(data.initiator);
            }
        });
        $scope.$apply();
    });

    socket.on('unlike', function (data) {
        $scope.GroupMessages.forEach(function (CurrentMessage) {
            if (CurrentMessage._id === data.messageId) {
                if (-1 < CurrentMessage.likes.indexOf(data.initiator)) {
                    CurrentMessage.likes = CurrentMessage.likes.filter(function (LikeInitiator) {
                        return LikeInitiator !== data.initiator;
                    });
                }
                CurrentMessage.unlikes.push(data.initiator);
            }
        });
        $scope.$apply();
    });

    $scope.HasLiked = function (Message, UserId) {
        return (-1 < Message.likes.indexOf(UserId));
    };

    $scope.HasUnliked = function (Message, UserId) {
        return (-1 < Message.unlikes.indexOf(UserId));
    };

    $scope.SendGroupMessage = function (Username, CurrentGroupId, GroupMessageContent) {
        socket.emit('group-message', {
            sender: Username,
            room: CurrentGroupId,
            payload: GroupMessageContent
        });
    };
    socket.on('group-message', function (data){
        $scope.GroupMessages.push(data);
        $scope.GroupMessageContent = '';
        $scope.$apply();
    });
    
    $scope.SearchInMessages = function (Group, SearchContent, ShouldShowAllMessages, FromDate, ToDate) {
        $http.get('/messages/search/' + Group + '?Payload=' + SearchContent + '&ShouldShowAllMessages=' + ShouldShowAllMessages + '&FromDate=' + FromDate + '&ToDate=' + ToDate).then(
            function (response) {
                if (-1 < Group.indexOf('_')) {
                    $scope.PrivateMessages = [];
                    response.data.forEach(function (Message) {
                        $scope.PrivateMessages.push(Message);
                    });
                } else {
                    $scope.GroupMessages = [];
                    response.data.forEach(function (Message) {
                        $scope.GroupMessages.push(Message);
                    });
                }
            }
        );
    };
    
    $scope.OpenPrivateMessage = function (SendTo) {
        socket.emit('whats-my-private-room', {sender: $scope.Username , with: SendTo});
        socket.on('your-room-is', function (data){
            $scope.CurrentGroupId = data;
            $http.get('/messages/' + data).then(
                function (response) {
                    $scope.PrivateMessages = [];
                    response.data.forEach(function (Message) {
                        $scope.PrivateMessages.push(Message);
                    });
                    $scope.PrivateChat = true;
                    $scope.CurrentChatWith = SendTo;
                }
            );
        });
    };

    $scope.SendPrivateMessage = function (CurrentChatWith, PrivateChatContent) {
        socket.emit('private-message', {
            sender: $scope.Username,
            with: CurrentChatWith,
            payload: PrivateChatContent
        });
    };

    socket.on('private-message', function (data){
        $scope.PrivateMessages.push(data);
        $scope.PrivateChatContent = '';
        $scope.$apply();
    });
});


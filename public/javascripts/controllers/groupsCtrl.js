app.controller("groupsCtrl", function($scope,$http, $window, $location, $q) {
    if (!$window.sessionStorage.user) {
        alert('עליך להתחבר כדי לראות את העמוד');

        return;
    }

    $scope.Username = $window.sessionStorage.user;
    $scope._id = $window.sessionStorage._id;
    $scope.GroupMessageContent = '';
    $scope.GroupMessages = [];

    $scope.AddGroupForm = false;
    $scope.NewGroupName = '';
    
    var socket = io.connect('http://localhost:8002', {reconnect: true});
    socket.on('connect', function(){});
    
    $http.get('/groups/getGroups').then(
        function (response) {
            $scope.Groups = response.data;
            $scope.Groups.forEach(function (Group) {
                socket.emit('join-room', Group._id);
            });
            $scope.SetCurrentChat($scope.Groups[0]._id);
        }
    );

    $scope.CreateGroupForm = function () {
        $scope.AddGroupForm = true;
    };
    
    $scope.DontAddGroup = function () {
        $scope.NewGroupName = '';
        $scope.AddGroupForm = false;
    };

    $scope.DoAddGroup = function (NewGroupName) {
        $http.post('groups/addNewGroup/' + NewGroupName + '/' + $window.sessionStorage.user).then(
            function (response) {
                $scope.AddGroupForm = false;
                $scope.NewGroupName = '';
                $scope.Groups.push(response.data);
            }
        );
    };

    $scope.SetCurrentChat = function (RoomId) {
        $scope.CurrentGroupId = RoomId;
        $http.get('/messages/' + RoomId).then(
            function (response) {
                $scope.GroupMessages = [];
                response.data.forEach(function (Message) {
                    $scope.GroupMessages.push(Message);
                });
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
    
    $scope.SearchInMessages = function (Group, SearchContent) {
        $http.get('/messages/search/' + Group + '?Payload=' + (SearchContent || '')).then(
            function (response) {
                $scope.GroupMessages = [];
                response.data.forEach(function (Message) {
                    $scope.GroupMessages.push(Message);
                });
            }
        );
    };
    
    // $scope.OpenPrivateMessage = function (SendTo) {
    //     socket.emit('join-room', $window.sessionStorage.user + '_' + SendTo);
    //     $scope.PrivateChat = {With: SendTo};
    //     $scope.CurrentChatWith = SendTo;
    // };
    //
    // $scope.SendPrivateMessage = function (PrivateChat) {
    //     socket.emit('private-message', {
    //         sender: $window.sessionStorage.user,
    //         with: PrivateChat.With,
    //         payload: PrivateChat.MessageContent
    //     });
    // };
    //
    // socket.on('private-message', function (data){
    //     data.sender = (data.sender !== $window.sessionStorage.user) ? data.sender : 'You'
    //     if (!$scope.PrivateMessages) {
    //         $scope.PrivateMessages = [];
    //     }
    //     $scope.PrivateMessages.push(data);
    //     $scope.$apply();
    // });


    // $scope.OpenOrCloseGroupChatMessage = function (BookId) {
    //     $scope.books.forEach(function (Book) {
    //         if (Book._id === BookId) {
    //             if (true === Book.ShowChatInput) {
    //                 Book.ShowChatInput = false;
    //             } else {
    //                 Book.ShowChatInput = true;
    //             }
    //         } else {
    //             Book.ShowChatInput = false;
    //         }
    //     });
    // };
    //
    // $scope.OpenOrClosePrivateChatMessage = function (Username, BookId) {
    //     $scope.books.forEach(function (Book){
    //         if (Book._id === BookId) {
    //             Book.users.forEach(function (User) {
    //                 if (User.Username === Username) {
    //                     if (true === User.ShowChatInput) {
    //                         User.ShowChatInput = false;
    //                     } else {
    //                         User.ShowChatInput = true;
    //                     }
    //                 } else {
    //                     User.ShowChatInput = false;
    //                 }
    //             });
    //         } else {
    //             Book.users.forEach(function (User) {
    //                 User.ShowChatInput = false;
    //             });
    //         }
    //     });
    // };
    //
    // $scope.categoryChosen = function(category) {
    // 	$http.get("booksJson").then(function(response) {
    //         $scope.books = response.data;
    //         $scope.mycategory = category.address;
    //         $scope.states.activeItem=category.name;
    //         var socket = null;
    //             initSocket();
    //         function initSocket () {
    //             socket = io('/');
    //             socket.on('connect', function(){
    //                 socket.emit('register_private_socket', {
    //                     username: $scope.myUserName
    //                 });
    //             });
    //             socket.on('private_message', function (data) {
    //                 $scope.books.forEach(function (Book){
    //                     Book.users.forEach(function (User) {
    //                         if (data.sender === User.Username) {
    //                             User.Messages.push({
    //                                 Content: data.payload,
    //                                 Sender: data.sender
    //                             });
    //                         }
    //                     });
    //                 });
    //                 $scope.$apply();
    //             });
    //             socket.on('group_message', function (data) {
    //                 $scope.books.forEach(function (Book){
    //                     if (data.group === Book._id) {
    //                         Book.Messages.push({
    //                             Content: data.payload,
    //                             Sender: data.sender
    //                         });
    //                     }
    //                 });
    //                 $scope.$apply();
    //             });
    //             socket.on('disconnect', function(){
    //                 alert('socket disconnected, please try again in a few minutes')
    //             });
    //         }
    //
      //   function initMessages () {
      //       var groupMessagesPromises = [];
      //       var privateMessagesPromises = [];
      //       $q.when().then(
      //           () => {
      //               var booksPromises = [];
      //               $scope.books.forEach(function (Book) {
      //                   booksPromises.push(
      //                       function () {
      //                           return $http(
      //                               {
      //                                   method: 'GET',
      //                                   url: '/users/' + Book._id
      //                               }
      //                           );
      //                       }()
      //                   );
      //               })
      //
      //               return $q.all(booksPromises);
      //           }
      //       ).then(
      //           function (Response) {
      //               $scope.books.forEach(function (Book){
      //                   Book.Show = false;
      //                   Book.GroupMessageContent = '';
      //                   Book.Messages = [];
      //                   Response.forEach(function (BookAndUsernames){
      //                       if (BookAndUsernames.data.BookId === Book._id) {
      //                           Book.users.forEach(function (UserId, Index) {
      //                               Book.users[Index] = {
      //                                   UserId: UserId,
      //                                   Username: BookAndUsernames.data.Usernames[Index],
      //                                   ShowChatInput: false,
      //                                   PrivateMessageContent: '',
      //                                   Messages: []
      //                               };
      //                               if ($scope.myUserName === BookAndUsernames.data.Usernames[Index]) {
      //                                   $scope.myUserId = UserId;
      //                               }
      //                               privateMessagesPromises.push(
      //                                   function () {
      //                                       return $http(
      //                                           {
      //                                               method: 'GET',
      //                                               url: '/messages/private/' + $scope.myUserName + '/' + UserId
      //                                           }
      //                                       );
      //                                   }()
      //                               );
      //                           });
      //                       }
      //                   });
      //                   groupMessagesPromises.push(
      //                       function () {
      //                           return $http(
      //                               {
      //                                   method: 'GET',
      //                                   url: '/messages/group/' + Book._id
      //                               }
      //                           );
      //                       }()
      //                   );
      //               });
      //               return $q.all(groupMessagesPromises);
      //           }
      //       ).then(
      //           (AllBooksMessages) => {
      //               AllBooksMessages.forEach(function (BookMessages) {
      //                   $scope.books.forEach(function(Book) {
      //                       BookMessages.data.forEach(function (Message) {
      //                           if (Book._id === Message.receiver) {
      //                               Book.Messages.push(
      //                                   {
      //                                       Content: Message.content,
      //                                       Sender: Message.senderName
      //                                   }
      //                               )
      //                           }
      //                       })
      //                   })
      //               })
      //               return $q.all(privateMessagesPromises);
      //           }
      //       ).then(
      //           (PrivateMessages) => {
      //               PrivateMessages.forEach(function (PrivateMessageForUser) {
      //                   PrivateMessageForUser.data.forEach(function (Message, Index1) {
      //                       $scope.books.forEach(function(Book) {
      //                           Book.users.forEach(function (User, Index2) {
      //                               if (User.UserId === Message.sender) {//sent to me
      //                                   User.Messages.push({
      //                                       Content: Message.content,
      //                                       Sender: User.Username
      //                                   });
      //                               } else if (User.UserId === Message.receiver) {// sent by me
      //                                   User.Messages.push({
      //                                       Content: Message.content,
      //                                       Sender: $scope.myUserName
      //                                   });
      //                               }
      //                           })
      //                       });
      //                   })
      //               });
      //           }
      //       )
      //   }
      //
      //   initSocket();
      //   initMessages();
      // });
    //
    //     });
    // };

});


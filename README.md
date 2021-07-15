## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Lints and fixes files
```
npm run lint --fix
```

### Firebase quick structure
```
# rooms - key --- lat, long, userId

# messages - key (set manually to be the room key) --- message, userId

# user - just preparing for login and it helped me to store the generated key - it has only the key in it
```

### Testing the app with multiple 'users' - real-time
Open 2 separate browsers (or a browser and second tab in incognito) and go to http://localhost:8080/. You can chat now with your other self :D

### Color legend
```
Red - other chat-room(s)

Blue - your chat-room(s)
```

### Known 'critical' issues
Not having a login. Basically I am generating an id based on which I am creating a 'current' user that's browsing. After vuex store is emptied, when you will open again the browser - you will get another id and you will probably see markers/chat-rooms that are not yours (basically the rooms are now orphaned, even if before, at some point - they were yours)

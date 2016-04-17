### MongoDB installation

What operation systems do you use? Windows, Linux or OS X?

The instructions below will be described for the OS X - if you have other operation system, then the other two (Windows and Linux Ubuntu) will be described later (so you can skit this OS X instructions).

Screenshot from the MongoDB website:
![MongoDB different operation systems](http://test.przeorski.pl/book/001_mongodb_versions_community.png)

All the MongoDB instructions you can find at https://docs.mongodb.org/manual/installation/

### Mongo on OS X
In that OS X tutorial, we will use the guide for "Install MongoDB Community Edition with Homebrew".

You need to have installed the Homebrew, if you don't have it then go to www.brew.sh and install it.

If for any reasons, this guide won't work for you, then you can find a manual instruction on the official MongoDB's website.

1) Update Homebrew’s package database.
In a system shell, issue the following command:

```
brew update
```

2) Install MongoDB.
You can install MongoDB via brew with several different options. Use one of the following operations:

a) Install MongoDB from Binaries (on localhost enviroment, we don't need the TLS/SSL - we will use it later when creating a production eviroment)
```
brew install mongodb
```

### Robomongo GUI for MongoDB

Robomongo is a cross-platform desktop client which may be comparised to MySQL or PostgreSQL for SQL databases.

When developing an app, it's good to have GUI and be able to quickly review collections in our database.

To obtain Robomongo (for all operation systems), please visit https://robomongo.org/ and install one on your machine. Community version of Robomongo costs $0.

In our case, we use version 0.9.0 RC4 of Robomongo. Currently there are three different versions of Robomongo available:
- OS X: robomongo-0.9.0-rc4-darwin-x86_64-8c830b6.dmg
- Linux: robomongo-0.9.0-rc4-linux-x86_64-8c830b6.tar.gz
- Windows: robomongo-0.9.0-rc4-windows-x86_64-8c830b6.exe

### Running MongoDB and viewing our collections in Robomongo GUI

After you have installed MongoDB and Robomongo on your machine, then
you need to run it. Run in your terminal the mongoDb with that command:

```
mongod
```
then you shall see:

![mongodb is running](http://test.przeorski.pl/book/002_mongodb_is_running.png)


and after that :

1) Open the Robomongo's client

2) Create a connection with default (make sure you are running mongoDB from terminal)

![Robomongo default create a new connection](http://test.przeorski.pl/book/003_create_new_connection.png)

### Summary of MongoDb & Robomongo setup
Currently, you have a localhost database set-up finished.

















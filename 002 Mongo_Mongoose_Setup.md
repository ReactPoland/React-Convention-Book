# MongoDB installation

What operation systems do you use? Windows, Linux or OS X?

The instructions below will be described for the OS X - if you have other operation system, then the other two (Windows and Linux Ubuntu) will be described later (so you can skit this OS X instructions).

![MongoDB different operation systems](http://test.przeorski.pl/book/001_mongodb_versions_community.png)

All the MongoDB instructions you can find at https://docs.mongodb.org/manual/installation/

# Mongo on OS X
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

a) Install MongoDB from Binaries (on localhost enviroment, we don't need the TLS/SSL - we will use it when creating a production eviroment)
```
brew install mongodb
```















#!/usr/bin/env bash
npm run compile

firebase deploy -f iron-staging --token $FIREBASE_TOKEN

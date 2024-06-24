#!/bin/sh

if [ "$DEPLOY" = "production" ]; then
  gunicorn -w 10 -b 0.0.0.0:5000 app:app
else
  python app.py
fi

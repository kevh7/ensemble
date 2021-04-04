# ensemble

[**Winner - Best Social Media Hack - $10,000 prize (largest cash prize)**](https://devpost.com/software/ensemble-iao9vj)

Created by Kevin Huang and Brendan Zelikman in 1 day during HackPrinceton Spring 2021.

## Development Setup (macOS)

Use [homebrew](https://brew.sh/) to install the latest versions of Python and Node.js:

    $ brew upgrade
    $ brew doctor
    $ brew install python
    $ brew install node
    $ brew install postgresql

Clone this repository:

    $ git clone https://github.com/kevh7/ensemble

`cd` into `ensemble/` and create a Python virtual environment.

    $ cd ensemble/
    $ python3 -m venv venv/ensemble
    $ source venv/ensemble/bin/activate

Check your Python and Node.js versions. Python should be `3.9.2` or newer and Node.js should be `15.9.0` or newer. If not, make sure you installed them with the `brew` commands above.

```console
$ python --version
Python 3.9.2
$ node -v
v15.9.0
```

Setup the database and create a user:

    $ pg_ctl -D /usr/local/var/postgres start
    $ createdb ensemble
    $ psql ensemble
    =# CREATE USER username WITH ENCRYPTED PASSWORD 'password';  # replace with a username/password
    =# \q

Setup the `.env` file:

    $ echo 'DEBUG="True"' > .env
    $ echo 'SECRET_KEY="KEY_HERE"' >> .env  # replace with your SECRET_KEY
    $ echo 'DATABASE_USER="USER_HERE"' >> .env  # replace with the user you created
    $ echo 'DATABASE_PASSWORD="PASSWORD_HERE"' >> .env  # replace with the password you created
    $ echo 'SOCIAL_AUTH_SPOTIFY_KEY="KEY_HERE"' >> .env  # replace with your Spotify client ID
    $ echo 'SOCIAL_AUTH_SPOTIFY_SECRET="KEY_HERE"' >> .env  # replace with your Spotify client secret

Install the project dependencies:

    $ cd frontend && npm install && cd ..
    $ pip install -r requirements.txt

Apply the Django migrations:

    $ python manage.py migrate

## Usage

Ensure your virtual environment is activated:

    $ source venv/ensemble/bin/activate

Start the PostgresQL server:

    $ pg_ctl -D /usr/local/var/postgres start

To run the backend server:

    $ python manage.py runserver

To run the backend server with the remote development database:

    # replace APP_NAME with the development app name
    $ DATABASE_URL=$(heroku config:get DATABASE_URL -a APP_NAME) python manage.py runserver

To build the frontend (transpile React code to JavaScript):

    $ npm run dev

If you want to enable live-reloading of your React code, open a second terminal window and run:

    $ npm run server

Navigate to `http://127.0.0.1:8000/`.

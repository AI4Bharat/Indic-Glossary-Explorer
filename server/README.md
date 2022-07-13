# Indic Glossary Server

Repository for the Indic Glossary Server.

## Pre-requisites

The project was created using [Python 3.10.5](https://www.python.org/downloads/release/python-3105/). All major dependencies are listed below; the rest are in the [requirements.txt](/requirements.txt) file.

- django
- djangorestframework
- django-cors-headers

## Installation

The installation and setup instructions have been tested on the following platforms:

- Docker-Compose
- Ubuntu 20.04
- Windows 11

If you are using a different operating system, you will have to look at external resources (eg. StackOverflow) to correct any errors.

### Installation without Docker

#### Create a Virtual Environment

We recommend you to create a virtual environment to install all the dependencies required for the project.

##### Linux

Create Virtual Environment and install dependencies:

```bash
python3 -m venv <YOUR-ENVIRONMENT-NAME>
source <YOUR-ENVIRONMENT-NAME>/bin/activate

# Install dependencies
pip install -r requirements.txt
```

##### Windows

Ensure that the `Execution-Policy` for the scope of `CurrentUser` is set to `Unrestricted`. Check `Execution-Policy` by running:

```pwsh
Get-ExecutionPolicy -Scope CurrentUser
```

Set the `Execution-Policy` to `Unrestricted` by running:

```pwsh
Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser
```

Create Virtual Environment and install dependencies:

```sh
python -m venv <YOUR-ENVIRONMENT-NAME>
.\<YOUR-ENVIRONMENT-NAME>\Scripts\activate

pip install -r requirements.txt
```

#### Environment file

To set up the environment variables needed for the project, run the following lines:

```sh
cp .env.example .env
```

This creates an `.env` file at the root of the project. It is needed to make sure that the project runs correctly. Please go through the file and set the parameters according to your installation.

To create a new secret key, run the following commands (within the virtual environment):

```bash
# Open a Python shell
python manage.py shell

>> from django.core.management.utils import get_random_secret_key
>> get_random_secret_key()
```

Paste the value you get there into the `.env` file.

### Installation with Docker

Build the Docker container:

```bash
docker-compose build
```

To run the container:

```bash
docker-compose up -d
```

### Run Migrations (required only for the first time running the project or if you make any changes in the models)

Run the following commands:

```bash
# Check if there are any pending migrations
docker-compose exec web python manage.py makemigrations

# Run all pending migrations
docker-compose exec web python manage.py migrate

# Create a superuser
docker-compose exec web python manage.py createsuperuser
```

If there were no errors, congratulations! The project is up and running.

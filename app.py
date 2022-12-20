#!/bin/python
import logging

from logging.config import dictConfig

from controller.dgloscontroller import dglos_app
from config.dglosconfigs import app_host, app_port
from datetime import datetime
import time
import os

from apscheduler.schedulers.background import BackgroundScheduler
from scheduler.scheduler_repo import count
log = logging.getLogger("file")


if __name__ == "__main__":
    scheduler = BackgroundScheduler()
    scheduler.add_job(count.data_count, 'interval', minutes=1)
    scheduler.add_job(count.lang_count, 'interval', minutes=1)
    scheduler.start()
    print('Press Ctrl+{0} to exit'.format('Break' if os.name == 'nt' else 'C'))
    dglos_app.run(host=app_host, port=eval(str(app_port)), threaded=True, debug=False)

# Log config
dictConfig(
    {
        "version": 1,
        "formatters": {
            "default": {
                "format": "[%(asctime)s] {%(filename)s:%(lineno)d} %(threadName)s %(levelname)s in %(module)s: %(message)s",
            }
        },
        "handlers": {
            "info": {
                "class": "logging.FileHandler",
                "level": "DEBUG",
                "formatter": "default",
                "filename": "info.log",
            },
            "console": {
                "class": "logging.StreamHandler",
                "level": "DEBUG",
                "formatter": "default",
                "stream": "ext://sys.stdout",
            },
        },
        "loggers": {
            "file": {"level": "DEBUG", "handlers": ["info", "console"], "propagate": ""}
        },
        "root": {"level": "DEBUG", "handlers": ["info", "console"]},
    }
)

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# from email.mime.base import MIMEBase
# from email import encoders
from datetime import datetime
import pytz

IST = pytz.timezone("Asia/Kolkata")
from config.dglosconfigs import MAIL_SETTINGS

# from models import CustomResponse, Status
from email.message import EmailMessage
from email.utils import formataddr


def generate_email_notification(sting_data):

    message = EmailMessage()
    sender = formataddr(
        (MAIL_SETTINGS["MAIL_SENDER_NAME"], MAIL_SETTINGS["MAIL_SENDER"])
    )
    reciever = MAIL_SETTINGS["MAIL_RECIEVER"]
    # message = MIMEMultipart('alternative')
    message["From"] = sender
    message["To"] = ", ".join(reciever)
    tdy_date = datetime.now(IST).strftime("%Y:%m:%d %H:%M:%S")
    message["Subject"] = f" Glossary Alert {tdy_date}"
    filename = "./templates/stats.html"
    html_ = open(filename).read()
    html_ = html_.replace("{{errormessage}}", sting_data)
    html_ = MIMEText(html_, "html")
    # message.attach(html_)
    message.add_alternative(html_, subtype="html")
    return message


def send_email(message):
    try:
        with smtplib.SMTP_SSL(
            MAIL_SETTINGS["MAIL_SERVER"], MAIL_SETTINGS["MAIL_PORT"]
        ) as server:
            server.login(MAIL_SETTINGS["MAIL_SENDER"], MAIL_SETTINGS["MAIL_PASSWORD"])
            # Prefer the modern send_message method
            server.send_message(message)
            server.close()
            del message["From"]
            del message["To"]
    except Exception as e:
        print(
            "Exception while generating email notification for Glossary-explorer  scheduler statistics: {}".format(
                e
            )
        )

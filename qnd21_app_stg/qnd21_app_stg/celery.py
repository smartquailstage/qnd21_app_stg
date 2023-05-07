import os
from celery import Celery

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'qnd21_app_stg.settings.stage')

app = Celery('qnd21_app_stg')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

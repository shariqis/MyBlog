# Generated by Django 3.1.5 on 2024-11-09 10:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Home', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='author',
            new_name='created_by',
        ),
    ]

# Generated by Django 5.2 on 2025-04-24 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('win', '0012_alter_competitionparticipant_result'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teamapplication',
            name='status',
            field=models.CharField(default='pending', max_length=25),
        ),
    ]

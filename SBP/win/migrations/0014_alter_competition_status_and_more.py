# Generated by Django 5.2 on 2025-04-24 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('win', '0013_alter_teamapplication_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='competition',
            name='status',
            field=models.CharField(default='pending', max_length=25),
        ),
        migrations.AlterField(
            model_name='teamapplication',
            name='status',
            field=models.CharField(max_length=25),
        ),
    ]

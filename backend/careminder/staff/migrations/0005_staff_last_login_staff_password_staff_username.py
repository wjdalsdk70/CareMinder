# Generated by Django 4.1.3 on 2023-11-02 13:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("staff", "0004_auto_20231029_1749"),
    ]

    operations = [
        migrations.AddField(
            model_name="staff",
            name="last_login",
            field=models.DateTimeField(
                blank=True, null=True, verbose_name="last login"
            ),
        ),
        migrations.AddField(
            model_name="staff",
            name="password",
            field=models.CharField(
                default=None, max_length=128, verbose_name="password"
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="staff",
            name="username",
            field=models.CharField(default="username1", max_length=255, unique=True),
            preserve_default=False,
        ),
    ]

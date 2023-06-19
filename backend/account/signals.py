from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from account.models import UserProfile
from django.core.mail import send_mail
from django.conf import settings




@receiver(post_save, sender=User)
def save_profile(sender, instance, created, **kwargs):
    user = instance
    print(user)

    if created:
        profile = UserProfile(user=user)
        profile.save()


@receiver(post_save, sender=User)
def send_welcome_email(sender, instance, created, **kwargs):
    if created:
        print('email signal')
        user = instance
        subject = 'Welcome to Jobonja'
        message = f'Dear {user.first_name},\n\nWelcome to Jobonja! We are excited to have you join us.'
        from_email = settings.EMAIL_HOST_USER
        to_email = [user.email]

        send_mail(subject, message, from_email, to_email)
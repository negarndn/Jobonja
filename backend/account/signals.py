from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save, pre_delete
from account.models import UserProfile
from django.core.mail import send_mail
from django.conf import settings
import os


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


@receiver(pre_save, sender=UserProfile)
def delete_previous_resume(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_resume = UserProfile.objects.get(pk=instance.pk).resume
            # Delete the previous resume file
            if os.path.isfile(old_resume.path):
                os.remove(old_resume.path)
        except UserProfile.DoesNotExist:
            pass


@receiver(pre_delete, sender=UserProfile)
def delete_resume_file(sender, instance, **kwargs):
    # Delete the resume file when the user is deleted
    if instance.resume:
        if os.path.isfile(instance.resume.path):
            os.remove(instance.resume.path)

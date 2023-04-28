import os

from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save


class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='userprofile', on_delete=models.CASCADE)
    resume = models.FileField(null=True)


@receiver(models.signals.pre_save, sender=User)
def auto_delete_file_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `User` object is updated
    with new file.
    """
    print(f'pk: {instance.pk}')
    if not instance.pk:
        return False

    try:
        old_file = User.objects.get(pk=instance.pk).resume
    except User.DoesNotExist:
        return False

    new_file = instance.resume
    print(f'old resume: {old_file}')
    print(f'new resume: {new_file}')
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)


@receiver(post_save, sender=User, dispatch_uid='save_new_user_profile')
def save_profile(sender, instance, created, **kwargs):
    user = instance
    if created:
        profile = UserProfile(user=user)
        profile.save()


@receiver(models.signals.post_delete, sender=User)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `User` object is deleted.
    """
    if instance.resume:
        if os.path.isfile(instance.resume.path):
            os.remove(instance.resume.path)



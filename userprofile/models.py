from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField, JSONField


# ArrayField fields needs a callable for the default (no lambda functions)
def get_empty_array():
    return []


# ArrayField fields needs a callable for the default (no lambda functions)
def get_empty_features_array():
    return [0.0] * 12


class UserProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # list of usernames of this user's passed profiles
    passed_profiles = ArrayField(
        models.CharField(max_length=50), default=get_empty_array, blank=True
    )

    # list of usernames of this user's liked profiles
    liked_profiles = ArrayField(
        models.CharField(max_length=50), default=get_empty_array, blank=True
    )

    # list of top tracks
    tracks = ArrayField(
        models.CharField(max_length=50), default=get_empty_array, blank=True
    )

    # list of features
    features = ArrayField(
        models.FloatField(), default=get_empty_features_array, blank=True
    )

    # current cluster this user is in
    cluster = models.IntegerField(default=-1)

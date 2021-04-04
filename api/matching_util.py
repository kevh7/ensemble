from django.contrib.auth.models import User
from django.db import models
from userprofile.models import UserProfile
from sklearn.cluster import KMeans


def cluster():
    profiles = UserProfile.objects.order_by("id")
    features = profiles.values_list("features", flat=True)

    X = list(features)

    km = KMeans(n_clusters=max(1, len(X) // 23))
    preds = km.fit_predict(X)

    for i in range(len(preds)):
        UserProfile.objects.filter(id=profiles[i].id).update(cluster=preds[i])

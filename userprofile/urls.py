from django.urls import path
from django.conf.urls import url
from userprofile import views


urlpatterns = [
    path("username", views.get_username),
    path("tracks", views.get_tracks),
    path("tracks/<username>", views.get_tracks),
    path("track-ids", views.get_tracks_ids),
    path("track-ids/<username>", views.get_tracks_ids),
    path("potential-matches", views.get_potential_matches),
]

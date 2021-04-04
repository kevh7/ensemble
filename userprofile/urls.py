from django.urls import path
from django.conf.urls import url
from userprofile import views


urlpatterns = [
    path("username", views.get_username),
    path("full-name", views.get_full_name),
    path("full-name/<username>", views.get_full_name),
    path("tracks", views.get_tracks),
    path("tracks/<username>", views.get_tracks),
    path("track-ids", views.get_tracks_ids),
    path("track-ids/<username>", views.get_tracks_ids),
    path("potential-matches", views.get_potential_matches),
    path("track-features", views.get_track_features),
    path("track-features/<username>", views.get_track_features),
]

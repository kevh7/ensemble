from django.urls import path
from django.conf.urls import url
from userprofile import views


urlpatterns = [
    path("username", views.get_username),
    path("full-name", views.get_full_name),
    path("full-name/<username>", views.get_full_name),
    path("details", views.get_details),
    path("details/<username>", views.get_details),
    path("tracks", views.get_tracks),
    path("tracks/<username>", views.get_tracks),
    path("track-ids", views.get_track_ids),
    path("track-ids/<username>", views.get_track_ids),
    path("potential-matches", views.get_potential_matches),
    path("track-features", views.get_track_features),
    path("track-features/<username>", views.get_track_features),
    path("swipe-left/<username>", views.swipe_left),
    path("swipe-right/<username>", views.swipe_right),
    path("follows", views.get_follows),
]

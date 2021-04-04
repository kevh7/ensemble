from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from userprofile.models import UserProfile
from api import spotify_util


@login_required
@api_view(["GET"])
def get_username(request):
    return Response({"username": request.user.username})


@login_required
@api_view(["GET"])
def get_tracks(request, username=None):
    if username:
        user = User.objects.get(username=username)
    else:
        user = User.objects.get(username=request.user.username)

    profile = user.userprofile
    track_ids = profile.tracks
    track_names = spotify_util.get_track_names(request.user.username, track_ids)

    return Response({"track_names": track_names})


@login_required
@api_view(["GET"])
def get_tracks_links(request, username=None):
    if username:
        user = User.objects.get(username=username)
    else:
        user = User.objects.get(username=request.user.username)

    profile = user.userprofile
    track_ids = profile.tracks
    track_links = spotify_util.get_track_links(request.user.username, track_ids)

    return Response({"track_links": track_links})


@login_required
@api_view(["GET"])
def get_potential_matches(request):
    user = User.objects.get(username=request.user.username)
    cluster = user.userprofile.cluster
    passed = user.userprofile.passed_profiles
    liked = user.userprofile.liked_profiles

    pm_names = []
    for pm in UserProfile.objects.filter(cluster=cluster):
        if (
            pm.user.username != request.user.username
            and pm.user.username not in passed
            and pm.user.username not in liked
        ):
            pm_names.append(pm.user.username)

    return Response({"potential_matches": pm_names})

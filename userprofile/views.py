from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from userprofile.models import UserProfile
from api import spotify_util


@login_required
@api_view(["GET"])
def get_details(request, username=None):
    return Response(
        get_username_helper(request)
        | get_full_name_helper(request, username)
        | get_track_ids_helper(request, username)
        | get_track_features_helper(request, username)
    )


def get_username_helper(request):
    return {"username": request.user.username}


@login_required
@api_view(["GET"])
def get_username(request):
    return Response(get_username_helper(request))


def get_full_name_helper(request, username=None):
    if username:
        user = User.objects.get(username=username)
    else:
        user = User.objects.get(username=request.user.username)

    if user.last_name:
        full_name = user.first_name + " " + user.last_name
    else:
        full_name = user.first_name
    return {"full_name": full_name}


@login_required
@api_view(["GET"])
def get_full_name(request, username=None):
    return Response(get_full_name_helper(request, username))


def get_tracks_helper(request, username=None):
    if username:
        user = User.objects.get(username=username)
    else:
        user = User.objects.get(username=request.user.username)

    profile = user.userprofile
    track_ids = profile.tracks
    track_names = spotify_util.get_track_names(request.user.username, track_ids)

    return {"track_names": track_names}


@login_required
@api_view(["GET"])
def get_tracks(request, username=None):
    return Response(get_tracks_helper(request, username))


def get_track_ids_helper(request, username=None):
    if username:
        user = User.objects.get(username=username)
    else:
        user = User.objects.get(username=request.user.username)

    profile = user.userprofile
    track_ids = profile.tracks

    return {"track_ids": track_ids}


@login_required
@api_view(["GET"])
def get_track_ids(request, username=None):
    return Response(get_track_ids_helper(request, username))


def get_track_features_helper(request, username=None):
    if username:
        user = User.objects.get(username=username)
    else:
        user = User.objects.get(username=request.user.username)

    profile = user.userprofile
    features = profile.features

    response = {
        "danceability": features[0],
        "energy": features[1],
        "acousticness": features[6],
        "tempo": features[10],
    }

    return {"track_features": response}


@login_required
@api_view(["GET"])
def get_track_features(request, username=None):
    return Response(get_track_features_helper(request, username))


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

    return Response({"ids": pm_names})


@login_required
@api_view(["GET"])
def swipe_left(request, username):
    user = User.objects.get(username=request.user.username)

    if username not in user.userprofile.passed_profiles:
        user.userprofile.passed_profiles.append(username)
        user.userprofile.save()

    return Response({"ok": True})


@login_required
@api_view(["GET"])
def swipe_right(request, username):
    user = User.objects.get(username=request.user.username)

    if username not in user.userprofile.liked_profiles:
        user.userprofile.liked_profiles.append(username)
        user.userprofile.save()

    return Response({"ok": True})


@login_required
@api_view(["GET"])
def follows(request):
    user = User.objects.get(username=request.user.username)
    return Response({"ids": user.userprofile.liked_profiles})

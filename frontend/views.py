from django.shortcuts import render, redirect
from django.http import HttpResponse
from api import spotify_util, matching_util


def index(request):
    if request.user.is_authenticated:
        return render(request, "frontend/index.html")
    else:
        if not request.path == "/":
            return redirect("/")
        return render(request, "frontend/welcome.html")


def login_success(request):
    if not request.user.is_authenticated:
        return redirect("/")

    spotify_util.save_tracks(request.user.username)
    spotify_util.save_features(request.user.username)
    matching_util.cluster()
    return redirect("/")
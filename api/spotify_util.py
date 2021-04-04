from django.contrib.auth.models import User
from userprofile.models import UserProfile
from social_django.utils import load_strategy
from requests import post, put, get
from urllib.parse import urlencode
from time import time
import numpy as np

BASE_URL = "https://api.spotify.com/v1/"


def get_access_token(username):
    user = User.objects.get(username=username)
    social = user.social_auth.filter(provider="spotify")[0]
    token_expiry = social.extra_data["auth_time"]

    # refresh token if it is over 55 minutes old
    if time() - token_expiry >= 3300:
        strategy = load_strategy()
        social.refresh_token(strategy)

    return social.extra_data["access_token"]


def execute_spotify_api_request(endpoint, username, params=None):
    access_token = get_access_token(username)
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + access_token,
    }

    url = BASE_URL + endpoint + ("?" + urlencode(params) if params else "")

    response = get(url, {}, headers=headers)
    try:
        return response.json()
    except:
        return {"Error": "Spotify API request failed"}


def get_track_ids(username):
    endpoint = "me/top/tracks"

    tracks = execute_spotify_api_request(
        endpoint, username, {"time_range": "short_term", "limit": 20}
    )
    track_ids = []

    for track in tracks["items"]:
        track_ids.append(track["id"])

    return track_ids


def get_track_names(username, track_ids):
    endpoint = "tracks"

    tracks = execute_spotify_api_request(
        endpoint, username, {"ids": ",".join(track_ids)}
    )["tracks"]

    track_names = []
    for track in tracks:
        track_names.append(track["name"])

    return track_names


def get_track_links(username, track_ids):
    endpoint = "tracks"

    tracks = execute_spotify_api_request(
        endpoint, username, {"ids": ",".join(track_ids)}
    )["tracks"]

    track_links = []
    for track in tracks:
        track_links.append(track["external_urls"]["spotify"])

    return track_links


def save_tracks(username):
    tracks = get_track_ids(username)

    user = User.objects.get(username=username)
    profile = user.userprofile
    profile.tracks = tracks
    profile.save()


def get_features(username):
    endpoint = "audio-features"

    track_ids = get_track_ids(username)

    features = execute_spotify_api_request(
        endpoint, username, {"ids": ",".join(track_ids)}
    )
    return features


def save_features(username):
    features_data = get_features(username)["audio_features"]

    features = [0] * 12

    for track in features_data:
        features[0] += track["danceability"]
        features[1] += track["energy"]
        features[2] += track["key"]
        features[3] += track["loudness"]
        features[4] += track["mode"]
        features[5] += track["speechiness"]
        features[6] += track["acousticness"]
        features[7] += track["instrumentalness"]
        features[8] += track["liveness"]
        features[9] += track["valence"]
        features[10] += track["tempo"]
        features[11] += track["time_signature"]

    features = list(np.array(features) / len(features_data))
    user = User.objects.get(username=username)
    profile = user.userprofile
    profile.features = features
    profile.save()


def get_artist_id(username, track_id):
    endpoint = "tracks/" + track_id

    track = execute_spotify_api_request(endpoint, username)

    return track["artists"][0]["id"]


def get_similar_songs(username, genre):
    endpoint = "recommendations/"

    params = {"seed_genres": genre}

    tracks = execute_spotify_api_request(endpoint, username, params)["tracks"]
    track_ids = []

    for track in tracks:
        track_ids.append(track["id"])

    return track_ids

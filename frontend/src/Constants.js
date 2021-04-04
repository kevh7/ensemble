import User from "./User";

export const GREEN = "#1DB954";
export const BLACK = "#191414";
export const jumboStyle = {
  backgroundColor: BLACK,
  textAlign: "center",
  width: "100vw",
};
export const swipeStyle = {
  color: "white",
  position: "absolute",
  width: 150,
  height: 75,
  bottom: 80,
  border: "1px solid white",
  borderRadius: 20,
  zIndex: 10,
};

export function getUser(id) {
  return fetch(`./api/user/details/${id}`)
    .then((res) => res.json())
    .then((user) => new User(user));
}

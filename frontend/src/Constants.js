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
  width: 100,
  height: 100,
  top: "50%",
  border: "1px solid white",
  borderRadius: 100,
  zIndex: 10,
};

export function getUser(id) {
  return fetch(`./api/user/details/${id}`)
    .then((res) => res.json())
    .then((user) => new User(user));
}

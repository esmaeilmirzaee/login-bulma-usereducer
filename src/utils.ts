export default async function login({ email, password }) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (
        email.toLowerCase() === "samuel" &&
        password.toLowerCase() === "russell"
      ) {
        resolve();
      } else {
        reject("Username and password is wrong.");
      }
    }, 1000);
  });
}

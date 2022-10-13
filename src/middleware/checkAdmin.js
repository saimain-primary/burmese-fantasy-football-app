export default function isAdmin({ next, router }) {
  if (!localStorage.getItem("jwt")) {
    return router.push({ name: "login" });
  }

  return next();
}

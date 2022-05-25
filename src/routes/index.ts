import tempRoute from "./temp.route"

export default function initRoute(app: any) {
  app.use("/", tempRoute);
}
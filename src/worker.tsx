import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { Document } from "./app/Document";
import { setCommonHeaders } from "./app/headers";
import { Home } from "./app/pages/Home";
import Canvas from "./app/pages/components/Canvas";
import Team from "./app/pages/components/Team";
import Mingling from "./app/pages/components/Mingling";
import Filer from "./app/pages/components/Filer";
import Feedback from "./app/pages/components/Feedback";
import Profile from "./app/pages/components/Profil";
import Ideas from "./app/pages/components/Ideer";
export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  render(Document, [
    route("/", Home),
    route("/canvas", Canvas),
    route("/team", Team),
    route("/mingle", Mingling),
    route("/files", Filer),
    route("/feedback", Feedback),
    route("/profile", Profile),
    route("/idea", Ideas)
  ]),
]);




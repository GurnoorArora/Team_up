// import express from "express";
// import { getMessages } from "../controllers/chat.js";
// import {
//   createTeam,
//   searchTeam,
//   sendRequest,
//   joinTeamById,
//   getRequests,
//   handleRequest,
//   removeMember,
//   editDetails,
//   updatePassword,
//   filterByDetails,
//   getMyRequestedTeams,
//   getMyTeams,
//   getTeamByID,
// } from "../controllers/team.js";

// import { protect, teamAdmin, admin } from "../middleware/authMiddleware.js";
// const router = express.Router();

// // route to trigger the capture
// // router.get('/:TeamId', getTeam)

// router.post("/createteam", protect, createTeam);
// router.get("/searchteam", protect, searchTeam);
// router.post("/sendrequest", protect, sendRequest);
// router.post("/jointeam", protect, joinTeamById);
// router.get("/getteamrequests", protect, teamAdmin, getRequests);
// router.post("/handlerequest", protect, teamAdmin, handleRequest);
// router.delete("/removemember", protect, teamAdmin, removeMember);
// router.put("/editdetails", protect, teamAdmin, editDetails);
// router.put("/changepassword", protect, teamAdmin, updatePassword);
// router.post("/filterbydetails", protect, filterByDetails);
// router.get("/getmyrequestedteams", protect, getMyRequestedTeams);
// router.get("/getmyteams", protect, getMyTeams);

// //getTeamDetails Route
// router.get("/:id", protect, getTeamByID);

// router.get("/chat/:id", protect, getMessages);

// export default router;
import express from "express";
import Team from "../models/teamModel.js";
import { getMessages } from "../controllers/chat.js";
import {
  createTeam,
  searchTeam,
  sendRequest,
  joinTeamById,
  getRequests,
  handleRequest,
  removeMember,
  editDetails,
  updatePassword,
  filterByDetails,
  getMyRequestedTeams,
  getMyTeams,
  getTeamByID,
} from "../controllers/team.js";

import { protect, teamAdmin, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

// route to trigger the capture
// router.get('/:TeamId', getTeam)

router.post("/createteam", protect, createTeam);
router.get("/searchteam", protect, searchTeam);
router.post("/sendrequest", protect, sendRequest);
router.post("/jointeam", protect, joinTeamById);
router.get("/getteamrequests", protect, teamAdmin, getRequests);
router.post("/handlerequest", protect, teamAdmin, handleRequest);
router.delete("/removemember", protect, teamAdmin, removeMember);
router.put("/editdetails", protect, teamAdmin, editDetails);
router.put("/changepassword", protect, teamAdmin, updatePassword);
router.post("/filterbydetails", protect, filterByDetails);
router.get("/getmyrequestedteams", protect, getMyRequestedTeams);
router.get("/getmyteams", protect, getMyTeams);

//getTeamDetails Route
router.get("/:id", protect, getTeamByID);

router.get("/:teamId/members", async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId).populate("members.userId", "name email");

    if (!team || !team.members || team.members.length === 0) {
      return res.status(404).json({ message: "No members found in this team" });
    }

    res.json(team.members);
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/chat/:id", protect, getMessages);

export default router;
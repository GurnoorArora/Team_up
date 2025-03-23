// import React, { useState, useEffect, useContext, useRef } from "react";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import TextField from "@mui/material/TextField";
// import SendIcon from "@mui/icons-material/Send";
// import TeamDetailsDialog from "./../components/TeamDetailsDialog";
// import { useDispatch, useSelector } from "react-redux";
// import { getMyTeamsAction } from "../actions/teamActions";
// import Loader from "./../components/Loader";
// import { getTeamById } from "./../actions/teamActions";
// import io from "socket.io-client";
// import { ReactComponent as SelectChat } from "./../assets/select-chat.svg";

// export default function MyTeams({ history, match }) {
//   const [socket, setSocket] = useState(null);
//   const setupSocket = () => {
//     const userInfoFromStorage = localStorage.getItem("userInfo")
//       ? JSON.parse(localStorage.getItem("userInfo"))
//       : null;
//     const { token } = userInfoFromStorage;
//     const newSocket = io("/", {
//       withCredentials: true,
//       auth: {
//         token: token,
//       },
//     });
//     newSocket.on("connect", () => {
//       console.log("connected");
//     });
//     newSocket.on("disconnect", () => {
//       console.log("disconnected");
//     });
//     setSocket(newSocket);
//   };
//   useEffect(() => {
//     setupSocket();
//   }, []);

//   return (
//     <Box
//       sx={{
//         margin: {
//           xs: 1,
//           md: 3,
//         },
//       }}
//     >
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={3}>
//           {<TeamListComponent history={history} />}
//         </Grid>
//         <Grid item xs={12} md={9}>
//           {socket && (
//             <ChatComponent
//               teamId={match.params.teamId}
//               history={history}
//               socket={socket}
//             />
//           )}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
// function ChatComponent({ teamId, history, socket }) {
//   const dispatch = useDispatch();
//   const [messages, setMessages] = useState([]);
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState("");
//   const chatRef = useRef({});
//   chatRef.current = messages;
//   const messagesEndRef = useRef(null);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   const { loading, error, team } = useSelector(
//     (state) => state.teamsSection?.selectedTeamDetails
//   );
//   const { username } = useSelector((state) => state.userLogin?.userInfo);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//     if (teamId) {
//       dispatch(getTeamById(teamId));
//       socket.emit("join", teamId);
//       socket.emit("getInitialMessages", teamId);
//       socket.on("joined", (id) => {
//         console.log("joined : " + id);
//       });
//       socket.on("newMessage", (data) => {
//         setMessages([...chatRef.current, data]);
//         scrollToBottom();
//       });
//       socket.on("initialMessages", (data) => {
//         setMessages(data?.reverse());
//         scrollToBottom();
//       });
//     }
//     return () => {
//       socket.emit("leave", teamId);
//       socket.off("joined");
//       socket.off("newMessage");
//       socket.off("initialMessages");
//     };
//   }, [teamId]);

//   const sendMessage = () => {
//     socket.emit("message", {
//       teamId: teamId,
//       message: value,
//     });
//     setValue("");
//   };

//   return (
//     <>
//       <Loader loading={loading} />
//       {teamId && !error && !loading && team ? (
//         <>
//           <Paper
//             elevation={3}
//             sx={{
//               height: "84vh",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <Paper
//               elevation={3}
//               sx={{
//                 padding: 2,
//               }}
//             >
//               <Stack
//                 direction="row"
//                 justifyContent="space-between"
//                 alignItems="center"
//                 spacing={2}
//               >
//                 <Typography variant="h6" component="h6">
//                   {team?.teamName}
//                 </Typography>
//                 <IconButton
//                   color="primary"
//                   aria-label="upload picture"
//                   component="span"
//                   onClick={handleClickOpen}
//                 >
//                   <ArrowDropDownIcon />
//                 </IconButton>
//               </Stack>
//             </Paper>
//             <Box
//               sx={{
//                 padding: 2,
//                 flexGrow: "1",
//                 overflowY: "scroll",
//               }}
//             >
//               {messages?.map((msg) => (
//                 <ChatMessage
//                   username={msg?.username}
//                   message={msg?.content?.message}
//                   side={msg?.username === username ? "right" : "left"}
//                 />
//               ))}
//               <div ref={messagesEndRef} />
//             </Box>
//             <Box>
//               <Paper
//                 elevation={3}
//                 sx={{
//                   padding: 2,
//                 }}
//               >
//                 <Grid container spacing={1}>
//                   <Grid item xs={11}>
//                     <TextField
//                       id="send-message"
//                       label="Send Message"
//                       multiline
//                       maxRows={4}
//                       value={value}
//                       onChange={handleChange}
//                       onKeyUp={(e) => {
//                         if (e.keyCode === 13) {
//                           sendMessage();
//                         }
//                       }}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={1}>
//                     <Button
//                       sx={{ height: "100%", width: "100%" }}
//                       color="primary"
//                       aria-label="send"
//                       component="span"
//                       variant="contained"
//                       onClick={sendMessage}
//                     >
//                       <SendIcon />
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Box>
//           </Paper>
//           <TeamDetailsDialog
//             history={history}
//             open={open}
//             handleClose={handleClose}
//           />
//         </>
//       ) : (
//         <Box
//           sx={{
//             width: "100%",
//             height: "100%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <SelectChat width="50%" />
//         </Box>
//       )}
//     </>
//   );
// }

// function ChatMessage({ username, message, side }) {
//   //TODO : Add media_link and meme type
//   return (
//     <Grid container sx={{ my: 1 }}>
//       {side === "right" && <Grid item xs={4} md={5}></Grid>}
//       <Grid item xs={8} md={7}>
//         <Typography variant="caption" component="div">
//           {username} :
//         </Typography>
//         <Paper elevation={2} sx={{ padding: 1 }}>
//           <Typography variant="body2">{message}</Typography>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// }

// function TeamListComponent({ history }) {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getMyTeamsAction());
//   }, [dispatch]);
//   const { loading, error, teams } = useSelector(
//     (state) => state.teamsSection?.myteams
//   );
//   return (
//     <>
//       <Loader loading={loading} />
//       <Paper
//         elevation={3}
//         sx={{
//           padding: 2,
//           height: "80vh",
//           overflowY: "scroll",
//         }}
//       >
//         <Typography variant="h5" component="h6">
//           Teams
//         </Typography>
//         <Box sx={{ my: 2 }}></Box>
//         {teams?.map((team) => (
//           <TeamListCard
//             key={team._id}
//             teamId={team.teamId}
//             teamName={team.teamName}
//             history={history}
//           />
//         ))}
//       </Paper>
//     </>
//   );
// }

// function TeamListCard({ teamId, teamName, history }) {
//   const openTeamHandler = () => {
//     history.push(`/myTeams/${teamId}`);
//   };
//   return (
//     <Paper
//       elevation={2}
//       sx={{
//         padding: 1,
//         my: 2,
//         "&:hover": {
//           backgroundColor: "#e3e3e3",
//           cursor: "pointer",
//         },
//       }}
//       onClick={openTeamHandler}
//     >
//       <Typography variant="h6" component="h6">
//         {teamName}
//       </Typography>
//       {/* <Typography variant="caption" component="div">
//         Veeresh : Hey there, wh....
//       </Typography> */}
//     </Paper>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { getMyTeamsAction, getTeamById } from "../actions/teamActions";
import io from "socket.io-client";
import Loader from "./../components/Loader";
import { ReactComponent as SelectChat } from "./../assets/select-chat.svg";
import TeamDetailsDialog from "./../components/TeamDetailsDialog";

export default function MyTeams({ history, match }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

    if (userInfoFromStorage) {
      const { token } = userInfoFromStorage;
      const newSocket = io("/", {
        withCredentials: true,
        auth: { token },
      });

      newSocket.on("connect", () => console.log("Connected to socket"));
      newSocket.on("disconnect", () => console.log("Disconnected from socket"));

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  return (
    <Box sx={{ margin: { xs: 1, md: 3 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TeamListComponent history={history} />
        </Grid>
        <Grid item xs={12} md={9}>
          {socket && (
            <ChatComponent
              teamId={match.params.teamId}
              history={history}
              socket={socket}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

function ChatComponent({ teamId, history, socket }) {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const chatRef = useRef(messages);
  const messagesEndRef = useRef(null);
  const [open, setOpen] = useState(false);

  const { loading, error, team } = useSelector(
    (state) => state.teamsSection?.selectedTeamDetails
  );
  const { username } = useSelector((state) => state.userLogin?.userInfo);

  useEffect(() => {
    if (teamId) {
      dispatch(getTeamById(teamId));
      socket.emit("join", teamId);

      socket.on("initialMessages", (data) => {
        setMessages(data.reverse());
        scrollToBottom();
      });

      socket.on("newMessage", (data) => {
        setMessages((prev) => [...prev, data]);
        scrollToBottom();
      });

      return () => {
        socket.emit("leave", teamId);
        socket.off("initialMessages");
        socket.off("newMessage");
      };
    }
  }, [teamId, socket, dispatch]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (value.trim()) {
      socket.emit("message", {
        teamId,
        message: value,
      });
      setValue("");
    }
  };

  return (
    <>
      <Loader loading={loading} />
      {teamId && !error && !loading && team ? (
        <>
          <Paper
            elevation={3}
            sx={{ height: "84vh", display: "flex", flexDirection: "column" }}
          >
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">{team?.teamName}</Typography>
                <IconButton color="primary" onClick={() => setOpen(true)}>
                  <ArrowDropDownIcon />
                </IconButton>
              </Stack>
            </Paper>

            <Box sx={{ padding: 2, flexGrow: 1, overflowY: "auto" }}>
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  username={msg.username}
                  message={msg.content?.message}
                  side={msg.username === username ? "right" : "left"}
                />
              ))}
              <div ref={messagesEndRef} />
            </Box>

            <Box>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={11}>
                    <TextField
                      label="Send Message"
                      multiline
                      maxRows={4}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      onKeyUp={(e) => e.key === "Enter" && sendMessage()}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      onClick={sendMessage}
                    >
                      <SendIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Paper>

          <TeamDetailsDialog
            history={history}
            open={open}
            handleClose={() => setOpen(false)}
          />
        </>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SelectChat width="50%" />
        </Box>
      )}
    </>
  );
}

function ChatMessage({ username, message, side }) {
  return (
    <Grid container sx={{ my: 1 }}>
      {side === "right" && <Grid item xs={4} md={5}></Grid>}
      <Grid item xs={8} md={7}>
        <Typography variant="caption">{username}:</Typography>
        <Paper elevation={2} sx={{ padding: 1 }}>
          <Typography variant="body2">{message}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

function TeamListComponent({ history }) {
  const dispatch = useDispatch();
  const { loading, error, teams } = useSelector(
    (state) => state.teamsSection?.myteams
  );

  useEffect(() => {
    dispatch(getMyTeamsAction());
  }, [dispatch]);

  return (
    <>
      <Loader loading={loading} />
      <Paper elevation={3} sx={{ padding: 2, height: "80vh", overflowY: "auto" }}>
        <Typography variant="h5">Teams</Typography>
        <Box sx={{ my: 2 }} />
        {teams?.map((team) => (
          <TeamListCard
            key={team._id}
            teamId={team.teamId}
            teamName={team.teamName}
            history={history}
          />
        ))}
      </Paper>
    </>
  );
}

function TeamListCard({ teamId, teamName, history }) {
  const [showMembers, setShowMembers] = useState(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showMembers) {
      setLoading(true);
      fetch(`/api/teams/${teamId}/members`)
        .then((res) => res.json())
        .then((data) => {
          setMembers(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [showMembers, teamId]);

  return (
    <Paper elevation={2} sx={{ padding: 2, my: 2 }}>
      <Typography variant="h6" onClick={() => history.push(`/myTeams/${teamId}`)}>
        {teamName}
      </Typography>

      <Button
        variant="contained"
        size="small"
        sx={{ mt: 1 }}
        onClick={() => setShowMembers((prev) => !prev)}
      >
        {showMembers ? "Hide Members" : "Show Members"}
      </Button>

      {showMembers && (
        <Box sx={{ mt: 1 }}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            members.map((member) => (
              <Typography key={member.userId}>
                {member.userName} - {member.role}
              </Typography>
            ))
          )}
        </Box>
      )}
    </Paper>
  );
}

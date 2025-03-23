// import React, { useEffect } from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import { withStyles } from "@mui/styles";
// import { createTheme } from "@mui/material/styles";
// import TableCell from "@mui/material/TableCell";
// import Paper from "@mui/material/Paper";
// import { AutoSizer, Column, Table } from "react-virtualized";
// import { useDispatch, useSelector } from "react-redux";
// import Loader from "./Loader";
// import Message from "./Message";
// import { getScrappedEventsAction } from "../actions/eventActions";
// import dayjs from "dayjs";
// const styles = (theme) => ({
//   flexContainer: {
//     display: "flex",
//     alignItems: "center",
//     boxSizing: "border-box",
//   },
//   table: {
//     // temporary right-to-left patch, waiting for
//     // https://github.com/bvaughn/react-virtualized/issues/454
//     "& .ReactVirtualized__Table__headerRow": {
//       ...(theme.direction === "rtl" && {
//         paddingLeft: "0 !important",
//       }),
//       ...(theme.direction !== "rtl" && {
//         paddingRight: undefined,
//       }),
//     },
//   },
//   tableRow: {
//     cursor: "pointer",
//   },
//   tableRowHover: {
//     "&:hover": {
//       backgroundColor: theme.palette.grey[200],
//     },
//   },
//   tableCell: {
//     flex: 1,
//   },
//   noClick: {
//     cursor: "initial",
//   },
// });

// class MuiVirtualizedTable extends React.PureComponent {
//   static defaultProps = {
//     headerHeight: 48,
//     rowHeight: 60,
//   };

//   getRowClassName = ({ index }) => {
//     const { classes, onRowClick } = this.props;

//     return clsx(classes.tableRow, classes.flexContainer, {
//       [classes.tableRowHover]: index !== -1 && onRowClick != null,
//     });
//   };

//   cellRenderer = ({ cellData, columnIndex }) => {
//     const { columns, classes, rowHeight, onRowClick } = this.props;
//     return (
//       <>
//         {columnIndex && columnIndex === 2 ? (
//           <TableCell
//             component="a"
//             href={cellData}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={clsx(classes.tableCell, classes.flexContainer, {
//               [classes.noClick]: onRowClick == null,
//             })}
//             variant="body"
//             style={{
//               height: rowHeight,
//               cursor: "pointer",
//               textDecoration: "underline",
//             }}
//             align={
//               (columnIndex != null && columns[columnIndex].numeric) || false
//                 ? "right"
//                 : "left"
//             }
//           >
//             <div style={{display:"flex", alignItems: "center", gap: "10px"}}>
//               <p>
                
//             open website 
//               </p>
//             <a href="https://calendar.google.com/calendar/u/0/r" target="_blank">
//               Add To Google Calendar
//             </a>
//             </div>
//           </TableCell>
//         ) : (
//           <TableCell
//             component="div"
//             className={clsx(classes.tableCell, classes.flexContainer, {
//               [classes.noClick]: onRowClick == null,
//             })}
//             variant="body"
//             style={{ height: rowHeight }}
//             align={
//               (columnIndex != null && columns[columnIndex].numeric) || false
//                 ? "right"
//                 : "left"
//             }
//           >
//             {columnIndex === 1
//               ? dayjs(cellData).format("hh:mm A, DD MMM YYYY")
//               : cellData}
//           </TableCell>
//         )}
//       </>
//     );
//   };

//   headerRenderer = ({ label, columnIndex }) => {
//     const { headerHeight, columns, classes } = this.props;

//     return (
//       <TableCell
//         component="div"
//         className={clsx(
//           classes.tableCell,
//           classes.flexContainer,
//           classes.noClick
//         )}
//         variant="head"
//         style={{ height: headerHeight }}
//         align={columns[columnIndex].numeric || false ? "right" : "left"}
//       >
//         <span>{label}</span>
//       </TableCell>
//     );
//   };

//   render() {
//     const { classes, columns, rowHeight, headerHeight, ...tableProps } =
//       this.props;
//     return (
//       <AutoSizer>
//         {({ height, width }) => (
//           <Table
//             height={height}
//             width={width}
//             rowHeight={rowHeight}
//             gridStyle={{
//               direction: "inherit",
//             }}
//             headerHeight={headerHeight}
//             className={classes.table}
//             {...tableProps}
//             rowClassName={this.getRowClassName}
//           >
//             {columns.map(({ dataKey, ...other }, index) => {
//               return (
//                 <Column
//                   key={dataKey}
//                   headerRenderer={(headerProps) =>
//                     this.headerRenderer({
//                       ...headerProps,
//                       columnIndex: index,
//                     })
//                   }
//                   className={classes.flexContainer}
//                   cellRenderer={this.cellRenderer}
//                   dataKey={dataKey}
//                   {...other}
//                 />
//               );
//             })}
//           </Table>
//         )}
//       </AutoSizer>
//     );
//   }
// }

// MuiVirtualizedTable.propTypes = {
//   classes: PropTypes.object.isRequired,
//   columns: PropTypes.arrayOf(
//     PropTypes.shape({
//       dataKey: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//       numeric: PropTypes.bool,
//       width: PropTypes.number.isRequired,
//     })
//   ).isRequired,
//   headerHeight: PropTypes.number,
//   onRowClick: PropTypes.func,
//   rowHeight: PropTypes.number,
// };

// const defaultTheme = createTheme();
// const VirtualizedTable = withStyles(styles, { defaultTheme })(
//   MuiVirtualizedTable
// );

// export default function ReactVirtualizedTable() {
//   const dispatch = useDispatch();

//   const scrappedEventsData = useSelector(
//     (state) => state.eventSection.scrappedEvents
//   );

//   const { loading, error, scrappedEvents } = scrappedEventsData;
 
//   useEffect(() => {
//     dispatch(getScrappedEventsAction());
//   }, [dispatch]);
 
 
//   return (
//     <>
//       <Loader loading={loading} />
//       {error && <Message variant="error">{error}</Message>}
//       <Paper style={{ height: "85%", minHeight: "70vh", width: "100%" }}>
//         {scrappedEvents && (
//           <VirtualizedTable
//             rowCount={scrappedEvents.length}
//             rowGetter={({ index }) => scrappedEvents[index]}
//             columns={[
//               {
//                 width: 200,
//                 label: "Name",
//                 dataKey: "name",
//               },
//               {
//                 width: 200,
//                 label: "Start Time",
//                 dataKey: "start_time",
//               },
//               {
//                 width: 200,
//                 label: "Website",
//                 dataKey: "url",
//               }              
//             ]}
//           />
          
//         )}
//       </Paper>
//     </>
//   );
// }
import React, { useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { getScrappedEventsAction } from "../actions/eventActions";
import dayjs from "dayjs";

// Sample event names for display
const randomEventNames = [
  "Agentforce Virtual Hackathon",
  "Azure AI Developer Hackathon",
  "Global AI Agents League",
  "Hack Reddit 2025",
  "Meta Horizon Creator Competition",
  "Cloud Computing Workshop",
  "Digital Jam",
];

// Function to generate dynamic Google Calendar link
const generateGoogleCalendarLink = (event) => {
  const title = encodeURIComponent(event.name || "Event");
  const details = encodeURIComponent(event.description || "Exciting event!");
  const location = encodeURIComponent(event.location || "Online");

  const startTime = dayjs(event.startDate || new Date())
    .format("YYYYMMDDTHHmmss[Z]");
  const endTime = dayjs(event.endDate || new Date())
    .add(1, "hour")
    .format("YYYYMMDDTHHmmss[Z]");

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startTime}/${endTime}`;
};

export default function ReactVirtualizedTable() {
  const dispatch = useDispatch();

  const scrappedEventsData = useSelector(
    (state) => state.eventSection.scrappedEvents
  );

  const { loading, error, scrappedEvents } = scrappedEventsData;

  useEffect(() => {
    dispatch(getScrappedEventsAction());
  }, [dispatch]);

  return (
    <Box sx={{ padding: 2 }}>
      <Loader loading={loading} />
      {error && <Message variant="error">{error}</Message>}

      <Grid container spacing={3}>
        {scrappedEvents &&
          scrappedEvents.slice(0, 6).map((event, index) => {
            const eventName = randomEventNames[index % randomEventNames.length];

            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <CardContent>
                    <Typography
                      component="h2"
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                    >
                      {eventName}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" mt={1}>
                      <a
                        href={event.url?.startsWith("http") ? event.url : `https://${event.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#1976d2",
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        Open Website
                      </a>
                    </Typography>

                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 2, width: "100%" }}
                      onClick={() => {
                        const url = event.url?.startsWith("http")
                          ? event.url
                          : `https://${event.url}`;
                        window.open(url, "_blank");
                      }}
                    >
                      Register
                    </Button>

                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        backgroundColor: "#2F3E50",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#1E2A38" },
                      }}
                      onClick={() => window.open(generateGoogleCalendarLink(event), "_blank")}
                    >
                      ADD TO GOOGLE CALENDAR
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}

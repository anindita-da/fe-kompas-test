import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import { keyHumanize, groupByDate, getTotal, formatIDR } from "./Util";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "20px",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    marginLeft: "20px",
    color: theme.palette.text.secondary,
  },
  typographylist: {
    textAlign: "left",
    color: "#000000",
    fontWeight: "bold",
  },
  buttonAdd: {
    marginLeft: "620px",
    marginBottom: "20px",
  },
  list1: {
    color: "#000000",
    fontSize: "10pt",
  },
  listTotal: {
    textAlign: "center",
    marginLeft: "90px",
  },
  listTotal1: {
    fontWeight: "bold",
    fontSize: "10pt",
  },
}));

const CardJajan = ({ items = [], title = "" }) => {
  const classes = useStyles();
  const total = formatIDR(getTotal(items));
  return (
    <>
      <Paper className={classes.paper}>
        <Typography
          className={classes.typographylist}
          variant="subtitle2"
          gutterBottom
        >
          {title}
        </Typography>
        <Divider />
        <List className={classes.list1}>
          {items.map((_data) => (
            <ItemJajan {..._data} />
          ))}
          <Divider />
          <ListItem>
          <ListItemText
        disableTypography
        className={classes.listTotal}
        primary={<Typography type="subtitle1" style={{ fontWeight: "bold", fontSize: "11pt" }}>Total</Typography>}/>
            <ListItemSecondaryAction className={classes.listTotal1}>
              Rp {total}
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    </>
  );
};

const ItemJajan = ({ id, name, cost, created_at }) => {
  const date = new Date(created_at);
  const time = date.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const _cost = formatIDR(cost);
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemIcon className={classes.list1}>
        <ListItemText id={id} disableTypography
        primary={<Typography type="subtitle1" style={{ fontSize: "11pt" }}>{time}</Typography>}/>
      </ListItemIcon>
      <ListItemText id={id} disableTypography
        primary={<Typography type="subtitle1" style={{ fontSize: "11pt" }}>{name}</Typography>}/>
      <ListItemSecondaryAction className={classes.list1}>
        Rp {_cost}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export function ListJajan({ data = [] }) {
  const groupedDataByDate = groupByDate(data);
  return (
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={3}>
        {Object.keys(groupedDataByDate).map((key) => (
          <Grid item xs={3}>
            <CardJajan
              title={keyHumanize(key)}
              items={groupedDataByDate[key]}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export function Header({ items = [], handleClickOpen }) {
  const classes = useStyles();
  const cost = formatIDR(getTotal(items));
  return (
    <div className={classes.root}>
      <Typography align="center" variant="h6" color="black" gutterBottom>
        Diari Jajan Februari 2021
      </Typography>
      <Typography align="center" variant="subtitle1" color="black" gutterBottom>
        Pengeluaran Bulan Ini Rp {cost}
      </Typography>
      <Button
        className={classes.buttonAdd}
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        TAMBAH ITEM
      </Button>
    </div>
  );
}

import { Paper, Typography, makeStyles, Link } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(8),
    padding: theme.spacing(4),
    textAlign: "center",
    [theme.breakpoints.up(800)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  heading: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  text: {
    margin: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

export default function InProgress() {
  const classes = useStyles();

  return (
    <Paper className={classes.pageContent} elevation={5}>
      <Typography variant='h2' className={classes.heading}>
        Hello!
      </Typography>
      <Typography>
        You've stumbled onto my website during a weird time... I recently
        transferred hosting services and have decided to build my own website
        from scratch. If you're seeing this, it means I still haven't finished.
        Please check back later to see what I create, or, if you can't wait,
        checkout my socials below.
      </Typography>
      <Typography className={classes.text}>Best, Connor Easton</Typography>
      <div>
        <Link
          className={classes.icon}
          href='https://www.instagram.com/eastonco/'
          color='inherit'
        >
          <InstagramIcon />
        </Link>
        <Link
          className={classes.icon}
          href='https://github.com/eastonco'
          color='inherit'
        >
          <GitHubIcon />
        </Link>
        <Link
          className={classes.icon}
          href='https://twitter.com/eastonco_'
          color='inherit'
        >
          <TwitterIcon />
        </Link>
      </div>
    </Paper>
  );
}

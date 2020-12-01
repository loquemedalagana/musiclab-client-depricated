export default theme => ({
  root: {
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.5',
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  authorName: {
    color: '#5c6e91'
  },
  publishtedAt: {
    color: '#93abd3'
  },
  postTitle: {
    color: '#393e46'
  },
})
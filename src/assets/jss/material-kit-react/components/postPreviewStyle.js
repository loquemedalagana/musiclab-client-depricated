import {
  showPostMenu,
} from './postStyle';

const backgroundColors = [
  'rgba(249, 247, 207, 1)',
  'rgba(210, 245, 227, 1)',
  'rgba(255, 226, 226, 1)',
  'rgba(224, 236, 228, 1)',
  'rgba(251, 223, 240, 1)',
  'rgba(207, 255, 254, 1)',
  'rgba(255, 228, 228, 1)',
  'rgba(255, 255, 221, 1)',
  'rgba(255, 224, 247, 1)',
  'rgba(240, 236, 227, 1)',
  'rgba(221, 243, 245, 1)',
  'rgba(240, 227, 255, 1)',
  'rgba(214, 229, 250, 1)',
]; //random background colors

const COLOR_NUMS = (backgroundColors.length)-1;

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
    color: '#9f5f80'
  },
  postTitle: {
    color: '#393e46'
  },
  cardHeader: {
    background: backgroundColors[Math.floor(Math.random()*COLOR_NUMS)],
  },
  cardBody: {
    background: backgroundColors[Math.floor(Math.random()*COLOR_NUMS)],
  },
  cardFooter: { //card action, content
    background: backgroundColors[Math.floor(Math.random()*COLOR_NUMS)],
  },
  ...showPostMenu,
})
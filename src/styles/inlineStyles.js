import Colors from 'material-ui/lib/styles/colors';

export default {
  snackbar: {
    error: {
      background: Colors.red800
    },
    success: {
      background: Colors.green500
    }
  },

  paper: {
    small: {
      margin: '0 auto',
      maxWidth: 400,
      padding: 32
    }
  },

  dnd: {
    draggableBox: {
      wrapper: {
        margin: 16
      },
      paper: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        position: 'relative',
        border: '1px solid ' + Colors.grey300,
        marginTop: -1
      },
      deleteBtn: {
        position: 'absolute',
        top: 6,
        right: 8
      },
      title: {
        display: 'inline-block',
        lineHeight: '24px',
        marginLeft: 40
      },
      icons: {
        position: 'absolute',
        left: 16,
        height: 24,
        overflow: 'hidden'
      }
    }
  }
}

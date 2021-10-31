// TODO: Use xtate for this purpose

export const questionMachine = {
  states: {
    new: {
        on: {
            REJECT: { target: 'rejected', color: 'danger' },
            APPROVE: { target: 'approved', color: 'success' },
        }
    },
    approved: {
        on: {
            SPOTLIGHT: { target: 'spotlight', color: 'warning' },
            REJECT: { target: 'rejected', color: 'danger' },
            ANSWER: { target: 'answered', color: 'success' }
        }
    },
    rejected: {
        on: {
            RESTORE: { target: 'new', color: 'info' }
        }
    },
    spotlight: {
        on: {
            CANCEL: { target: 'approved', color: 'dark' },
            ANSWER: { target: 'answered', color: 'success' }
        }
    },
    answered: {
        on: {
            REJECT: { target: 'rejected', color: 'danger' },
            RESTORE: { target: 'approved', color: 'link' }
        }
    }
  }
};

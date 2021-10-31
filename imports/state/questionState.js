// TODO: Use xtate for this purpose

export const questionMachine = {
  states: {
    new: {
        on: {
            REJECT: { target: 'rejected' },
            APPROVE: { target: 'approved' },
        }
    },
    approved: {
        on: {
            SPOTLIGHT: { target: 'spotlight' },
            REJECT: { target: 'rejected' },
            ANSWER: { target: 'answered' }
        }
    },
    rejected: {
        on: {
            RESTORE: { target: 'new' }
        }
    },
    spotlight: {
        on: {
            CANCEL: { target: 'approved' },
            ANSWER: { target: 'answered' }
        }
    },
    answered: {
        on: {
            REJECT: { target: 'rejected' },
            RESTORE: { target: 'approved' }
        }
    }
  }
};

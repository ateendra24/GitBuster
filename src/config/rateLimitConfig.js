const rateLimits = {
    guestUser: {
        MAX_REPOS_PER_DAY: 3,
        MAX_MESSAGES_PER_DAY: 10,
    },
    loggedInUser: {
        MAX_REPOS_PER_DAY: 5,
        MAX_MESSAGES_PER_DAY: 30,
    }
}

export default rateLimits;
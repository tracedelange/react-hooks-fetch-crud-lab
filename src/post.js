const post = (data) => { return {
        "Headers": {
            "Content-Type": "application/json"
        },
        "body": {
            ...data
        }
    }
}

export default post;